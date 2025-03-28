import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/database.js";
import menuItemRoutes from "./routes/menuItemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import security from "./config/security.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
connectCloudinary();

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

app.use(cors());

app.use(security);

app.get("/", (req, res) => {
  res.json({
    name: "Restaurant POS",
    status: "ok",
    version: "1.0.0",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/menu-items", upload.array("images", 5), menuItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", upload.single("image"), userRoutes);

export default app;
