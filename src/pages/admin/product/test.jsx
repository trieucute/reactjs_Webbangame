import React, { useState } from 'react';
import firebase from '../../../firebase';
import {storage }from '../../../firebase'
import {v4} from 'uuid'
import {ref, uploadBytes,uploadBytesResumable, getDownloadURL} from 'firebase/storage'
const Test = () => {
    const db= firebase.firestore()
const [url,setUrl]= useState('')
const [img, setImg]= useState('')
const [url2,setUrl2]= useState('')
const [img2, setImg2]= useState('')
const upload= ()=>{
// let urlImage= null;

    if(img==null){
        return}
setUrl('url......') 

const imgRef=ref(storage, `${v4()+img.name+Math.random()}`);
const uploadTask = uploadBytesResumable(imgRef);
const imgRef2=ref(storage, `${v4()+img2.name+Math.random()}`);
const uploadTask2 = uploadBytesResumable(imgRef2);

uploadBytes(imgRef, img).then(()=>{
    alert('thành công', imgRef)
    console.log(imgRef, img); 
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      uploadBytes(imgRef2, img2).then(()=>{
       
        console.log(imgRef2, img2); 
        getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL2) => {
          console.log('File available at', downloadURL2);
          const newPro={
                            // img:hinh2.data,
                            img2:downloadURL,
                            img3:downloadURL2
                        }
                         db.collection("products")
                        .add(newPro)
                        .then(() => {
                            console.log(newPro);
                          alert("Thêm thành công");
                        //   navigate("/admin/products/list");
                        });
        });
    })

    });

})



   
  

// storage.ref(`${img.name}`+v4()).put(img)
//     .on("state_changed", (()=>{
//         storage.ref().child(img.name).getDownloadURL()
//         .then((url)=>{
//             setUrl(url);

//             //  urlImage.push([url])
//            console.log(url);
//            storage.ref(img2.name+v4()).put(img2)
//     .on("state_changed",(()=>{
//         storage.ref().child(img2.name).getDownloadURL()
//         .then((url2)=>{


//             const newPro={
//                 // img:hinh2.data,
//                 img2:url,
//                 img3:url2
//             }
//              db.collection("products")
//             .add(newPro)
//             .then(() => {
//                 console.log(newPro);
//               alert("Thêm thành công");
//             //   navigate("/admin/products/list");
//             });

//         })}))
           
//     //    console.log(url);
//         })
//     }))




    // const hinh2= storage.ref(img2.name).put(img2)
    // .on("state_changed",alert('success'), alert, ()=>{
    //     storage.ref().child(img2.name).getDownloadURL()
       
    // })
   
    // console.log(urlImage);

    // console.log(urlImage);


    // imgref()
//     const hinh=new Promise((resolve, reject) => {
//         storage.ref(img.name).put(img)
//     .on("state_changed",alert('success'), alert, ()=>{
//         storage.ref().child(img.name).getDownloadURL()
//         .then((urls)=>{
//             setUrl(urls);
//             resolve(urls)
//             console.log(url);
//             //  urlImage.push([url])
           
     
//         }).catch((ee)=>{
//             reject(ee);
//         })
//     })
//     })
//     hinh.then(()=>{
//        console.log(url);

//         const newPro={
//             // img:hinh2.data,
//             img2:url
//         }
//         db.collection("products")
//         .add(newPro)
//         .then(() => {
//             console.log(newPro);
//           alert("Thêm thành công");
//         //   navigate("/admin/products/list");
//         });
//     })
//     hinh.catch((err)=>{
//         console.log('Lỗi', err);  // In ra lỗi
//     })
}
    return (
        <div>
            <input type="file" onChange={(e)=>setImg(e.target.files[0])} />
            <input type="file" onChange={(e)=>setImg2(e.target.files[0])} />
            <br />
            {/* {urlImage} */}
            <p>{url}</p>
            <p>{url2}</p>

            <br />
            <button onClick={upload}>upload</button>
        </div>
    );
};

export default Test;