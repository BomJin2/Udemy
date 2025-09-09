import { useState } from "react";

function Player({ name, symbol, activePlayer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(name);

  const handleEditClick = () => {
    setIsEditing((pre) => !pre);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };
  return (
    <li className={activePlayer ? "active" : undefined}>
      <span className="player">
        {isEditing ? <input type="text" required value={userName} onChange={handleChange} /> : <span className="player-name">{userName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
export default Player;
