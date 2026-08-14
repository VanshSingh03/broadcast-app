import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPlatform, removePlatform } from "../platformSlice";

function PlatformManagerModal({ onClose, pushToast }) {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.platforms.list);

  const [name, setName] = useState("");
  const [limit, setLimit] = useState(500);
  const [color, setColor] = useState("#4F46E5");

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      pushToast("Give the platform a name first.", "error");
      return;
    }
    if (platforms.some((p) => p.name.toLowerCase() === name.trim().toLowerCase())) {
      pushToast("That platform is already in your list.", "error");
      return;
    }
    dispatch(addPlatform({ name, limit, color }));
    pushToast(`${name.trim()} added.`, "success");
    setName("");
    setLimit(500);
  };

  const handleRemove = (platform) => {
    dispatch(removePlatform(platform.id));
    pushToast(`${platform.name} removed.`, "success");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal__head">
          <h2>Manage platforms</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <ul className="modal__list">
          {platforms.map((platform) => (
            <li key={platform.id} className="modal__list-item">
              <span className="modal__list-label">
                <i className="tag__dot" style={{ background: platform.color }} />
                {platform.name}
                <span className="modal__list-limit">{platform.limit} chars</span>
              </span>
              <button
                type="button"
                className="link-button link-button--danger"
                onClick={() => handleRemove(platform)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <form className="modal__form" onSubmit={handleAdd}>
          <p className="composer__label">Add a platform</p>
          <div className="modal__form-row">
            <input
              type="text"
              placeholder="Platform name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              min="1"
              placeholder="Char limit"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Platform color"
            />
          </div>
          <button type="submit" className="btn btn--primary btn--full">
            Add platform
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlatformManagerModal;
