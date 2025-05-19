import { Router } from "express";
import { addComment, deleteComment, listCommentTitle } from "./commentController.js";
import { validatorComment, validatorDeleteComment } from "../middlewares/comment-validator.js";


const router = Router()

router.post(
    "/newComment",
    //validatorComment,
    addComment
)

router.delete(
    "/deleteComment/:id",
    validatorDeleteComment,
    deleteComment
)

router.get(
    "/",
    listCommentTitle
)

export default router