export interface UserDataInterface {
    id: number;
    documentId:string;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    avatar: string;
}