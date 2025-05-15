import Publication from "./publicationsModel.js";
import Course from "../courses/coursesModel.js"


export const addPublication = async(req, res) =>{
    try {
        const data = req.body

        const courseFind = await Course.findOne({courseName: data.course})

        let picturePublication = req.file ? req.file.filename : null

        if(data.author === ""){
            data.author = "Anonimus"
        }

        const addPublication = await Publication.create({
            ...data,
            media: picturePublication,
            course: courseFind  
        })

        return res.status(200).json({
            msg: "Publicación creada con exito!",
            addPublication
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const deletePublication = async(req, res) =>{
    try {
        const { id } = req.params

        await Publication.findByIdAndDelete(id)

        return res.status(200).json({
            msg: "Publicación eliminada con exito!"
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const listPublications = async(req, res) =>{
    const query = {status: true}
    const {desde = 0, limite = 20} = req.query
    try {
        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query).skip(Number(desde)).limit(Number(limite)).populate("course", "courseName")
        ])

        return res.status(200).json({
            msg: "Publicaciones encontradas con exito!",
            total,
            publications
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}