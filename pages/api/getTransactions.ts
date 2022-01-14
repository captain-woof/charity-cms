//testing purpose

import { fetchAllTransactions } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let slug = req.query.slug as string;
    let fromDate = req.query.fromDate as string;
    let toDate = req.query.toDate as string;
    let d1 = null;
    let d2 = null;
    if (fromDate) {
        d1 = new Date(fromDate);
    }
    if (toDate) {
        d2 = new Date(toDate);
    }

    try {
        const transaction = await fetchAllTransactions(slug, d1, d2);
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
