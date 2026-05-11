import formidable from "formidable";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_FILE_SIZE_MB = 10;

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  if (!session) return response.status(401).json({ status: "Not authorized" });

  try {
    if (request.method === "POST") {
      const form = formidable({ maxFileSize: MAX_FILE_SIZE_MB * 1024 * 1024 });

      // we have access to a .parse() method that allows us to access the fields
      // and more importantly the files
      const [fields, files] = await form.parse(request);

      if (!files.image?.[0]) {
        return response.status(400).json({ error: "No image file provided" });
      }

      //  refers to the first file in the array of files uploaded through the form input with the "name "attribute set to "image".
      const file = files.image[0];
      const { newFilename, filepath, mimetype } = file;

      if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
        return response
          .status(400)
          .json({
            error:
              "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.",
          });
      }

      // now we have the information about the image, we can send it to Cloudinary

      const result = await cloudinary.v2.uploader.upload(filepath, {
        public_id: newFilename,
        folder: "nf",
      });
      return response.status(200).json(result);
    }
  } catch (error) {
    console.log("ERROR:", error.message);
    return response.status(400).json({ error: error.message });
  }

  return response.status(405).json({ status: "Method not allowed." });
}
