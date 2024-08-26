import express, {Request, Response} from "express";
import ProductAdmFactory from "../../modules/product-adm/factory/facade.factory";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
    const facade = ProductAdmFactory.create();

    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }

        const product = await facade.addProduct(productDto);

        res.send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});