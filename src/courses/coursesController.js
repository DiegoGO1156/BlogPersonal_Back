import Courses from "./coursesModel.js";

export const addCourse = async(req, res) =>{
    try {
        const data = req.body

        const coursesNew = await Courses.create({
            ...data
        })

        return res.status(200).json({
            msg: "Curso Creado con exito!",
            coursesNew
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const editCourses = async(req, res) =>{
    try {
        const { id } = req.params
        const {name, description} = req.body

        const editedCourse = await Courses.findByIdAndUpdate(id, {courseName: name, description: description}, {new: true})

        return res.stauts(200).json({
            msg: "Curso editado con exito!",
            editedCourse
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const deleteCourses = async(req,res) =>{
    try {
        const {id} = req.params

        await Courses.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            msg: "Curso eliminado con exito!",
            success: true
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const listCourses = async(req, res) =>{
    const query = { status: true };
    try {
        const {limite = 20, desde = 0 } = req.query;

        const [total, courses] = await Promise.all([
            Courses.countDocuments(query),
            Courses.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            courses
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}