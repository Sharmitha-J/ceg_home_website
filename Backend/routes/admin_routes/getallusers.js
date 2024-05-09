const express = require('express');
const User = require('../../models/user');
const Room = require('../../models/room')
const Admin = require('../../models/admins');
const Complain = require('../../models/complains_model');
const Token = require("../../models/stoken");
const Feedback = require("../../models/feedback")
const router = express.Router()
const fetchadmin = require('../../middleware/fetchadmin')

router.get('/getallusers', fetchadmin,  async (req, res) => {
    let userId = req.user;
    const admin = await Admin.findById(userId)
    if(admin.role!='admin'){
        return res.status(401).json({message:"Access denied",response:false})
    }else{
        const rooms=await Room.find()
        rooms.sort((a, b) => a.room_no - b.room_no);
        const data=[]
        for(let i=0;i<rooms.length;i++){
            let cuser = await User.find({ _id:rooms[i].user})
            data.push({
                      room_no:rooms[i].room_no,
                      name:rooms[i].name,
                      phone:cuser[0].mobile,
                      mail:cuser[0].email
                    })
        }
        
        
        // const users=await User.find().select("-password")
        // console.log(users)
        res.json({response:true,data:data})
    }

  })

router.get('/allcomplains', fetchadmin,  async (req, res) => {
    let userId = req.user;
    const admin = await Admin.findById(userId)
    if(admin.role!='admin'){
        return res.status(401).json({message:"Access denied",response:false})
    }else{
        const allcom = [] 
        try {
            const allcomps = await Complain.find({status:"Pending"})
            // res.json({response:true,data:allcomps.length})
            for(let i=0;i<allcomps.length;i++){
              allcom.push({id:allcomps[i]._id,status:allcomps[i].status,room_no:allcomps[i].room_no,name:allcomps[i].name,categ:allcomps[i].catagory,desc:allcomps[i].description,date:allcomps[i].date})
            }
            res.json({response:true,data:allcom})
        } catch (error) {
          console.log(error)
            res.status(500).json({ message:'server erroreyyyy',response:false})
        }
    }

  })
router.get('/getallpasses', fetchadmin,  async (req, res) => {
  
        try {
            const allpasses = await Token.find()
            res.json({allpasses:allpasses,allpasses_length:allpasses.length,response:true})
        } catch (error) {
          console.log(error)
            res.status(500).json({ message:'server error',response:false})
        }
    

  })

  router.get('/getallfeedback', fetchadmin,  async (req, res) => {
    try {
        const allfeedbacks = await Feedback.find({read:false})
        res.json({response: true,data:allfeedbacks})
    } catch (error) {
      console.log(error)
        res.status(500).json({ message:'server error',response:false})
    }
})

  router.get('/getallstats', fetchadmin,  async (req, res) => {
    let userId = req.user;
    const admin = await Admin.findById(userId)
    if(admin.role!='admin'){
        return res.status(401).json({message:"Access denied",response:false})
    }else{ 
        try {
            const allcomps = await Complain.find({status:"Pending"})
            // res.json({response:true,data:allcomps.length})
            let compno = allcomps.length

            const allrooms = await Room.find({})
            let roomno = 90-allrooms.length

            const alltoken = await Token.find({})
            let tokenno = alltoken.length

            const allfeed = await Feedback.find({read:false})
            let feedno = allfeed.length

            res.json({response:true,compcount:compno,roomcount:roomno,tokencount:tokenno,feedcount:feedno})
        } catch (error) {
          console.log(error)
            res.status(500).json({ message:'server erroreyyyy',response:false})
        }
    }

  })


module.exports=router