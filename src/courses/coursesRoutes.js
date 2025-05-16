import { Router } from "express";
import { addCourse, deleteCourses, editCourses, listCourses } from "./coursesController.js";
import { validatorDeleteCourse, validatorRegisterCourse, validatorUpdateCourse } from "../middlewares/course-validator.js";
import { uploadPublicationsMedia } from "../middlewares/multer-Upload.js";
import { deleteFileOnError } from "../middlewares/delete-On-Error.js";

const router = Router()

router.post(
    "/newCourse",
    validatorRegisterCourse,
    uploadPublicationsMedia.single("mediaCourse"),
    deleteFileOnError,
    addCourse
)

router.put(
    "/editCourse/:id",
    validatorUpdateCourse,
    editCourses
)

router.get(
    "/",
    listCourses
)

router.delete(
    "/deleteCourse/:id",
    validatorDeleteCourse,
    deleteCourses
)

export default router