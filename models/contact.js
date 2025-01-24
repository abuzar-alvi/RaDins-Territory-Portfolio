const { Schema, models, model } = require('mongoose');

const ContactSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true },
    country: { type: String },
    project: [{ type: String }],
    price: { type: String },
    description: { type: String },
}, {
    timestamps: true, // this will automatically manage createdAt and updatedAt
});

export const Contact = models.Contact || model('Contact', ContactSchema, 'contacts');