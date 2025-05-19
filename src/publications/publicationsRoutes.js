import { Router } from "express";
import { addPublication, deletePublication, listPublications, listPublicationById } from "./publicationsController.js";
import { uploadPublicationsMedia } from "../middlewares/multer-Upload.js";
import { deleteFileOnError } from "../middlewares/delete-On-Error.js"
import { validatorDeletePublication } from "../middlewares/publication-validator.js";

const router = Router()

router.post(
    "/newPublication",
    //validatorPublication,
    uploadPublicationsMedia.single("media"),
    deleteFileOnError,
    addPublication
)

router.get(
    "/",
    listPublications
)

router.get(
    "/:id",
    listPublicationById
)

router.delete(
    "/deletePublication/:id",
    validatorDeletePublication,
    deletePublication
)

export default router