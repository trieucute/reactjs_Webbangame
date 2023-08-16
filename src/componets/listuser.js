import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import validator from "validator";

const Listuser = () => {
  const [post, setPost] = useState({ 
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    active: "0",
    activeCode: "",
  });
  const [modal, setModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorsEmail, setErrorsEmail] = useState({
    email: "",
  });
  const [errorsPhone, setErrorsPhone] = useState({
    phone: "",
  });
  const [errorsName, setErrorsName] = useState({
    name: "",
  });

  const show = () => {
    setModal(!modal);
  };
  const [data, setData] = useState([]);
  axios.defaults.baseURL = "http://localhost:3001";
  const loadData = () => {
    axios.get("/users").then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  // xoá user
  const handleDetele = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      axios.delete("/users/" + id).then((res) => {
        const newdata = data.filter((item) => item.id !== id);
        setData(newdata);
        setIsSuccess(true);
      });
    }
  };
  // lấy dữ liệu từ input
  const handleInputChange = (e) => {
    // const {name, value}= e.target;
    const { name, value, checked, type } = e.currentTarget;
    const newValue = type === "checkbox" ? checked : value;
    setPost((preState) => ({ ...preState, [name]: newValue }));
  };
  //lấy dữ liệu để sửa user
  const handleEdit = (id) => {
    show();
    axios.get("/users/" + id).then((res) => {
      setPost(res.data);
    });
  };
  // sửa user
  const handleUpdate = (e) => {
    e.preventDefault();
    let hasError = false; // Biến kiểm tra lỗi
    // Kiểm tra lỗi email
    if (!validator.isEmail(post.email)) {
      setErrorsEmail((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email",
      }));

      hasError = true;
    } else {
      setErrorsEmail((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    // Kiểm tra lỗi số điện thoại
    if (!validator.isMobilePhone(post.phone, "vi-VN")) {
      setErrorsPhone((prevErrors) => ({
        ...prevErrors,
        phone: "Invalid phone number",
      }));
      hasError = true;
    } else {
      setErrorsPhone((prevErrors) => ({
        ...prevErrors,
        phone: "",
      }));
    }

    // kiểm lỗi fullname
    let regex = /^[\p{L}\s]+$/u;
    if (!post.name.match(regex)) {
      setErrorsName((prevErrors) => ({
        ...prevErrors,
        name: "Full name does not contain number",
      }));
      hasError = true;
    } else {
      setErrorsName((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }
    if (hasError) {
      return;
    }
    if (
      post.username.trim() === "" ||
      post.email.trim() === "" ||
      post.gender.trim() === "" ||
      post.name.trim() === "" ||
      post.phone.trim() === "" ||
      post.password.trim() === ""
    )
      return;

    axios.put("/users/" + post.id, post).then((res) => {
      const updateData = data.map((item) => {
        if (item.id === post.id) {
          return post;
        } else {
          return item;
        }
      });
      setData(updateData);
      // alert('User update successful!!!')
      setIsSuccess(true);
      show();
      // setPost({title:'', author:''})
    });
  };
  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout); // Xóa timeout khi component bị hủy
    }
  }, [isSuccess]);

  return (
    <div className="p-4 sm:ml-64 text-left">
      {/* thông báo update thành công */}
      {isSuccess && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Successful!!!</span> This notification
          will go off after 3 seconds
        </div>
      )}
      {/* end thông báo */}

      <h1
        className="text-3xl font-mono "
        style={{ fontWeight: "bolder", marginBottom: "20px", color: "#526D82" }}
      >
        LIST USERS
      </h1>
      <table className="table-auto w-full " style={{ marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>Roll_no</th>
            <th>Full name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Active</th>
            {/* <th>Password</th> */}
            <th style={{ width: "13%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u, i) => (
            <tr key={u.id}>
              <td>{++i}</td>
              <td>{u.name}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>{u.gender}</td>
              <td>{u.active === "1" ? "Actived" : "Not Actived"}</td>
              <td>
                {/* <Link to={`/user/edit/${u.id}`}> */}
                <button
                  onClick={() => handleEdit(u.id)}
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                {/* </Link> */}

                <button
                  onClick={() => handleDetele(u.id)}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Routes >


              <Route path="/user/edit/:id"  element={<Edituser/>} />
              
             </Routes> */}

      {/* Modal toggle */}

      {/* Main modal */}
      {modal && (
        <div
          tabIndex="-1"
          className="index-bg fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ left: "18%", top: " 50px" }}
          >
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  EDIT USER
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                  onClick={show}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-6 space-y-6">
                <form className="w-full max-w-3xl ">
                  <div className="md:flex md:items-center mb-3">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Full Name
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="name"
                        value={post.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      paddingBottom: "10px",
                      color: "#2E8A99",
                      fontWeight: "bold",
                    }}
                  >
                    {errorsName.name && (
                      <span style={{ marginLeft: "258px" }}>
                        {errorsName.name}
                      </span>
                    )}
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        User Name
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        name="username"
                        value={post.username}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-3">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Email
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="email"
                        onChange={handleInputChange}
                        value={post.email}
                        name="email"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      paddingBottom: "10px",
                      color: "#2E8A99",
                      fontWeight: "bold",
                    }}
                  >
                    {errorsEmail.email && (
                      <span style={{ marginLeft: "258px" }}>
                        {errorsEmail.email}
                      </span>
                    )}
                  </div>
                  <div className="md:flex md:items-center mb-3">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Phone Number
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="number"
                        name="phone"
                        value={post.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      paddingBottom: "10px",
                      color: "#2E8A99",
                      fontWeight: "bold",
                    }}
                  >
                    {errorsPhone.phone && (
                      <span style={{ marginLeft: "258px" }}>
                        {errorsPhone.phone}
                      </span>
                    )}
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Gender
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex">
                        <div className="flex items-center mr-4">
                          <input
                            id="inline-radio"
                            type="radio"
                            name="gender"
                            value="female"
                            checked={post.gender === "female"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="inline-radio"
                            className="ml-2 text-sm font-medium text-white "
                          >
                            Female
                          </label>
                        </div>
                        <div className="flex items-center mr-4">
                          <input
                            id="inline-2-radio"
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={handleInputChange}
                            checked={post.gender === "male"}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="inline-2-radio"
                            className="ml-2 text-sm font-medium  text-white "
                          >
                            Male
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-full-name"
                      >
                        Active
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <div className="flex">
                        <div className="flex items-center mr-4">
                          <input
                            id="inline-radio"
                            type="radio"
                            name="active"
                            value="1"
                            checked={post.active === "1"}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="inline-radio"
                            className="ml-2 text-sm font-medium text-white "
                          >
                            Actived
                          </label>
                        </div>
                        <div className="flex items-center mr-4">
                          <input
                            id="inline-2-radio"
                            type="radio"
                            name="active"
                            value="0"
                            onChange={handleInputChange}
                            checked={post.active === "0"}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            htmlFor="inline-2-radio"
                            className="ml-2 text-sm font-medium  text-white "
                          >
                            Not activated
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                      <label
                        className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4"
                        htmlFor="inline-password"
                      >
                        Password
                      </label>
                    </div>
                    <div className="md:w-2/3">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password"
                        type="password"
                        name="password"
                        value={post.password}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="md:flex md:items-center">
                    <div className="md:w-1/3" />
                    <div className="md:w-2/3">
                      <button
                        onClick={handleUpdate}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* Modal footer */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listuser;
