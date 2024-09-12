import { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase"; // Adjust the path if necessary
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [info, setInfo] = useState({});
    const [file, setFile] = useState(null);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState(null); // Initialize with null
    const [loading, setLoading] = useState(true); // Loading state for profile fetching
    const fileRef = useRef(null);
    const { currentUser } = useContext(AuthContext);
    const userName = `${currentUser?.name}-${currentUser?.lastname}`;
  
    const UPLOAD_SUCCESS = "Image successfully uploaded!";
    const UPLOAD_ERROR = "Error Image upload (image must be less than 2 MB)";
  
    // Fetch user profile data
    useEffect(() => {
      if (currentUser?._id && userName) {
        setLoading(true);
        axios
          .get(`/api/users/profile/${userName}/${currentUser?._id}`)
          .then(({ data }) => {
            setInfo(data);
            setFormData(data); // Initialize form data with the fetched user info
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    }, [currentUser?._id, userName]);
  
    // Trigger file upload when a new file is selected
    useEffect(() => {
      if (file) handleFileUpload(file);
    }, [file]);
  
    const handleFileUpload = (file) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        () => {
          setFileUploadError(true);
          setFormData((prev) => ({ ...prev, avatar: "" })); // Reset avatar if error
          toast.error(UPLOAD_ERROR);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData((prev) => ({ ...prev, avatar: downloadURL }));
            setFileUploadError(false);
            toast.success(UPLOAD_SUCCESS);
          });
        }
      );
    };
  
    // Handle form changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedData = { ...formData };
      if (!updatedData.password) delete updatedData.password;
  
      axios
        .post(`/api/users/update-profile/${userName}/${currentUser?._id}`, updatedData)
        .then(({ data }) => {
          if (!data.success) {
            return toast.error(data.message);
          }
          toast.success(data.message);
        })
        .catch((err) => {
          toast.error("Profile update failed. Please try again.");
          console.log(err.message);
        });
    };
  
    const notify = () => toast("This feature is not available at the moment.");
  
    return (
      <ProfileContext.Provider
        value={{
          info,
          file,
          filePerc,
          fileUploadError,
          formData,
          fileRef,
          setFile,
          handleChange,
          handleSubmit,
          notify,
          UPLOAD_SUCCESS,
          UPLOAD_ERROR,
          loading, // Provide loading state to component
        }}
      >
        {children}
      </ProfileContext.Provider>
    );
  };
  
