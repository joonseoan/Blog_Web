const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true, maxLength: 256 },
    company: { type: String, required: true, maxLength: 256 },
    location: { type: String, required: true, maxLength: 128 },
    position: { type: String, required: true, maxLength: 256 },
    description: { type: String, required: true, maxLength: 2048 },
    startDate: { type: Date },
    endDate: { type: Date }
});

mongoose.model('Portfolio', portfolioSchema);

