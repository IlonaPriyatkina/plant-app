import React, { useState } from 'react';
import headerStyles from "./header_style.module.scss"
import logo from './image/logo.png'
import menu from './image/menu.png'
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import Basket from '../basket/Basket';




const Header = (props) => {
	const [miniMenuVisible, setMiniMenuVisible] = useState(false);
	const [isCartOpen, setCartOpen] = useState(false);
	const { order, removeFromOrder, addToOrder } = props

	const toggleMiniMenu = () => {
		setMiniMenuVisible(!miniMenuVisible);
	};

	const renderMiniHeaderMenu = () => {
		if (miniMenuVisible) {
			return (
				<nav className={headerStyles.invisible_nav}>
					<ul className={headerStyles.mini_list}>
						<li className={headerStyles.header_li}><Link to="/main" >Home</Link></li>
						<li className={headerStyles.header_li}><Link to="/shop" >Shop</Link></li>
						<li className={headerStyles.header_li}><Link to="/footer" >Contact</Link></li>
					</ul>
				</nav>
			);
		}
		return null;
	};

	const handleCartOpen = () => {
		setCartOpen(true);
	};

	const countCart = (order) => {
		return order.reduce((result, el) => {
			result += el.quantity
			return result
		}, 0)
	}
	const count = countCart(order)

	return (
		<header className={headerStyles.header}>
			<div className={headerStyles.header_container}>
				<div className={headerStyles.logo_group}>
					<img className={headerStyles.logo_img} src={logo} alt="logo" />
					<span className={headerStyles.logo_name}>Oak tree</span>
				</div>
				<button onClick={toggleMiniMenu} className={headerStyles.button_burgermenu}>
					<img className={headerStyles.burgermenu_img} src={menu} alt="burgermenu" />
				</button>
				<nav className={headerStyles.mini_nav}>
					{renderMiniHeaderMenu()}</nav>

				<nav className={headerStyles.nav}>
					<ul className={headerStyles.list}>
						<li className={headerStyles.header_li}><Link to="/main" >Home</Link></li>
						<li className={headerStyles.header_li}><Link to="/shop" >Shop</Link></li>
						<li className={headerStyles.header_li}>Contact</li>
					</ul>
				</nav>
				<div>
				{!!count && count}
					<IconButton
						color='inherit'
						onClick={handleCartOpen}
					>
						

						<AddShoppingCartIcon />
					</IconButton>
					<Basket
						order={order}
						removeFromOrder={removeFromOrder}
						cartOpen={isCartOpen}
						closeCart={() => setCartOpen(false)}
						addToOrder={addToOrder}
					/>
				</div>


			</div>
		</header>
	)
}

export default Header