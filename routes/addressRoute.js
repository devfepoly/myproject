import express from "express";
import * as addressController from "../controllers/addressController.js";
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/provinces", addressController.getProvinces);
router.get("/districts/:provinceCode", addressController.getDistricts);
router.get("/wards/:districtCode", addressController.getWards);
router.post("/", authMiddleware, addressController.createAddress);
router.delete("/delete/:id", authMiddleware, addressController.deleteAddress);
router.patch("/update/:id", authMiddleware, addressController.updateAddress);

export default router;
