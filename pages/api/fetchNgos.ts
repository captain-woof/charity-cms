import { ngo } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /**
     * /api/fetchNgos?userEmail=......[valid charity-email]
     * /api/fetchNgos?category=........[valid category]
     */

    try {
        const ngoData = await ngo({
            category: req.query.category,
            userEmail: req.query.userEmail,
        });
        res.status(200).json(ngoData);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
