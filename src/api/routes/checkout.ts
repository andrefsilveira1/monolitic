import express, {Request, Response} from "express";
import ProductAdmFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import CheckStockUseCase from "../../modules/product-adm/usecase/check-stock/check-stock.usecase";
import PlaceOrderUseCase from "../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacade from "../../modules/client-adm/facade/client-adm.facade";
import StoreCatalogFactory from "../../modules/store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
import CheckoutFactory from "../../modules/checkout/factory/checkout.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const placeOrderUseCase = CheckoutFactory.create();

    try {
        const placeOrderInputDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        }
        console.log("PLACE ORDER INPUT ====>", placeOrderInputDto)
        const order = await placeOrderUseCase.execute(placeOrderInputDto)

        res.send(order);
    } catch (err) {
        res.status(500).send(err);
    }
});