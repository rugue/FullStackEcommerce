import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";

export function listProducts(req: Request, res: Response) {
  res.send("listProducts");
}

export function getProductById(req: Request, res: Response) {
  console.log(req.params);
  res.send("getProductById");
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();
    res.status(201).json(product);
    
  } catch (e) {
    res.status(500).send(e);
  }
  
}

export function updateProduct(req: Request, res: Response) {
  res.send("updateProduct");
}
export function deleteProduct(req: Request, res: Response) {
  res.send("deleteProduct");
}
