import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["price", "DESC"]]
        });
        res.json({ data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(Number(id));

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ data: product });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body);
        res.json({ data: product });
    } catch (error) {
        console.error("Error creating product:", error);
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.update(req.body);
    product.save();

    res.json({ data: product });
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    product.availability = !product.dataValues.availability
    await product.save();

    res.json({ data: product });
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(Number(id));

    if (!product) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    await product.destroy();

    res.json({ data: "Producto eliminado correctamente" });
}