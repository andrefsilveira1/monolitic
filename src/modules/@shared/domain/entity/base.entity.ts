export default class BaseEntity {
    private _id: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(id: string) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }

    get id(): string {
        return this._id;
    }

    get createdAt(): string {
        return this.createdAt;
    }

    get updatedAt(): string {
        return this.updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this._updatedAt = updatedAt;
    }

}