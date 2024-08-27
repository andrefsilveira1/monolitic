import express, {Request, Response} from "express";
import StoreCatalogFactory from "../../modules/store-catalog/factory/facade.factory";

export const catalogRoute = express.Router();

catalogRoute.post("/", async (req: Request, res: Response) => {
    const facade = StoreCatalogFactory.create();

    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            salesPrice: req.body.salesPrice,
        }

        await facade.create(productDto);

        res.send("created");
    } catch (err) {
        res.status(500).send(err);
    }
});