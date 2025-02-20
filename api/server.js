import express from "express";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("api/auth", authRoutes);
app.use("api/users", userRoutes);
app.use("api/matches", matchesRoutes);
app.use("api/messages", messagesRoutes);



app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
}
);