import {Schema, model} from "mongoose"

const commentModel = new Schema({
    comment:{
        type: String,
        minLength: 1,
        maxLength: 140,
        required: true
    },
    author:{
        type: String,
        default: "Anonimo"
    },
    publication:{
        type: Schema.Types.ObjectId,
        ref: "Publication",
        required: true
    },
    status:{
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Comment", commentModel)