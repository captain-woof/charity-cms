import { NextApiRequest, NextApiResponse } from 'next'

// /api/imageproxy?url=IMAGE_URL
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.body.url) { // If no image url is provided
        res.status(404).send(null)
    }
    let imageUrl = decodeURIComponent(req.body.url as string)
    let imageRes = await fetch(imageUrl)
    if (!imageRes.ok) { // If image was not retrieved
        res.status(404).send(null)
    }
    let imageData = imageRes.body
    res.status(200).send(imageData)
}

export default handler