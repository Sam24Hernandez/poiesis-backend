const {
    Schema,
    model
} = require("mongoose");

const PublicationSchema = Schema({

    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    img: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

});

PublicationSchema.method("toJSON", function () {
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
});

module.exports = model('Publication', PublicationSchema);