import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFactory from "../factory/facade.factory";

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
        const productFacade = ProductAdmFactory.create();
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
    });

    it("Should check a product stock", async () => {
        const productFacade = ProductAdmFactory.create();
        const input = {
            id: "1",
            name: "product",
            description: "description",
            purchasePrice: 10,
            stock: 10,
        }

        await productFacade.addProduct(input);
        const result = await productFacade.checkStock({productId: '1'})

        expect(result).toBeDefined();
        expect(result.productId).toBe(input.id);
    });
});