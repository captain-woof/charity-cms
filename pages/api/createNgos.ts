import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { createAsset, createCategory, createNgo } from "../../lib/management";
import { getCategories } from "../../lib/contentful";
// import { promises, readFileSync } from "fs";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false,
    },
};
interface Data {
    fields: formidable.Fields;
    files: formidable.Files;
}

const capitalize = (text: string): string => {
    return text.replace(/\b\w/g, (l) => l.toUpperCase());
};
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
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

            const imageId = await createAsset(
                { name: imageName, type: imageType },
                contentOfImage
            );
            const pdfId = await createAsset(
                { name: pdfName, type: pdfType },
                contentOfPdf
            );

            const category = capitalize(data.fields.category as string);
            const response = await getCategories(category);
            let categoryId: string;
            if (response.total === 0) {
                categoryId = await createCategory(category);
            } else {
                categoryId = response.categories[0].id;
            }

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

            res.status(200).json(ngoCreated);
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
}
