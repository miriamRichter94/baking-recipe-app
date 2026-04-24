import toast from "react-hot-toast";

export async function uploadImage(image) {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`/api/images`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload Image");

  toast.success("Image successfully saved!");
  return response.json();
}
