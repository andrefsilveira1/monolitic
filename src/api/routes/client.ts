import express, { Request, Response } from "express";
import ProductAdmFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../modules/@shared/value-object/address.value_object";

export const clientsRoute = express.Router();

clientsRoute.post("/", async (req: Request, res: Response) => {
    const facade = ClientAdmFacadeFactory.create();

    try {
        const newAddress = req.body.address;
        const address = new Address(newAddress)
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            address: address,
            document: req.body.document,
        }

        await facade.add(clientDto)
        res.send("Client created");
    } catch (err) {
        res.status(500).send(err);
    }
});