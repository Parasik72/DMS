const {User, Document} = require('../models');
const config = require('config');
const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const editFile = async (file, body) => {
    file.type = body.type;
    file.title = body.title,
    file.uploadedBy = body.uploadedBy,
    file.fileName = body.fileName,
    file.fileType = body.fileType,
    file.filePath = body.filePath
    await file.save();
}

class Controller {
    // /api/docs/ 'POST'
    async upload(req,res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({message: errors.errors[0].msg});
            const {type, title, owner} = req.body;
            const {file} = req.files;
            const user = req.user;
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const checkFile = await Document.findOne({
                owner,
                type,
                title
            });
            if(checkFile)
                return res.status(400).json({message: 'Document is already exists.'});
            const filePath = config.get('filePath') + "\\" + owner;
            if(fs.existsSync(path.join(filePath, file.name)))
                return res.status(400).json({message: 'Document is already exists.'});
            if(!fs.existsSync(filePath))
                fs.mkdirSync(filePath, {recursive: true}, e => e && console.log(e));
            file.mv(path.join(filePath, file.name));
            const fileType = file.name.split('.').pop();
            const doc = await Document.create({
                type,
                title,
                owner,
                uploadedBy: user._id,
                fileName: file.name,
                fileType,
                filePath
            });
            return res.status(200).json({doc});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Upload error.'});
        }
    }

    // /api/docs/ 'GET'
    async get(req, res){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({message: errors.errors[0].msg});
            const user = await User.findById(req.user.userId);
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const files = await Document.find({
                owner: user._id
            })
                .populate('owner')
                .populate('uploadedBy');
            return res.status(200).json({files});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Get error.'});
        }
    }

    // /api/docs/get 'GET'
    async getById(req, res) {
        try {
            const {id} = req.query;
            if(!id)
                return res.status(400).json({message: 'User was not found.'});
            const user = req.user;
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const files = await Document.find({owner: id})
                .populate('owner')
                .populate('uploadedBy');
            return res.status(200).json({files});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Get by id error.'});
        }
    }

    // /api/docs/download 'GET'
    async download(req, res) {
        try {
            const {id} = req.query;
            if(!id)
                return res.status(400).json({message: 'Document was not found.'});
            const user = await User.findById(req.user.userId);
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const file = await Document.findById(id);
            if(!file)
                return res.status(400).json({message: 'Document was not found.'});
            return res.status(200).download(path.join(file.filePath, file.fileName), file.fileName);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Download error.'});
        }
    }

    // /api/docs/ 'PUT'
    async edit(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({message: errors.errors[0].msg});
            const {type, title,owner, fileId} = req.body;
            let file;
            let bflagFile = true;
            if(req.files?.file)
                file = req.files.file;
            else if(req.body.file){
                file = JSON.parse(req.body.file);
                bflagFile = false;
            }
            else
                return res.status(400).json({message: 'Document was not found.'});
            const user = req.user;
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const checkFile = await Document.findById(fileId);
            if(!checkFile)
                return res.status(400).json({message: 'Document was not found.'});
            const checkTitle = await Document.findOne({title});
            if(checkTitle && checkTitle.title !== checkFile.title)
                return res.status(400).json({message: 'This title is already in use.'});
            if(!fs.existsSync(path.join(checkFile.filePath, checkFile.fileName)))
                return res.status(400).json({message: 'Document was not found.'});
            const tempName = file.name;
            let fileType = file.name.split('.').pop();
            let fileName = checkFile.fileName;
            if(bflagFile){
                fileName = tempName;
                fs.unlinkSync(path.join(checkFile.filePath, checkFile.fileName));
                file.mv(path.join(checkFile.filePath, fileName));
            }else
                fileType = checkFile.fileType;
            const filePath = config.get('filePath') + "\\" + owner;
            editFile(checkFile, {
                type,
                title,
                uploadedBy: user._id,
                fileName: fileName,
                fileType,
                filePath
            });
            return res.status(200).json({file: checkFile});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Edit error.'});
        }
    }

    // /api/docs/ 'DELETE'
    async delete(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty())
                return res.status(400).json({message: errors.errors[0].msg});
            const {fileId} = req.body;
            const user = req.user;
            if(!user)
                return res.status(401).json({message: 'No authorization.'});
            const checkFile = await Document.findById(fileId);
            if(!checkFile)
                return res.status(400).json({message: 'Document was not found.'});
            if(!fs.existsSync(path.join(checkFile.filePath, checkFile.fileName)))
                return res.status(400).json({message: 'Document was not found.'});
            fs.unlinkSync(path.join(checkFile.filePath, checkFile.fileName));
            checkFile.remove();
            return res.status(200).json({message: 'Document was deleted!'});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Delete error.'});
        }
    }
}

module.exports = new Controller();