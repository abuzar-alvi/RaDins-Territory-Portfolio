const { Schema, models, model } = require('mongoose');

const BlogSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],

}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Blog = models.Blog || model('Blog', BlogSchema, 'blogs');