import Id from "../../@shared/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { CreateProductInputDto } from "../usecase/create-product/create-product.dto";
import ProductCatalogModel from "./product.modal";
import ProductModel from "./product.modal";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await ProductModel.findAll();

        return products.map((product) => (
                new Product({
                    id: new Id(product.id),
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice
                })
            ))
    }

    async find(id: string): Promise<Product> {

        const product = await ProductModel.findOne({
            where: {
                id: id
            }
        });

        if(!product) {
            throw new Error(`Product with id ${id} not found`)
        }
        
        return new Product({
            id: new Id(product?.id),
            name: product?.name,
            description: product?.description,
            salesPrice: product?.salesPrice
        });
    }

    async create(input: CreateProductInputDto): Promise<Product> {
        const response = await ProductCatalogModel.create({
            id: input.id,
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice
        });

        const productCreated = await this.find(input.id);

        return new Product({
            id: new Id(input.id),
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice
        })
    }
}