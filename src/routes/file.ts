import  { processFileMiddleware } from "../middleware/upload";
import { format } from "util";
import { Storage } from "@google-cloud/storage";
import express from "express";
import { v4 } from "uuid";
import mime from 'mime-types';
import {uploadToDisk} from '../middleware/upload'
export const filesRouter = express.Router();
filesRouter.use(express.urlencoded());
const storage = new Storage({ keyFilename: "abo-store-455b7b6dfda1.json" });
const bucket = storage.bucket("abostore_bucket");
const upload = async (req, res) => {
  try {
    await processFileMiddleware(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    // Create a new blob in the bucket and upload the file data.
    const type = mime.lookup(req.file.originalname);
    const blob = bucket.file(`${v4()}.${mime.extensions[type][0]}`);
    const blobStream = blob.createWriteStream({
      resumable: true,
      contentType: type,
      predefinedAcl: 'publicRead'
    });
    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });
    blobStream.on("error", (err) => {
        res.status(500).send({ message: err.message });
      });
      blobStream.on("finish", async (data) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
          url: publicUrl,
        });
      });
      blobStream.end(req.file.buffer);
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 2MB!",
            });
          }
          res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
          });
    }
  };
  const getListFiles = async (req, res) => {
    try {
        const [files] = await bucket.getFiles();
        let fileInfos = [];
        files.forEach((file) => {
          fileInfos.push({
            name: file.name,
            url: file.metadata.mediaLink,
          });
        });
        res.status(200).send(fileInfos);
      } catch (err) {
        console.log(err);
        res.status(500).send({
          message: "Unable to read list of files!",
        });
      }
  };
  const download = async (req, res) => {
    try {
        const [metaData] = await bucket.file(req.params.name).getMetadata();
        res.redirect(metaData.mediaLink);
        
      } catch (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
  };

  filesRouter.post('/upload',upload);
  filesRouter.get('/get-list-files',getListFiles);
  filesRouter.get('/download',download);
  filesRouter.post('/upload-to-disk',uploadToDisk.array('images',5))