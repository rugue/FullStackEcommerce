import * as productSchema from "./productsSchema.js";
import * as userSchema from "./usersSchema.js";
import * as orderSchema from "./ordersSchema.js";
export default {
  ...productSchema,
  ...userSchema,
  ...orderSchema,
};
