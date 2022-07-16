const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

//process.env.PORT
//process.env.NODE_ENV => production or undefined


//middleware
app.use(express.json()); //req.body
app.use(cors());

//app.use(express.static(path.join(__dirname, "client/build")));

if(process.env.NODE_ENV == "production"){
    //server static content
    //npm run build
    app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));


app.get("*", (req, res) => {
   res.sendFile (path.join(__dirname,"client/build/index.html"));
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


