import { getTotalTransaction } from "../../lib/contentful";
import { NextApiRequest,NextApiResponse } from "next";

export default async(req : NextApiRequest,res : NextApiResponse)=>{
    try{
        const totalAmountData = await getTotalTransaction();
        res.status(200).json(totalAmountData);
    }catch(e){
        res.status(500).json(e.message);
    }
}