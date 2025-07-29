import "dotenv/config";
import express from "express";
import databaseConnection from "./src/db/config.js";
import userRouter from "./src/routes/user.route.js"
import cors from "cors";
const app = express();
databaseConnection();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use("/users" , userRouter);

app.listen(PORT,()=> {
    console.log("Servidor en funcionamiento en el puerto",PORT);
});
