import express from "express";

// const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/products", (req, res) => {
  res.send("the list of product!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
