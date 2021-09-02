import { useContext } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./DeleteForm.module.css";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import { useHistory } from "react-router-dom";
const DeleteAttendanceForm = (props) => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const { subject, attendanceId } = props;
    

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <Error errorText={isError} clearError={clearError} />;
  }
  return (
    <Modal onHideModal={props.closeModal}>
      <form className={styles.form}>
        <h2>Do you want to delete the attendance for {props.text} ?</h2>
        <div className={styles.actions}>
          <button type="button" onClick={props.deleteHandler}>Delete</button>
          <button type="button" onClick={props.closeModal}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default DeleteAttendanceForm;
