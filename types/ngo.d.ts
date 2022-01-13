import formidable from "formidable";

//Ngo interface
export interface Ngo {
    id: string;
    title: string;
    description: string;
    ownerName: string;
    charityEmail: string;
    images: Image;
    category: string;
    yearOfEstablish: Date;
    contact: string;
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
interface CategoryList {
    total: number;
    categories: Array<Category>;
}
interface Category {
    id: string;
    categoryName: string;
}
interface Data {
    fields: formidable.Fields;
    files: formidable.Files;
}
