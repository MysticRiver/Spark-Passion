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


export const getUserProfiles = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user.id);

		const users = await User.find({
			$and: [
				{ _id: { $ne: currentUser.id } },
				{ _id: { $nin: currentUser.likes } },
				{ _id: { $nin: currentUser.dislikes } },
				{ _id: { $nin: currentUser.matches } },
				{
					gender:
						currentUser.genderPreference === "both"
							? { $in: ["male", "female"] }
							: currentUser.genderPreference,
				},
				{ genderPreference: { $in: [currentUser.gender, "both"] } },
			],
		});

		res.status(200).json({
			success: true,
			users,
		});
	} catch (error) {
		console.log("Error in getUserProfiles: ", error);

		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};