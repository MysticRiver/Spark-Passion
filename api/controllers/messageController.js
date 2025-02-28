import Message from "../models/Message.js";
export const sendMessage = async(req, res) => {
try{
    const {} = req.body;
    const newMessage = await Message.create ({
        sender: req.user.id,
        receiver: receiverId,
        content: req.body.content,
    })

res.status(200).json({
    success: true,
    message: newMessage,
});

} catch (error) {
    console.log("Error in sendMessage",error);
    res.status(500).json({
        success: false,
        message: "Internal server Error",
    });
}}
export const getConversation = async(req, res) => {
    const {UserId} = req.params;
    try{
        const conversation = await Message.find({
            $or: [
                { sender: req.user.id, receiver: UserId },
                { sender: UserId, receiver: req.user.id },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            conversation,
        });
    } catch (error) {
        console.log("Error in getConversation", error);
        res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
};