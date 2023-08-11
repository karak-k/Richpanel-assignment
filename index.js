// var express = require("express")
// var bodyParser = require("body-parser")
// var mongoose = require("mongoose")
// const cors = require("cors")


// const app = express()

// app.use(bodyParser.json())
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({
//   extended:true
// }))
// app.use(cors())

// mongoose.connect('mongodb://127.0.0.1:27017/mydb')

// var db = mongoose.connection

// db.on('error',()=>console.log("Error connecting to Database"))
// db.once('open',()=>console.log("Connected to Database"))

// app.post("/signup",(req,res)=>{
//   var name = res.body.name;
//   var email = res.body.email;
//   var phone = res.body.phone;
//   var password = res.body.password;

//   var data = {
//     "name": name,
//     "email": email,
//     "phone": phone,
//     "password": password
//   }

//   db.collection('users').insertOne(data,(err,collection)=>{
//     if(err){
//       throw err;
//     }
//     console.log("Record Inserted Succesfully")
//   });

//   return res.redirect('signup_success.html')
// })

// app.get("/",(req,res)=>{
//   res.set({
//     "Allow-access-Allow-Origin": '*',
//     "Allow-access-Allow-Methods": '*'
//   })

//   return res.redirect('index.html')
// }).listen(5500);



// console.log('Listening on port 5500')

var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var cors = require("cors")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
        res.sendFile(__dirname + '/signup_success.html'); // Send the HTML file as a response
    });
});



app.post("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*',
        "Allow-access-Allow-Methods": '*'
    })
    return res.redirect('index.html');
}).listen(5500);



console.log("Listening on PORT 3000");