import React from 'react';
import firebase from '../../../firebase'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [rePass, setRePass] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const db = firebase.firestore()
    const handleRegister = async () => {
      // firebase.auth().createUserWithEmailAndPassword(email, password)
      //   .then((userCredential) => {
      //     // Xử lý sau khi đăng kí thành công
      //     // const user = res.user;
      //     console.log(userCredential);
      //     db.collection('users')
      //     .add(userCredential)
      //     .then()
      //     // navigate('/')
      // const registerWithEmailAndPassword = async (name, email, password) => {
        
      if (password !== rePass) {
        return setError('Password do not match');
    }
        try {
          const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
          const user = res.user;
          const newuser={
            uid: user.uid,
            name,
            urlImg:'',
            authProvider: "local",
            email,
          }
          // newuser.id= user.uid
          db.collection('users')
          .add(newuser)
          .then()
          navigate('/')
        // } catch (err) {
        //   console.error(err);
        //   alert(err.message);
        } catch(error)  {
          switch (error.code) {
            case 'auth/email-already-in-use':
              setError('The email address is already in use by another account.');
              break;
            case 'auth/invalid-email':
              setError('Email address is not in the correct format.');
              break;
            case 'auth/weak-password':
              setError('Passwords must be at least 6 characters.');
              break;
            default:
              setError('An error occurred while registering. Please try again later.');
              break;
          }
              }; 
          
       
    };
    return (
        <div>
        <div className="page-heading header-text">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <h3>Sign Up</h3>
        <span className="breadcrumb">
          <a href="/">Home</a> &gt; Sign Up
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
    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
    <p className="text-white-50 ">
      Please create account
    </p>
    <div className="form-outline form-white mb-4 text-left">
    <label className="form-label" htmlFor="typeEmailX">
        Email
      </label>
      <input
        type="email"
        id="typeEmailX"
        className="form-control form-control-lg"
        onChange={(e)=>setEmail(e.target.value)}
      />
  
    </div>
    <div className="form-outline form-white mb-4 text-left">
    <label className="form-label" htmlFor="typeEmailX">
        Full Name
      </label>
      <input
        type="text"
        id="typeEmailX"
        className="form-control form-control-lg"
        onChange={(e)=>setName(e.target.value)}
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
        onChange={(e)=>setPassword(e.target.value)}
      />
     
    </div>
    <div className="form-outline form-white mb-4 text-left">
    <label className="form-label" htmlFor="typePasswordX">
        Re-Password
      </label>
      <input
        type="password"
        id="typePasswordX"
        className="form-control form-control-lg"
        onChange={(e)=>setRePass(e.target.value)}
      />
     
    </div>
    <div style={{color:'red'}}>{error}</div>

    {/* <p className="small ">
      <a className="text-white-50" href="#!">
        Forgot password?
      </a>
    </p> */}
    <button
      className="btn btn-outline-light btn-lg px-5"
      type="submit" onClick={handleRegister}
    >
      Sign Up
    </button>
    {/* <div className="d-flex justify-content-center text-center mt-4 pt-1">
      <a href="#!" className="text-white">
        <i className="fab fa-facebook-f fa-lg" />
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-twitter fa-lg mx-4 px-2" />
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-google fa-lg" />
      </a>
    </div> */}
  </div>
  <div>
    <p className="mb-0 text-white-50" >
      You have an account?{" "}
      <a href="/signin" className="text-white fw-bold">
        Sign In
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

export default SignUp;