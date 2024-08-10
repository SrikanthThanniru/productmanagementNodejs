const express = require("express");
const {createProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const {authMiddleware, authorizeRoles} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("admin"), createProduct);
router.get("/", authMiddleware, authorizeRoles("admin", "manager"), getProduct);
router.put("/:id", authMiddleware, authorizeRoles("admin", "manager"), updateProduct);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteProduct);


module.exports = router;