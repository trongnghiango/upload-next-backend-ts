import express, { Request, Response } from "express";
import { AuthFailureError, InternalError, NotFoundError } from "../core/ApiError";
import multer from "multer";
import fs from "fs-extra";
import logger from "../core/logger";

const router = express.Router();
const outputFolderName = (userId?: string) => `uploads/${userId}`;

// Image Upload
const fileStorage = multer.diskStorage({
  // destination: 'cuccut',
  destination: (req: any, _file, cb) => {
    let path = `${outputFolderName(req.query['userId'].toString())}`;
    logger.info(path)
    fs.mkdirsSync(path);
    cb(null, path);
  },
  filename: (_req, file, cb) => {
      cb(null, file.originalname);
      // file.fieldname is name of the field (image), path.extname get the uploaded file extension
  }
});

const fileUpload = multer({
  storage: fileStorage,
  
})  


router.get("/", (_req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

router.post("/" , fileUpload.array("theFiles"), (req: Request, res: Response) => {
  // console.log(req)
  if (!req.files) {
    throw new NotFoundError("Éo tìm thấy File nào hết nhé bạn...");
  }
  logger.info(JSON.stringify(req.files));
  const files = req.files;
  
  res.json({ status: "success", path: JSON.stringify(files) });
 
});

export default router;
