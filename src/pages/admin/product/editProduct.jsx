import React from 'react';
import firebase from "../../../firebase";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts,deleteProduct, updateProduct } from "../../../reduxTool/productAdminSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getAllCate } from "../../../reduxTool/categorySlice";
import {v4} from 'uuid'
import { storage } from "../../../firebase";
import {ref, uploadBytes,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
const EditProduct = () => {
    const [img, setImg] = useState("");
    const [img2, setImg2] = useState("")
    const [img3, setImg3] = useState("");
    const navigate = useNavigate();
    const cate = useSelector((state) => state.category);
    const dispatch= useDispatch()
    const db= firebase.firestore()
    const [post, setPost] = useState('')
    const {id}= useParams()
    console.log(id);
    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.currentTarget;
        const newValue =
          type === "checked"? checked : type === "select-one"
            ? e.currentTarget.selectedOptions[0].value
            : value;
        setPost((prevState) => ({ ...prevState, [name]: newValue }));
      };

      useEffect(()=>{
        db.collection("categories")
        .get()
        .then((pro) => {
          const cateArr = [];
          pro.forEach((p) => {
            cateArr.push({ ...p.data(), id: p.id });
          });
          dispatch(getAllCate(cateArr));
        });
      
        db.collection("products")
        .doc(id)
        .get()
        .then((res) => {
            console.log(res.data());
            setPost(res.data())
            
            console.log(post);
        });
      },[])
 
    
      const handleUpdate=(e)=>{
        e.preventDefault()
        if (img.name == null || img2.name==null||img3.name==null) {
            return;
          }
        const imgRef = ref(storage, `${v4() + img.name + Math.random()}`);
  const uploadTask = uploadBytesResumable(imgRef);
  const imgRef2 = ref(storage, `${v4() + img2.name + Math.random()}`);
  const uploadTask2 = uploadBytesResumable(imgRef2);
  const imgRef3 = ref(storage, `${v4() + img3.name + Math.random()}`);
  const uploadTask3 = uploadBytesResumable(imgRef3);

  // Tải lên hình ảnh mới
  uploadBytes(imgRef, img).then(() => {
    console.log(imgRef, img);
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      uploadBytes(imgRef2, img2).then(() => {
        console.log(imgRef2, img2);
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL2) => {
          console.log("File available at", downloadURL2);
          uploadBytes(imgRef3, img3).then(() => {
            console.log(imgRef3, img3);
            getDownloadURL(uploadTask3.snapshot.ref).then((downloadURL3) => {
              console.log("File available at", downloadURL3);
              
              const updatedPro = {
                namePro: post.namePro,
                pricePro: Number(post.pricePro),
                discount: Number(post.discount),
                views: Number(post.views),
                description: post.description,
                img: downloadURL,
                img2: downloadURL2 ,
                img3:  downloadURL3 ,
                special: post.special,
                catId: post.catId,
                date: post.date,
              };

              // Cập nhật thông tin sản phẩm trong cơ sở dữ liệu
              db.collection("products")
                .doc(id)
                .update(updatedPro)
                .then(() => {
                  alert("Update successfull");
                  dispatch(updateProduct(updatedPro))
                  console.log(updatedPro);
                  navigate("/admin/products/list");
                });
            });
          });
        });
      });
    });
  });
      }

    return (
        <div>
              <div>
          <h1
            className="text-3xl font-mono "
            style={{
              fontWeight: "bolder",
              marginBottom: "20px",
              color: "#526D82",
            }}
          >
            EDIT PRODUCT
          </h1>
          <form className="w-full flex flex-wrap">
            <div
              className="md:flex md:items-center mb-3"
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  name="namePro"
                  value={post.namePro}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-3"
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Category
                </label>
              </div>

              <select
                name="catId"
                id=""
                value={post.catId}
                onChange={handleInputChange}
                className="md:w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                style={{ padding: "10px 5px" }}
              >
                {cate &&
                  cate.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
       
            </div>

            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Price
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  style={{ padding: "10px 5px" }}
                  type="number"
                  name="pricePro"
                  value={post.pricePro}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Discount
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                  name="discount"
                  value={post.discount}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Date
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="date"
                  name="date"
                  value={post.date}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Views
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="number"
                  name="views"
                  value={post.views}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div
              className="md:flex md:items-center mb-6"
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Special
                </label>
              </div>
              <div className="md:w-2/3">
                <div className="flex">
                  <div className="flex items-center mr-4">
            
                      <input
                      id="inline-radio"
                      type="radio"
                      name="special"
                      value="1"
                        checked={post.special === "1"}
                      onChange={handleInputChange}
                      style={{ height: "48px" }}
                      className="w-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    
                    <label
                      htmlFor="inline-radio"
                      className="ml-2 text-base font-medium text-gray-500 "
                    >
                      Special
                    </label>
                  </div>
                  <div className="flex items-center mr-4">
           
                     <input
                     id="inline-radio"
                     type="radio"
                     name="special"
                     value="0"
                       checked={post.special === "0"}
                     onChange={handleInputChange}
                     style={{ height: "48px" }}
                     className="w-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                   />
     
                    
                    <label
                      htmlFor="inline-2-radio"
                      className="ml-2 text-base font-medium  text-gray-500 "
                    >
                      Not special
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name" style={{paddingBottom: "48px"}}
                >
                  Avatar image
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg(e.target.files[0])}
                /> 
                     <img src={post.img} alt="" style={{width:"60px" , height:"50px"}} />
              </div>
        
            </div>
            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }}
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name" style={{paddingBottom: "48px"}}
                >
                  Description image 1
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImg2(e.target.files[0])}
                /> 
                <img src={post.img2} alt="" style={{width:"60px" , height:"50px"}} />
              </div>
             
            </div>
            <div
              className="md:flex md:items-center mb-3 "
              style={{ width: "45%" }} 
            >
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name" style={{paddingBottom: "48px"}}
                >
                  Description image 2
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="file"
                  accept="image/*"
                 onChange={(e) => setImg3(e.target.files[0])}
                />
              <img src={post.img3} alt="" style={{width:"60px" , height:"50px"}} />

              </div>
            </div>

            <div className="md:flex  mb-3 " style={{ width: "100%" }}>
              <div className="" style={{ width: "185px" }}>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  Description
                </label>
              </div>
              <div className="" style={{ width: "75%" }}>
                <textarea
                  style={{ padding: "10px 5px" }}
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  rows="5"
                  name="description"
                  value={post.description}
                  onChange={handleInputChange}
                >
                  {post.description}
                </textarea>
              </div>
            </div>
            <div className="md:flex md:items-center " style={{ width: "100%" }}>
              <div
                className=""
                style={{ textAlign: "center", margin: "0 auto" }}
              >
                <button
                  onClick={handleUpdate}
                  className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>
    );
};

export default EditProduct;