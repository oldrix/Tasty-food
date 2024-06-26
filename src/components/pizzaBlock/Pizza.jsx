import React from "react";
import { addItem, cartItemSelector } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Pizza({ id, price, title, types, imageUrl }) {
  const [typeIndex, setTypeIndex] = React.useState(0);
  const dispatch = useDispatch();
  const cartItem = useSelector(cartItemSelector(id));
  console.log(typeIndex);
  const currentPrice = price[typeIndex];
  const finalPrice = currentPrice ? currentPrice : price;
  const onClickType = (idx) => {
    setTypeIndex(idx);
  };
  const addedItem = cartItem ? cartItem.count : 0;
  const add = () => {
    const item = {
      id,
      title,
      finalPrice,
      imageUrl,
      types: types[typeIndex],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="wrapperOfPizza">
      <div class="pizza-block">
        <Link to={`/pizza/${id}`}>
          <img class="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 class="pizza-block__title">{title}</h4>
        </Link>
        {types && types.length === 2 ? (
          <div class="pizza-block__selector">
            <ul>
              {types.map((type, i) => (
                <li
                  onClick={() => onClickType(i)}
                  className={typeIndex === i ? "active" : ""}
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div class="pizza-block__bottom">
          <div class="pizza-block__price">{finalPrice} ₽</div>
          <div onClick={add} class="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{addedItem}</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pizza;
