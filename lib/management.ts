const management = require("contentful-management");
import { Asset, Entry } from "contentful-management";
import stream from "stream";

const client = management.createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_MANAGEMENT,
});

interface jsonData {
    type: string;
    name: string;
}

interface NgoQuery {
    title: string;
    description: string;
    yearOfEstablish: number;
    contact: string;
    charityEmail: string;
    ownerName: string;
    categoryId: string;
    verificationId: string;
    imageId: string;
}

export const createAsset = async (
    json: jsonData,
    file: string | ArrayBuffer | stream
): Promise<string> => {
    try {
        let type: string = json.type;
        let name: string = json.name;

        const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENV_ID);
        const upload = await env.createUpload({
            file: file,
        });

        // console.log(upload);

        let asset = await env.createAsset({
            fields: {
                title: {
                    "en-US": name,
                },
                file: {
                    "en-US": {
                        fileName: name,
                        contentType: type,
                        uploadFrom: {
                            sys: {
                                type: "Link",
                                linkType: "Upload",
                                id: upload.sys.id,
                            },
                        },
                    },
                },
            },
        });

        asset = await asset.processForAllLocales();
        asset = await asset.publish();
        return asset.sys.id;
    } catch (error) {
        return error.message;
    }
};
export const createCategory = async (categoryName: string): Promise<string> => {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(process.env.CONTENTFUL_ENV_ID);
    let entry = await env.createEntry("category", {
        fields: {
            categoryName: {
                "en-US": categoryName,
            },
        },
    });

    entry = await entry.publish();
    return entry.sys.id;
};
export const createNgo = async ({
    title,
    description,
    yearOfEstablish,
    contact,
    ownerName,
    charityEmail,
    categoryId,
    verificationId,
    imageId,
}: NgoQuery): Promise<Entry> => {
    try {
        const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
        const env = await space.getEnvironment(process.env.CONTENTFUL_ENV_ID);
        let entry = await env.createEntry("ngo", {
            fields: {
                title: {
                    "en-US": title,
                },
                description: {
                    "en-US": description,
                },
                yearOfEstablish: {
                    "en-US": yearOfEstablish,
                },
                ownerName: {
                    "en-US": ownerName,
                },
                category: {
                    "en-US": {
                        sys: {
                            type: "Link",
                            linkType: "Entry",
                            id: categoryId,
                        },
                    },
                },
                verificationPdf: {
                    "en-US": {
                        sys: {
                            type: "Link",
                            linkType: "Asset",
                            id: verificationId,
                        },
                    },
                },
                image: {
                    "en-US": {
                        sys: {
                            type: "Link",
                            linkType: "Asset",
                            id: imageId,
                        },
                    },
                },

                contact: {
                    "en-US": contact,
                },
                charityEmail: {
                    "en-US": charityEmail,
                },
            },
        });
        entry = await entry.publish();
        return entry;
    } catch (err) {
        return err.message;
    }
};
