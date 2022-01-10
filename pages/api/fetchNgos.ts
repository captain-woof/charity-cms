import { getAllNgo } from "../../lib/contentful";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    /**
     * /api/fetchNgos?userEmail=......[valid charity-email]
     * /api/fetchNgos?category=........[valid category]
     * /api/fetchNgos?slug=.....[Lions club = lions-club]
     * /api/fetchNgos?verified=true or false
     */

    try {
        const query = {
            category: req.query.category as string,
            userEmail: req.query.email as string,
            ngoSlug: req.query.slug as string,
        };
        let verified = req.query.verified as string;
        if (verified) {
            if (verified === "true") {
                query["isVerified"] = "true";
            } else {
                query["isVerified"] = "false";
            }
        }

        const ngoData = await getAllNgo(query);
        res.status(200).json(ngoData);
    } catch (e) {
        res.status(500).json(e.message);
    }
}
