import express from "express";
import {
    viewCart,
    addToCart,
    updateCartItem,
    removeCartItem
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", viewCart);
router.post("/", addToCart);
router.put("/", updateCartItem);
router.get("/:id", removeCartItem);

export default router;