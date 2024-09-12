import "./Drawer.css";
import { CiSearch } from "react-icons/ci";
import { RiCloseLargeFill } from "react-icons/ri";

const Drawer = ({ setSearchOpen, setSearchTerm, searchTerm, handleSubmit }) => {
  return (
    <div className="search-modal">
      <div className="search-modal-content">
        <form onSubmit={handleSubmit} className="search-modal-content-form">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <CiSearch className="icons-header" />
          </button>
        </form>

        <button type="button" onClick={() => setSearchOpen(false)}>
          <RiCloseLargeFill />
        </button>
      </div>
    </div>
  );
};

export default Drawer;
