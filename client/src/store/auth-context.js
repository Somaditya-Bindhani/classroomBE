import React, { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
  setData:()=>{},
  subjects:[],
  studentId: "",
});

export const AuthContextProvider = (props) => {
  const intialToken = localStorage.getItem("token");
  const intialStudentId = localStorage.getItem("studentId");
  const [token, setToken] = useState(intialToken);
  const [studentId, setStudentId] = useState(intialStudentId);
  const isLoggedin = !!token && !!studentId;
  const [subjects,setSubjects]=useState();
  const loginHandler = (token,id) => {
    setToken(token);
    setStudentId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("studentId", id);
    
  };
  const logoutHandler = () => {
    setToken("");
    setStudentId("");
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
  };
  const setData=(subjects)=>{
    setSubjects(subjects);
  }
  const contextValue = {
    token,
    isLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    setData:setData,
    subjects:subjects,
    studentId: studentId,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
