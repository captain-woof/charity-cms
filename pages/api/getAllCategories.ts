import { NextApiRequest,NextApiResponse } from "next";
import { getCategories } from "../../lib/contentful";

export default async function handler(req : NextApiRequest,res : NextApiResponse) {
    try{

        /**
         * api/getAllCategories?categoryName=..........[valid categoryName]
         */

        const categoryName = req.query.category as string 
        const categories = await getCategories(categoryName);

        res.status(200).json(categories);

    }catch(e){
        res.status(500).json(e.message);
    }
}