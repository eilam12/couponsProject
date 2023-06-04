import ClientType from "./ClientType";

export class Credentials {
    clietType: ClientType;
    email: string;
    password: string;

    constructor(clietType: ClientType, email: string, password: string) {
        this.clietType = clietType;
        this.email = email;
        this.password = password;
    }
}