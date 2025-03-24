import express from "express";
import cors from "cors"
import {mainRouter} from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/v1", mainRouter);


app.post("/", async (req,res) => {

})


app.listen(8000, ()=>{
    console.log("backend is running on port 8000");
})


