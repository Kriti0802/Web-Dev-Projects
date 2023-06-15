import express from "express";
import { signup, welcome ,login, editPhoneNumber} from "../controllers/questionController.js";
import { authenticate } from "../middleware/jwt.js";
import { addTests, submitTest } from "../controllers/addtestController.js";
const router = express.Router();

router.get("/welcome",welcome);
router.post("/signup", signup);
router.post("/login", login);
router.put('/edit/phonenumber',authenticate,editPhoneNumber);

router.post("/tests/add",addTests);
router.post("/test/submit",submitTest);
export default router;
