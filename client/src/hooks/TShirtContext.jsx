import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../src/firebase";
import axios from "axios";

export const AddClothesContext = createContext();

export const AddClothesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    tshirtName: "",
    oldPrice: "",
    details: [],
    sizes: [],
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUploadError, setImageUploadError] = useState("");

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      setUploading(true);
      setImageUploadError(false);
      const fileArray = Array.from(files);
      const promises = fileArray.map((file) => storeImage(file));

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevData) => ({
            ...prevData,
            imageUrls: prevData.imageUrls.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          toast.error("Image upload failed (3 mb max per image)");
          setUploading(false);
        });
    } else {
      toast.error("You can only upload 4 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      imageUrls: prevData.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <AddClothesContext.Provider
      value={{
        files,
        setFiles,
        formData,
        setFormData,
        uploading,
        loading,
        progress,
        imageUploadError,
        handleImageSubmit,
        handleRemoveImage,
        handleChange,
        setLoading,
      }}
    >
      {children}
    </AddClothesContext.Provider>
  );
};
