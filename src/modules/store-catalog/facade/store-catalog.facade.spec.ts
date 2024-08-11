import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.modal";
import StoreCatalogFactory from "../factory/facade.factory";

describe("StoreCatalogFacade tests", () => {
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

    it("Should find a product", async () => {
        const facade = StoreCatalogFactory.create();
        await ProductModel.create({
            id: '1',
            name: 'product',
            description: 'description',
            salesPrice: 100,
        });

        const result = await facade.find({id: '1'});
        expect(result.id).toBe('1');
    })

})