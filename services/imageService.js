import toast from "react-hot-toast";

export async function uploadImgae(image) {
  const formData = new FormData();
  formData.append("image", image);
  const response = await fetch(`/api/images`, {
    method: "POST",
    body: formData,
  });

  console.log(response);

  if (response.ok) {
    toast.success("Image successfully saved!");
  } else {
    toast.error("Failed to save image.");
  }

  return response.json();
}
