const authorModel = require("../models/authorModel");
const blogModel = require("../models/blogModel");
// var validator = require('validator')

let bolgSchemaValidation = async function (req, res, next) {
    try {
        let data = req.body
        if (data.title) {
            if (typeof (data.title) === "string") {
                if (data.body) {
                    if (typeof (data.body) === "string") {
                        if (data.authorId) {
                            let check = await authorModel.findById(data.authorId)
                            if (check != null) {
                                if (typeof (data.tags) === "string" || !(data.tags)) {
                                    if (data.category) {
                                        if (typeof (data.category) === "string") {
                                            if (typeof (data.subcategory) === "string" || !(data.subcategory)) {
                                                if ((/^(true|false|True|False|TRUE|FALSE)$/).test(data.isPublished) && typeof (data.isPublished) != "string"
                                                ) {
                                                    next()
                                                } else {
                                                    res.status(400).send({ status :false, message: "please give publisher true or false" })
                                                }
                                            } else {
                                                res.status(400).send({ status:false, message: "please give subcategory in string" })
                                            }
                                        } else {
                                            res.status(400).send({ status:false, message: "please give category in string" })
                                        }
                                    } else {
                                        res.status(400).send({ status:false, message: "category is mandatory" })
                                    }
                                } else {
                                    res.status(400).send({ status:false, message: "please give tags in string" })
                                }
                            } else {
                                res.status(400).send({ status:false, message: "author not valid" })
                            }
                        } else {
                            res.status(400).send({ status:false, message: "authorId is mandatory" })
                        }
                    } else {
                        res.status(400).send({ status:false, message: "please give body in string" })
                    }
                } else {
                    res.status(400).send({ status:false, message: "body is mandatory" })
                }
            } else {
                res.status(400).send({ status:false, message: "please give title in string" })
            }
        } else {
            res.status(400).send({ status:false, message: "title is mandatory" })
        }
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}

module.exports.bolgSchemaValidation = bolgSchemaValidation

////////////////////////////////////////////////////////////////////

let blogIdValidate = async function (req, res, next) {
    try {
        let blogId = req.params.blogId
        let check = await blogModel.findById(blogId)
        if (!check) {
            return res.status(404).send({ status: false, msg: "" })
        }

        next()
    }
    catch (err) {
        res.status(500).send({ error: err.message })
    }
}
module.exports.blogIdValidate = blogIdValidate


//////////////////////////////////////////////////////////////////////////////////

// const valid = function (value){
//     if (typeof value !==string || value.trim().length == 0){return false}
//     return true
// }

// const blogValid = async function(req,res,next){

//     try{

//     let reqData = req.body
//     if(!reqData.title){return res.status(400).send({status: false, message: "title is required"})}

//     if(!reqData.body){return res.status(400).send({status: false, message: "body is required"})}

//     if(!reqData.authorId){return res.status(400).send({status: false, message: "authorId is required"})}

//     if(!reqData.category){return res.status(400).send({status: false, message: "category is required"})}


//     if(!valid(reqData.title)){return res.status(400).send({status: false, message: "title is not valid"})}

//     if(!valid(reqData.body)){return res.status(400).send({status: false, message: "body is not valid"})}

//     if(!valid(reqData.category)){return res.status(400).send({status: false, message: "category is not valid"})}


//     if(reqData.subcategory){
//         for (let i = 0;i<reqData.subcategory.length;i++){
//             if(!valid(reqData.subcategory[i])) {return res.status(400).send({status: false, message: "subcategory is not valid"})}
//         }
//     }

//     if(reqData.tags){
//         for (let i = 0;i<reqData.tags.length;i++){
//             if(!valid(reqData.tags[i])) {return res.status(400).send({status: false, message: "tags is not valid"})}
//         }
//     }

//     if(reqData.isPublished){if(reqData.isPublished !== "boolean") {return res.status(400).send({status: false, message: "isPublished must be in boolean"})}}
    
//     next()
// }
// catch(err){
//     res.status(500).send({ error: err.message })
// }
// }


// module.exports.blogValid = blogValid



// //////////////////////////////////////////////////////////////////////////////


// let blogIdValidate = async function (req, res, next) {
//     try {
//         let blogId = req.params.blogId
//         let check = await blogModel.findById(blogId)
//         if (!check) {
//             return res.status(404).send({ status: false, msg: "" })
//         }

//         next()
//     }
//     catch (err) {
//         res.status(500).send({ error: err.message })
//     }
// }
// module.exports.blogIdValidate = blogIdValidate