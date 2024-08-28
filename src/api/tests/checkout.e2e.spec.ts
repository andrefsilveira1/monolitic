import request from "supertest";
import { app, sequelize } from "../express";
import ProductModel from "../../modules/product-adm/repository/product.model";
import ProductCatalogModel from "../../modules/store-catalog/repository/product.modal";

const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("E2E test Checkout", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a Checkout", async () => {
        //First create a client
        const client = await request(app)
            .post("/client")
            .send({
                id: "2",
                name: "John",
                email: "john@gmail.com",
                document: "123456",
                address: {
                    street: "street",
                    city: "city",
                    number: 123,
                    zipCode: "12345",
                    state: "12345",
                    complement: "bl05"
                }
            });
        expect(client.status).toBe(200);
        // Then, register a product
        const product = await request(app)
            .post("/product")
            .send({
                id: "p1",
                name: "product 1",
                description: "some description",
                purchasePrice: 200,
                stock: 10,
            });
        expect(product.status).toBe(200);
        // Creating second procut 
        const product2 = await request(app)
            .post("/product")
            .send({
                id: "p2",
                name: "product 2",
                description: "some description",
                purchasePrice: 300,
                stock: 5,
            });
        expect(product2.status).toBe(200);

        //Register products on catalog
        const catalog = await request(app)
            .post("/catalog")
            .send({
                id: "p1",
                name: "product 11",
                description: "some description1",
                salesPrice: 200,
            });

        expect(catalog.status).toBe(200);

        const catalog2 = await request(app)
            .post("/catalog")
            .send({
                id: "p2",
                name: "product 11",
                description: "some description1",
                salesPrice: 200,
            });
        expect(catalog2.status).toBe(200);
        
        //Finally, create a checkout
        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "2",
                products: [
                    { productId: "p1" },
                    { productId: "p2" },
                ]
            });
        
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(400);
        await wait(1000); // I don't know why, but without this, sometimes the connection with sequelize is being closed before the test end.
    });
});
