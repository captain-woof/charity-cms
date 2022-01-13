//testing purpose

import { fetchAllTransactions } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /**
     * /api/fetchNgos?userEmail=......[valid charity-email]
     * /api/fetchNgos?category=........[valid category]
     * /api/fetchNgos?slug=.....[Lions club = lions-club]
     * /api/fetchNgos?verified=true or false
     */
    let slug = req.query.slug as string;
    try {
        const transaction = await fetchAllTransactions(slug);
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
