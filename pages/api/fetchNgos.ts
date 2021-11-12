import { ngo } from "../../lib/contentful";
import type {NextApiRequest,NextApiResponse} from 'next'

export default async function handler(req : NextApiRequest,res : NextApiResponse){
  
  try{
    const ngoData : any  = await ngo();
    res.status(200).json(ngoData);
  }catch(e){
    res.status(500).json(e.message);
  }
}