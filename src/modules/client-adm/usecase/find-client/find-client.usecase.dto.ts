import Address from "../../../@shared/value-object/address.value_object";

export interface FindClientInputDto {
    id: string;
}

export interface FindClientOutputDto {
    id: string;
    name: string;
    email: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}