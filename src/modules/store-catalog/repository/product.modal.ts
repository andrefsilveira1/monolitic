import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "products",
    timestamps: false
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string | undefined;

    @Column({allowNull: false})
    name: string | undefined;

    @Column({allowNull: false})
    description: string | undefined;

    @Column({allowNull: false})
    salesPrice: number | undefined;
}