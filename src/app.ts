import express, { Application } from "express";
import { userRouter } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { petRouter } from "./modules/pet/pet.routes";
import router from "./routes";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("This is root route!!!");
});

export default app;
