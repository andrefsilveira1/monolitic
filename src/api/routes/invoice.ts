import express, { Request, Response } from "express";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";

export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    try {
        const facade = InvoiceFacadeFactory.create();

        const invoiceDto = {
            id: req.body.id,
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items,
        }
        const invoice = await facade.generate(invoiceDto);
        res.send(invoice);
    } catch (err) {
        res.status(500).send(err);
    }

})

invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const facade = InvoiceFacadeFactory.create();
    const invoiceId = req.params.id
    try {
        const invoice = await facade.find({ id: invoiceId })

        res.send(invoice);
    } catch (err) {
        res.status(500).send(err);
    }
});