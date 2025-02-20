import User from "../models/userModel.js";
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
        
    }
          catch (error) {
            res.status(500).json({ message: error.message });
          }
        };
export const login = async (req, res) => {};
export const logout = async (req, res) => {};