const db = require("./connection");
const { User, Exercise, Bodypart } = require("../models");

db.once("open", async () => {
  await Bodypart.deleteMany();

  const bodyparts = await Bodypart.insertMany([
    { name: "Arms" },
    { name: "Chest" },
    { name: "Abs" },
    { name: "Legs" },
    { name: "Back" },
  ]);

  console.log("bodyparts seeded");

  await Exercise.deleteMany();

  const exercises = await Exercise.insertMany([
    {
      name: "Tin of Cookies",
      bodypart:
        "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      image: "cookie-tin.jpg",
      difficulty: "",
      bodypart: bodyparts[0]._id,
      instruction: "",
      weight: 500,
      reps: 5,
      sets: 3,
    },
    {
      name: "Canned Coffee",
      bodypart:
        "Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.",
      image: "canned-coffee.jpg",
      difficulty: "",
      bodypart: bodyparts[0]._id,
      instruction: "",
      weight: 500,
      reps: 5,
      sets: 3,
    },
    {
      name: "Toilet Paper",
      bodypart: bodyparts[1]._id,
      bodypart:
        "Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.",
      image: "toilet-paper.jpg",
      difficulty: "",
      instruction: "",
      weight: 20,
      reps: 5,
      sets: 3,
    },
    {
      name: "Handmade Soap",
      bodypart: bodyparts[1]._id,
      bodypart:
        "Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.",
      image: "soap.jpg",
      difficulty: "",
      instruction: "",
      weight: 50,
      reps: 5,
      sets: 3,
    },
    {
      name: "Set of Wooden Spoons",
      bodypart: bodyparts[1]._id,
      bodypart:
        "Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.",
      image: "wooden-spoons.jpg",
      difficulty: "",
      instruction: "",
      weight: 100,
      reps: 5,
      sets: 3,
    },
    {
      name: "Camera",
      bodypart: bodyparts[2]._id,
      bodypart:
        "Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.",
      image: "camera.jpg",
      difficulty: "",
      instruction: "",
      weight: 30,
      reps: 5,
      sets: 3,
    },
    {
      name: "Tablet",
      bodypart: bodyparts[2]._id,
      bodypart:
        "In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.",
      image: "tablet.jpg",
      difficulty: "",
      instruction: "",
      weight: 30,
      reps: 5,
      sets: 3,
    },
    {
      name: "Tales at Bedtime",
      bodypart: bodyparts[3]._id,
      bodypart:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.",
      image: "bedtime-book.jpg",
      difficulty: "",
      instruction: "",
      weight: 100,
      reps: 5,
      sets: 3,
    },
    {
      name: "Spinning Top",
      bodypart: bodyparts[4]._id,
      bodypart:
        "Ut vulputate hendrerit nibh, a placerat elit cursus interdum.",
      image: "spinning-top.jpg",
      difficulty: "",
      instruction: "",
      weight: 1000,
      reps: 5,
      sets: 3,
    },
    {
      name: "Set of Plastic Horses",
      bodypart: bodyparts[4]._id,
      bodypart:
        "Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.",
      image: "plastic-horses.jpg",
      difficulty: "",
      instruction: "",
      weight: 1000,
      reps: 5,
      sets: 3,
    },
    {
      name: "Teddy Bear",
      bodypart: bodyparts[4]._id,
      bodypart:
        "Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image: "teddy-bear.jpg",
      difficulty: "",
      instruction: "",
      weight: 100,
      reps: 5,
      sets: 3,
    },
    {
      name: "Alphabet Blocks",
      bodypart: bodyparts[4]._id,
      bodypart:
        "Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.",
      image: "alphabet-blocks.jpg",
      difficulty: "",
      instruction: "",
      weight: 600,
      reps: 5,
      sets: 3,
    },
  ]);

  console.log("exercises seeded");

  await User.deleteMany();

  await User.create({
    firstName: "Pamela",
    lastName: "Washington",
    email: "pamela@testmail.com",
    password: "password12345",
    orders: [
      {
        exercises: [exercises[0]._id, exercises[0]._id, exercises[1]._id],
      },
    ],
  });

  await User.create({
    firstName: "Elijah",
    lastName: "Holt",
    email: "eholt@testmail.com",
    password: "password12345",
  });

  console.log("users seeded");

  process.exit();
});
