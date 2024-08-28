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
            .post("/product")
            .send({
                id: "1",
                name: "John",
                description: "some description",
                purchasePrice: 200,
                stock: 10,
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe("1");
        expect(response.body.name).toBe("John");
        expect(response.body.description).toBe("some description");
        expect(response.body.purchasePrice).toBe(200);
        expect(response.body.stock).toBe(10);
    });


});