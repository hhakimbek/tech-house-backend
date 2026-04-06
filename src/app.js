import express from "express";
import cors from "cors";
import auth_routes from "./routes/auth_routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"API is running!"})
})
app.use("/api/auth",auth_routes);
export default app;
