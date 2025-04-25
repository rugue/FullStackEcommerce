# Full Stack E-Commerce API Tutorial

## Step 1: Prerequisites for the Project

Hello everyone! In this comprehensive tutorial, we'll build a complete e-commerce API using modern tools and technologies. Let's go through what you'll need to follow along.

### Required Prerequisites

1. **Node.js and npm** - Make sure you have Node.js version 18 or higher installed. You can check your version with:

   ```bash
   node -v
   npm -v
   ```

2. **TypeScript Knowledge** - Basic understanding of TypeScript will be helpful, but I'll explain key concepts as we go.

3. **PostgreSQL Database** - We'll be using a PostgreSQL database. You can:

   - Use a local installation
   - Use Docker (I'll show this option)
   - Use a cloud provider like Neon.tech (recommended for this tutorial)

4. **Code Editor** - I'll be using VS Code, but you can use any editor you prefer.

5. **Git** - Basic understanding of Git for version control.

### What We'll Build

In this tutorial, we're building a RESTful API for an e-commerce platform with the following features:

- Products management (CRUD operations)
- User authentication (register/login)
- Order processing
- Role-based access control (admin, seller, regular user)

### Technologies We'll Use

- **Express.js** - Web framework for Node.js
- **TypeScript** - For type safety and better developer experience
- **Drizzle ORM** - Modern, lightweight SQL ORM
- **PostgreSQL** - Our database of choice
- **Zod** - For request validation
- **JWT** - For authentication
- **bcrypt.js** - For password hashing
- **Genezio** - For deploying our API (optional)

### Project Structure Overview

Our final project structure will look something like this:

```
api/
├── src/
│   ├── db/
│   │   ├── productsSchema.ts
│   │   ├── usersSchema.ts
│   │   ├── ordersSchema.ts
│   │   └── index.ts
│   ├── middlewares/
│   │   ├── authMiddleware.ts
│   │   └── validationMiddleware.ts
│   ├── routes/
│   │   ├── products/
│   │   ├── auth/
│   │   └── orders/
│   ├── types/
│   │   └── express/
│   └── index.ts
├── drizzle.config.ts
├── package.json
└── tsconfig.json
```

In the next section, we'll set up our project and install the necessary dependencies. See you there!

## Step 2: Setting up the Project

Welcome back! In this section, we'll set up our project structure and initialize it with the necessary configuration files.

### Creating the Project Directory

First, let's create a directory for our project:

```bash
mkdir Emart
cd Emart
```

### Setting up the API Directory

We'll organize our code in an 'api' directory:

```bash
mkdir api
cd api
```

### Initializing the Node.js Project

Let's initialize a new Node.js project:

```bash
npm init -y
```

This creates a default `package.json` file. Let's modify it to suit our needs:

```json
{
  "name": "ecommerce-api",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "Your Name",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "NODE_ENV=dev node --import=tsx --env-file=.env --watch src/index.ts",
    "build": "tsc"
  }
}
```

Note that we've added:

- `"type": "module"` to use ES Modules
- A `dev` script that will use Node.js's built-in watch mode with TypeScript support
- A `build` script that will compile our TypeScript code

### Setting up TypeScript

Let's install TypeScript as a dev dependency:

```bash
npm install -D typescript
```

Now, let's create a TypeScript configuration file:

```bash
npx tsc --init
```

This creates a default `tsconfig.json` file. Let's modify it to suit our project:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

Key settings:

- `"target": "ES2022"` - We're targeting modern Node.js
- `"module": "NodeNext"` - We'll use ES modules
- `"moduleResolution": "NodeNext"` - For proper resolution of ES module imports
- `"outDir": "dist"` - Our compiled JavaScript will go here

### Creating our Basic Directory Structure

Now, let's create our basic directory structure:

```bash
mkdir -p src/routes src/middlewares src/db src/types/express
```

### Setting up the .env File

We'll need to store some environment variables. Let's create a `.env` file:

```bash
touch .env
```

For now, just leave it empty. We'll add our database connection string later.

### Creating a Basic Entry Point

Let's create a basic entry point for our application:

```bash
touch src/index.ts
```

Add this basic content to get started:

```typescript
console.log("E-commerce API starting...");
```

Now our project structure is set up and ready for the next steps! In the next section, we'll install Express.js and set up our basic server. See you there!

## Step 3: Installing Express

Welcome back! In this section, we'll install Express.js and set up a basic server for our e-commerce API.

### Installing Express and Type Definitions

Let's install Express and its TypeScript type definitions:

```bash
npm install express@5.1.0
npm install -D @types/express@5.0.1
```

Note: We're using Express 5, which offers improved middleware and error handling.

### Installing Additional Dependencies

We'll also need TypeScript support for running our server during development:

```bash
npm install -D tsx
```

### Setting up Our Express Server

Now let's update our `src/index.ts` file to create a basic Express server:

```typescript
import express, { json, urlencoded } from "express";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`E-commerce API listening on port ${port}`);
});
```

This sets up a basic Express server that:

- Parses JSON request bodies
- Parses URL-encoded form data
- Listens on port 3000
- Responds with "Hello World!" to requests to the root path

### Running Our Server

Now let's update our `package.json` to make sure our development script works:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "NODE_ENV=dev node --import=tsx --env-file=.env --watch src/index.ts",
  "build": "tsc"
}
```

Now we can start our server in development mode:

```bash
npm run dev
```

You should see output indicating that the server is running on port 3000.

### Testing Our API

Let's test our API with curl to make sure it's working:

```bash
curl http://localhost:3000
```

You should see `Hello World!` in the response.

In the next section, we'll set up Git for version control. See you there!

## Step 4: Setting up Git

Version control is essential for any development project. In this section, we'll set up Git to track our changes.

### Initializing a Git Repository

First, let's initialize a new Git repository in the root directory:

```bash
# Navigate back to the project root if you're in the api directory
cd ..
git init
```

### Creating a .gitignore File

Let's create a `.gitignore` file to exclude certain files and directories from version control:

```bash
touch .gitignore
```

Add the following content to the `.gitignore` file:

```
# Node.js
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# TypeScript
*.tsbuildinfo
dist/

# Environment variables
.env
.env.local
.env.development
.env.test
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db
```

### Making the Initial Commit

Now let's stage and commit our initial project structure:

```bash
git add .
git commit -m "Initial project setup with Express and TypeScript"
```

### Setting up a Remote Repository (Optional)

If you want to push your code to a remote repository like GitHub:

1. Create a new repository on GitHub
2. Follow the instructions to add a remote and push your code:

```bash
git remote add origin https://github.com/yourusername/emart-api.git
git branch -M main
git push -u origin main
```

Now our project is under version control, which will help us track changes and collaborate with others. In the next section, we'll create our product routes and controllers. See you there!

## Step 5: Creating Product Routes and Controllers

In this section, we'll implement our first API feature: product management. We'll create routes and controllers for handling products in our e-commerce API.

### Creating the Product Routes File Structure

First, let's create the necessary files for our product routes:

```bash
mkdir -p src/routes/products
touch src/routes/products/index.ts
touch src/routes/products/productsController.ts
```

### Implementing the Product Controller

Let's start by implementing our product controller with basic functions. In `src/routes/products/productsController.ts`, add:

```typescript
import { Request, Response } from "express";

// For now, we'll use an in-memory array for storage
// Later we'll replace this with a database
const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "Apple's latest flagship phone",
    image: "https://example.com/iphone.jpg",
    price: 999,
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Samsung's flagship Android phone",
    image: "https://example.com/galaxy.jpg",
    price: 899,
  },
];

export async function listProducts(req: Request, res: Response) {
  try {
    res.json(products);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === Number(id));

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
    const newProduct = {
      id: products.length + 1,
      ...req.body,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).send({ message: "Product not found" });
    } else {
      products[index] = { ...products[index], ...req.body };
      res.json(products[index]);
    }
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).send({ message: "Product not found" });
    } else {
      const deletedProduct = products.splice(index, 1);
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send(e);
  }
}
```

### Creating the Product Routes

Now, let's implement our product routes in `src/routes/products/index.ts`:

```typescript
import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController.js";

// Products endpoints
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
```

### Connecting the Routes to Our Express App

Now let's update our main `src/index.ts` file to use these routes:

```typescript
import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`E-commerce API listening on port ${port}`);
});
```

### Running Our Server

Now let's start our server:

```bash
npm run dev
```

### Testing Our Product Routes

Now we can test our product routes:

1. Start the server:

```bash
npm run dev
```

2. Test the GET products endpoint:

```bash
curl http://localhost:3000/products
```

You should see a JSON response with our sample products.

3. Test the GET single product endpoint:

```bash
curl http://localhost:3000/products/1
```

4. Test the POST endpoint to create a product:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"AirPods Pro", "description":"Apple Wireless Earbuds", "image":"https://example.com/airpods.jpg", "price":249}' http://localhost:3000/products
```

5. Test the PUT endpoint to update a product:

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"price":229}' http://localhost:3000/products/3
```

6. Test the DELETE endpoint:

```bash
curl -X DELETE http://localhost:3000/products/3
```

Our basic product routes are now working! However, we're using an in-memory array which will not persist data between server restarts. In the next section, we'll set up a PostgreSQL database for persistent storage. See you there!

## Step 6: Setting up the PostgreSQL Database

In this section, we'll set up a PostgreSQL database to store our application data persistently. We'll use Neon Tech, which offers a free PostgreSQL database in the cloud, but you could also use a local PostgreSQL installation or Docker.

### Creating a PostgreSQL Database on Neon Tech

1. Go to [https://neon.tech](https://neon.tech) and create an account if you don't have one.
2. Create a new project (e.g., "ecommerce").
3. Once your project is created, you'll see a connection string. Copy it—we'll need it for our application.

### Setting up Environment Variables

Now let's add the database connection string to our `.env` file:

```bash
# Open the .env file
nano .env
```

Add the following line (replace the connection string with your own):

```
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require
```

For example:

```
DATABASE_URL=postgresql://admin:abc123@ep-example-12345.us-east-1.aws.neon.tech/ecommerce?sslmode=require
```

### Installing PostgreSQL Client

Let's install the PostgreSQL client for Node.js and its type definitions:

```bash
npm install pg
npm install -D @types/pg
```

### Creating the Database Connection Module

Now let's create a file to manage our database connection. Create `src/db/index.ts`:

```bash
touch src/db/index.ts
```

Add the following content:

```typescript
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
```

This module creates a connection pool to PostgreSQL using the connection string from our environment variables.

### Testing the Database Connection

Let's modify our `src/index.ts` file to test the database connection:

```typescript
import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import { db } from "./db/index.js";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
const port = 3000;

// Test database connection
db.query("SELECT NOW()")
  .then((result) => {
    console.log("Database connected:", result.rows[0].now);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`E-commerce API listening on port ${port}`);
});
```

### Running Our Server with Database Connection

Now let's start our server:

```bash
npm run dev
```

You should see a message indicating that the database is connected, along with the current timestamp.

In the next section, we'll install and set up Drizzle ORM to interact with our database more efficiently. See you there!

## Step 7: Installing and Setting up Drizzle ORM

In this section, we'll integrate Drizzle ORM, a lightweight TypeScript ORM for SQL databases. Drizzle gives us type safety and a simple, intuitive API for working with our PostgreSQL database.

### Installing Drizzle ORM

Let's install Drizzle ORM and its tools:

```bash
npm install drizzle-orm
npm install -D drizzle-kit
```

We'll also install Zod for schema validation and drizzle-zod for integration between Drizzle and Zod:

```bash
npm install zod drizzle-zod
```

### Creating the Product Schema

First, let's create a

```bash
touch src/db/productsSchema.ts
```

Add the following content:

```typescript
import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

// Schema for creating a product - omitting the ID as it's auto-generated
export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  price: z.number(),
});

// Schema for updating a product - all fields are optional
export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  price: z.number().optional(),
});
```

### Updating the Database Connection

Let's update our `src/db/index.ts` file to use Drizzle ORM:

```typescript
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
```

### Creating a Drizzle Config File

Now let's create a Drizzle configuration file at the root of our API directory:

```bash
cd ..  # Make sure you're in the api directory
touch drizzle.config.ts
```

Add the following content:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: ["./src/db/productsSchema.ts"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
```

This configuration tells Drizzle where to find our schema files and where to output generated SQL migrations.

### Setting up Scripts for Drizzle

Let's add some scripts to our `package.json` file for working with Drizzle:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "NODE_ENV=dev node --import=tsx --env-file=.env --watch src/index.ts",
  "build": "tsc",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio"
}
```

These scripts will help us:

- Generate SQL migrations from our schema definitions
- Apply migrations to our database
- Browse our database using Drizzle Studio

### Generating and Applying Database Migrations

Now that we've added the user schema, let's generate and apply migrations:

```bash
npm run db:generate
npm run db:migrate
```

### Creating an Auth Middleware

Let's create a middleware to protect our routes with authentication. Create a file at `src/middlewares/authMiddleware.ts`:

```bash
touch src/middlewares/authMiddleware.ts
```

Add the following content:

```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    // decode jwt token data
    const decoded = jwt.verify(token, "your-secret");
    if (typeof decoded !== "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    res.status(401).json({ error: "Access denied" });
  }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== "seller") {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  next();
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== "admin") {
    res
      .status(401)
      .json({ error: "Access denied. Admin privileges required." });
    return;
  }
  next();
}
```

### Creating Authentication Routes

Now let's create our authentication routes. Create a directory and file for auth routes:

```bash
mkdir -p src/routes/auth
touch src/routes/auth/index.ts
```

Add the following content to `src/routes/auth/index.ts`:

```typescript
import { Router } from "express";
import {
  createUserSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

const generateUserToken = (user: any) => {
  return jwt.sign({ userId: user.id, role: user.role }, "your-secret", {
    expiresIn: "30d",
  });
};

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    // @ts-ignore
    delete user.password;
    const token = generateUserToken(user);

    res.status(201).json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }
    console.log("User from DB:", user);

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // create a jwt token
    const token = generateUserToken(user);
    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
```

### Updating the Schema Exports

Let's update our `src/db/schema.ts` file to include the user schema:

```typescript
import * as productSchema from "./productsSchema.js";
import * as userSchema from "./usersSchema.js";

export default {
  ...productSchema,
  ...userSchema,
};
```

### Connecting the Auth Routes to Our Express App

Now let's update our `src/index.ts` file to include the auth routes:

```typescript
import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`E-commerce API listening on port ${port}`);
});
```

### Protecting Product Routes

Now let's update our product routes to require authentication for certain operations. Modify `src/routes/products/index.ts`:

```typescript
import { Router } from "express";
import {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware.js";

// Products endpoints
const router = Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
```

### Running Our Server

Now let's start our server:

```bash
npm run dev
```

### Testing Our Authentication

Now let's test our authentication:

1. Register a user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123","name":"Test User"}' http://localhost:3000/auth/register
```

You should get a response with the user data and a token.

2. Login with the user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123"}' http://localhost:3000/auth/login
```

You should get a response with a token.

3. Try to create a product without authentication:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"Test Product","price":100}' http://localhost:3000/products
```

You should get an "Access denied" response.

4. Create a seller user:

```bash
# First register a new user
curl -X POST -H "Content-Type: application/json" -d '{"email":"seller@example.com","password":"password123","name":"Seller User"}' http://localhost:3000/auth/register

# Then update the user's role in the database directly
# You'll need to use a tool like psql or a database client to do this
# The SQL would be something like:
# UPDATE users SET role = 'seller' WHERE email = 'seller@example.com';
```

5. Login with the seller user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"seller@example.com","password":"password123"}' http://localhost:3000/auth/login
```

6. Create a product with authentication:

```bash
curl -X POST -H "Content-Type: application/json" -H "Authorization: YOUR_TOKEN" -d '{"name":"Authenticated Product","description":"Created by an authorized seller","image":"https://example.com/product.jpg","price":199}' http://localhost:3000/products
```

Replace `YOUR_TOKEN` with the token you got from the login response.

Now we have authentication and authorization in place for our API! In the next section, we'll build the project and fix any TypeScript build issues. See you there!

## Step 11: Building the Project and Fixing "ts build"

In this section, we'll build our TypeScript project for production deployment and fix any TypeScript build errors that might arise.

### Running the TypeScript Compiler

Let's run the TypeScript compiler to see if there are any issues:

```bash
npm run build
```

You might encounter some errors related to TypeScript configurations or type definitions. Let's address the most common issues:

### Fixing Type Errors

1. Make sure all our custom Express request properties are properly typed. We may need to update our `src/types/express/index.d.ts` file:

```typescript
// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: number; // Changed from Number to number
      cleanBody?: any;
      role?: string;
      rawBody?: Buffer;
    }
  }
}
```

2. Fix any issues with missing or invalid imports. Make sure all import paths end with `.js` when importing our own files, even though they're TypeScript files. This is necessary because we're using ES modules.

### Updating tsconfig.json for Production

Let's make sure our `tsconfig.json` is optimized for production:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "declaration": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

These additional settings will:

- Generate declaration files (`.d.ts`)
- Create source maps for easier debugging
- Remove comments from the output
- Enforce stricter type checking with `noImplicitAny`

### Adding a Production Start Script

Let's add a start script to our `package.json` for running the compiled code:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "NODE_ENV=dev node --import=tsx --env-file=.env --watch src/index.ts",
  "build": "tsc",
  "start": "NODE_ENV=production node --env-file=.env dist/src/index.js",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio"
}
```

### Building and Testing

Now let's run the build again and test our compiled code:

```bash
npm run build
npm run start
```

If everything is set up correctly, your API should be running in production mode using the compiled JavaScript code.

In the next section, we'll deploy our API using Genezio, a platform that makes it easy to deploy serverless applications. See you there!

## Step 12: Deploying the API to Genezio

In this section, we'll deploy our e-commerce API using Genezio, a platform that makes it easy to deploy serverless applications.

### What is Genezio?

Genezio is a platform that allows you to deploy backend services easily, with features like:

- Serverless deployment
- Automatic scaling
- Built-in CI/CD
- Database integrations
- Global edge deployments

### Installing the Genezio CLI

First, let's install the Genezio CLI:

```bash
npm install -g genezio
```

### Creating a Genezio Configuration File

Let's create a `genezio.yaml` file in the project root directory (not in the `api` folder):

```bash
# Navigate to the project root if needed
cd ..
touch genezio.yaml
```

Add the following content to the file:

```yaml
name: Emart
region: us-east-1
yamlVersion: 2
services:
  databases:
    - name: my-postgres-db
      type: postgres-neon
backend:
  path: api
  language:
    name: js
    runtime: nodejs20.x
  functions:
    - name: express
      path: .
      entry: dist/src/index.js
      type: httpServer
  scripts:
    deploy:
      - npm install
      - npm run build
    local:
      - npm install
      - npm run build
```

This configuration tells Genezio:

- Our project is called "Emart"
- We're using AWS's us-east-1 region
- Our backend is in the "api" directory
- We're using Node.js 20.x
- Our entry point is the compiled "dist/src/index.js" file
- We're deploying an HTTP server

### Initializing Genezio

If you haven't used Genezio before, you'll need to create an account:

```bash
genezio login
```

Follow the instructions to authenticate.

### Deploying to Genezio

Now we can deploy our API:

```bash
genezio deploy
```

This will:

1. Install our dependencies
2. Build our TypeScript code
3. Package our application
4. Deploy it to Genezio's infrastructure

After deployment, you'll receive a URL where your API is accessible.

### Testing the Deployed API

Let's test our deployed API:

```bash
# Get all products
curl https://your-deployment-url.genez.io/products

# Register a user
curl -X POST -H "Content-Type: application/json" -d '{"email":"testuser@example.com","password":"password123","name":"Test User"}' https://your-deployment-url.genez.io/auth/register
```

Replace `your-deployment-url.genez.io` with the URL you received after deployment.

### Updating Our API

If you make changes to your API, you can redeploy:

```bash
genezio deploy
```

Genezio will automatically update your deployed service.

Now our API is deployed and accessible from anywhere! In the next section, we'll implement the order functionality for our e-commerce API. See you there!

## Step 13: Implementing the Orders and Order Items CRUD

In this section, we'll implement functionality for orders in our e-commerce API. This will allow users to place orders for products.

### Creating the Order Schema

First, let's create a schema for our orders and order items. Create a file at `src/db/ordersSchema.ts`:

```bash
touch src/db/ordersSchema.ts
```

Add the following content:

```typescript
import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = z.object({
  stripePaymentIntentId: z.string().optional(),
});

export const insertOrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const insertOrderWithItemsSchema = z.object({
  order: z.object({}).optional(), // For future fields
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
```

### Updating the Drizzle Config

Let's update our `drizzle.config.ts` file to include the orders schema:

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/productsSchema.ts",
    "./src/db/usersSchema.ts",
    "./src/db/ordersSchema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
```

### Updating the Schema Exports

Let's update our `src/db/schema.ts` file to include the orders schema:

```typescript
import * as productSchema from "./productsSchema.js";
import * as userSchema from "./usersSchema.js";
import * as orderSchema from "./ordersSchema.js";

export default {
  ...productSchema,
  ...userSchema,
  ...orderSchema,
};
```

### Generating and Running Migrations

Now let's generate and apply migrations for our orders tables:

```bash
npm run db:generate
npm run db:migrate
```

### Creating Order Routes and Controller

Now let's create our order routes and controller. First, create the necessary files:

```bash
mkdir -p src/routes/orders
touch src/routes/orders/index.ts
touch src/routes/orders/ordersController.ts
```

Let's implement the order controller in `src/routes/orders/ordersController.ts`:

```typescript
import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { eq, inArray } from "drizzle-orm";
import { productsTable } from "../../db/productsSchema.js";

export async function createOrder(req: Request, res: Response) {
  try {
    const { order, items } = req.cleanBody;

    const userId = req.userId;
    console.log(userId);
    if (!userId) {
      res.status(400).json({ message: "Invalid order data" });
      return;
    }

    // Validate all product IDs exist
    const productIds = items.map((item: any) => item.productId);
    const products = await db
      .select({ id: productsTable.id })
      .from(productsTable)
      .where(inArray(productsTable.id, productIds));

    if (products.length !== productIds.length) {
      res.status(400).json({ message: "One or more products not found" });
      return;
    }

    // Create the order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId: Number(userId) })
      .returning();

    // Create the order items
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Invalid order data" });
  }
}

export async function getOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orderWithItems.length === 0) {
      res.status(404).send("Order not found");
      return;
    }

    // Format the response to combine order with its items
    const mergedOrder = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((oi) => oi.order_items),
    };

    res.status(200).json(mergedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.cleanBody)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updatedOrder) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function listOrders(req: Request, res: Response) {
  try {
    // Get the user ID and role from the request
    const userId = req.userId;
    const role = req.role;

    // Basic query to get all orders for the current user
    let query = db
      .select({
        id: ordersTable.id,
        createdAt: ordersTable.createdAt,
        status: ordersTable.status,
        userId: ordersTable.userId,
        stripePaymentIntentId: ordersTable.stripePaymentIntentId,
      })
      .from(ordersTable);

    // If the user is not an admin or seller, only show their own orders
    if (role !== "admin" && role !== "seller") {
      query = query.where(eq(ordersTable.userId, Number(userId)));
    }

    // Execute the query
    const orders = await query;

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
```

Now let's implement the order routes in `src/routes/orders/index.ts`:

```typescript
import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, listOrders);
router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
```

### Connecting the Order Routes to Our Express App

Now let's update our `src/index.ts` file to include the order routes:

```typescript
import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products/index.js";
import authRoutes from "./routes/auth/index.js";
import ordersRoutes from "./routes/orders/index.js";

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

app.listen(port, () => {
  console.log(`E-commerce API listening on port ${port}`);
});
```

### Testing Our Order Endpoints

Now let's test our order endpoints:

1. First, register or login to get a token:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123","name":"Test User"}' http://localhost:3000/auth/register
```

You should get a response with the user data and a token.

2. Create an order with the token:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN" \
  -d '{"order":{},"items":[{"productId":1,"quantity":2,"price":999}]}' \
  http://localhost:3000/orders
```

Replace `YOUR_TOKEN` with the token you received from login and make sure the product ID exists in your database.

3. Get an order:

```bash
curl -H "Authorization: YOUR_TOKEN" http://localhost:3000/orders/1
```

4. Update an order's status:

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_TOKEN" \
  -d '{"status":"Shipped"}' \
  http://localhost:3000/orders/1
```

5. List all orders (admin only):

```bash
curl -H "Authorization: ADMIN_TOKEN" http://localhost:3000/orders
```

6. Get the order count:

```bash
curl -H "Authorization: ADMIN_TOKEN" http://localhost:3000/orders/count
```

Now we have implemented the ability to create, view, and update orders! In the next section, we'll implement listing orders with role-based access control. See you there!

## Step 14: Listing the Orders

In this section, we'll implement functionality to list orders with role-based access. Regular users will only see their own orders, while administrators will see all orders.

### Adding the List Orders Function to the Controller

First, let's add the `listOrders` function to our orders controller. Update `src/routes/orders/ordersController.ts`:

```typescript
// ...existing code...

export async function listOrders(req: Request, res: Response) {
  try {
    // Get the user ID and role from the request
    const userId = req.userId;
    const role = req.role;

    // Basic query to get all orders for the current user
    let query = db
      .select({
        id: ordersTable.id,
        createdAt: ordersTable.createdAt,
        status: ordersTable.status,
        userId: ordersTable.userId,
        stripePaymentIntentId: ordersTable.stripePaymentIntentId,
      })
      .from(ordersTable);

    // If the user is not an admin or seller, only show their own orders
    if (role !== "admin" && role !== "seller") {
      query = query.where(eq(ordersTable.userId, Number(userId)));
    }

    // Execute the query
    const orders = await query;

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
```

### Updating the Order Routes

Now, let's update our order routes to include the list endpoint. Modify `src/routes/orders/index.ts`:

```typescript
import { Router } from "express";
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, listOrders);
router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);
router.get("/:id", verifyToken, getOrder);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router;
```

### Adding Admin Authentication Middleware

Let's add a middleware function to verify if a user is an admin. Update `src/middlewares/authMiddleware.ts`:

```typescript
// ...existing code...

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.role;
  if (role !== "admin") {
    res
      .status(401)
      .json({ error: "Access denied. Admin privileges required." });
    return;
  }
  next();
}
```

### Adding an Order Count Endpoint

Let's add an endpoint to get the count of orders, which might be useful for admin dashboards. Update `src/routes/orders/ordersController.ts`:

```typescript
// ...existing code...
import { sql } from "drizzle-orm";

export async function getOrdersCount(req: Request, res: Response) {
  try {
    const role = req.role;
    const userId = req.userId;

    let query = db.select({ count: sql`count(*)` }).from(ordersTable);

    // If not admin, only count user's orders
    if (role !== "admin" && role !== "seller") {
      query = query.where(eq(ordersTable.userId, Number(userId)));
    }

    const [result] = await query;
    res.json({ count: Number(result.count) });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}
```

Don't forget to import the `sql` function from drizzle-orm at the top of the file:

```typescript
import { eq, inArray, sql } from "drizzle-orm";
```

And add the new endpoint to your routes in `src/routes/orders/index.ts`:

```typescript
router.get("/count", verifyToken, getOrdersCount);
```

### Testing the List Orders Functionality

Now let's test our new list orders functionality:

1. Login as a regular user:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"user@example.com","password":"password123"}' http://localhost:3000/auth/login
```

2. Get the user's orders:

```bash
curl -H "Authorization: USER_TOKEN" http://localhost:3000/orders
```

You should only see orders that belong to this user.

3. Login as an admin:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"email":"admin@example.com","password":"password123"}' http://localhost:3000/auth/login
```

4. Get all orders as admin:

```bash
curl -H "Authorization: ADMIN_TOKEN" http://localhost:3000/orders
```

As an admin, you should see all orders in the system.

5. Get the order count:

```bash
curl -H "Authorization: ADMIN_TOKEN" http://localhost:3000/orders/count
```

Now our orders listing functionality is working with role-based access control! In the next and final section, we'll wrap up our project. See you there!

## Step 15: Outro

Congratulations! You've successfully built a complete e-commerce API with TypeScript, Express, PostgreSQL, and Drizzle ORM. Let's summarize what we've accomplished and discuss potential next steps.

### What We've Built

In this tutorial, we've built a fully functional e-commerce API with:

1. **Product Management**

   - CRUD operations for products
   - Data validation with Zod

2. **User Authentication and Authorization**

   - User registration and login
   - JWT-based authentication
   - Role-based access control (user, seller, admin)

3. **Order Processing**

   - Creating orders with multiple items
   - Listing orders with role-based access
   - Updating order status

4. **Database Integration**

   - PostgreSQL database setup
   - Drizzle ORM for type-safe database operations
   - Database migrations

5. **Deployment**
   - Building for production
   - Deploying to Genezio serverless platform

### Project Structure

We've organized our code in a clean, maintainable structure:

- `src/db`: Database schemas and connection
- `src/routes`: API routes and controllers
- `src/middlewares`: Authentication and validation middlewares
- `src/types`: TypeScript type definitions

### Next Steps

Here are some ways you could extend this project:

1. **Frontend Integration**

   - Build a React, Vue, or Angular frontend to consume this API
   - Implement a shopping cart system

2. **Payment Processing**

   - Integrate with Stripe or PayPal for payment processing
   - Implement order confirmation emails

3. **Enhanced Features**

   - Add product categories and filters
   - Implement user profiles with order history
   - Add product reviews and ratings

4. **Security Enhancements**

   - Set up rate limiting to prevent abuse
   - Implement CORS properly
   - Store JWT secrets in environment variables
   - Add refresh tokens

5. **Testing**

   - Write unit tests for your controllers
   - Implement integration tests for your API endpoints

6. **CI/CD**
   - Set up GitHub Actions or another CI/CD pipeline
   - Automate testing and deployment

### Final Thoughts

Building a production-ready API involves many aspects beyond just the code - from proper error handling to security practices. This tutorial has provided a solid foundation, but there's always room to improve and expand.

Remember that good APIs evolve over time based on feedback and changing requirements. Don't be afraid to refactor your code as you learn more and as your project needs change.

Thank you for following along with this tutorial! I hope you found it helpful and that it gives you the confidence to build your own APIs with TypeScript and modern tools.

Happy coding!
