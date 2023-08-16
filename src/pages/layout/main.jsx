import React from 'react';
import './../../assets/css/fontawesome.css';
import './../../assets/css/templatemo-lugx-gaming.css';
import './../../assets/css/owl.css';
import './../../assets/css/animate.css';
import './../../vendor/bootstrap/css/bootstrap.min.css';
import bannerGame from './../../assets/images/thewit.jpg';
import firebase from '../../firebase';
import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { getSpecialProduct,getTopViewsProduct } from '../../reduxTool/productSlice';
import { getAllCate } from '../../reduxTool/categorySlice';
// import images from './../../assets/images/'
const Main = () => {
 
    const db= firebase.firestore()
    const dispatch= useDispatch()
    const productSpecial= useSelector(state=>state.product.specialProducts );
    console.log(productSpecial);
    const productTopViews= useSelector(state=>state.product.viewsProducts );
    console.log(productTopViews);
    const categories= useSelector(state=>state.catReducer)
    console.log(categories);
    
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const specialProductPromise = db.collection("products")
            .where('special','==','1')
            .limit(4)
            .get();
  
          const topViewsProductPromise = db.collection("products")
            .orderBy('views', 'desc')
            .limit(10)
            .get();
  
          const [specialProductList , topViewsProductList] = await Promise.all([specialProductPromise, topViewsProductPromise]);
  
          let specialProductArr = [];
          specialProductList.forEach(async (doc) => {
            console.log(doc.data().catId);
            const catID = doc.data().catId;
            const res = await db.collection("categories").doc(catID).get();
  
            console.log(res.data().name, res.id, doc.id, doc.data().namePro);
  
            const newProduct = {
              ...doc.data(),
              id: doc.id,
              idCat: res.id,
              name: res.data().name,
            };
            console.log(newProduct);
  
            specialProductArr = [...specialProductArr, newProduct];
  
            dispatch(getSpecialProduct(specialProductArr));
            console.log(specialProductArr);
          });
  
  

          let topViewsProductArr = [];
          topViewsProductList.forEach(async (doc) => {
            console.log(doc.data().catId);
            const catID = doc.data().catId;
            const res = await db.collection("categories").doc(catID).get();
  
            console.log(res.data().name, res.id, doc.id, doc.data().namePro);
  
            const newProduct = {
              ...doc.data(),
              id: doc.id,
              idCat: res.id,
              name: res.data().name,
            };
            console.log(newProduct);
  
            topViewsProductArr = [...topViewsProductArr, newProduct];
  
            dispatch(getTopViewsProduct(topViewsProductArr));
            console.log(  topViewsProductArr);
          });


        } catch (error) {
          console.log(error);
        }
      }
  
      fetchData();
    }, []);
    return (
        <div>
            <div className="main-banner">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 align-self-center">
          <div className="caption header-text">
            <h6>Welcome to Gamer App</h6>
            <h2>BEST GAMING SITE EVER!</h2>
            <p>
            Gamer App is a place where gamers can own games on the Steam platform such as PUPG, FIFA, ... at extremely friendly prices, quite cheaper than the original price that gamers have to spend if they buy it.
            </p>
            <div className="search-input">
              <form id="search" action="#">
                <input
                  type="text"
                  placeholder="Type Something"
                  id="searchText"
                  name="searchKeyword"
                 
                />
                <button role="button">Search Now</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1">
          <div className="right-image">
            <img src="https://pixelz.cc/wp-content/uploads/2017/01/the-witcher-3-wild-hunt-uhd-4k-wallpaper.jpg" alt="" />
            <span className="price">$25</span>
            <span className="offer">-50%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="section trending">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="section-heading">
            <h6>Trending</h6>
            <h2>Trending Games</h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="main-button">
            <a href="/shop">View All</a>
          </div>
        </div>
        {productSpecial.map(pro=>(
            <div className="col-lg-3 col-md-6">
          <div className="item">
            <div className="thumb">
              <a href={`/shop/detail/${pro.id}`}>
         <img src={pro.img} alt="" />

              </a>
              <span className="price">
                <em>${pro.pricePro}</em>${pro.discount}
              </span>
            </div>
            <div className="down-content">
              <span className="category">{pro.name}</span>
              <h4>{pro.namePro}</h4>
              <a href={`/shop/detail/${pro.id}`}>
                <i className="fa fa-shopping-bag" />
              </a>
            </div>
          </div>
        </div>
        ))}
        
    
      </div>
    </div>
  </div>
  <div className="section most-played">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="section-heading">
            <h6>TOP GAMES</h6>
            <h2>Most Played</h2>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="main-button">
            <a href="/shop">View All</a>
          </div>
        </div>
      <div className='item-content'>
        {productTopViews.map(pro=>(
          <div className="col-lg-2 col-md-6 col-sm-6" style={{height: "300px"}}>
          <div className="item" style={{height: "300px"}}>
            <div className="thumb">
              <a href={`/shop/detail/${pro.id}`}>
                <img src={ pro.img} alt="" />
              </a>
            </div>
            <div className="down-content">
              <span className="category">{pro.name}</span>
              <h4>{pro.namePro}</h4>
              <a href={`/shop/detail/${pro.id}`}>Explore</a>
            </div>
          </div>
        </div>
        ))}
        
        
      </div>
        
      </div>
    </div>
  </div>
  
  <div className="section cta">
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          <div className="shop">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h6>Our Shop</h6>
                  <h2>
                    Go Pre-Order Buy &amp; Get Best <em>Prices</em> For You!
                  </h2>
                </div>
                <p>
                  Lorem ipsum dolor consectetur adipiscing, sed do eiusmod
                  tempor incididunt.
                </p>
                <div className="main-button">
                  <a href="/shop">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 offset-lg-2 align-self-end">
          <div className="subscribe">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h6>NEWSLETTER</h6>
                  <h2>
                    Get Up To $100 Off Just Buy <em>Subscribe</em> Newsletter!
                  </h2>
                </div>
                <div className="search-input">
                  <form id="subscribe" action="#">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Your email..."
                    />
                    <button type="submit">Subscribe Now</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
        </div>
    );
};

export default Main;