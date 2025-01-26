import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

export const uploadResume = catchAsyncErrors(async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

//   console.log("Cloudinary Config:");
//   console.log({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

  // cloudinary.v2.config().cloud_name = process.env.CLOUDINARY_CLOUD_NAME
  // cloudinary.v2.config().api_key = process.env.CLOUDINARY_API_KEY
  // cloudinary.v2.config().api_secret= process.env.CLOUDINARY_API_SECRET

  
  
  // console.log("File:", req.file);
  // console.log("cloud name : ", cloudinary.v2.config().api_key)
  // console.log("Cloudinary Config:", cloudinary.v2.config());  

  cloudinary.v2.uploader.upload_stream(
    { resource_type: "auto", folder: "resumes" },
    (error, result) => {
      if (error) {
        console.error("Cloudinary Error:", error);
        return res.status(500).json({ error: "Upload failed!" });
      }

      res.status(200).json({
        message: "File uploaded successfully!",
        file: {
          public_id: result.public_id,
          url: result.secure_url,
          secure_url: result.secure_url,
        },
      });
    }
  ).end(req.file.buffer);
});


export const uploadMultiplePhotos = catchAsyncErrors(async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded!" });
    }

    cloudinary.v2.config().cloud_name = process.env.CLOUDINARY_CLOUD_NAME
    cloudinary.v2.config().api_key = process.env.CLOUDINARY_API_KEY
    cloudinary.v2.config().api_secret= process.env.CLOUDINARY_API_SECRET
    
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload_stream(
          { resource_type: "auto", folder: "job_post_photos" },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        ).end(file.buffer); // End the stream with the file buffer
      });
    });

    const results = await Promise.all(uploadPromises);

    res.status(200).json({
      message: "Files uploaded successfully!",
      files: results.map((file) => ({
        public_id: file.public_id,
        url: file.secure_url,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred during upload." });
  }
})




