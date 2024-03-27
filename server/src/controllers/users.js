// Importing user model
const User = require('../models/user');

// Importing bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Controller function for user registration
const registerUser = async (req, res) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            // If user already exists, return an error response
            return res.status(403).json({ msg: "User already exists." });
        } else {
            // Hash the password
            const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hashPassword;

            // Create a new user
            await User.create(req.body);
            res.status(200).json({ msg: "registered successfully!" });
        }
    } catch (err) {
        // Handle any errors
        console.error(err);
        res.status(400).json({ msg: "Registration failed" });
    }
};

// Controller function for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //to check email in database
        const userDetails = await User.findOne({ email: email })

        if (userDetails) {
            //if email exists it will check password. first of all we have to hash a password and compare it
            const matched = await bcrypt.compare(password, userDetails.password);

            if (matched) {
                res.status(200).json({ msg: 'logged in successfully' })
            } else {
                res.status(401).json({ msg: 'incorrect password' })
            }
        } else {
            res.status(401).json({ msg: 'no data found' })
        }

    } catch (err) {
        console.log(err)
        res.status(400).json({ msg: "Login failed" });
    }
}

//controllers for reset password
const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, confirmNewPassword } = req.body;

        // Check if newPassword and confirmPassword match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ msg: "Passwords do not match" });
        } else {
            // Find the user by email
            const userDetails = await User.findOne({ email: email });
            if (!userDetails) {
                return res.status(404).json({ msg: "User not found" });
            } else {
                // Hash the new password
                const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                // Update user's password
                userDetails.password = hashedPassword;
                await userDetails.save();

                // Send a success response
                res.status(200).json({ msg: "Password reset successfully" });
            }

        }

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Password reset failed" });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find()
        // Send a success response
        res.status(200).json({ allUsers, msg: "All users fetched successfully" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: "Failed to get users" });
    }
}

module.exports = { registerUser, loginUser, resetPassword, getAllUsers };
