import {body, param} from "express-validator"
import { existTitlePublication, noExistCoursePublication, noExistPublicationId } from "../helpers/db-Validator.js"
import { validarCampos } from "./validar-campos.js"

export const validatorPublication = [
    body("title", "Ingrese un titulo para la publicación").notEmpty(),
    body("title").custom(existTitlePublication),
    body("title", "El máximo de caracteres para el titulo es de 80").isLength({max: 80}),
    body("title", "El mínimo de caracteres para el titulo es de 10").isLength({min: 10}),
    body("bodyPublication", "Ingrese la publicacion").notEmpty(),
    body("bodyPublication", "El máximo de caracteres es de 250").isLength({max: 250}),
    body("bodyPublication", "El mínimo de caracteres es de 20").isLength({min: 20}),
    body("course", "Ingrese el curso al que pertenece la publicación").notEmpty(),
    body("course").custom(noExistCoursePublication),
    validarCampos
]

export const validatorDeletePublication = [
    param("id", "Ingrese un ID valido").isMongoId(),
    param("id").custom(noExistPublicationId),
    validarCampos
]