import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {

    // if authenticated, connect to mongoDb
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single blog by id
            const blog = await Blog.findById(req.query.id);
            res.json(blog);
        } else if (req.query?.tags) {
            // fetch blog by tags
            const blogTags = await Blog.find({ tags: req.query.tags });
            res.json(blogTags);
        } else if (req.query?.blogCategory) {
            // fetch blog by category
            const blogCate = await Blog.find({ blogCategory: req.query.blogCategory });
            res.json(blogCate);
        } else if (req.query?.slug) {
            // fetch blog by slug
            const blogSlug = await Blog.find({ slug: req.query.slug });
            res.json(blogSlug.reverse());
        } else {
            // fetch all blogs
            const blogs = await Blog.find();
            res.json(blogs.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }

}