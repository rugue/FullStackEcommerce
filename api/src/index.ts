import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";
// import stripeRoutes from "./routes/stripe/index.js";

// const express = require("express");
const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/orders", ordersRoutes);
// app.use("/stripe", stripeRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 