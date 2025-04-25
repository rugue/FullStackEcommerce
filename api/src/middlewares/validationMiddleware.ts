import _ from "lodash";
import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Add more detailed logging
      console.log("Validating:", req.body);

      const validatedData = schema.parse(req.body);
      console.log("Validation passed:", validatedData);

      req.cleanBody = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.errors);
        const errorMessages = error.errors.map((issue: any) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        res.status(400).json({
          error: "Invalid data",
          details: errorMessages,
        });
        return;
      } else {
        console.error("Unknown validation error:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
    }
  };
}
