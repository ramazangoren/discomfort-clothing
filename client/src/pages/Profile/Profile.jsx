import "./Profile.css";
import { useContext } from "react";
import { ProfileContext } from "../../hooks/ProfileContext";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Profile = () => {
  const {
    info,
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
    loading,
  } = useContext(ProfileContext);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-input-area">
          <div className="profile-input-area-inputs">
            <input
              type="text"
              placeholder="Name"
              id="name"
              defaultValue={info.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Lastname"
              id="lastname"
              defaultValue={info.lastname}
              onChange={handleChange}
            />
          </div>
          <div className="profile-input-area-inputs">
            <input
              type="email"
              placeholder="Email"
              id="email"
              defaultValue={info.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              defaultValue={info.phone}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            placeholder="Address"
            id="address"
            defaultValue={info.address}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Enter new password"
            id="password"
            onChange={handleChange}
          />
          <br />
          <input
            style={{ color: "white" }}
            type="date"
            id="bDate"
            onChange={handleChange}
            defaultValue={info.bDate}
          />
          <br />
          <br />
          <button disabled={loading}>
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
        <div className="profile-profile-image">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData?.avatar || info?.avatar}
            alt="profile"
            className="h-24 w-24 object-cover cursor-pointer self-center"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">{UPLOAD_ERROR}</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">{UPLOAD_SUCCESS}</span>
            ) : (
              ""
            )}
          </p>
        </div>
      </form>
      <hr className="divider" />
      <div className="buttons-container">
        <div className="buttons-Password-button" onClick={notify}>
          <p>
            <span>Password</span>
            <span>Change</span>
          </p>
          <p>You can change your password by clicking here.</p>
        </div>
        <div className="buttons-Password-button" onClick={notify}>
          <p>
            <span>Remove account</span>
            <span>Deactivate</span>
          </p>
          <p>
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
