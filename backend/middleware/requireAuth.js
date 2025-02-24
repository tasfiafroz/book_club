// const jwt = require('jsonwebtoken')
// const User = require('../models/userModel')

// const requireAuth = async (req, res, next) => {

//     //verify authorization
//     const { authorization } = req.headers

//     if(!authorization) {
//         return res.status(401).json({error: 'Authorization token required'})
//     }

//     const token = authorization.split(' ')[1]

//     try {
//         const {_id} = jwt.verify(token, process.env.SECRET)

//         req.user = await User.findOne({ _id }).select('_id')
//         next()

//     } catch (error) {
//         console.log(error)
//         res.status(401).json({error: 'Request not authorized'})
//     }
// }

// module.exports = requireAuth

const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import User model

// const requireAuth = async (req, res, next) => {
//     const { authorization } = req.headers;

//     if (!authorization) {
//         return res.status(401).json({ error: "Authorization token required" });
//     }

//     const token = authorization.split(" ")[1];

//     try {
//         const { _id } = jwt.verify(token, process.env.JWT_SECRET); // Decode token to get user ID
//         req.user = await User.findById(_id).select("_id"); // Attach user ID to request
//         next();
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ error: "Request is not authorized" });
//     }
// };

// requireAuth.js


const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        console.log("❌ No authorization header received");
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(" ")[1];
    console.log("✅ Received Token:", token);  // Log the token to see if it's coming through correctly

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET); // Decode token to get user ID
        console.log("✅ Token Decoded, User ID:", _id);  // Log the decoded ID to ensure it's correct

        req.user = await User.findById(_id).select("_id");

        if (!req.user) {
            console.log("❌ User not found in DB");
            return res.status(401).json({ error: "User not found" });
        }

        next();
    } catch (error) {
        console.log("❌ Token Verification Failed:", error.message);
        res.status(401).json({ error: "Request is not authorized" });
    }
};

module.exports = requireAuth;

