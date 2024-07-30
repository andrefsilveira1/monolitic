import { Sequelize } from "sequelize-typescript";
import  ProductModel  from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/value-object/id.value-object";

describe("Product repository test", () => {
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

    it("Should create a product", async() => {
        const productRepository = new ProductRepository();
        
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "description",
            purchasePrice: 100,
            stock: 10,
        }
        const product = new Product(productProps);
        const result = await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: {id: productProps.id.id},
        });

        expect(productProps.id.id).toEqual(productDb?.id);
        expect(productProps.name).toEqual(productDb?.name);
        expect(productProps.description).toEqual(productDb?.description);
        expect(productProps.purchasePrice).toEqual(productDb?.purchasePrice);
        expect(productProps.stock).toEqual(productDb?.stock);

    });
});
