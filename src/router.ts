import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErrors } from "./middleware";


const router = Router();

//ROUTING
router.get("/", (req, res) => {
    res.json("Desde GET");
});

router.post("/",
    //Validaciones
    body('name')
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del Producto no puede ir vacio")
        .custom((value) => value > 0).withMessage("El precio del Producto debe ser mayor a 0"),
    handleInputErrors,
    createProduct
);

router.put("/", (req, res) => {
    res.json("Desde PUT");
});

router.patch("/", (req, res) => {
    res.json("Desde PATCH");
});

router.delete("/", (req, res) => {
    res.json("Desde DELETE");
});

export default router;