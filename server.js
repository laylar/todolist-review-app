const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 2121;
require("dotenv").config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = "todo";

//unifiedTopology helps prevent errors, kind of a new thing.
//This is a promise, and when it resolves, hopefully it will have the connection!
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then((client) => {
    console.log(`Connected to ${dbName} database!`);
    //db is the connection to the database.
    db = client.db(dbName);
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  const todoItems = await db.collection("todos").find().toArray();
  const itemsLeft = await db
    .collection("todos")
    .countDocuments({ completed: false });
  res.render("index.ejs", { items: todoItems, left: itemsLeft });
});

app.post("/createTodo", (req, res) => {
  db.collection("todos")
    .insertOne({
      todo: req.body.todoItem,
      completed: false,
    })
    .then((result) => {
      console.log("Todo has been added!");
      // refresh the page
      res.redirect("/");
    });
});

app.delete("/deleteTodo", (req, res) => {
  db.collection("todos")
    .deleteOne({ todo: req.body.todoTextStuff })
    .then((result) => {
      console.log("Deleted Todo");
      res.json("Deleted It");
    })
    .catch((err) => console.log(err));
});

app.put("/markComplete", (req, res) => {
  db.collection("todos")
    .updateOne(
      { todo: req.body.todoTextStuff },
      {
        $set: {
          completed: true,
        },
      }
    )
    .then((result) => {
      console.log("Marked Complete");
      res.json("Marked Complete");
    });
});

app.put("/undo", (req, res) => {
  db.collection("todos")
    .updateOne(
      { todo: req.body.todoTextStuff },
      {
        $set: {
          completed: false,
        },
      }
    )
    .then((result) => {
      console.log("Marked Complete");
      res.json("Marked Complete");
    });
});

//This starts up the server
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running, you better go catch it.");
});
