import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const {id} = req.params;
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(id)));

    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(500).send(e);
  }
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
  try {
  } catch (e) {
    res.status(500).send(e);
  }
}
export function deleteProduct(req: Request, res: Response) {
  try {
  } catch (e) {
    res.status(500).send(e);
  }
}
