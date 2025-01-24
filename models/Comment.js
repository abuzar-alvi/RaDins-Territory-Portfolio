const { Schema, models, model } = require('mongoose');

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentPara: { type: String },
    mainComment: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' }, // reference to parent comment
    children: { type: Schema.Types.ObjectId, ref: 'Comment' }, // Array of child comments
    parentName: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Comment = models.Comment || model('Comment', CommentSchema, 'comments');