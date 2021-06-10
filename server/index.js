const express = require("express");
const app = express();
var cors = require("cors");
const port = 8080;
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("test"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;
const user = new Schema({
  uniqueIdentifier: String,
  username: String,
  pwd: String,
  regdate: Date,
});
const Userr = mongoose.model("NewUser", user);

app.use(cors());
app.use(express.json());

app.post("/api/createAccount", (req, res) => {
  const { uid } = req.body;
  const { usernameReg } = req.body;
  const { passwordHashed } = req.body;

  Userr.find({ username: `${usernameReg}` }, function (err, data) {
    if (data[0]) {
      res.status(200).send({
        status: "unsuccessful",
      });
    } else if (!data[0]) {
      const newUsers = new Userr({
        uniqueIdentifier: `${uid}`,
        username: `${usernameReg}`,
        pwd: `${passwordHashed}`,
        regdate: Date.now(),
      });

      res.status(200).send({
        status: "successful",
        registedID: `${uid}`,
      });
      newUsers.save();
    }
  });
});

app.listen(port);
