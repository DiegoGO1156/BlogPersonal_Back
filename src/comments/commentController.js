import Comment from "./commentsModel.js"
import Publication from "../publications/publicationsModel.js"

export const addComment = async(req, res) =>{
    try {
        
        const data = req.body

        const findPublication = await Publication.findOne({title: data.publication})

        if(data.author === ""){
            data.author = "Anonimo"
        }

        const newComment = await Comment.create({
            ...data,
            publication: findPublication
        })

        return res.status(200).json({
            msg: "Comentario realizado con exito!",
            newComment
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const deleteComment = async(req, res) =>{
    try {

        const { id } = req.params

        await Comment.findByIdAndUpdate(id, {status: false}, {new: true})

        return res.status(200).json({
            msg: "Comentario eliminado con exito!"
        })
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

export const listCommentTitle = async(req, res) =>{
    try {
        const { title, desde = 0, limite = 50 } = req.query; 
        const query = { status: true };

        const publications = await Publication.find({
            title: { $regex: title, $options: 'i' },
            status: true
        }).select('_id'); 

        if (publications.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No se encontraron publicaciones con ese título"
            });
        }

        const publicationIds = publications.map(pub => pub._id);
        
        const [total, comments] = await Promise.all([
            Comment.countDocuments({ ...query, publication: { $in: publicationIds } }),
            Comment.find({ ...query, publication: { $in: publicationIds } })
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('publication', 'title')
        ]);

        return res.status(200).json({
            success: true,
            msg: "Comentarios encontrados con éxito!",
            total,
            comments
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}