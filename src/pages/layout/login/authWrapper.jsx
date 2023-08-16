import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import firebase from '../../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

function AuthWrapper({ children }) {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(firebase.auth());

  useEffect(()=>{    
    if (!loading && !user) {
        navigate('/signin');       
    }
  },[])
  
  useEffect(()=>{    
    if (!loading && !user) {
        navigate('/signin');       
    }
  },[user, loading])

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {   
    navigate('/signin'); 
    //return null; // Hoặc hiển thị một trang hoặc thông báo lỗi
  }
  return children;
}

export default AuthWrapper;