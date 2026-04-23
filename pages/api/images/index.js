import formidable from "formidable";
import cloudinary from "cloudinary";

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

export default async function handler(request, response) {
  try {
    if (request.method === "POST") {
      const form = formidable({});

      // we have access to a .parse() method that allows us to access the fields
      // and more importantly the files
      const [fields, files] = await form.parse(request);

      //  refers to the first file in the array of files uploaded through the form input with the "name "attribute set to "image".
      const file = files.image[0];
      const { newFilename, filepath } = file;

      // now we have the information about the image, we can send it to Cloudinary

      const result = await cloudinary.v2.uploader.upload(filepath, {
        public_id: newFilename,
        folder: "nf",
      });

      response.status(200).json(result);
    }
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  return response.status(405).json({ stauts: "Method not allowed." });
}
