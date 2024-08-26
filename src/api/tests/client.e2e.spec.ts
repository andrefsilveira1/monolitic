import request from "supertest";
import { app, sequelize } from "../express";

describe("E2E test client", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("Should create a client", async () => {
        const respose = await request(app)
            .post("/client")
            .send({
                id: "1",
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
        expect(respose.status).toBe(200);
    });

    it("Should not create a costumer", async () => {
        const response = await request(app)
            .post("/client")
            .send({
                name: "John"
            });

        expect(response.status).toBe(500);
    });

});