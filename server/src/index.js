require("dotenv").config();
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
