import { useState } from 'react';
import './TastyBurger.css';

interface BurgerItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  image: string;
}

interface CartItem extends BurgerItem {
  quantity: number;
}

const menuBurgers: BurgerItem[] = [
  {
    id: 1,
    name: 'Crispy Chicken',
    price: 99.15,
    desc: 'Chicken breast, chilli sauce, tomatoes, pickles, coleslaw',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Ultimate Bacon',
    price: 99.32,
    desc: 'House patty, cheddar cheese, bacon, onion, mustard',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Black Sheep',
    price: 69.15,
    desc: 'American cheese, tomato relish, avocado, lettuce, red onion',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'Vegan Burger',
    price: 99.25,
    desc: 'House patty, cheddar cheese, onion, mustard',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=500&q=80'
  }
];

export default function TastyBurger() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function para maidagdag ang burger sa cart kapag pinindot ang Add to Order
  const handleAddToCart = (burger: BurgerItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === burger.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === burger.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...burger, quantity: 1 }];
    });
    // Kusang bubukas ang mini cart para makita ang inadd
    setIsCartOpen(true);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="app-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-container">
          <span className="burger-logo-icon">🍔</span>
          <div className="logo-text">
            <span className="logo-sub">TASTY</span>
            <span className="logo-main">BURGER</span>
          </div>
        </div>
        
        <div className="nav-links">
          <a href="#about">ABOUT</a>
          <a href="#menu">OUR MENU</a>
          <a href="#contact">CONTACT</a>

          {/* MINI CART ICON SA TABI NG CONTACT */}
          <div className="cart-wrapper">
            <button 
              type="button"
              className="mini-cart-btn" 
              onClick={() => setIsCartOpen(!isCartOpen)}
              title="My Cart"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="cart-icon-svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              
              {totalItemsCount > 0 && (
                <span className="cart-badge">{totalItemsCount}</span>
              )}
            </button>

            {/* MINI CART DROPDOWN PANEL */}
            {isCartOpen && (
              <div className="mini-cart-dropdown">
                <div className="mini-cart-header">
                  <h4>Your Cart</h4>
                  <button type="button" onClick={() => setIsCartOpen(false)} className="close-dropdown-btn">✕</button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="empty-cart-text">Wala pang nakalagay sa iyong order</p>
                ) : (
                  <div>
                    <div className="cart-items-list">
                      {cartItems.map((item) => (
                        <div key={item.id} className="cart-item-row">
                          <div>
                            <p className="cart-item-name">{item.name}</p>
                            <p className="cart-item-qty">Qty: {item.quantity}</p>
                          </div>
                          <span className="cart-item-price">₱{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <hr className="cart-divider" />
                    <div className="cart-total-row">
                      <strong>Total:</strong>
                      <span className="total-price-text">₱{totalPrice.toFixed(2)}</span>
                    </div>
                    <button type="button" className="checkout-btn" onClick={() => alert('Proceeding to Checkout...')}>
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero-section">
        <h1 className="hero-title">OUR CRAZY BURGERS</h1>
        <p className="hero-subtitle">
          Get ready for a wild ride of flavors! Our crazy burgers are loaded with juicy patties, bold toppings, and irresistible sauces, all stacked on a perfectly toasted bun.
        </p>
      </header>

      {/* MENU / BURGERS GRID SECTION */}
      <section id="menu" className="menu-section">
        <div className="burger-grid">
          {menuBurgers.map((burger) => (
            <div className="burger-card" key={burger.id}>
              <div className="card-img-box">
                <img src={burger.image} alt={burger.name} className="burger-img" />
              </div>
              <div className="card-info">
                <div className="rating-row">
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                  <button type="button" className="wishlist-btn">♡</button>
                </div>
                <h3 className="burger-title">{burger.name}</h3>
                <p className="burger-desc">{burger.desc}</p>
                <div className="card-footer">
                  <button 
                    type="button" 
                    className="order-btn"
                    onClick={() => handleAddToCart(burger)}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}