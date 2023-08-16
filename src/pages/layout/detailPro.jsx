import React, { useState } from "react";
import bannerGame from "./../../assets/images/thewit.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../../firebase";
import { useEffect } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// import { useDispatch, useSelector } from 'react-redux';
// import { getSpecialProduct,getTopViewsProduct } from '../../reduxTool/productSlice';

const DetailPro = () => {
  const [topViews, setTopViews] = useState([]);
  const [detail, setDetail] = useState("");
  const { id } = useParams();
  console.log(id);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((res) => {
        console.log(res.data());
        setDetail({ ...res.data(), id: res.id });
        let el = document.getElementById("description");
        el.innerHTML = `${res.data().description}`;
      });
   
    db.collection("products")
      .orderBy("views", "desc")
      .limit(4)
      .get()
      .then((specialProductList) => {
        const topViewsProductArr = []
        specialProductList.forEach((doc) => {
          console.log({ ...doc.data(), id: doc.id });
          topViewsProductArr.push({ ...doc.data(), id: doc.id });
          console.log(topViewsProductArr);
        });
        setTopViews(topViewsProductArr);
      
        
      });
  }, []);
  const proprietes = {
    duration: 4000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  };

  return (
    <div>
      <>
  
        <div className="page-heading header-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h3>{detail.namePro}</h3>
                <span className="breadcrumb">
                  <a href="/">Home</a> &gt; <a href="/shop">Shop</a> &gt;{" "}
                  {detail.namePro}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* {detail.map(pro=>( */}
        <>
          <div className="single-product section">
            <div className="container">
              <div className="row">
                <div className="col-lg-6" style={{width:"60%"}}>
                  <div className="left-image">
                    {/* <img src={detail.img} alt="" /> */}

                    <Slide {...proprietes}>
                      <div className="each-slide">
                        <div>
                          <img src={detail.img} alt="img1" />
                        </div>
                      </div>
                      <div className="each-slide">
                        <div>
                          <img src={detail.img2} alt="img2" />
                        </div>
                      </div>
                      <div className="each-slide">
                        <div>
                          <img src={detail.img3} alt="img3" />
                        </div>
                      </div>
                    </Slide>
                  </div>
                </div>
                <div className="col-lg-6 align-self-center " style={{textAlign:"center", paddingLeft:"40px", width:"40%"}}>
                  <h4>{detail.namePro}</h4>
                  <span className="price">
                    <em>${detail.pricePro}</em> ${detail.discount}
                  </span>
                  <p className="p" style={{textAlign:"left", paddingLeft:"20px", fontWeight:"bold"}}>
                  <li>RELEASE DATE: {detail.date}</li>
                  <li>DEVELOPER: 24 Entertainment</li>
                  <li>100% quality</li>
                                  <li>10/10 resolution</li>
                                  <li>Free VAT over $59</li>
                  </p>
                  
                  <form id="qty" action="#">
                    {/* <input
              type="qty"
              className="form-control"
              id={1}
              aria-describedby="quantity"
              placeholder={1}
            /> */}
                    <button type="submit">
                      <i className="fa fa-shopping-bag" /> ADD TO CART
                    </button>
                  </form>
                  {/* <ul>
                    <li>
                      <span>Game ID:</span> COD MMII
                    </li>
                    <li>
                      <span>Genre:</span> <a href="#">Action</a>,{" "}
                      <a href="#">Team</a>, <a href="#">Single</a>
                    </li>
                    <li>
                      <span>Multi-tags:</span> <a href="#">War</a>,{" "}
                      <a href="#">Battle</a>, <a href="#">Royal</a>
                    </li>
                  </ul> */}
                </div>
                <div className="col-lg-12">
                  <div className="sep" />
                </div>
              </div>
            </div>
          </div>
          <div className="more-info">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tabs-content">
                    <div className="row">
                      <div className="nav-wrapper ">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link active"
                              id="description-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#description"
                              type="button"
                              role="tab"
                              aria-controls="description"
                              aria-selected="true"
                            >
                              Description
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className="nav-link"
                              id="reviews-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#reviews"
                              type="button"
                              role="tab"
                              aria-controls="reviews"
                              aria-selected="false"
                            >
                              Reviews (3)
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          style={{ textAlign: "left" }}
                          id="description"
                          role="tabpanel"
                          aria-labelledby="description-tab"
                        >
                          {/* {detail.description} */}
                        </div>
                        <div
                          className="tab-pane fade"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews-tab"
                        >
                          <p>
                            Coloring book air plant shabby chic, crucifix
                            normcore raclette cred swag artisan activated
                            charcoal. PBR&amp;B fanny pack pok pok gentrify
                            truffaut kitsch helvetica jean shorts edison bulb
                            poutine next level humblebrag la croix adaptogen.{" "}
                            <br />
                            <br />
                            Hashtag poke literally locavore, beard marfa kogi
                            bruh artisan succulents seitan tonx waistcoat
                            chambray taxidermy. Same cred meggings 3 wolf moon
                            lomo irony cray hell of bitters asymmetrical
                            gluten-free art party raw denim chillwave tousled
                            try-hard succulents street art.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        {/* ))} */}
        <div className="section categories related-games">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-heading">
                  {/* <h6>Action</h6> */}
                  <h2>Related Games</h2>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="main-button">
                  <a href="shop.html">View All</a>
                </div>
              </div>
        {topViews.map(i=>(
        
              <div className="col-lg col-sm-6 col-xs-12">
                <div className="item">
                  <h4>{i.namePro}</h4>
                  <div className="thumb">
                    <a href={`/shop/detail/${i.id}`}>
                      <img src={i.img2} alt="" />
                    </a>
                  </div>
                </div>
              </div>
              
           
      ))}
         </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default DetailPro;
