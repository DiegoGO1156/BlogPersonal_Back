import { Router } from "express";
import { addPublication, deletePublication, listPublications } from "./publicationsController.js";
import { uploadPublicationsMedia } from "../middlewares/multer-Upload.js";
import { deleteFileOnError } from "../middlewares/delete-On-Error.js"
import { validatorDeletePublication, validatorPublication } from "../middlewares/publication-validator.js";

const router = Router()

router.post(
    "/newPublication",
    validatorPublication,
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
    validatorDeletePublication,
    deletePublication
)

export default router