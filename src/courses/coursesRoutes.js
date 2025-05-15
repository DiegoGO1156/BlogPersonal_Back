import { Router } from "express";
import { addCourse, deleteCourses, editCourses, listCourses } from "./coursesController.js";

const router = Router()

router.post(
    "/newCourse",
    addCourse
)

router.put(
    "/editCourse/:id",
    editCourses
)

router.get(
    "/",
    listCourses
)

router.delete(
    "/deleteCourse/:id",
    deleteCourses
)

export default router