const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req, res){
  res.sendFile(__dirname+ "/signup.html");
});
app.post("/",function(req, res){
  const email = req.body.email;
  const password = req.body.password;
const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{

        eemail:email,

        Pass:password
      }

    }
  ]
};
const jsonData=JSON.stringify(data);
const url="https://us6.api.mailchimp.com/3.0/lists/df1376279d";
const options={
  method:"POST",
  auth:"sunaina1:c1609be61f25a04c0df9876e8a6a6c2f-us6"
}
const request=https.request(url,options,function(response){
  if(response.statusCode===200){
  res.sendFile(__dirname+ "/sucess.html");
  }
    else
    {
        res.sendFile(__dirname+ "/failure.html");
    }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});



app.listen(3000,function(){
  console.log("server runnibg");
});




//c1609be61f25a04c0df9876e8a6a6c2f-us6
//df1376279d
