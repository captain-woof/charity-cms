import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { createAsset, updateNgo } from "../../lib/management";
import { getCategories } from "../../lib/contentful";
import formidable from "formidable";
import { Data } from "../../types/ngo";
import { parseCookies } from "nookies";
import { verifyIdToken } from "../../utils/auth-server";
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST" || req.method === "PUT") {
            // Check if user is authenticated
            const cookies = parseCookies({ req });
            if (cookies.token) {
                const { status } = await verifyIdToken(cookies.token);
                if (status) {
                    // Only if user is authenticated
                    const data: Data = await new Promise((resolve, reject) => {
                        const form = new formidable.IncomingForm();
                        form.parse(req, (err, fields, files) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve({ fields, files });
                        });
                    });
                    // console.log(data);
                    let imageId: string;
                    let pdfId: string;
                    let categoryId: string;
                    if (data.files.image) {
                        const image = data.files.image as formidable.File;
                        const contentOfImage = fs.readFileSync(image.filepath);
                        let imageName = image.originalFilename;
                        let imageType = image.mimetype;
                        imageId = await createAsset(
                            { name: imageName, type: imageType },
                            contentOfImage
                        );
                    }

                    if (data.files.pdf) {
                        const pdf = data.files.pdf as formidable.File;
                        const contentOfPdf = fs.readFileSync(pdf.filepath);
                        let pdfName = pdf.originalFilename;
                        let pdfType = pdf.mimetype;
                        pdfId = await createAsset(
                            { name: pdfName, type: pdfType },
                            contentOfPdf
                        );
                    }

                    if (data.fields.category) {
                        const category = data.fields.category as string;
                        const response = await getCategories(category);

                        // if (response.total === 0) {
                        //     categoryId = await createCategory(category);

                        categoryId = response.categories[0].id;
                    }

                    const updatedNgo = {
                        title: data.fields.title as string,
                        description: data.fields.description as string,
                        yearOfEstablish: parseInt(data.fields.yearOfEstablish as string),
                        charityEmail: data.fields.charityEmail as string,
                        contact: data.fields.contact as string,
                        ownerName: data.fields.ownerName as string,
                    };
                    const ngoId = data.fields.id as string;
                    if (imageId) {
                        updatedNgo["imageId"] = imageId;
                    }

                    if (pdfId) {
                        updatedNgo["verificationId"] = pdfId;
                    }

                    if (categoryId) {
                        updatedNgo["categoryId"] = categoryId;
                    }
                    // console.log(updatedNgo);
                    let newNgo = await updateNgo(ngoId, updatedNgo);
                    
                    res.status(200).json(newNgo);
                }
            } else {
                // If not unauthenticated
                res.status(401).json({
                    message: "You must be authenticated!",
                });
            }
        } else {
            res.status(405).json({
                message: "This method is not allowed only post/put required",
            });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
