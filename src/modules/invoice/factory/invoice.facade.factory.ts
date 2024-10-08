import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepostory from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepostory();
        const findUseCase = new FindInvoiceUseCase(repository);
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: findUseCase,
        });

        return facade;
    }
}