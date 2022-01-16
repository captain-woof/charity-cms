const management = require("contentful-management");
import { Asset, Entry, Environment, Space, Upload } from "contentful-management";
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
interface UpdateQuery {
    title?: string;
    description?: string;
    yearOfEstablish?: number;
    contact?: string;
    charityEmail?: string;
    ownerName?: string;
    categoryId?: string;
    verificationId?: string;
    imageId?: string;
}

export const createAsset = async (
    json: jsonData,
    file: string | ArrayBuffer | stream
): Promise<string> => {
    try {
        let type: string = json.type;
        let name: string = json.name;

        const space: Space = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
        );
        const env: Environment = await space.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID
        );
        const upload: Upload = await env.createUpload({
            file: file,
        });

        // console.log(upload);

        let asset: Asset = await env.createAsset({
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
        // asset = await asset.archive();
        // console.log(asset);
        return asset.sys.id;
    } catch (error) {
        return error.message;
    }
};
export const createCategory = async (categoryName: string): Promise<string> => {
    const space = await client.getSpace(process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
    const env = await space.getEnvironment(process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID);
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

const string_to_slug = (str: string): string => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

    return str;
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
        const space: Space = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
        );
        const env: Environment = await space.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID
        );

        try {
            let entry: Entry = await env.createEntry("ngo", {
                fields: {
                    title: {
                        "en-US": title,
                    },

                    ngoSlug: {
                        "en-US": string_to_slug(title),
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
            let imageAsset: Asset = await env.getAsset(imageId);
            await imageAsset.publish();
            let pdfAsset: Asset = await env.getAsset(verificationId);
            await pdfAsset.publish();
            return entry;
        } catch (err) {
            try {
                let imageAsset: Asset = await env.getAsset(imageId);
                let pdfAsset: Asset = await env.getAsset(verificationId);
                await imageAsset.delete();
                await pdfAsset.delete();
            } catch (e) {
                throw new Error("Cannot delete the existing resource");
            } finally {
                throw new Error(`Cannot create new Entry!! and ${err.message}`);
            }
        }
    } catch (err) {
        return err.message;
    }
};

export const createTransaction = async (
    ngoSlug: string,
    transactionId: string,
    amount: number
): Promise<void> => {
    try {
        const space: Space = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
        );
        const env: Environment = await space.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID
        );

        let transactionEntry: Entry = await env.createEntry("transactionDetails", {
            fields: {
                amount: {
                    "en-US": amount,
                },

                id: {
                    "en-US": transactionId,
                },

                ngoSlug: {
                    "en-US": ngoSlug,
                },
            },
        });

        transactionEntry = await transactionEntry.publish();
    } catch (err) {
        return err.message;
    }
};

export const updateNgo = async (
    ngoId: string,
    {
        title,
        description,
        yearOfEstablish,
        contact,
        ownerName,
        charityEmail,
        categoryId,
        verificationId,
        imageId,
    }: UpdateQuery
): Promise<Entry> => {
    try {
        const space: Space = await client.getSpace(
            process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
        );
        const env: Environment = await space.getEnvironment(
            process.env.NEXT_PUBLIC_CONTENTFUL_ENV_ID
        );
        let oldImageId: string;
        let oldPdfId: string;
        try {
            let ngoEntry: Entry = await env.getEntry(ngoId);

            if (title) {
                ngoEntry.fields.title["en-US"] = title;
            }
            if (description) {
                ngoEntry.fields.description["en-US"] = description;
            }

            if (yearOfEstablish) {
                ngoEntry.fields.yearOfEstablish["en-US"] = yearOfEstablish;
            }

            if (contact) {
                ngoEntry.fields.contact["en-US"] = contact;
            }

            if (imageId) {
                // console.log(imageId);
                oldImageId = ngoEntry.fields.image["en-US"].sys.id;

                ngoEntry.fields.image["en-US"].sys.id = imageId;
                // let oldImageAsset: Asset = await env.getAsset(oldImageId);
                // await oldImageAsset.unpublish();
                // await oldImageAsset.delete();
            }

            if (verificationId) {
                oldPdfId = ngoEntry.fields.verificationPdf["en-US"].sys.id;
                ngoEntry.fields.verificationPdf["en-US"].sys.id = verificationId;
                // let oldPdfAsset: Asset = await env.getAsset(oldPdfId);
                // await oldPdfAsset.unpublish();
                // await oldPdfAsset.delete();
            }

            if (categoryId) {
                ngoEntry.fields.categoryId["en-US"].sys.id = categoryId;
            }

            if (ownerName) {
                ngoEntry.fields.ownerName["en-US"] = ownerName;
            }

            if (charityEmail) {
                ngoEntry.fields.charityEmail["en-US"] = charityEmail;
            }

            ngoEntry.fields.isVerified["en-US"] = false;

            ngoEntry = await ngoEntry.update();
            ngoEntry = await ngoEntry.publish();

            if (imageId) {
                let newImageAsset: Asset = await env.getAsset(imageId);
                await newImageAsset.publish();
            }

            if (verificationId) {
                let newPdfAsset: Asset = await env.getAsset(verificationId);
                await newPdfAsset.publish();
            }

            if (oldImageId) {
                // console.log(oldImageId);
                let oldImageAsset: Asset = await env.getAsset(oldImageId);
                await oldImageAsset.unpublish();
                await oldImageAsset.delete();
            }

            if (oldPdfId) {
                let oldPdfAsset: Asset = await env.getAsset(oldPdfId);
                await oldPdfAsset.unpublish();
                await oldPdfAsset.delete();
            }
            return ngoEntry;
        } catch (error) {
            try {
                if (imageId) {
                    let imageAsset: Asset = await env.getAsset(imageId);
                    await imageAsset.delete();
                }
                if (verificationId) {
                    let pdfAsset: Asset = await env.getAsset(verificationId);
                    await pdfAsset.delete();
                }
            } catch (err) {
                throw new Error("Cannot Delete existing resource");
            } finally {
                throw new Error(`Cannot update Ngo Entry and ${error.message}`);
            }
        }
    } catch (error) {
        return error.message;
    }
};
