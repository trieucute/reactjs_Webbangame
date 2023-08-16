import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import validator from "validator";
import firebase from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCate, getAllCate } from "../../../reduxTool/categorySlice";
const ListCategory = () => {
    const db= firebase.firestore()
    const cate= useSelector(state=>state.category);
    const dispatch= useDispatch()
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate()
    useEffect(()=>{
        db.collection('categories')
        .get()
        .then(cate=>{
         // console.log(pro.data());
         const cateArr= [];
         cate.forEach(p=>{
             cateArr.push({...p.data(), id:p.id})
             console.log(cateArr);
         })
         dispatch(getAllCate(cateArr))
         
         
        })
        console.log(cate);
        if (isSuccess) {
            const timeout = setTimeout(() => {
              setIsSuccess(false);
            }, 3000);
      
            return () => clearTimeout(timeout); // Xóa timeout khi component bị hủy
          }
},[isSuccess])

    const handleEdit=(id)=>{
        navigate('/admin/category/edit/'+id)
    }
    const handleDetele =(id)=>{
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
          );
          if (confirmed) {
            db.collection('categories')
            .doc(id)
            .delete()
            .then(()=>{
                dispatch(deleteCate(id))
            // console.log(res.data());
          //  alert('Delete successfully')
          setIsSuccess(true) 
          })
          
          }
    }
    return (
        <div style={{textAlign:"left"}}>
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
        LIST CATEGORIES
      </h1>
      <table className="table-auto w-full " style={{ marginLeft: "10px" }}>
        <thead>
          <tr>
            <th>Roll_no</th>
            <th>Name</th>
            
            <th style={{ width:"20%" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cate.map((u, i) => (
            <tr key={u.id}>
              <td>{++i}</td>
              <td>{u.name}</td>
              
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
        </div>
    );
};

export default ListCategory;