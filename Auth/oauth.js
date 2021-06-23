const jwt = require("jsonwebtoken");


module.exports = function authtoken (req,res,next){
const token = req.header("x-auth-token");
if (!token) return res.status(401).send("Access Denied.No token  provide");
try {
  const decoded = jwt.verify(token,process.env.SECRET_KEY); //it will decode the json web token and ewrurn to the payload
req.userlogin = decoded;
next();
} catch (ex) {
res.status(400).send("Invalid Token");
}

}
