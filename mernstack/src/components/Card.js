import React, { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceOptions = props.options;
  const halfPrice = priceOptions[0].half;
  const fullPrice = priceOptions[0].full;
  const [size, setSize] = useState("half");
  const [qty, setQty] = useState(1);
  const [finalPrice, setFinalPrice] = useState(halfPrice);

  useEffect(() => {
    setFinalPrice(getPrice());
  }, [size, qty, data]);

  const getPrice = () => {
    if (size === "half") {
      return halfPrice * qty;
    } else if (size === "full") {
      return fullPrice * qty;
    }

    return 0;
  };

  const handleAddToCart = () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (Array.isArray(food) && food.length === size) {
      if (food.size === size) {
        dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });

        return;
      } else if (food.size !== size) {
        
       dispatch({
         type: "ADD",
         id: props.foodItem._id,
         product: props.foodItem.product,
         price: finalPrice,
         qty: qty,
         size: size,
         img: props.foodItem.img,
       });
        return;
      }
      return
    }

    dispatch({
      type: "ADD",
      id: props.foodItem._id,
      product: props.foodItem.product,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img,
    });
  };

  console.log(data);

  return (
    <div className="col">
      <div className="card mt-3 d-flex flex-column" style={{margin:'0.5rem'}}>
        <img
          className="card-img-top img-fluid"
          src={props.foodItem.img}
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <h4 className="card-title">{props.foodItem.product}</h4>
          <div className="row align-items-center w-100 ">
            <select
              className="m-2 h-100 bg-success "
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded "
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="half">Small - {halfPrice} $</option>
              <option value="full">Big - {fullPrice} $</option>
            </select>
            <div className="d-inline h-100 fs-5 d-flex justify-content-left">
              Total Price: {finalPrice}
            </div>
          </div>
          <hr className="mb-0"></hr>
        </div>

        <button
          className={`btn btn-success d-flex justify-content-center `}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Card;
