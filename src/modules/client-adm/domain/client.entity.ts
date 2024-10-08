import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/value-object/address.value_object";
import Id from "../../@shared/value-object/id.value-object";

type ClientProps = {
    id: Id;
    name: string;
    email: string;
    address: Address;
    document: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _address: Address;
    private _document: string;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._address = props.address;
        this._document = props.document;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get address(): Address {
        return this._address;
    }

    get document(): string {
        return this._document;
    }

}