import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

const CLOUDINARY_FOLDER = "fpos";

export async function uploadFileOnCloudinary(files) {
  const uploadResults = [];

  for (const file of files) {
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: CLOUDINARY_FOLDER }, (error, result) => {
          if (error) return reject(error);

          return resolve(result);
        })
        .end(file.buffer);
    });

    uploadResults.push(result);
  }

  return uploadResults;
}
