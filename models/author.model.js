const {
    Schema,
    model
} = require("mongoose");

const AuthorSchema = Schema({

    name: {
        type: String,
        required: true
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

AuthorSchema.method("toJSON", function () {
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
});

module.exports = model('Author', AuthorSchema);