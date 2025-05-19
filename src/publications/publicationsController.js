import Publication from "./publicationsModel.js";
import Course from "../courses/coursesModel.js"

export const addPublication = async(req, res) =>{
    try {
        const data = req.body

        const courseFind = await Course.findOne({courseName: data.course})

        let picturePublication = req.file ? req.file.filename : null

        if(data.author === ""){
            data.author = "Anonimo"
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
        console.log(err)
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const deletePublication = async(req, res) =>{
    try {
        const { id } = req.params

        await Publication.findByIdAndUpdate(id, {status: false}, {new: true})

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

export const listPublications = async(req, res) => {
    try {
        const { desde = 0, limite = 20, courseName } = req.query;
        const query = { status: true };
        
        if (courseName) {
            query["course"] = await Course.find({ 
                courseName: { $regex: courseName, $options: 'i' },
                status: true
            }).distinct('_id');
        }

        const [total, publications] = await Promise.all([
            Publication.countDocuments(query),
            Publication.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
                .populate({
                    path: 'course',
                    select: 'courseName description',
                    match: { status: true }
                })
        ]);

        const filteredPubs = publications.filter(pub => pub.course);
        
        return res.status(200).json({
            success: true,
            total: filteredPubs.length,
            publications: filteredPubs
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        });
    }
}

export const listPublicationById = async(req, res) =>{
    try {
        const {id} = req.params

        const findPublication = await Publication.findById(id)

        return res.status(200).json({
            msg: "Publicación encontrada con exito",
            findPublication
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}