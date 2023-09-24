const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require("./db/User");
const app = express();
//middleware 
app.use(express.json())
app.use(cors());


app.post("/register", async (req, resp) => {

    let user = new User(req.body);
    let result = await user.save();
    result=result.toObject();
    delete result.password;
    resp.send(result);
    console.log("connection Successfull !! ");
});

app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");//to remove password
        if (user) {
            resp.send(user);
        } else {
            resp.send("no user found");
        }
    }


});

app.listen(5000);