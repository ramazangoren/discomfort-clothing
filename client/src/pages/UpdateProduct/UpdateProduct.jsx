import "./UpdateProduct.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useState, useEffect, useContext } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../hooks/AuthContext";

const UpdateProduct = () => {
  // Set the page title to reflect the update action
  useEffect(() => {
    const baseTitle = "DISCOMFORT CLOTHING";
    document.title = `${baseTitle} | Update Product`;
  }, []);

  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    tshirtName: "",
    oldPrice: "",
    newPrice: "",
  });

  const [imageUploadError, setImageUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch the existing product data
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/api/tshirt/list/product/${id}`);
        const data = await res.data;
        if (!data.success) {
          console.log(data.message);
          toast.error("Failed to load product data");
          return;
        }
        setFormData(data.tShirt);
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("An error occurred while fetching product data.");
      } finally {
        setDataLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // Handle image uploads
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 4) {
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
          setFiles([]); // Clear files after upload
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          toast.error("Image upload failed (3 mb max per image)");
          setUploading(false);
          console.log(err);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length === 0) {
        return toast.error("You must upload at least two images");
      }
      setLoading(true);
      const response = await axios.post(`/api/tshirt/list/product/${id}`, {
        ...formData,
        userRef: currentUser._id,
      });

      setLoading(false);

      if (response.data.success) {
        navigate(`/list`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Render loading state if data is still being fetched
  if (dataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="add-clothes-container">
      <form className="add-clothes-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Update T-Shirt</h2>
        <div className="file-input-wrapper">
          <input
            type="file"
            multiple
            accept="image/*"
            id="file-upload"
            onChange={(e) => setFiles(e.target.files)}
          />
          <label htmlFor="file-upload" className="custom-file-label">
            <FaCloudUploadAlt className="upload-icon" />
            Select Files
          </label>
          <button
            type="button"
            disabled={uploading}
            onClick={handleImageSubmit}
            className="upload-button"
          >
            {uploading ? `Uploading...` : "Upload"}
          </button>
        </div>
        <br />
        <div>
          {uploading ? (
            Math.round(progress) < 100 ? (
              <p style={{ color: "red" }}>
                Uploading... {Math.round(progress)}%
              </p>
            ) : (
              <p style={{ color: "green" }}>Upload Complete!</p>
            )
          ) : (
            ""
          )}
        </div>

        {imageUploadError && (
          <div>
            <p className="error-message">{imageUploadError}</p>
          </div>
        )}

        <div className="image-preview">
          {formData?.imageUrls?.map((url, index) => (
            <div key={index} className="image-item">
              <img src={url} alt={`T-Shirt Image ${index + 1}`} />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="remove-image-button"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>

        <input
          type="text"
          id="tshirtName"
          placeholder="T-Shirt Name"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.tshirtName}
        />

        <input
          type="text"
          id="oldPrice"
          placeholder="Old Price"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.oldPrice}
        />

        <input
          type="text"
          id="newPrice"
          placeholder="New Price"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.newPrice}
        />

        <button
          type="submit"
          className="submit-button"
          disabled={loading || uploading}
        >
          {loading ? "Updating..." : "Update T-Shirt"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
