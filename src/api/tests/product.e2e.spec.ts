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
        const respose = await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "John",
                description: "some description",
                purchasePrice: 200,
                stock: 10,
            });
        expect(respose.status).toBe(200);
    });


});