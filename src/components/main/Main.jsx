import React, { useState, useRef, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import mainStyles from "./main_style.module.scss";
import imgArrowLeft from './main_images/arrow-left.png';
import articleBanner from './main_images/monstera.png';
import { getPlants } from '../../services';

const Card = ({plant, addToOrder}) => {
  const { Img, Categories, price, plantDescription } = plant;
  return (
    <div className={mainStyles.card}>
      <img className={mainStyles.card_img} src={Img} />
      <div>
        <div className={mainStyles.card_description}>
          <p className={mainStyles.product_name}>{Categories}</p>
          <p className={mainStyles.product_price}>{price} $</p>
          <p className={mainStyles.product_description}>{plantDescription}</p>
        </div>
      </div>
      <button onClick={() => addToOrder(plant)} className={mainStyles.card_btn}>Buy</button>

    </div>
  );
};

const Slider = ({ items, addToOrder }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const visibleSlides = 4;
  const slideWidth = 100 / visibleSlides;

  const handleNextSlide = () => {
    if (currentSlide < Math.floor(items.length - visibleSlides)) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  
  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(Math.floor(items.length - visibleSlides));
    }
  };

  const transformStyle = {
    transform: `translateX(-${currentSlide * slideWidth}%)`,
  };



  return (
    <div className={mainStyles.slider}>
      <button onClick={handlePrevSlide} className={mainStyles.slider_btn_previos}><img className={mainStyles} src={imgArrowLeft}></img></button>
      <div className={mainStyles.slider_hidden_box}>
        <div className={mainStyles.cards_wrapper} ref={slideRef} style={transformStyle}>
        
        {items.map((item, index) => (
          <Card
            key={item.id}
            plant={item}
            addToOrder={addToOrder}
          />
        ))}
        
        </div>
      </div>

      <button onClick={handleNextSlide} className={mainStyles.slider_btn_next}><img className={mainStyles} src={imgArrowLeft}></img></button>
    </div>
  );
};



const Main = ({addToOrder}) => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    getPlants()
      .then(res => res.data.map(plant => ({
        ...plant,
        price: Math.floor(Math.random() * 50) + 1,
        plantDescription: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
      })))
      .then(res => {
        setGoods(res.slice(0, 8));
      })
      .catch(console.error);
  }, []);

  return (
    <div className={mainStyles.main}>
      <div className={mainStyles.main_container}>
        <div className={mainStyles.article_banner}>

          <div className={mainStyles.article}>
            <span>Let’s Bring</span>
            <h1>A New Friend Home</h1>

            <Divider />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus diam in consequat tempor. Donec eget justo ut est pretium gravida. Phasellus vulputate erat ipsum, nec gravida magna sodales in.</p>
            <div className={mainStyles.main_btn_group}>
              <button className={mainStyles.btn}><Link to="/registration" className={mainStyles.link_btn}>Registration</Link></button>
              <button className={mainStyles.btn}><Link to="/login" className={mainStyles.link_btn}>Log in</Link></button>
            </div>
          </div>
          <div>
            <img className={mainStyles.article_banner_img} src={articleBanner} alt="" />
          </div>
        </div>
       <h1 className={mainStyles.slider_title}>Hot offer of the season! Сhoose!</h1>
        <div className={mainStyles.sliderContainer}>
          <Slider addToOrder={addToOrder} items={goods} />
        </div>
        <div className={mainStyles.advertising_container}><span className={mainStyles.advertising_text}></span>
        
      </div>
      </div>
    </div>
  );
};

export default Main