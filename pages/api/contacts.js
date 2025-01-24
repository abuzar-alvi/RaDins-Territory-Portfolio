import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";

export default async function handle(req, res) {

    // if authenticated, connect to mongoDb
    await mongooseConnect();

    const { method } = req;
    if (method === 'POST') {
        try {
            const { name, lastName, email, company, phone, country, project, price, description } = req.body;

            const contactDoc = await Contact.create({
                name, lastName, email, company, phone, country, project, price, description
            });

            res.status(201).json(contactDoc); // respond with 201 created status
        } catch (error) {
            console.error('Error creating contact:', error);
            res.status(500).json({error: 'Failed to create contact'});
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`method ${method} not allowed!`);
    }
}
