import React ,{useState, useEffect}from 'react';
import firebase from '../../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCate } from '../../../reduxTool/categorySlice';
const EditCategory = () => {
    const db= firebase.firestore()
    const navigate= useNavigate()
    const [post, setPost]= useState('');
    const dispatch= useDispatch()
    const {id} =useParams()
    const cate= useSelector(state=>state.category)
    const handleUpdate=(e)=>{
      
        e.preventDefault()
        if(post===''){
            return
        }
        const updatecate={
            name:post
        }
        db.collection('categories')
        .doc(id)
        .update(updatecate)
        .then(()=>{
          alert("Update category successful");
            
            dispatch(updateCate(updatecate))
            navigate("/admin/category/list");
        })

    }
    useEffect(()=>{
        db.collection('categories')
        .doc(id)
        .get()
        .then((res)=>{
            setPost(res.data().name)
            console.log(res.data().name);
        })
    },[])
    return (
        <div>
        <h1
     className="text-3xl font-mono "
     style={{
       fontWeight: "bolder",
       marginBottom: "20px",
       color: "#526D82",
     }}
   >
     ADD CATEGORY
   </h1>
   <form className="w-full flex flex-wrap">
     <div
       className="md:flex md:items-center mb-3"
       style={{ width: "90%" ,marginTop:"20px" }}
     >
       <div className=""   style={{ width: "30%" }}>
         <label
           className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
           htmlFor="inline-full-name"
         >
           Name
         </label>
       </div>
       <div className="" style={{ width: "50%" }}>
         <input
           style={{ padding: "10px 5px" }}
           className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full  text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
           id="inline-full-name"
           type="text"
           name="name"
           value={post}
           onChange={(e)=>setPost(e.target.value)}
         />
       </div>
     </div>
     <div className="md:flex md:items-center " style={{ width: "100%" , marginTop:"20px"}}>
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
     <div>
         </div>
         </form>
 </div>
    );
};

export default EditCategory;