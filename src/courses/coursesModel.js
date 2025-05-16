import {Schema, model} from "mongoose"

const coursesModel = new Schema({
    courseName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        maxLength: 54
    },
    status:{
        type: Boolean,
        default: true
    },
    media:{
        type: String
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

export default model("Course", coursesModel)