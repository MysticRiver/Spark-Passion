import User from '../models/User.js';
import * as cloudinary from 'cloudinary';
export const updateProfile = async (req, res) => {
    //image => cloudinary
    
    try {
        const {image, ...otherData} = req.body;
        const updatedData = otherData;

        if (image) {
            if(image.startsWith("data:image")){
                try {
const uploadResponse = await cloudinary.uploader.upload(image, )
updatedData.image = {
    url: uploadResponse.secure_url,
    public_id: uploadResponse.public_id,
};
                } catch (error) {
                    console.log("Error uploading image to cloudinary", uploadError);

                    return res.status(400).json({
                        success: false,
                        message: "Error uploading image to cloudinary",
                        error: uploadError.message,
                    });

                }
            }
        };

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {new: true});


res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
});






    } catch (error) {
        console.log("Error in updateProfile", error);
        res.status(500).json({
            success: false,
            message: "Error updating profile - Internal Server Error",
            error: error.message,
        });
   
    };
};