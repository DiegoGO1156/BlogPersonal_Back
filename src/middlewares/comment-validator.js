import { body, param } from "express-validator";
import { existCommentById, existPublicationByTitle } from "../helpers/db-Validator.js";
import { validarCampos } from "./validar-campos.js";


export const validatorComment = [
    body("comment", "Ingrese un comentario").notEmpty(),
    body("comment", "El mínimo de caracteres es 1").isLength({min: 1}),
    body("comment", "El máximo de caracteres es 140").isLength({max: 140}),
    body("publication", "Ingrese el titulo de la publicación para poder comentar").notEmpty(),
    body("publication").custom(existPublicationByTitle),
    validarCampos
]

export const validatorDeleteComment = [
    param("id", "Ingrese un ID valido").isMongoId(),
    param("id").custom(existCommentById),
    validarCampos
]