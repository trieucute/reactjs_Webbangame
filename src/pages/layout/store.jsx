import React from "react";
import firebase from "../../firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAllProduct } from "../../reduxTool/productSlice";
import { getAllCate } from "../../reduxTool/categorySlice";
const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { id } = useParams();
  console.log(id);

  const db = firebase.firestore();
  const dispatch = useDispatch();
  let productAll = useSelector((state) => state.product.allProducts);
  console.log(productAll);

  const categories = useSelector((state) => state.category);
  console.log(categories);

  //   const filteredProducts = (selectedCategory !== '') ?
  //   productAll.filter(product => product.catId === selectedCategory).map(product => {
  //     const category = categories.find(category => category.id === product.catId);
  //     return {
  //       ...product,
  //       name: category ? category.name : ''
  //     };
  //   }) : productAll;
  // console.log(filteredProducts);

  const filteredProducts =
    selectedCategory !== ""
      ? productAll.filter((product) => product.catId === selectedCategory)
      : productAll;
  console.log(filteredProducts);
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryPromise = db.collection("categories").get();

        const allProductPromise = db.collection("products").get();

        const [allProductList, categoriesList] = await Promise.all([
          allProductPromise,
          categoryPromise,
        ]);

        let allProductArr = [];

        allProductList.forEach(async (doc) => {
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

          allProductArr = [...allProductArr, newProduct];

          dispatch(getAllProduct(allProductArr));
          console.log(allProductArr);
        });

        const categoriesArr = [];
        categoriesList.forEach((doc) => {
          categoriesArr.push({ ...doc.data(), id: doc.id });
        });
        dispatch(getAllCate(categoriesArr));
        console.log(categoriesArr);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Our Shop</h3>
              <span className="breadcrumb">
                <a href="/">Home</a> &gt; Our Shop
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="section trending">
        <div className="container">
          <ul className="trending-filter">
            <li>
              <NavLink
                className="is_active"
                to="/shop"
                onClick={() => handleCategoryClick("")}
              >
                Show All
              </NavLink>
            </li>
            {categories.map((cat) => (
              <li>
                <NavLink
                  to={`/shop/${cat.id}`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="row trending-box">
            {filteredProducts.map((pro) => (
              <div
                className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv"
                style={{ marginBottom: "30px", height: "350px" }}
              >
                <div className="item" style={{ height: "350px" }}>
                  <div className="thumb">
                    <a href={"/shop/detail/" + pro.id}>
                      <img src={pro.img} alt="" style={{ height: "200px" }} />
                    </a>
                    <span className="price">
                      <em>${pro.pricePro}</em>${pro.discount}
                    </span>
                  </div>
                  <div className="down-content" style={{ padding: "15px" }}>
                    <span className="category">{pro.name}</span>
                    <h4
                      style={{
                        padding: "0 0",
                        margin: "0 0",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      {pro.namePro}
                    </h4>
                    <a href="product-details.html" style={{ right: "43% " }}>
                      <i className="fa fa-shopping-bag" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="pagination">
                <li>
                  <a href="#"> &lt; </a>
                </li>
                <li>
                  <a href="#" className="is_active">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#"> &gt; </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
