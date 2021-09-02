import { useState } from "react";
import Home from "./Home";
import View from "./View";
import styles from "./Main.module.css";
function Main({ socket }) {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showTab, setShowTab] = useState(false);
  const [showView, setShowView] = useState(false);
  const joinRoomSelector = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowTab(true);
    }
  };
  const joinRoomViewer = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowView(true);
    }
  };
  if (showTab) {
    return <Home socket={socket} username={username} room={room} />;
  }
  if (showView) {
    return <View socket={socket} />;
  }
  return (
    <div className={styles.container}>
      <h1>Join A Room</h1>
      <div className={styles.control}>
          <label>Enter your name</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Enter the room Id</label>
        <input
          type="text"
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
      </div>
      <div className={styles.actions}>
        <button onClick={joinRoomSelector}>Join As selector</button>
        <button onClick={joinRoomViewer}>Join As viewer</button>
      </div>
    </div>
  );
}
export default Main;
