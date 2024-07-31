import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";

describe("Product adm facade", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const productFacade = new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: undefined,
        });

        const input = {
            id: "1",
            name: "product",
            description: "description",
            purchasePrice: 10,
            stock: 10,
        }

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({where: { id: "1" }});
        expect(product).toBeDefined();
    })
});