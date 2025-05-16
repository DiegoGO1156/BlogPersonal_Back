import Comment from "../comments/commentsModel.js";
import Course from "../courses/coursesModel.js";
import Publication from "../publications/publicationsModel.js";


////////////////////////////////////////// VALIDACIONES PARA CURSOS //////////////////////////////////////////
 
export const existCourse = async(courseName = "") =>{
    const exist = await Course.findOne({courseName: courseName})
    if(exist){
        throw new Error(`El curso ${courseName} ya esta registrado`)
    }
}

export const noExistIdCourse = async(id = "") =>{
    const existCourse = await Course.findById(id)
    if(!existCourse){
        throw new Error(`El Id ${id} no pertenece a ningun curso`)
    }
}

export const statusCourse = async(id = "") =>{
    const existCourseFalse = await Course.findById(id)
    if(existCourseFalse.status === false){
        throw new Error(`El curso ${existCourseFalse.courseName} ya fue eliminado`)
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// VALIDACIONES PARA CURSOS //////////////////////////////////////////

export const noExistCoursePublication = async(course = "") =>{
    const existCourse = await Course.findOne({courseName: course})
    if(!existCourse || existCourse.status === false){
        throw new Error(`El curso ${existCourse.courseName} no esta registrado o fue deshabilitado`)
    }
}

export const existTitlePublication = async(title = "") =>{
    const existTitle = await Publication.findOne({title: title})
    if(existTitle){
        throw new Error(`El titulo ${title} ya fue utilizado para otra publicación`)
    }
}

export const noExistPublicationId = async(id = "") =>{
    const existPublication = await Publication.findById(id)
    if(!existPublication){
        throw new Error(`El id ${id} no pertenece a ninguna publicación`)
    }else if(existPublication.status === false){
        throw new Error(`La publicación ${existPublication.title} ya fue eliminada`)
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////// VALIDACIONES PARA COMENTARIOS ////////////////////////////////////////

export const existPublicationByTitle = async(publication = "") =>{
    const existPublication = await Publication.findOne({title: publication})
    if(!existPublication){
        throw new Error(`La publicación ${publication} no esta registrada`)
    }else if(existPublication.status === false){
        throw new Error(`La publicación ${publication.title} fue eliminada`)
    }
}

export const existCommentById = async(id = "") => {
    const existComment = await Comment.findById(id)
    if(!existComment){
        throw new Error(`El Id ${id} no pertence a ningun comentario`)
    }else if(existComment.status === false){
        throw new Error(`El commentario con ID ${existComment._id} ya fue eliminado`)
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////