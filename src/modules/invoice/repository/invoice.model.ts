import { Column, Model, PrimaryKey, Table, ForeignKey, HasMany, BelongsTo } from "sequelize-typescript";
import { InvoiceItemsModel } from './invoiceItems.model';

@Table({
    tableName: "invoices",
    timestamps: true, 
})
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    document!: string;

    @Column({ allowNull: false })
    street!: string;

    @Column({ allowNull: false })
    number!: string;

    @Column({ allowNull: false })
    complement!: string;

    @Column({ allowNull: false })
    city!: string;

    @Column({ allowNull: false })
    state!: string;

    @Column({ allowNull: false })
    zipCode!: string;

    @HasMany(() => InvoiceItemsModel)
    items!: InvoiceItemsModel[];
}
