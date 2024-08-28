import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                id: "1",
                name: "invoice name",
                document: "123456",
                street: "street",
                number: 123,
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode",
                items: [
                    {
                        id: '1',
                        name: 'item 1',
                        price: 50
                    },
                    {
                        id: '2',
                        name: 'item 2',
                        price: 20
                    }
                ],
                description: "some description",
                purchasePrice: 200,
                stock: 10,
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("invoice name");
        expect(response.body.document).toBe("123456");
        expect(response.body.street).toBe("street");
        expect(response.body.complement).toBe("complement");
        expect(response.body.number).toBe(123);
        expect(response.body.city).toBe("city");
        expect(response.body.state).toBe("state");
        expect(response.body.zipCode).toBe("zipCode");
        expect(response.body.items[0].id).toBe("1");
        expect(response.body.items[0].name).toBe("item 1");
        expect(response.body.items[0].price).toBe(50);
        expect(response.body.items[1].id).toBe("2");
        expect(response.body.items[1].name).toBe("item 2");
        expect(response.body.items[1].price).toBe(20);
    });

    it("Should return a invoice", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                id: "1",
                name: "invoice name",
                document: "123456",
                street: "street",
                number: 123,
                complement: "complement",
                city: "city",
                state: "state",
                zipCode: "zipCode",
                items: [
                    {
                        id: '1',
                        name: 'item 1',
                        price: 50
                    },
                    {
                        id: '2',
                        name: 'item 2',
                        price: 20
                    }
                ],
                description: "some description",
                purchasePrice: 200,
                stock: 10,
            });
        expect(response.status).toBe(200);

        const invoice = await request(app).get(`/invoice/1`);
        expect(invoice.status).toBe(200);
        expect(invoice.body.name).toBe("invoice name");
        expect(invoice.body.document).toBe("123456");
        expect(invoice.body.address.street).toBe("street");
        expect(invoice.body.address.complement).toBe("complement");
        expect(invoice.body.address.number).toBe("123");
        expect(invoice.body.address.city).toBe("city");
        expect(invoice.body.address.state).toBe("state");
        expect(invoice.body.address.zipCode).toBe("zipCode");
        expect(invoice.body.items[0].id).toBe("1");
        expect(invoice.body.items[0].name).toBe("item 1");
        expect(invoice.body.items[0].price).toBe(50);
        expect(invoice.body.items[1].id).toBe("2");
        expect(invoice.body.items[1].name).toBe("item 2");
        expect(invoice.body.items[1].price).toBe(20);
    });


});