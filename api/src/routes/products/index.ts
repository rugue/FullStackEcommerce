import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema";
// import { verifySeller, verifyToken } from "../../middlewares/authMiddleware.js";

// Products endpoints
const router = Router();

router.get("/", listProducts);

router.post("/", validateData(createProductSchema), createProduct);

router.get("/:id", getProductById);

router.put("/:id", validateData(updateProductSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;
