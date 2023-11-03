import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  // const [foodCat, setFoodCat] = useState([]);
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
    // console.log(data)

    setFoodItem(data);

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);
  console.log(foodItem);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div className="container">
        {isLoading ? (
          <div>Loading...</div>
        ) : foodItem.length > 0 ? (
          foodItem.map((data) => (
            <div>
              <div key={data._id} className="fs-3 m-3">
                {data.categoryName}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <div>No categories available</div>
        )}
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
