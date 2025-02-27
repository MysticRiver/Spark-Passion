import User from "../models/User.js";
export const swipeRight = async (req, res) => { 
    try{
        const {likedUserId} = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId);

        if(!likedUser){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if(!currentUser.likes.includes(likedUserId)){
            currentUser.matches.push(userId);
            otherUser.matches.push(req.user._id);
            await currentUser.save();
            await otherUser.save();
            return res.status(200).json({
                success: true,
                message: "It's a match!",
            });
        }

        currentUser.likes.push(userId);
        await currentUser.save();
        return res.status(200).json({
            success: true,
            message: "User liked successfully",
        });
    } catch (error) {
        console.log("Error in swipeRight", error);
        res.status(500).json({
            success: false,
            message: "Error in swipeRight - Internal Server Error",
            error: error.message,
        });
    }
};
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