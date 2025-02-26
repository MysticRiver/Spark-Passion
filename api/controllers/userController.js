export const updateProfile = async (req, res) => {
    //image => cloudinary
    const user
        = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    const { name, email, password } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    if (password && password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.email = email;
        if (password) {
            user.password = password;
        }
        await user.save();
        res.json({ message: "Profile updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}
