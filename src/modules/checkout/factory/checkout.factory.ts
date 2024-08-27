import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFactory from "../../store-catalog/factory/facade.factory";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFactory {
    static create() {
        const clientFacade = ClientAdmFacadeFactory.create();
        const productFacade = ProductAdmFactory.create();
        const catalogFacade = StoreCatalogFactory.create();
        const invoiceFacade = InvoiceFacadeFactory.create();
        const paymentFacade = PaymentFacadeFactory.create();
        const mockCheckoutRepository = {
            addOrder: jest.fn(),
            findOrder: jest.fn(),
        };

        const placeOrderUseCase = new PlaceOrderUseCase(
            clientFacade,
            productFacade,
            catalogFacade,
            mockCheckoutRepository,
            invoiceFacade,
            paymentFacade,
        );

        return placeOrderUseCase;
    }
}