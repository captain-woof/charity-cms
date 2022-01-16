import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { createAsset, createNgo } from "../../lib/management";
import { getCategories } from "../../lib/contentful";
// import { promises, readFileSync } from "fs";
import { Data } from "../../types/ngo";
import fs from "fs";
import { parseCookies } from "nookies";
import { verifyIdToken } from "../../utils/auth-server";

export const config = {
    api: {
        bodyParser: false,
    },
};
// interface Data {
//     fields: formidable.Fields;
//     files: formidable.Files;
// }

const capitalize = (text: string): string => {
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
};

// POST Payload: title, description, yearOfEstablish, charityEmail, contact, ownerName, category, image, verificationPdf 
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            // Check if user is authenticated
            const cookies = parseCookies({ req })
            if (cookies.token) {
                const { status } = await verifyIdToken(cookies.token)
                if (status) { // Only if user is authenticated
                    const data: Data = await new Promise((resolve, reject) => {
                        const form = new formidable.IncomingForm();
                        form.parse(req, (err, fields, files) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve({ fields, files });
                        });
                    });

                    const image = data.files.image as formidable.File;
                    const pdf = data.files.verificationPdf as formidable.File;
                    const contentOfImage = fs.readFileSync(image.filepath);
                    const contentOfPdf = fs.readFileSync(pdf.filepath);
                    let imageName = image.originalFilename;
                    let imageType = image.mimetype;
                    let pdfName = pdf.originalFilename;
                    let pdfType = pdf.mimetype;

                    const [imageId, pdfId] = await Promise.all([
                        createAsset(
                            { name: imageName, type: imageType },
                            contentOfImage
                        ), createAsset(
                            { name: pdfName, type: pdfType },
                            contentOfPdf
                        )])

                    const category = data.fields.category as string;
                    const response = await getCategories(category);
                    let categoryId: string;
                    // if (response.total === 0) {
                    //     categoryId = await createCategory(category);

                    categoryId = response.categories[0].id;

                    const newNgo = {
                        title: data.fields.title as string,
                        description: data.fields.description as string,
                        yearOfEstablish: parseInt(data.fields.yearOfEstablish as string),
                        charityEmail: data.fields.charityEmail as string,
                        contact: data.fields.contact as string,
                        ownerName: data.fields.ownerName as string,
                        categoryId: categoryId,
                        verificationId: pdfId,
                        imageId: imageId,
                    };

                    const ngoCreated = await createNgo(newNgo);

                    res.status(201).json(ngoCreated);
                }
            } else { // If not unauthenticated
                res.status(401).json({
                    message: "You must be authenticated!",
                });
            }
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
}
