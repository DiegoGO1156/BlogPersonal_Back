import { Router } from "express";
import { addComment, deleteComment, listCommentTitle } from "./commentController.js";


const router = Router()

router.post(
    "/newComment",
    addComment
)

router.delete(
    "/deleteComment/:id",
    deleteComment
)

router.get(
    "/",
    listCommentTitle
)

export default router