import { getAllNgo } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /**
     * /api/fetchNgos?userEmail=......[valid charity-email]
     * /api/fetchNgos?category=........[valid category]
     * /api/fetchNgos?slug=.....[Lions club = lions-club]
     */

    try {
        const ngoData = await getAllNgo({
            category: req.body.category as string,
            userEmail: req.body.email as string,
            ngoSlug: req.body.slug as string,
        });
        res.status(200).json(ngoData);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
