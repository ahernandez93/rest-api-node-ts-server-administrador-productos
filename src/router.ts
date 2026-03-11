import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";


const router = Router();

//ROUTING
router.get("/", getProducts);

router.get("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    getProductById
);

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

router.put("/:id",
    param("id").isInt().withMessage("ID no valido"),
    body('name')
        .notEmpty().withMessage("El nombre del Producto no puede ir vacio"),
    body('price')
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del Producto no puede ir vacio")
        .custom((value) => value > 0).withMessage("El precio del Producto debe ser mayor a 0"),
    body('availability')
        .isBoolean().withMessage("El valor de disponibilidad no es válido"),
    handleInputErrors,
    updateProduct
);

router.patch("/:id",
    param("id").isInt().withMessage("ID no valido"),
    // body('availability')
    //     .isBoolean().withMessage("El valor de disponibilidad no es válido"),
    handleInputErrors,
    updateAvailability
);

router.delete("/:id",
    param("id").isInt().withMessage("ID no valido"),
    handleInputErrors,
    deleteProduct
);

export default router;