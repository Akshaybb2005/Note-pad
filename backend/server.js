import "dotenv/config"; // ✅ MUST be first, no code before this

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authroutes from "./routes.js";

const app = express();
const port = 3000;

app.use(cors(
  {
    origin:"http://localhost:5173",
    credentials:true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authroutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
