import Address from "../../@shared/value-object/address.value_object";

export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    address: Address;
}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: Address;
    document: string;
    createdAt: Date;
    updatedAt: Date;
}

export default interface ClientAdmFacadeInterface {
   add(input: AddClientFacadeInputDto): Promise<void>;
   find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>; 
}
