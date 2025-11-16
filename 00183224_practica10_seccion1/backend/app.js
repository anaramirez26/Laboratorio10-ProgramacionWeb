// app.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoute from "./routes/authroute.js";
import userRoute from "./routes/usersroute.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/api", userRoute);


app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);

