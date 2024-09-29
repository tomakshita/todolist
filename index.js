const express = require("express");
const app = express();
const fs = require("fs/promises");
const { connectDb } = require("./db/db");
const { TodoSchema } = require("./db/todoSchema");

app.use(express.json());
app.use(express.static("frontend"));

app.get("/all", async (req, res) => {
  try {
    const alltodos = await TodoSchema.find({});
    res.json({
      success: true,
      data: alltodos,
    });
  } catch (error) {
    console.log("someting went wrong");
  }

  // const dataread = await fs.readFile(__dirname + "/data.json", {
  //   encoding: "utf-8",
  // });

  // const parsedData = JSON.parse(dataread);

  // res.json({
  //   success: true,
  //   data: parsedData,
  // });
});

app.post("/todo", async (req, res) => {
  try {
    const { todo } = req.body;

    await TodoSchema.create({
      todoName: todo,
      todostatus: false,
    });

    res.json({
      data: {
        success: true,
      },
    });

    // const jsondata = await fs.readFile(__dirname + "/data.json", {
    //   encoding: "utf-8",
    // });

    // const array_data = JSON.parse(jsondata);

    // console.log(array_data, jsondata);

    // array_data.push({ todo: todo });
    // fs.writeFile(__dirname + "/data.json", JSON.stringify(array_data));
    // res.json({
    //   data: {
    //     success: true,
    //   },
    // });
  } catch (error) {
    console.log("something went wrong");
  }
});

app.put("/updatetodo", async (req, res) => {
  try {
    const { id, status } = req.body;

    await TodoSchema.updateOne({ _id: id }, { $set: { todostatus: status } });

    res.json({
      data: {
        success: true,
      },
    });
  } catch (error) {
    console.log("error found");
  }
});

app.listen(8000, () => {
  console.log("server running");
  connectDb();
});
