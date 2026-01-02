import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import restaurantRoutes from "./routes/restaurants.js";
import foodRoutes from "./routes/foods.js";
import favoritesRoutes from "./routes/favorites.js";
import ratingsRoutes from "./routes/ratings.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use(express.static(path.join(__dirname, "..")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
