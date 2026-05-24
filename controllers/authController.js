const User =
require('../models/User');

/* Register */

const register =
async (req, res) => {

    try {

        const { username, password }
        = req.body;

        const existingUser =
        await User.findOne({ username });

        if(existingUser){

            return res.json({

                success:false,

                message:"User already exists"
            });
        }

        const newUser =
        new User({

            username,
            password
        });

        await newUser.save();

        res.json({

            success:true,

            message:"Registration Successful"
        });

    } catch(err){

        console.log(err);

        res.json({

            success:false,

            message:"Server Error"
        });
    }
};

/* Login */

const login =
async (req, res) => {

    try {

        const { username, password }
        = req.body;

        const user =
        await User.findOne({

            username,
            password
        });

        if(user){

            res.json({

                success:true,

                user
            });

        } else {

            res.json({

                success:false,

                message:"Invalid Credentials"
            });
        }

    } catch(err){

        console.log(err);

        res.json({

            success:false,

            message:"Server Error"
        });
    }
};

module.exports = {

    register,
    login
};