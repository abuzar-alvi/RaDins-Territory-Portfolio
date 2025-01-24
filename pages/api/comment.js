import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

export default async function handle(req, res) {
    // if authenticated, connect to mongoDb
    await mongooseConnect();

    if (method === 'POST') {
        try {
            const { name, email, title, contentPara, mainComment, parent } = req.body;

            let commentDoc;
            if (parent) {
                // if parent comment id is provided, create a child comment
                commentDoc = await Comment.create({
                    name, email, title, contentPara, parent: parent
                });

                // update parent comment's children array
                await Comment.findByIdAndUpdate(parent, {
                    $push: { children: commentDoc._id }
                })
            } else {
                // otherwise, create a root comment
                commentDoc = await Comment.create({
                    name, email, title, contentPara
                });
            }

            res.status(201).json(commentDoc); // respond with 201 created status
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({error: 'Failed to create comment'})
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`)
    }
}
