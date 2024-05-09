var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodb$oy';
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        console.log("My token1 : " + token)
        return res.status(401).send({ error: "Please authenticate using a valid token1" })
    }
    try {
        const data =  jwt.verify(token, JWT_SECRET);
        id=data.id
        req.user = id;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: "Please authenticate using a valid token2" })
    }

}
module.exports = fetchuser;