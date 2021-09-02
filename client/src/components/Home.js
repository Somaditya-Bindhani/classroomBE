import React, { useState } from "react";
// import ScrollToBottom from "react-scroll-to-bottom";
import styles from "./Home.module.css";
const DUMMY_DATA = [
  "Snake",
  "Table",
  "Games",
  "Finger",
  "Rock",
  "Months",
  "Life",
  "Prime",
  "Music",
];
function Home({ socket, username, room }) {
  const [array, setArray] = useState([]);

  const clickHandler = async (event) => {
    let flag = 0;
    const prevArray = array;

    const value = event.target.value;
    let newArray = [];

    for (var i = 0; i < prevArray.length; i++) {
      if (prevArray[i] === value) {
        flag = 1;
      }
    }
    if (flag === 0) {
      if (prevArray.length === 4) {
        alert("You can maximum select 4 items !");
        return;
      }
      newArray = [...prevArray, value];
    } else {
      newArray = prevArray.filter((item) => item !== value);
    }
    // https://github.com/Somaditya-Bindhani/madieeGames.git
    const messageData = {
      room: room,
      author: username,
      message: newArray,
    };

    await socket.emit("send_message", messageData);
    setArray(newArray);
  };

  const setClass = (value) => {
    if (array.find((item) => item === value)) {
      return styles.active;
    } else {
      return styles.box;
    }
  };

  return (
    <div className={styles.actions}>
      {DUMMY_DATA.map((item) => (
        <button
          value={item}
          onClick={clickHandler}
          className={setClass(item)}
          key={item}
        >
          <span className={styles.animation}></span>
          {item}
        </button>
      ))}
    </div>
  );
}

export default Home;
