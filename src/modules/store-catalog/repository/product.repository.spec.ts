import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.modal";

describe("Product Repository tests", () => {
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


    it("Shoulld return all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "product 1",
            description: "description",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "product 2",
            description: "description 2",
            salesPrice: 200,
        });


        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(products.length).toBe(2);
        expect(products[0].id).toBe("1");
        expect(products[0].name).toBe("product");
        expect(products[0].description).toBe("description");
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id).toBe("2");
        expect(products[1].name).toBe("product 2");
        expect(products[1].description).toBe("description 2");
        expect(products[1].salesPrice).toBe(200);
    })
    })
})