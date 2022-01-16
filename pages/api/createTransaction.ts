import { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../../types/ngo";
import formidable from "formidable";
import { createTransaction } from "../../lib/management";
import { parseCookies } from "nookies";
import { verifyIdToken } from "../../utils/auth-server";
//default bodyparser false
export const config = {
    api: {
        bodyParser: false,
    },
};

// POST payload: slug (ngo), id (of tx), amount (of money) 
export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
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

                    let ngoSlug = data.fields.slug as string;
                    let transactionId = data.fields.id as string;
                    let amount = parseFloat(data.fields.amount as string);

                    await createTransaction(ngoSlug, transactionId, amount);

                    res.status(201).json({ message: "success! new Transaction created" });
                }
            } else { // If not unauthenticated
                res.status(401).json({
                    message: "You must be authenticated!",
                });
            }
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}
