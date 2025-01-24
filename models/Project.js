const { Schema, models, model } = require('mongoose');

const ProjectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    client: { type: String },
    projectCategory: [{ type: String }],
    tags: [{ type: String }],
    livePreview: { type: String },
    status: { type: String },

}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Project = models.Project || model('Project', ProjectSchema, 'projects');