const { AuthenticationError } = require("apollo-server-express");
const { User, Exercise, Bodypart, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const resolvers = {
  Query: {
    bodyparts: async () => {
      return await Bodypart.find();
    },
    exercises: async (parent, { bodypart, name }) => {
      const params = {};

      if (bodypart) {
        params.bodypart = bodypart;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Exercise.find(params).populate("bodypart");
    },
    exercise: async (parent, { _id }) => {
      return await Exercise.findById(_id).populate("bodypart");
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.exercises",
          populate: "bodypart",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.exercises",
          populate: "bodypart",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ exercises: args.exercises });
      const line_items = [];

      const { exercises } = await order.populate("exercises");

      for (let i = 0; i < exercises.length; i++) {
        const exercise = await stripe.exercises.create({
          name: exercises[i].name,
          bodypart: exercises[i].description,
          images: [`${url}/images/${exercises[i].image}`],
        });

        const instruction = await stripe.instructions.create({
          exercise: exercise.id,
          unit_amount: exercises[i].instruction * 100,
          currency: "usd",
        });

        line_items.push({
          instruction: instruction.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { exercises }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ exercises });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("Not logged in");
    },
    updateExercise: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Exercise.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
