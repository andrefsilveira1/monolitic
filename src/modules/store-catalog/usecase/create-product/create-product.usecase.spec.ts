import Id from "../../../@shared/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindProductUseCse from "../find-product/find-product.usecase";
import CreateProductUseCase  from "./create-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "description",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
    }
}
describe("Create product Unit test", () => {
    it("Should create a product", async () => {
        const productRepository = MockRepository();

        const usecase = new CreateProductUseCase(productRepository);
        const product = {
            id: '1',
            name: 'product',
            description: 'description',
            salesPrice: 100,
        };

        await usecase.execute(product);

        const findUsecase = new FindProductUseCse(productRepository);
        const result = await findUsecase.execute({id: "1"})

        expect(productRepository.create).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("product");
        expect(result.description).toBe("description");
        expect(result.salesPrice).toBe(100);
    })
})