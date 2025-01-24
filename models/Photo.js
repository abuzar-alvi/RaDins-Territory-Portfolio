const { Schema, models, model } = require('mongoose');

const PhotoSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Photos = models.Photos || model('Photos', PhotoSchema, 'photos');