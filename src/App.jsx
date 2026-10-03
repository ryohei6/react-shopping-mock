import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: '高性能ノートPC', price: 120000, category: 'Electronics', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Laptop' },
  { id: 2, name: 'ワイヤレスイヤホン', price: 15000, category: 'Electronics', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Earbuds' },
  { id: 3, name: 'メカニカルキーボード', price: 12000, category: 'Electronics', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Keyboard' },
  { id: 4, name: 'デザイナーズチェア', price: 45000, category: 'Furniture', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Chair' },
  { id: 5, name: 'スマートウォッチ', price: 25000, category: 'Electronics', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Watch' },
  { id: 6, name: 'デスクライト', price: 8000, category: 'Furniture', img: 'https://placehold.jp/24/cccccc/ffffff/200x200.png?text=Lamp' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">🛒 MockShop</a>
          <button className="btn btn-outline-light position-relative" onClick={() => setIsCartOpen(true)}>
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="bg-white py-5 border-bottom mb-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Welcome to MockShop</h1>
          <p className="lead text-muted">最高品質のガジェットと家具をあなたに。</p>
        </div>
      </header>

      {/* Product Grid */}
      <div className="container mb-5">
        <div className="row g-4">
          {PRODUCTS.map(product => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <img src={product.img} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <p className="text-muted small mb-1">{product.category}</p>
                  <h5 className="card-title h6">{product.name}</h5>
                  <p className="fw-bold text-primary">¥{product.price.toLocaleString()}</p>
                  <button className="btn btn-sm btn-primary w-100" onClick={() => addToCart(product)}>
                    カートに入れる
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar Overlay */}
      {isCartOpen && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="offcanvas offcanvas-end show" style={{ visibility: 'visible', right: 0, top: 0, height: '100vh', width: '400px', zIndex: 1050, backgroundColor: 'white' }}>
            <div className="offcanvas-header border-bottom">
              <h5 className="offcanvas-title fw-bold">Shopping Cart</h5>
              <button type="button" className="btn-close" onClick={() => setIsCartOpen(false)}></button>
            </div>
            <div className="offcanvas-body">
              {cart.length === 0 ? (
                <p className="text-center text-muted py-5">カートは空です。</p>
              ) : (
                <>
                  <div className="list-group list-group-flush mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="list-group-item px-0 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <div className="fw-bold">{item.name}</div>
                            <div className="text-muted small">¥{item.price.toLocaleString()}</div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, -1)}>-</button>
                            <span>{item.qty}</span>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQty(item.id, 1)}>+</button>
                            <button className="btn btn-sm btn-link text-danger" onClick={() => removeFromCart(item.id)}><i className="bi bi-trash"></i></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="h5 mb-0">Total:</span>
                    <span className="h4 mb-0 fw-bold text-primary">¥{total.toLocaleString()}</span>
                  </div>
                  <button className="btn btn-primary w-100 btn-lg" onClick={() => alert('ご購入ありがとうございます！（モックのため決済は行われません）')}>
                    購入手続きへ
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
