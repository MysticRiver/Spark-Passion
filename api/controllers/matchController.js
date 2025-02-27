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
            currentUser.matches.push(likedUserId);
            await currentUser.save();
            
//Check if the liked user has liked the current user
        if (likedUser.likes.includes(currentUser.id)){
            currentUser.matches.push(likedUserId);
            likedUser.matches.push(currentUser.id);
            await Promise.All([
            await currentUser.save(),
            await likedUser.save()
        ]);}
        }
        //TO Do Send notification if it is a match using Socket.io
        currentUser.likes.push(userId);
        await currentUser.save();
        return res.status(200).json({
            success: true,
            user: currentUser,
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
export const swipeLeft = async (req, res) => { 

    try {
        const {dislikedUserId} = req.params;
        const currentUser = await User.findById(req.user.id);
        const dislikedUser = await User.findById(dislikedUserId);

        if (!currentUser.dislikes.includes(dislikedUserId)){
            currentUser.dislikes.push(dislikedUserId);
            await currentUser.save();
            return res.status(200).json({
                success: true,
                message: "User disliked successfully",
            });
        }

        if(!dislikedUser){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        currentUser.dislikes.push(dislikedUserId);
        await currentUser.save();
        return res.status(200).json({
            success: true,
            user: currentUser,
            message: "User disliked successfully",
        });
    } catch (error) {
        console.log("Error in swipeLeft", error);
        res.status(500).json({
            success: false,
            message: "Error in swipeLeft - Internal Server Error",
            error: error.message,
        });
    }
};


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