import { useState } from "react";
import "./Share.css";
import IosShareIcon from "@mui/icons-material/IosShare";

const Share = () => {
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");

  const handleShareClick = () => {
    const currentLink = window.location.href;
    setLink(currentLink);
    setShowLink(true);
    navigator.clipboard.writeText(currentLink); // Copies the link to the clipboard
  };

  return (
    <button className="share" onClick={handleShareClick}>
      <IosShareIcon className="share-icon" />
      {showLink ? <p>Link Copied</p> : <p>Share</p>}
    </button>
  );
};

export default Share;
