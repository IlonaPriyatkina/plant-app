import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/header/Header'
import ShopGallery from './components/gallery/ShopGallery'
import Main from './components/main/Main'
import Footer from './components/footer/Footer'
import SignUp from './components/signUp/SignUp'
import LogIn from './components/login/LogIn'
import './App.css'

function App() {
  const [order, setOrder] = useState([]);

  const addToOrder = (goodsItem) => {
    let quantity = 1;

    const indexInOrder = order.findIndex(
      (item) => item.id === goodsItem.id
    );

    if (indexInOrder > -1) {
      quantity = order[indexInOrder].quantity + 1;

      setOrder(order.map((item) => {
        if (item.id !== goodsItem.id) return item;
        return {
          ...item,
          quantity,
        };
      }),
      );
    } else {
      setOrder([
        ...order,
        {
          ...goodsItem,
          quantity,
        },
      ],
      );
    }
  };
  
  const removeFromOrder = (goodsItem) => {
    const indexInOrder = order.findIndex((item) => item.id === goodsItem.id);
  
    if (indexInOrder > -1) {
      const updatedOrder = [...order];
      updatedOrder[indexInOrder].quantity -= 1;
  
      if (updatedOrder[indexInOrder].quantity === 0) {
        updatedOrder.splice(indexInOrder, 1); 
      }

      setOrder(updatedOrder);
    }
  };
  
  return (
    <div>
      <BrowserRouter>
        <Header
          order={order}
          removeFromOrder = {removeFromOrder}
          addToOrder={addToOrder}
        />
        <Routes>
          <Route path='/' element={<Main 
          addToOrder={addToOrder}/>} />
          <Route path='/main' element={<Main
            addToOrder={addToOrder}
          />} />
          <Route path='/shop' element={<ShopGallery
            addToOrder={addToOrder}
          />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/registration' element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App;