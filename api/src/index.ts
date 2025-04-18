import express from "express";

// const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Products endpoints
app.get("/products", (req, res) => {
  res.send("the list of product!");
});

app.post("/products", (req, res) => {
  res.send("the product has been created!");
});

app.get("/products/:id", (req, res) => {
  console.log(req.params);
  res.send("one product!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
