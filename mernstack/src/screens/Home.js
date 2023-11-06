import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const [search,setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);

    const response = await fetch("http://localhost:5001/api/getallfood", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    setFoodItem(data);

    const responseCat = await fetch("http://localhost:5001/api/getcategory", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const dataCateg = await responseCat.json();
    setFoodCat(dataCateg);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {/* <Carousel /> */}
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="container-fluid">
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  {/* <button
                    className="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodItem.length > 0 ? (
          foodCat.map((categ) => (
            <div key={categ._id} className="row mb-3">
              <div className="fs-3 m-3">{categ.categoryName}</div>
              <hr />
              <div className="d-flex flex-wrap">
                {foodItem
                  .filter((item) => (item.categoryName === categ.categoryName) && (item.product.toLowerCase().includes(search.toLocaleLowerCase())))
                  .map((filterItem) => (
                    <div
                      key={filterItem._id}
                      className="col-12 col-md-5 col-lg-3"
                    >
                      <Card
                        foodItem = {filterItem}
                        options={filterItem.options}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
