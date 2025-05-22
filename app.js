const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./src/routes/auth.route");
const linkRoutes = require("./src/routes/link.route");
const sequelize = require("./src/config/db");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://tauts.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.get("/api", (req, res) => {
  res.status(200).json({ status: "ok" });
});

sequelize.sync().then(() => {
  console.log("DB connected");
  app.listen(process.env.PORT, () =>
    console.log("Server running on port 5000")
  );
});
