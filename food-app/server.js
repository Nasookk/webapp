import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import restaurantRoutes from "./routes/restaurants.js";
import foodRoutes from "./routes/foods.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);

app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
);

app.listen(3000, "0.0.0.0", () =>
    console.log("Server running on port 3000")
);
