// import { Router } from "express";
// import { userRouter } from "../modules/user/user.routes";
// import { authRouter } from "../modules/auth/auth.routes";
// import { petRouter } from "../modules/pet/pet.routes";

// const router = Router()

// router.use("/user", userRouter);
// router.use("/auth", authRouter);
// router.use("/pet", petRouter);
// export default router

import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auth/auth.routes";
import { petRouter } from "../modules/pet/pet.routes";
import { sitterRouter } from "../modules/sitter/sitter.routes";
import { serviceRouter } from "../modules/service/service.routes";
import { bookingRouter } from "../modules/booking/booking.routes";

const router = Router();

const routerManager = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/pet",
    route: petRouter,
  },
  {
    path: "/sitter",
    route: sitterRouter,
  },
  {
    path: "/service",
    route: serviceRouter,
  },
  {
    path: "/booking",
    route: bookingRouter,
  },
];

routerManager.forEach((route) => router.use(route.path, route.route));

export default router;
