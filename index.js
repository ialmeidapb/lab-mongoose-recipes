const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: "Pamonha",
      level: "Amateur Chef",
      ingredients: ["Fresh Corn", "Milk", "Sugar", "Salt"],
      cuisine: "Brazilian",
      dishType: "other",
      image:
        "https://pilotandofogao.com.br/wp-content/uploads/2016/04/Como-Fazer-Pamonha-500x375.jpg",
      duration: 40,
      creator: "Tia Anastacia",
      created: "01/01/1990",
    })
    .then((result) => {
      console.log("CREATED RECIPE =>", result);

      Recipe.insertMany(data).then((allRecipes) => {
        console.log("ALL RECIPES =>", allRecipes);

        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { $set: { duration: 100 } },
          { new: true }
        ).then((updatedRecipe) => {
          console.log("UPDATED RECIPE =>", updatedRecipe);
        });
      });
    });

    const deletedRecipe = Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
