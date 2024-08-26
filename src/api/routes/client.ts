import express, {Request, Response} from "express";
import ProductAdmFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create();

    try {
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            document: req.body.document,
        }

        const client = await facade.add(clientDto)

        res.send(client);
    } catch (err) {
        res.status(500).send(err);
    }
});