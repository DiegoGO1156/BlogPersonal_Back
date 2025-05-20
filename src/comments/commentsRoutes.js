import { Router } from "express";
import { addComment, deleteComment, editComment, listCommentTitle } from "./commentController.js";
//import { validatorComment, validatorDeleteComment } from "../middlewares/comment-validator.js";


const router = Router()

router.post(
    "/newComment",
    //validatorComment,
    addComment
)

router.put(
    "/editComment/:id",
    editComment
)

router.delete(
    "/deleteComment/:id",
    //validatorDeleteComment,
    deleteComment
)

router.get(
    "/",
    listCommentTitle
)

export default router