import type { NextApiResponse, NextApiRequest } from "next";
import { createAsset } from "../../lib/management";

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // const jsonData = req.query.jsonData;
        // await createAsset(jsonData,file);

        /**
         * this have to be a post method
         * asset id will be returned
         *
         */
        if (req.method == "POST") {
            const fileType = req.body.data;
            const file = req.body.file;
            const asset = await createAsset(fileType, file);
            
            res.status(201).json({ id: asset });

            // console.log(req.body)
        } else {
            res.status(405).send("not allowed");
        }
    } catch (e) {
        res.status(500).json(e.message);
    }
}
