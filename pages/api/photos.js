import { mongooseConnect } from "@/lib/mongoose";
import { Photos } from "@/models/Photo";


export default async function handle(req, res) {

    // if authenticated, connect to the mongoDb
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single photo by id
            const photo = await Photos.findById(req.query.id);
            res.json(photo);
        } else {
            // fetch all photos
            const photos = await Photos.find();
            res.json(photos.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}