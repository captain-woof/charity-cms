import formidable from "formidable";

//Ngo interface
export interface Ngo {
    id: string;
    title: string;
    description: string;
    ownerName: string;
    charityEmail: string;
    image: Image;
    category: string;
    yearOfEstablish: Date;
    contact: string;
    ngoSlug: string;
    isVerified: boolean;
}

//image interface
export interface Image {
    id: string;
    alt: string;
    src: string;
    height: number;
    width: number;
}
//Transaction interface
export interface Transaction {
    transactionId: string;
    amount: number;
}

// List of Ngos
export interface Ngos {
    total: number;
    ngos: Array<Ngo>;
}
export interface CategoryList {
    total: number;
    categories: Array<Category>;
}
export interface Category {
    id: string;
    categoryName: string;
}
export interface Data {
    fields: formidable.Fields;
    files: formidable.Files;
}
export interface TransactionList {
    total: number;
    transactions: Array<Transaction>;
}
export interface Transaction {
    id: string;
    ngoSlug: string;
    amount: number;
}

// Ngo registration type
export type NgoRegistrationType = "NEW_ACCOUNT" | "VERIFICATION_PENDING" | "VERIFIED"