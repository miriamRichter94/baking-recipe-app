import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function deleteImageFromCloudinary(publicId) {
  if (!publicId) return;
  await cloudinary.v2.uploader.destroy(publicId);
}

export async function deleteRecipeImages(recipe) {
  const deletions = [];

  if (recipe.image?.publicId) {
    deletions.push(deleteImageFromCloudinary(recipe.image.publicId));
  }

  recipe.steps?.forEach((step) => {
    if (step.image?.publicId) {
      deletions.push(deleteImageFromCloudinary(step.image.publicId));
    }
  });

  await Promise.all(deletions);
}
