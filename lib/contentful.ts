const contentful = require("contentful");

//api for fetching all the ngos
const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DELIVERY,
});

interface ITransaction {
    totalDonationsNum: number;
    totalDonationsAmount: number;
}

interface Ngo {
    total: number;
    ngos: [];
}

interface NgoCount {
    totalNgos: number;
}

interface TotalCategory {
    totalCategories: number;
}

//getting the data of all the ngos
export const ngo = async function getAllNgo({ category, userEmail }): Promise<Ngo> {
    //query statement
    const query = {
        content_type: "ngo",
        include: 10,
        select: "sys.createdAt,sys.id,fields.title,fields.description,fields.ownerName,fields.charityEmail,fields.transactions,fields.images,fields.category,fields.yearOfEstablish,fields.contact",
        "fields.isVerified": false,
    };

    //if category is passed
    if (category) {
        query["fields.category.sys.contentType.sys.id"] = "category";
        query["fields.category.fields.categoryName[match]"] = category;
    }
    //if useremail has passed
    if (userEmail) {
        query["fields.charityEmail"] = userEmail;
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
                    ownerName,
                    charityEmail,
                    images,
                    category,
                    yearOfEstablish,
                    contact,
                    transactions,
                } = ngoData.fields;
                const { id, createdAt: createdOn } = ngoData.sys;
                return {
                    id,
                    title,
                    ownerName,
                    charityEmail,
                    description,
                    createdOn,
                    images: images.map((image) => ({
                        alt: image.fields.title,
                        src: `https:${image.fields.file.url}`,
                        height: image.fields.file.details.image.height,
                        width: image.fields.file.details.image.width,
                    })),
                    category: category.fields.categoryName,
                    yearOfEstablish,
                    contact,
                    totalAmountRaised: transactions.reduce((totalAmount, transaction) => {
                        return (totalAmount += transaction.fields.amount);
                    }, 0),
                    transactions: transactions.map((transaction) => ({
                        transactionId: transaction.fields.id,
                        amount: transaction.fields.amount,
                    })),
                };
            }),
        };
    } catch (err) {
        return err.message;
    }
};

//getting the details of the transaction
export const allTransaction = async (): Promise<ITransaction> => {
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
        return err.mnessage;
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
