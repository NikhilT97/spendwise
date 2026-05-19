const express = require("express");
const connectDB = require("./config/config");
const expenseRouter = require("./routes/expense.routes");
const app = express();
const authRouter = require("./routes/auth.routes");
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/auth", authRouter);
app.use("/", expenseRouter);

connectDB();
app.listen(PORT, () => {
  try {
    console.log(`server started ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
