import { Router } from "express";
import { listProducts } from "./productsController";

// Products endpoints
const router = Router();
router.get("/", listProducts);

router.post("/", (req, res) => {
  res.send("the product has been created!");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("one product!");
});

export default router;