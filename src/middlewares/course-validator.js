import { body, param } from "express-validator";
import { existCourse, noExistIdCourse, statusCourse } from "../helpers/db-Validator.js";
import { validarCampos } from "./validar-campos.js";

export const validatorRegisterCourse = [
    body("courseName", "Ingrese un Nombre para el curso").notEmpty(),
    body("courseName").custom(existCourse),
    body("description", "El máximo de caracteres son 54").isLength({max: 54}),
    body("description", "Ingrese una descripción para el curso").notEmpty(),
    validarCampos
]

export const validatorUpdateCourse = [
    param("id", "Ingrese un Id valido").isMongoId(),
    param("id").custom(noExistIdCourse),
    body("courseName", "Ingrese un Nombre para el curso").notEmpty(),
    body("courseName").custom(existCourse),
    body("description", "El máximo de caracteres son 54").isLength({max: 54}),
    body("description", "Ingrese una descripción para el curso").notEmpty(),
    validarCampos
]

export const validatorDeleteCourse = [
    param("id", "Ingrese un Id valido").isMongoId(),
    param("id").custom(noExistIdCourse),
    param("id").custom(statusCourse),
    validarCampos
]