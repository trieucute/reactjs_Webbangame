import axios from "axios";
import React, { useEffect, useState } from "react";
import validator from "validator";

const User = () => {
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

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCode, setIsCode] = useState(true);
  const ActiveDone = () => {
    setIsCode(!isCode);
  };
  const [errorsEmail, setErrorsEmail] = useState({
    email: "",
  });
  const [errorsPhone, setErrorsPhone] = useState({
    phone: "",
  });
  const [errorsName, setErrorsName] = useState({
    name: "",
  });
  const [errorsUser, setErrorsUser] = useState({
    username: "",
  });
  const [errorsActive, setErrorsActive] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout); // Xóa timeout khi component bị hủy
    }
  }, [isSuccess]);

  axios.defaults.baseURL = "http://localhost:3001";
  const handleAddUser = (e) => {
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
    const code = generateActivationCode();
    const newData = {
      username: post.username,
      name: post.name,
      email: post.email,
      phone: post.phone,
      gender: post.gender,
      password: post.password,
      active: "0",
      activeCode: code,
    };
   // Kiểm tra xem tên người dùng đã tồn tại hay chưa
axios.get(`/users?username=${post.username}`).then((response) => {
  if (response.data.length>0) {
    // Người dùng đã tồn tại
    console.log('User already exists');
   
      setErrorsUser((prevErrors) => ({
        ...prevErrors,
        username: "User already exists",
      }));
      
  } else {
    // Người dùng chưa tồn tại, thêm người dùng mới
    axios.post("/users", newData).then((res) => {
      console.log(res.data);
      setPost({
        username: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        active: "0",
        activeCode: code,
      });
      setIsSuccess(true);
      //Kích hoạt 1 số hàm khác
      setErrorsUser((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    });
  }
});
  };
  const generateActivationCode = () => {
    // Giả sử mã xác nhận được tạo ngẫu nhiên 
    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
  };
  const handleInputChange = (e) => {
    // const {name, value}= e.target;
    const { name, value, checked, type } = e.currentTarget;
    const newValue = type === "checkbox" ? checked : value;
    setPost((preState) => ({ ...preState, [name]: newValue }));
  };
  const handleActive = (e) => {
    e.preventDefault();
    axios.get("/users?username=" + post.username+"&activeCode="+post.activeCode).then((res) => {
      if (res.data.length > 0) {
        const user = res.data[0];
        // if(post.activeCode!==user.activeCode) return
       
        const newActive = {
          ...user,
          active: "1",
          
        };
        axios.put("/users/" + user.id, newActive).then((res) => {
          console.log(res.data);
          setIsSuccess(true);
          setPost({
            username: "",
            activeCode: "",
          });
          ActiveDone();
        });
      }else{
      setErrorsActive(true)

      }

      console.log(res.data);
      
      // setAccount(res.data)
    }).catch(error=>{
      console.log('lỗi 1 trong 2'+error);
      setErrorsActive(true)
    })
  };

  return (
    <div className="p-4 sm:ml-64">
      {/* thông báo update thành công */}
      {isSuccess && (
        <div
          className="text-left p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <span className="font-medium">Successful!!!</span> This notification
          will go off after 3 seconds
        </div>
      )}
      {/* end thông báo */}
      {!isCode && (
        <>
          <h1
            className="text-3xl font-mono "
            style={{
              fontWeight: "bolder",
              marginBottom: "20px",
              color: "#526D82",
            }}
          >
            ACTIVE USER
          </h1>
          <form className="w-full max-w-3xl ml-32">
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Username
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
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Active Code
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="activeCode"
                  value={post.activeCode}
                  onChange={handleInputChange}
                />
              </div>
             
            </div>
            {errorsActive&&(
              <div
                style={{
                  paddingBottom: "10px",
                  color: "#2E8A99",
                  fontWeight: "bold",
                }}
              >
              
                  <span style={{ marginLeft: "7px" }}>
                  Invalid username or activation code
                  </span>
                
              </div>)}
            <div className="md:flex md:items-center">
              <div className="md:w-1/3" />
              <div className="md:w-2/3">
                <button
                  onClick={handleActive}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Active
                </button>
              </div>
            </div>
          </form>
        </>
      )}
      {isCode && (
        <div>
          <h1
            className="text-3xl font-mono "
            style={{
              fontWeight: "bolder",
              marginBottom: "20px",
              color: "#526D82",
            }}
          >
            ADD USER
          </h1>
          <form className="w-full max-w-3xl ml-32">
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                <input
                  name="active"
                  value={post.active}
                  hidden
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
                <span style={{ marginLeft: "7px" }}>{errorsName.name}</span>
              )}
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
            <div
              style={{
                paddingBottom: "10px",
                color: "#2E8A99",
                fontWeight: "bold",
              }}
            >
              {errorsUser.username && (
                <span style={{ marginLeft: "-115px" }}>
                  {errorsUser.username}
                </span>
              )}
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                  value={post.email}
                  onChange={handleInputChange}
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
                <span style={{ marginLeft: "-154px" }}>
                  {errorsEmail.email}
                </span>
              )}
            </div>
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                <span style={{ marginLeft: "-87px" }}>{errorsPhone.phone}</span>
              )}
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
                      className="ml-2 text-sm font-medium text-gray-500 "
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
                      className="ml-2 text-sm font-medium  text-gray-500 "
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
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
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
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3" />
              <label className="md:w-2/3 block text-gray-500 font-bold text-left">
                <input className="mr-2 leading-tight" type="checkbox" />
                <span className="text-sm ">Send me your newsletter!</span>
              </label>
            </div>
            <div
              className=" md:items-center mb-6 text-center"
              style={{ marginLeft: "30%" }}
            >
              {post.activeCode && (
                <>
                  <span style={{ color: "#1F6E8C" }}>
                    Your account activation code is:{" "}
                  </span>
                  <b style={{ color: "#B31312" }} name="activeCode">
                    {post.activeCode}
                  </b>
                  <br></br>
                  <button
                    onClick={() => setIsCode(!isCode)}
                    className="but-active"
                  >
                    Click here to activate account
                  </button>
                </>
              )}
            </div>
            <div className="md:flex md:items-center">
              <div className="md:w-1/3" />
              <div className="md:w-2/3">
                <button
                  onClick={handleAddUser}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Submit
                </button>
                {/* {isCode&&(
              
            <button   className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Active account</button>

           
            )} */}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
