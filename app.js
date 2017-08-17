var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");
    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//GET ROUTE

app.get("/", function(req, res){
   res.render("index"); 
});

app.get("/contact", function(req, res){
   res.render("contact"); 
});

//POST ROUTE

app.post("/contact", function(req, res){
    var api_key = 'key-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // Get key from signin up in Mailgun
    var domain = 'www.mailgun.org'; // get domain from signing up in mailgun
    var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
     
    var data = {
      from: 'Excited User <PUT DOMAIN HERE>',
      to: 'you@example.com',
      subject: 'New sign up',
      text: req.body.email
    };
     
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
      if(!error){
          res.send("Email sent");
      } else {
          res.send("Email not sent");
      }
    });    
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server started");
});
