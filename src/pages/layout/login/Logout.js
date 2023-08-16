import firebase from '../../../firebase';
import {useNavigate} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect ,useState} from 'react';
import {faRightFromBracket,faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Logout() {
  const [nameUser, setNameUser]= useState('')
  const [admins, setAdmins]= useState('')

  const [user,loading] = useAuthState(firebase.auth())
  const navigate=useNavigate();
  const db= firebase.firestore()
 
  useEffect(()=>{

    if (!loading && !user) {
        navigate('/signin');
    }
  },[])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
        return   (!user &&    
          <li>
             <a href="/signin">Sign In</a>
           </li> )
            // Hoặc hiển thị một trang hoặc thông báo lỗi
        //navigate('/login');
  }else{
    db.collection('users')
    .where('uid', '==', `${user.uid}`)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(doc.data());
        setNameUser(doc.data().name)
        setAdmins(doc.data().authProvider)
      });
    })
  
  }

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        navigate('/signin')
        console.log('Đăng xuất thành công');
      })
      .catch((error) => {
        alert(error);
      });
  };
const adminNavigate= ()=>{
  navigate('/admin')
}
  return (
    <>
      {user && user.email &&nameUser&&
      <>
       {/* <span style={{color:"white"}}> Xin chào, {user.email}</span> */}
      
       <div className="dropdown_img">
       {!user.photoURL  && <div className='down_drop'>
         <span className='down_drop_img'> <FontAwesomeIcon icon={faUser} style={{fontSize:"20px", color:"white"}} /></span>
         <span className='down_drop_name' style={{fontSize:"20px", color:"white", marginLeft:"20px"}} >
          
          <span>{nameUser}</span>
          <br/>
         { admins==='admin' && <span onClick={adminNavigate} style={{cursor:"pointer"}}>Admin</span>} 
          </span> 
          
          </div>
      }
       {user.photoURL && <div className='down_drop'>
        <span className='down_drop_img'><img src={user.photoURL} className="rounded-circle" style={{width: "40px"}}alt="Avatar" /></span>
         <span className='down_drop_name' style={{fontSize:"20px", color:"white", marginLeft:"20px"}} >
         <span>{nameUser}</span>
         {admins==='admin' && <span  onClick={adminNavigate} style={{cursor:"pointer"}}>Admin</span>} 
          
          </span> 
          
          </div>
      }
         {/* {user.photoURL &&<img src={user.photoURL} class="rounded-circle" style={{width: "40px"}}alt="Avatar" />}</span> */}
         {/* <span className='down_drop_name' style={{fontSize:"20px", color:"white", marginLeft:"20px"}} >{nameUser}</span>  */}
         <span style={{marginLeft:"30px"}}><FontAwesomeIcon icon={faRightFromBracket} onClick={handleLogout} style={{fontSize:"20px", color:"white"}}/></span> 
         
 </div>
      </>
       }

     
    </>
  );
}

export default Logout