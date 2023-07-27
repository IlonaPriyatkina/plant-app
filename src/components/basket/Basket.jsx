import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { ShoppingBasket, Close } from '@mui/icons-material';
import React, { useState } from 'react';
import { Divider } from '@material-ui/core';
import GoodsItem from "../gallery/GoodsItem";

const Basket = (props) => {
    const {
        cartOpen,
        closeCart = Function.prototype,
        order = [],
        removeFromOrder,
        addToOrder
    } = props;

    return (
        <Drawer
            anchor="right"
            open={cartOpen}
            onClose={closeCart}
        >
            <List sx={{ width: '500px' }}>
                <ListItem>
                    <ListItemIcon>
                        <ShoppingBasket />
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                </ListItem>
                <Divider />

                {!order.length ? (
                    <ListItem>Cart is empty!</ListItem>
                ) : (
                    <>
                        {order.map((item) => (
                            <GoodsItem 
                            key={item.name} 
                            removeFromOrder={removeFromOrder} 
                            plant ={item}
                            mode = 'cart'
                            addToOrder={addToOrder}
                            />
                        ))}
                        <Divider />
                        <ListItem>
                            <Typography sx={{ fontWeight: 700 }}>
                                Total cost:{' '}
                                {order.reduce((acc, item) => {
                                    return acc + item.price * item.quantity;
                                }, 0)}{' '}
                                $.
                            </Typography>
                        </ListItem>
                    </>
                )}

            </List>
        </Drawer>
    )
}

export default Basket