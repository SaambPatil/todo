import express from "express";
import {
  getTodo,
  addTodo,
  deleteTodo,
} from "../controllers/todoControllers.mjs";
import { authenticateUser } from "../middlewares/auth.mjs";

const router = express.Router();

router.get("/", authenticateUser, getTodo);
router.post("/", authenticateUser, addTodo);
router.delete("/:id", authenticateUser, deleteTodo);

export default router;
