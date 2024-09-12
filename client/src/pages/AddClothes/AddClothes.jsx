import "./AddClothes.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { AddClothesContext } from "../../hooks/TShirtContext";
import { AuthContext } from "../../hooks/AuthContext";

const AddClothes = () => {
  const {
    files,
    setFiles,
    formData,
    uploading,
    loading,
    progress,
    imageUploadError,
    handleImageSubmit,
    handleRemoveImage,
    handleChange,
    setLoading
  } = useContext(AddClothesContext);

  useEffect(() => {
    const baseTitle = "DISCOMFORT CLOTHING";
    document.title = `${baseTitle} | add products`;
  }, []);

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length === 0) {
        return toast.error("You must upload at least two images");
      }
      setLoading(true);
      const response = await axios.post("/api/tshirt/add-tshirt", {
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

  return (
    <div className="add-clothes-container">
      <form className="add-clothes-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New T-Shirt</h2>

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
          {formData.imageUrls.map((url, index) => (
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
          placeholder="Price"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.oldPrice}
        />
        <textarea
          type="text"
          id="details"
          placeholder="details"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.details}
        ></textarea>
        <textarea
          type="text"
          id="sizes"
          placeholder="sizes"
          className="input-field"
          required
          onChange={handleChange}
          value={formData.sizes}
        ></textarea>

        {/* {error && <p className="error-message">{error}</p>} */}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Adding..." : "Add T-Shirt"}
        </button>
      </form>
    </div>
  );
};

export default AddClothes;
