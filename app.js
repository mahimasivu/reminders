const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      
      bodyParser            =  require("body-parser"),
      
      User                 =  require("./models/reminder");


mongoose.connect("mongodb://127.0.0.1/abc");
app.set("view engine","ejs");
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
      { extended:true }
))

app.get("/", (req, res) => {
  res.render("index");
});

    
  app.post("/", (req, res) => {
    var myData = new User(req.body);
    console.log(myData)
    myData.save()
    .then(item => {
    res.send("item saved to database");
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
    User.find()
    .then(data => {
      res.render("index", { users: data }); // Assuming you are using a template engine like EJS or Pug
    })
    .catch(err => {
      res.status(500).send("Error retrieving data from database");
    });
   });



app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});
