import { Router } from "express";
import { addCourse, deleteCourses, editCourses, listCourses } from "./coursesController.js";

const router = Router()

router.post(
    "/newCourse",
    addCourse
)

router.put(
    "/editCourse",
    editCourses
)

router.post(
    "/",
    listCourses
)

router.delete(
    "/deleteCourse",
    deleteCourses
)

export default router