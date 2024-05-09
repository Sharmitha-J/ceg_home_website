var jwt = require('jsonwebtoken');
const Admin = require('../models/admins');
const Room = require("../models/room");

const fetchadmin = async(req, res, next) => {
    try {
                next();
        }
    catch (error) {
        console.log(error)
        res.status(401).json({ error: error+"invalid Session",response:false })
    }

}
module.exports = fetchadmin;