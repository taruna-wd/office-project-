const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const collection = require("./models/chat");
const listing = require("./models/listing.js");
const ejs = require("ejs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const exitingUser = await collection.findOne({ username: data.username });
  if (exitingUser) {
    return res.send("already exists ");
  } else {
    const saltRound = 10;
    const hashpswd = await bcrypt.hash(data.password, saltRound);
    data.password = hashpswd;
    const userdata = await collection.insertMany(data);

    console.log(userdata);
  }
});

app.post("/basic_element", async (req, res) => {
  const data = {
    title: req.body.name,
    description: req.body.category,
    price: req.body.Price,
    images:req.body.img,
    country:req.body.city
  };
  const exitingProduct = await listing.findOne({ title: data.name });
  if (exitingProduct) {
    return res.send("already exists ");
  } else {
    // const saltRound = 10;
    // const hashpswd = await bcrypt.hash(data.password, saltRound);
    // data.password = hashpswd;
    const userdata = await listing.insertMany(data);

    console.log(userdata);
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ username: req.body.username });
    if (!check) {
      return res.send("user name cannot found ");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );
    if (isPasswordMatch) {
      res.render("pages/index");
      // console.log(isPasswordMatch)
    } else {
      return res.send("wrong password");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.send("wrong input");
  }
});

app.get("/list", (req, res) => {
  const allListing = listing.find({});
  res.render("listing/list", { allListing });
});

// routers

// app.post("/signup", async (req, res) => {
//   try {

// const data ={
//   username:req.body.username,
//   email:req.body.email,
//   password:req.body.password

// };

//       // Check if the username already exists
//       const existingUser = await collection.findOne({ username: data.username });
//       if (existingUser) {
//           return res.send("Username already exists");
//       }

//       // Create a new user document
//       const newUser = new collection(data);

//       // Save the new user to the database
//       const savedUser = await newUser.save();
//       console.log("User saved successfully:", savedUser);

//       res.send("User signed up successfully");
//   } catch (error) {
//       console.error("Error signing up user:", error);
//       res.status(500).send("Error signing up user");
//   }
// });
// app.post("/login", async (req, res) => {
//   try {
//       // Find the user by username
//       const user = await collection.findOne({ username:req.body.username });

//       // If user is not found, send an error message
//       if (!user) {
//           return res.send("Username not found");
//       }

//       // Compare passwords
//       if (user.password === req.body.password) {
//           // If passwords match, render the index page
//           return res.render("pages/index");
//       } else {
//           // If passwords don't match, send an error message
//           return res.send("Wrong password");
//       }
//   } catch (error) {
//       console.error("Error logging in:", error);
//       return res.send("An error occurred");
//   }
// });

const port = 8080;
app.listen(port, () => {
  console.log(port);
});
app.get("/basic_elements", (req, res) => {
  res.render("pages/basic_elements");
});
// create route
app.post("/pages/admin", async (req, res) => {
  let listing = req.body.listing;
  console.log(listing);
});


app.get("/new", (req, res) => {
  res.render("listing/new");
});

app.get("/admin", (req, res) => {
  res.render("pages/admin");
});

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/contactus", (req, res) => {
  res.render("pages/contactus");
});

app.get("/header", (req, res) => {
  res.render("pages/header");
});

app.get("/footer", (req, res) => {
  res.render("pages/footer");
});

app.get("/pages", async (req, res) => {
  const allPages = await pages.find({});

  res.render("/pages/index.ejs", { allPages });
});

app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.get("/signup", (req, res) => {
  res.render("pages/signup");
});
app.get("/product", (req, res) => {
  res.render("pages/product");
});

app.get("/form", (req, res) => {
  res.render("pages/form");
});
app.get("/table", (req, res) => {
  res.render("pages/table");
});

app.get("/sidebar", (req, res) => {
  res.render("pages/sidebar");
});
app.get("navbar", (req, res) => {
  res.render("pages/navbar");
});

app.get("*", (req, res) => {
  res.send("/pages/404");
});



