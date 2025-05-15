import { Schema, model } from "mongoose";


const publicationModel = new Schema({
    author:{
        type: String,
        default: "Anonimus"
    },
    title:{
        type: String,
        required: true,
        minLength: 10,
        maxLength: 80
    },
    bodyPublication:{
        type: String,
        required: true,
        minLength: 20,
        maxLength: 250
    },
    media:{
        type: String
    },
    status:{
        type: Boolean,
        default: true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Publication", publicationModel)