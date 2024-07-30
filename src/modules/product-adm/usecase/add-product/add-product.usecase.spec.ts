import AddProductUseCase from "./add-product.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    }
}


describe("Add Product usecase unit test", () => {
    it("Should add a product", async () => {
        const productRepository = MockRepository();
        const usecase = new AddProductUseCase(productRepository);
        
        const input = {
            id: "1",
            name: "Product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10,
        }
        const result = await usecase.execute(input);

        expect(productRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(result.name);
        expect(result.description).toBe(result.description);
        expect(result.purchasePrice).toBe(result.purchasePrice);
    });
});