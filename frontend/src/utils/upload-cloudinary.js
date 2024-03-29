import { toast } from "react-toastify";

const cloud_name = import.meta.env.VITE_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_UPLOAD_PRESET;

/**
 * Uploads an image to Cloudinary using the specified file.
 *
 * @param {File} file - The file to be uploaded
 * @return {Promise} A promise that resolves to the uploaded image data
 */
const uplodaImageToCloudinary = async (file) => {
  try {
    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("upload_preset", upload_preset);
    uploadData.append("cloud_name", cloud_name);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    toast.error(error)
  }
};

export default uplodaImageToCloudinary;
