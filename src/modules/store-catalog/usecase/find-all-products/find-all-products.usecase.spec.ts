import Id from "../../../@shared/value-object/id.value-object";
import ProductRepository from "../../../product-adm/repository/product.repository";
import Product from "../../domain/product.entity";
import FindAllProductsUseCse from "./find-all-products-usecase";

const product = new Product({
    id: new Id("1"),
    name: "product",
    description: "description",
    salesPrice: 100,
});

const product2 = new Product({
    id: new Id("2"),
    name: "product 2",
    description: "description 2",
    salesPrice: 200,
});


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
    }
}


describe("Find all products usecase unit test", () => {
    it("Should find all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCse(productRepository);
        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[0].name).toBe("product");
        expect(result.products[0].description).toBe("description");
        expect(result.products[0].salesPrice).toBe(100);

        expect(result.products[1].id).toBe("2");
        expect(result.products[1].name).toBe("product 2");
        expect(result.products[1].description).toBe("description 2");
        expect(result.products[1].salesPrice).toBe(200);
    })
})