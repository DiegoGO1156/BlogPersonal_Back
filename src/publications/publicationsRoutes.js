import { Router } from "express";
import { addPublication, deletePublication, listPublications } from "./publicationsController.js";
import { uploadPublicationsMedia } from "../middlewares/multer-Upload.js";
import { deleteFileOnError } from "../middlewares/delete-On-Error.js"

const router = Router()

router.post(
    "/newPublication",
    uploadPublicationsMedia.single("mediaPublication"),
    deleteFileOnError,
    addPublication
)

router.get(
    "/",
    listPublications
)

router.delete(
    "/deletePublication/:id",
    deletePublication
)

export default router