import Comment from "./commentsModel.js"
import Publication from "../publications/publicationsModel.js"

export const addComment = async(req, res) =>{
    try {
        
        const data = req.body

        const findPublication = await Publication.findOne({title: data.publication})

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
        const query = {status: true}
        const {desde = 0} = req.query
        
        const list = await Comment.find(query).skip(Number(desde)).populate("title", "publication")
        const total = await Comment.countDocuments(query)

        return res.status(200).json({
            msg: "Comentarios encontrados con exito!",
            total,
            list
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }
}