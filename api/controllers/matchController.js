import User from "../models/User.js";
export const swipeRight = async (req, res) => { };
export const swipeLeft = async (req, res) => { };


export const getMatches = async (req, res) => { 

try{
    const user = await User.findById(req.user._id).populate ("matches", "name image");

res.status(200).json({
    success: true,
    matches: user.matches,
});

} catch (error) {
    console.log("Error in getMatches",error);

    res.status(500).json({ 
        success: false,
        message: "Error getting matches - Internal Server Error",
        error: error.message });
}

};


export const getUserProfiles = async (req, res) => { };