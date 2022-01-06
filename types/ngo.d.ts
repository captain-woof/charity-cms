//Ngo interface
export interface Ngo {
    title: string;
    description: string;
    ownerName: string;
    charityEmail: string;
    images: Array<Image>;
    category: string;
    yearOfEstablish: Date;
    contact: string;
    totalAmountRaised: number;
    transactions: Array<Transaction>;
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
    total : number
    categories: Array<Category>;
}
interface Category {
    id: string;
    categoryName: string;
}
