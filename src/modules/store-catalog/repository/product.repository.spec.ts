import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.modal";
import ProductRepository from "./product.repository";
import ProductCatalogModel from "./product.modal";

describe("Product Repository tests", () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        await sequelize.addModels([ProductCatalogModel]);
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

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[0].name).toBe("product 1");
        expect(products[0].description).toBe("description");
        expect(products[0].salesPrice).toBe(100);

        expect(products[1].id.id).toBe("2");
        expect(products[1].name).toBe("product 2");
        expect(products[1].description).toBe("description 2");
        expect(products[1].salesPrice).toBe(200);
    });


    it("Should find a product", async () => {
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
        const product= await productRepository.find('1');

        expect(product.id.id).toBe("1");
        expect(product.name).toBe("product 1");
        expect(product.description).toBe("description");
        expect(product.salesPrice).toBe(100);
    });

    it("Should create a product catalog ", async () => {
        const productProps = {
            id: "1",
            name: "product 1",
            description: "description",
            salesPrice: 100,
        };


        const productRepository = new ProductRepository();
        await productRepository.create(productProps);
        const product = await productRepository.find("1");


        expect(product.id.id).toBe("1");
        expect(product.name).toBe("product 1");
        expect(product.description).toBe("description");
        expect(product.salesPrice).toBe(100);
    });
})