import { Router } from "express";
import { addCourse, deleteCourses, editCourses, listCourses } from "./coursesController.js";
import { validatorDeleteCourse, validatorRegisterCourse, validatorUpdateCourse } from "../middlewares/course-validator.js";

const router = Router()

router.post(
    "/newCourse",
    validatorRegisterCourse,
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