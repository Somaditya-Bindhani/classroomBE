import {  useContext } from "react";
import Modal from "../UI/Modal/Modal";
import styles from "./DeleteForm.module.css";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/Loading Spinner/LoadingSpinner";
import { useHistory } from "react-router-dom";
const DeleteSubjectForm = (props) => {
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const authCtx = useContext(AuthContext);
  const { subject } = props;
  const submitHandler = async (event) => {
    event.preventDefault();
    let data;
    try {
      data = await sendRequest(
        `http://localhost:5000/api/subjects/deleteSubject/${subject._id}`,
        "DELETE",
        JSON.stringify({ studentId: authCtx.studentId }),
        {
          "content-type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      );
      authCtx.setData(data.subjects);
    } catch (error) {
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {

    return <Error errorText={isError} clearError={clearError} />;
  }
  return (
    <Modal onHideModal={props.closeModal}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h2>Do you want to delete {subject.subjectName} ?</h2>
        <div className={styles.actions}>
          <button type="submit">Delete</button>
          <button type="button" onClick={props.closeModal}>
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default DeleteSubjectForm;
