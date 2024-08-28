import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../modules/invoice/repository/invoice.model";
import ProductModel from "../modules/product-adm/repository/product.model";
import TransactionModel from "../modules/payment/repository/transaction.model";
import { InvoiceItemsModel } from "../modules/invoice/repository/invoiceItems.model";
import { clientsRoute } from "./routes/client";
import { productsRoute } from "./routes/product";
import { checkoutRoute } from "./routes/checkout";
import { catalogRoute } from "./routes/catalog";
import ProductCatalogModel from "../modules/store-catalog/repository/product.modal";
import { invoiceRoute } from "./routes/invoice";


export const app: Express = express();
export let sequelize: Sequelize;
app.use(express.json());
app.use("/client", clientsRoute);
app.use("/product", productsRoute);
app.use("/checkout", checkoutRoute);
app.use("/catalog", catalogRoute);
app.use("/invoice", invoiceRoute);

async function setup() {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
    });
    await sequelize.addModels([
        ClientModel,
        InvoiceModel,
        InvoiceItemsModel,
        ProductModel,
        ProductCatalogModel,
        TransactionModel
    ]);
    await sequelize.sync();
};

setup();
