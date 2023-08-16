import React from 'react';
import firebase from '../../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const navigate=useNavigate();
  const db= firebase.firestore()
  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Xử lý sau khi đăng nhập thành công
        navigate('/')
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        alert('Đăng nhập thất bại')
      });
  };
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();  
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user= result.user

        // if(user.uid!==auth){
          const newuser={
            uid: user.uid,
            name:user.displayName,
            authProvider: "local",
            urlImg:user.photoURL,
            email:user.email
          }
          db.collection('users')
          .add(newuser)
          .then()
          // Đăng nhập thành công
          navigate('/')
        // }
       
        // const user = result.user;
        // console.log(user);
      })
      .catch((error) => {
        // Xảy ra lỗi khi đăng nhập
        alert(error);
      });
  }

  // const handleFacebookLogin=async()=>{
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   try {
  //     await firebase.auth().signInWithPopup(provider);
  //     navigate('/todo')
  //     console.log('Đăng nhập bằng Facebook thành công!');
  //   } catch (error) {
  //     alert(error);
  //   }
  // }

    return (
        <div>
              <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Sign In</h3>
              <span className="breadcrumb">
                <a href="/">Home</a> &gt; Sign In
              </span>
            </div>
          </div>
        </div>
      </div>
        <section className=" gradient-custom" style={{margin:"20px 0"}}>
<div className="container  ">
<div className="row d-flex justify-content-center align-items-center ">
  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
    <div
      className="card bg-dark text-white"
      style={{ borderRadius: "1rem" }}
    >
      <div className="card-body py-2 px-5 text-center">
        <div className="mb-md-5 mt-md-4 ">
          <h2 className="fw-bold mb-2 text-uppercase">Sign In</h2>
          <p className="text-white-50 mb-5">
            Please enter your login and password!
          </p>
          <div className="form-outline form-white mb-4 text-left">
          <label className="form-label" htmlFor="typeEmailX">
              Email
            </label>
            <input
              type="email"
              id="typeEmailX"
              className="form-control form-control-lg"
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
        
          </div>
          <div className="form-outline form-white mb-4 text-left">
          <label className="form-label" htmlFor="typePasswordX">
              Password
            </label>
            <input
              type="password"
              id="typePasswordX"
              className="form-control form-control-lg"
              value={password} onChange={(e) => setPassword(e.target.value)} 

            />
           
          </div>
          <p className="small ">
            <a className="text-white-50" href="#!">
              Forgot password?
            </a>
          </p>
          <button
            className="btn btn-outline-light btn-lg px-5"
            type="submit" onClick={handleLogin}
          >
             Sign In
          </button>
          <div className="d-flex justify-content-center text-center mt-4 pt-1">
            <a href="#!" className="text-white">
              <i className="fab fa-facebook-f fa-lg" />
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-twitter fa-lg mx-4 px-2" />
            </a>
            <span href="#!" className="text-white" onClick={handleGoogleLogin}>
              <i className="fab fa-google fa-lg" />
            </span>
          </div>
        </div>
        <div>
          <p className="mb-0 text-white-50" >
            Don't have an account?{" "}
            <a href="/signup" className="text-white fw-bold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</section>

    </div>
    );
};

export default SignIn;