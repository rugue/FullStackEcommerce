import { Router } from "express";

// Products endpoints
const router = Router();
router.get("/", (req, res) => {
  res.send("the list of product!");
});

router.post("/", (req, res) => {
  res.send("the product has been created!");
});

router.get("/:id", (req, res) => {
  console.log(req.params);
  res.send("one product!");
});

export default router;