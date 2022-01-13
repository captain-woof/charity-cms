//testing purpose

import { fetchAllTransactions } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let slug = req.query.slug as string;
    try {
        const transaction = await fetchAllTransactions(slug);
        res.status(200).json(transaction);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
