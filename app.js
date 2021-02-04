var http = require("http"); 
var os = require("os");
var fs = require("fs");
// var nodemon = require("nodemon");
var nodemailer = require("nodemailer");

// server creation
var server = http.createServer(function(req,res){

    // 1st request
    if(req.url === "/"){
        res.write("Welcome to Server !!!");
        res.end();
    }

    // 2nd request
    else if(req.url === "/serverdetails"){
        res.write("OS name : " + os.platform());
        res.write("\n\nArchitecture of Server machine : " + os.arch());
        res.end();
    }

    // 3rd request
    else if(req.url === "/html/page"){
        fs.readFile("index.html", function(error, data) {
            if(error){
                res.write("Requested page not found !!!");
                res.end();
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
          });
    }

    // 4th request
    else if(req.url === "/textme"){
        var createStream = fs.createWriteStream("textmeter.txt");
        createStream.end();
        fs.writeFile("textmeter.txt", "Anjali Peter", function (err) {
            if (err){
                res.write("Failed !!!");
                res.end();
            }
            else{
                fs.readFile("textmeter.txt", function(err,data) {
                    res.write("Success\n\nThe content in textmeter.txt : \n\n");
                    res.write(data);
                    res.end();
                });
            }
          });
    }

    // 5th request
    else if(req.url === "/mailer"){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: "anjalianju2572@gmail.com",
                   pass: "anju@gmail"
               }
           });
           const mailDetails = {
            from: "anjalianju2572@gmail.com", // sender address
            to: "gokul.g@ictkerala.org", // receiver address
            subject: "AUTOMATED EMAIL FROM NODE", // Subject line
            html: "<p>Hai, It's me...Anjali Peter from FSD batch2 !!!</p><br><h2>Merry Christmas</h2>"// plain text body
          };
          transporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
                res.write("Mail not sent !!!");
                res.end();
            }
            else { 
                res.write("A mail has been sent to gokul.g@ictkerala.org !!!\n\nGo and check it :) ");
                res.end();
            } 
        }); 
    }

    // 6th request
    else{
        res.write("Bad Request !!!");
        res.end();
    }
});

// server port
server.listen(8888);

// nodemon restart
// nodemon({
//     script: 'app.js',
//     ext: 'js json'
//   });
  
//   nodemon.on('start', function () {
//     console.log('App has started');
//   }).on('quit', function () {
//     console.log('App has quit');
//     process.exit();
//   }).on('restart', function () {
//     console.log('App restarted due to: ');
//   });

