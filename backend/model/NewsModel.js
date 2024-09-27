import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})

const NewsSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    pubDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    guid: {
        type: String,
        required: true,
        unique: true
    },
    source: sourceSchema
});

export const NewsModel = mongoose.model('News', NewsSchema);