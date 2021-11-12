import { allTransaction } from "../../lib/contentful";
import { NextApiRequest,NextApiResponse } from "next";

export default async (req : NextApiRequest,res : NextApiResponse)=>{
    try{
        const transactionData = await allTransaction();
        res.status(200).json(transactionData)
    }catch(e){
        res.status(500).json(e.message);
    }
}