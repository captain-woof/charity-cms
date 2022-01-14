const contentful = require("contentful");
import { TransactionList, Ngos, CategoryList } from "../types/ngo";

//api for fetching all the ngos
const client = contentful.createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN_DELIVERY,
});

interface TotalTransaction {
    totalDonationsNum: number;
    totalDonationsAmount: number;
}

interface NgoCount {
    totalNgos: number;
}

interface TotalCategory {
    totalCategories: number;
}
interface GetAllNgos {
    category?: string;
    userEmail?: string;
    ngoSlug?: string;
    isVerified?: "true" | "false";
}

//getting the data of all the ngos
export const getAllNgo = async ({
    category,
    userEmail,
    ngoSlug,
    isVerified,
}: GetAllNgos): Promise<Ngos> => {
    //query statement
    const query = {
        content_type: "ngo",
        include: 10,
        select: "sys.createdAt,sys.id,fields.title,fields.ngoSlug,fields.description,fields.ownerName,fields.charityEmail,fields.image,fields.category,fields.yearOfEstablish,fields.contact",
        // "fields.isVerified": false,
    };

    //if category is passed
    if (category) {
        query["fields.category.sys.contentType.sys.id"] = "category";
        query["fields.category.fields.categoryName[match]"] = category;
    }

    //filter the ngolist as per verified
    if (isVerified === "true") {
        query["fields.isVerified"] = true;
    } else if (isVerified === "false") {
        query["fields.isVerified"] = false;
    }

    //if user-email has passed
    if (userEmail) {
        query["fields.charityEmail"] = userEmail;
    }
    //if slug is passed
    if (ngoSlug) {
        query["fields.ngoSlug"] = ngoSlug;
    }

    /* if userEmail and category nothing is passed it will fetch all the records of the NGOs */
    try {
        const ngoList = await client.getEntries(query);

        // return response.items;

        return {
            total: ngoList.total,
            ngos: ngoList.items.map((ngoData) => {
                const {
                    title,
                    description,
                    ngoSlug,
                    ownerName,
                    charityEmail,
                    image,
                    category,
                    yearOfEstablish,
                    contact,
                } = ngoData.fields;

                const { id, createdAt: createdOn } = ngoData.sys;
                return {
                    id,
                    title,
                    ngoSlug,
                    ownerName,
                    charityEmail,
                    description,
                    createdOn,
                    image: {
                        id: image.sys.id,
                        alt: image.fields.title,
                        src: `https:${image.fields.file.url}`,
                        height: image.fields.file.details.image.height,
                        width: image.fields.file.details.image.width,
                    },
                    category: category.fields.categoryName,
                    yearOfEstablish,
                    contact,
                };
            }),
        };
    } catch (err) {
        return err.message;
    }
};

//getting the details of the transaction
export const allTransaction = async (): Promise<TotalTransaction> => {
    const query = {
        content_type: "transactionDetails",
        include: 10,
        select: "sys.createdAt,fields.amount",
    };
    try {
        const transactionList = await client.getEntries(query);
        return {
            totalDonationsNum: transactionList.total,
            totalDonationsAmount: transactionList.items.reduce(
                (totalAmount, transaction) => {
                    return totalAmount + transaction.fields.amount;
                },
                0
            ),
        };
    } catch (err) {
        return err.message;
    }
};

export const ngoCount = async (): Promise<NgoCount> => {
    const query = {
        content_type: "ngo",
        include: 10,
    };
    try {
        const ngoList = await client.getEntries(query);
        return {
            totalNgos: ngoList.total,
        };
    } catch (err) {
        return err.message;
    }
};

// fetching how many categories of NGOs have registered so far

export const categoryCount = async (): Promise<TotalCategory> => {
    const query = {
        content_type: "category",
        include: 10,
    };

    try {
        const categoryList = await client.getEntries(query);
        return {
            totalCategories: categoryList.total,
        };
    } catch (err) {
        return err.message;
    }
};

//fetch all the categories
export const getCategories = async (categoryName?: string): Promise<CategoryList> => {
    const query = {
        content_type: "category",
    };

    if (categoryName) {
        query["fields.categoryName[match]"] = categoryName;
    }
    try {
        const categoryList = await client.getEntries(query);

        return {
            total: categoryList.total,
            categories: categoryList.items.map((category) => {
                const { categoryName } = category.fields;
                const { id } = category.sys;

                return {
                    id,
                    categoryName,
                };
            }),
        };
    } catch (err) {
        return err.message;
    }
};

//fetch all transactions

export const fetchAllTransactions = async (
    ngoSlug?: string,
    fromDate?: Date,
    toDate?: Date
): Promise<TransactionList> => {
    const query = {
        content_type: "transactionDetails",
        include: 10,
        order: "-sys.createdAt",
    };

    //if slug is given
    if (ngoSlug) {
        query["fields.ngoSlug"] = ngoSlug;
    }

    //if fromDate and toDate both are given

    if (fromDate && toDate) {
        //condition is to fromDate has to be lesser than toDate
        if (fromDate <= toDate) {
            query["sys.createdAt[gte]"] = fromDate;
            query["sys.createdAt[lte]"] = toDate;
        }
    }
    //if only fromDate is given
    else if (fromDate) {
        query["sys.createdAt[gte]"] = fromDate;
    }
    //if only toDate is given
    else if (toDate) {
        query["sys.createdAt[lte]"] = toDate;
    }

    try {
        const transactionList = await client.getEntries(query);
        return {
            total: transactionList.total,
            transactions: transactionList.items.map((transaction) => {
                const { id, ngoSlug, amount } = transaction.fields;
                const { createdAt: date } = transaction.sys;
                return {
                    id,
                    ngoSlug,
                    date,
                    amount,
                };
            }),
        };
    } catch (err) {
        return err.message;
    }
};
