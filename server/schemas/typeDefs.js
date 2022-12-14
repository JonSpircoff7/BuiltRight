const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Bodypart {
    _id: ID
    name: String
  }

  type Exercise {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    bodypart: Bodypart
  }

  type Order {
    _id: ID
    purchaseDate: String
    exercises: [Exercise]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    bodyparts: [Bodypart]
    exercises(bodypart: ID, name: String): [Exercise]
    exercise(_id: ID!): Exercise
    user: User
    order(_id: ID!): Order
    checkout(exercises: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(exercises: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateExercise(_id: ID!, quantity: Int!): Exercise
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
