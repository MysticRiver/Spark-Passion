import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";

// Database
import connectDB from "./db/connect.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5176",
    credentials: true,
  }
));

app.use("api/auth", authRoutes);
app.use("api/users", userRoutes);
app.use("api/matches", matchesRoutes);
app.use("api/messages", messagesRoutes);



app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
  connectDB();
}
);