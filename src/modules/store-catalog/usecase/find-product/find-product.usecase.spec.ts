import Id from "../../../@shared/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCse from "../find-all-products/find-all-products-usecase";
import FindProductUseCse from "./find-product.usecase";

const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "description",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
    }
}

describe("Find a product usecase unit test", () => {
    it("Should find a product", async () => {
        const productRepository = MockRepository()
        const usecase = new FindProductUseCse(productRepository);

        const input = {
            id: '1',
        };

        const result = await usecase.execute(input);

        expect(productRepository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("product");
        expect(result.description).toBe("description");
        expect(result.salesPrice).toBe(100);
    })
})