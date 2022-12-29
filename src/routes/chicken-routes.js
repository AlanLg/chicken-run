import {
    createChicken,
    deleteChicken,
    getAllChickens,
    getOneChicken, incrementChickenSteps,
    updateChicken
} from "../controllers/chicken-controller.js";
import express from "express";

const router = express.Router();

router.get('/:chickenId', getOneChicken);

router.get("/", getAllChickens);

router.post("/", createChicken);

router.put("/:chickenId", updateChicken);

router.delete("/:chickenId", deleteChicken);

router.patch("/run/:chickenId", incrementChickenSteps);

export default router;