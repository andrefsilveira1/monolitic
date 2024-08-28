import express, {Request, Response} from "express";
import CheckoutFactory from "../../modules/checkout/factory/checkout.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const placeOrderUseCase = CheckoutFactory.create();

    try {
        const placeOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        }
        const order = await placeOrderUseCase.execute(placeOrderInputDto)
        res.send(order);
    } catch (err) {
        res.status(500).send(err);
    }
});