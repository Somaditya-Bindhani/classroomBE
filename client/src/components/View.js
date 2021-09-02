import styles from './View.module.css';
const { useState, useEffect } = require("react")
function View ({socket}){
    const [list,setList]=useState([]);
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setList(data);
        });
      }, [socket]);

    return(
        <div className={styles.container}>
            <h2>List of selected items.</h2>
            {list.length === 0 && <p>No items...</p> }
            {list.length !== 0 && list.message.map(item=><p key={item}>{item}</p>) }
        </div>
    )
}
export default View;