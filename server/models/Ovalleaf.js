import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const OvalleafSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId()
    },
    visits: Array,
    inbox: Array,
    login: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

const Ovalleaf = mongoose.model('Ovalleaf', OvalleafSchema);
module.exports = Ovalleaf;