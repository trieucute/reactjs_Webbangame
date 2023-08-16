
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import firebase from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts,deleteProduct, updateProduct } from "../../../reduxTool/productAdminSlice";
import { useNavigate } from "react-router-dom";
import { getAllCate } from "../../../reduxTool/categorySlice";
import {v4} from 'uuid'
import { storage } from "../../../firebase";
import {ref, uploadBytes,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
const ListProducts = () => {
    const db= firebase.firestore()
    const datas= useSelector(state=>state.proAdminReducer);
    
  const [modal, setModal] = useState(false);
  const show = () => {
    setModal(!modal);
  };
  const [post, setPost] = useState('')
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch= useDispatch()
  const cate = useSelector((state) => state.category);
  const proEdit= useSelector(state=>state.proAdminReducer)
  console.log(cate);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.currentTarget;
    const newValue =
      type === "radio"
        ? checked
        : type === "select-one"
        ? e.currentTarget.selectedOptions[0].value
        : value;
    setPost((prevState) => ({ ...prevState, [name]: newValue }));
  };
  const handleDetele=(id)=>{
    const confirmed = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmed) {
        db.collection('products')
        .doc(id)
        .delete()
        .then(()=>{
            dispatch(deleteProduct(id))
        // console.log(res.data());
      //  alert('Delete successfully')
      setIsSuccess(true) 
      })
      
      }
      
  }
  const handleEdit=(id)=>{
    navigate('/admin/products/edit/'+id)
}
    useEffect(()=>{
       db.collection('products')
       .get()
       .then(pro=>{
        // console.log(pro.data());
        const proArr= [];
        pro.forEach(p=>{
            proArr.push({...p.data(), id:p.id})
            console.log(proArr);
        })
        dispatch(getAllProducts(proArr))
        
        
       })
       console.log(datas);



        if (isSuccess) {
                  const timeout = setTimeout(() => {
                    setIsSuccess(false);
                  }, 3000);
            
                  return () => clearTimeout(timeout); // Xóa timeout khi component bị hủy
                }
    },[isSuccess])
//   const [post, setPost] = useState({ 
//     username: "",
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     gender: "",
//     active: "0",
//     activeCode: "",
//   });
//   const [modal, setModal] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errorsEmail, setErrorsEmail] = useState({
//     email: "",
//   });
//   const [errorsPhone, setErrorsPhone] = useState({
//     phone: "",
//   });
//   const [errorsName, setErrorsName] = useState({
//     name: "",
//   });

//   const show = () => {
//     setModal(!modal);
//   };
//   const [data, setData] = useState([]);
//   axios.defaults.baseURL = "http://localhost:3001";
//   const loadData = () => {
//     axios.get("/users").then((res) => {
//       setData(res.data);
//     });
//   };
//   useEffect(() => {
//     loadData();
//   }, []);
//   // xoá user
//   const handleDetele = (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this user?"
//     );
//     if (confirmed) {
//       axios.delete("/users/" + id).then((res) => {
//         const newdata = data.filter((item) => item.id !== id);
//         setData(newdata);
//         setIsSuccess(true);
//       });
//     }
//   };
//   // lấy dữ liệu từ input
//   const handleInputChange = (e) => {
//     // const {name, value}= e.target;
//     const { name, value, checked, type } = e.currentTarget;
//     const newValue = type === "checkbox" ? checked : value;
//     setPost((preState) => ({ ...preState, [name]: newValue }));
//   };
//   //lấy dữ liệu để sửa user
//   const handleEdit = (id) => {
//     show();
//     axios.get("/users/" + id).then((res) => {
//       setPost(res.data);
//     });
//   };
//   // sửa user
//   const handleUpdate = (e) => {
//     e.preventDefault();
//     let hasError = false; // Biến kiểm tra lỗi
//     // Kiểm tra lỗi email
//     if (!validator.isEmail(post.email)) {
//       setErrorsEmail((prevErrors) => ({
//         ...prevErrors,
//         email: "Invalid email",
//       }));

//       hasError = true;
//     } else {
//       setErrorsEmail((prevErrors) => ({
//         ...prevErrors,
//         email: "",
//       }));
//     }

//     // Kiểm tra lỗi số điện thoại
//     if (!validator.isMobilePhone(post.phone, "vi-VN")) {
//       setErrorsPhone((prevErrors) => ({
//         ...prevErrors,
//         phone: "Invalid phone number",
//       }));
//       hasError = true;
//     } else {
//       setErrorsPhone((prevErrors) => ({
//         ...prevErrors,
//         phone: "",
//       }));
//     }

//     // kiểm lỗi fullname
//     let regex = /^[\p{L}\s]+$/u;
//     if (!post.name.match(regex)) {
//       setErrorsName((prevErrors) => ({
//         ...prevErrors,
//         name: "Full name does not contain number",
//       }));
//       hasError = true;
//     } else {
//       setErrorsName((prevErrors) => ({
//         ...prevErrors,
//         name: "",
//       }));
//     }
//     if (hasError) {
//       return;
//     }
//     if (
//       post.username.trim() === "" ||
//       post.email.trim() === "" ||
//       post.gender.trim() === "" ||
//       post.name.trim() === "" ||
//       post.phone.trim() === "" ||
//       post.password.trim() === ""
//     )
//       return;

//     axios.put("/users/" + post.id, post).then((res) => {
//       const updateData = data.map((item) => {
//         if (item.id === post.id) {
//           return post;
//         } else {
//           return item;
//         }
//       });
//       setData(updateData);
//       // alert('User update successful!!!')
//       setIsSuccess(true);
//       show();
//       // setPost({title:'', author:''})
//     });
//   };
//   useEffect(() => {
//     if (isSuccess) {
//       const timeout = setTimeout(() => {
//         setIsSuccess(false);
//       }, 3000);

//       return () => clearTimeout(timeout); // Xóa timeout khi component bị hủy
//     }
//   }, [isSuccess]);

  return (
    <div className=" text-left">
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
        LIST PRODUCTS
      </h1>
      <table className="table-auto w-full " style={{ marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>Roll_no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Date</th>
            <th>Special</th>
            <th>Image</th>
            {/* <th>Password</th> */}
            <th style={{ width:"10%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((u, i) => (
            <tr key={u.id}>
              <td>{++i}</td>
              <td>{u.namePro}</td>
              <td>{u.pricePro}$</td>
              <td> <b>{u.discount}$</b></td>
              <td>{u.date}</td>
              
              <td>{u.special === '1' ? "Special" : "Not special"}</td>

              <td><img src={u.img} alt="" style={{width:"80px"}}/></td>
              <td>
          
                <button
                  onClick={() => handleEdit(u.id)}
                  type="button" style={{    padding:"8px 15px"}}
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
        

                <button
                  onClick={() => handleDetele(u.id)}
                  type="button" style={{    padding:"8px 15px"}}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm  mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
 
    </div>
  );
};

export default ListProducts;
