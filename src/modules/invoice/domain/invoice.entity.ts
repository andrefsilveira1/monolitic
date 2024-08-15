import Address from "../../@shared/domain/entity/address.value_object"
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/value-object/id.value-object"
import InvoiceItems from "./invoice.items.entity"

type invoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: InvoiceItems[];
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items : InvoiceItems[];

    constructor(props: invoiceProps) {
        super(props.id);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items
    }
}