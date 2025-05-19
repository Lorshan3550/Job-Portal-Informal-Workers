import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});


cloudinary.v2.config().cloud_name = process.env.CLOUDINARY_CLOUD_NAME
cloudinary.v2.config().api_key = process.env.CLOUDINARY_API_KEY
cloudinary.v2.config().api_secret= process.env.CLOUDINARY_API_SECRET

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
