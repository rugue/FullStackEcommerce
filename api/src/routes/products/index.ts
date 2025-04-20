import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { productsTable } from "../../db/productsSchema";

// const createProductSchema = z.object({
//   name: z.string().min(1),
//   description: z.string().min(1),
//   price: z.number().positive(),
//   imageUrl: z.string().url().optional(),
// });

const createProductSchema = createInsertSchema(productsTable);

// Products endpoints
const router = Router();

router.get("/", listProducts);

router.post("/", validateData(createProductSchema), createProduct);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
