import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { InvoiceModel } from './invoice.model';

@Table({
    tableName: "invoice_items",
    timestamps: true, 
})
export class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    price!: number;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    invoiceId!: string;

    @BelongsTo(() => InvoiceModel)
    invoice!: InvoiceModel;
}
