import {Schema, model} from "mongoose"

const coursesModel = new Schema({
    courseName:{
        type: String,
        required: true
    },
    desciption:{
        type: String,
        required: true,
        maxLength: 54
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

export default model("Course", coursesModel)