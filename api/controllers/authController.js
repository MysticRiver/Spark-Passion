import User from "../models/userModel.js";

const signToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",});
    };
export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;

    try {
        if(!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (age < 18 ) {
            return res.status(400).json({ 
                success: false,
                message: "You must be 18 or older to sign up" });
        
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long" });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        });
    
        const token = signToken(newUser._id);
        res.cookie("jwt", token, {
            httpOnly: true, // prevents client JS from reading the cookie and XSS attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
            sameSite:"strict", //prevents CSRF attacks
            secure: process.env.NODE_ENV === "production" , // cookie will only be set in production
        }   );
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: newUser,
        });
    }
          catch (error) {
            console.error("Error in signup controller:", error.message);
            res.status(500).json({ message: error.message });
          }
        };
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ 
                success: false,
                message: "All fields are required"
             });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = signToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true, // prevents client JS from reading the cookie and XSS attacks
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
            sameSite:"strict", //prevents CSRF attacks
            secure: process.env.NODE_ENV === "production" , // cookie will only be set in production
        }   );
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: user,
        });
    } catch (error) {
        console.error("Error in login controller:", error.message);
        res.status(500).json({ message: error.message });
    }
};
export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};