import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

// CSS to hide input spinners
const hideSpinnerCSS = `
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const ItemRow = ({ price, quantity, onQuantityChange, onDelete, isCustom }) => (
  <div className="flex items-center justify-between mb-2">
    <span className="text-lg">${price.toFixed(2)}</span>
    <div className="flex items-center">
      {isCustom && (
        <button
          className="mr-2 px-2 py-1 bg-red-200 rounded hover:bg-red-300"
          onClick={onDelete}
        >
          Delete
        </button>
      )}
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={() => onQuantityChange(Math.max(0, quantity - 1))}
      >
        <MinusIcon />
      </button>
      <input
        type="number"
        className="w-16 mx-2 p-1 text-center border rounded outline outline-slate-200 outline-2"
        value={quantity}
        onChange={(e) => onQuantityChange(Math.max(0, parseInt(e.target.value) || 0))}
        min="0"
      />
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
        onClick={() => onQuantityChange(quantity + 1)}
      >
        <PlusIcon />
      </button>
    </div>
  </div>
);

const CustomPriceInput = ({ onAdd }) => {
  const [customPrice, setCustomPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = parseFloat(customPrice);
    if (!isNaN(price) && price > 0) {
      onAdd(price);
      setCustomPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-2">
      <input
        type="number"
        className="w-24 p-1 border rounded mr-2 outline outline-slate-200 outline-2"
        value={customPrice}
        onChange={(e) => setCustomPrice(e.target.value)}
        placeholder="Custom $"
        step="0.01"
        min="0"
      />
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Add
      </button>
    </form>
  );
};

const App = () => {
  const [items, setItems] = useState([
    { id: 1, price: 1.49, quantity: 0 },
    { id: 2, price: 1.29, quantity: 0 },
    { id: 3, price: 1.30, quantity: 0 },
    { id: 4, price: 3.99, quantity: 0 },
    { id: 5, price: 8.99, quantity: 0 },
    { id: 6, price: 9.99, quantity: 0 },
    { id: 7, price: 12.99, quantity: 0 },
  ]);

  const [customItems, setCustomItems] = useState([]);
  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    const savedCustomItems = Cookies.get('customItems');
    if (savedCustomItems) {
      setCustomItems(JSON.parse(savedCustomItems));
    }
    const savedCookieAccepted = Cookies.get('cookieAccepted');
    if (savedCookieAccepted) {
      setCookieAccepted(true);
    }
  }, []);

  useEffect(() => {
    if (cookieAccepted) {
      Cookies.set('customItems', JSON.stringify(customItems), { expires: 30 });
    }
  }, [customItems, cookieAccepted]);

  const handleQuantityChange = (id, newQuantity) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCustomQuantityChange = (id, newQuantity) => {
    setCustomItems(customItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const addCustomItem = (price) => {
    setCustomItems([...customItems, { id: Date.now(), price, quantity: 1 }]);
  };

  const deleteCustomItem = (id) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const totalPrice = [...items, ...customItems].reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCookieAccept = () => {
    setCookieAccepted(true);
    Cookies.set('cookieAccepted', 'true', { expires: 365 });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow text-black">
      <style>{hideSpinnerCSS}</style>
      <h1 className="text-3xl font-bold mb-2 text-center">Balloon Price Calculator</h1>
      <h2 className="text-xl mb-4 text-center text-gray-600">Welcome to the air dungeon</h2>
      <h3 className="text-2xl font-bold mb-4 text-center">
        Total: ${totalPrice.toFixed(2)}
      </h3>
      {items.map((item) => (
        <ItemRow
          key={item.id}
          price={item.price}
          quantity={item.quantity}
          onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
          isCustom={false}
        />
      ))}
      {customItems.map((item) => (
        <ItemRow
          key={item.id}
          price={item.price}
          quantity={item.quantity}
          onQuantityChange={(newQuantity) => handleCustomQuantityChange(item.id, newQuantity)}
          onDelete={() => deleteCustomItem(item.id)}
          isCustom={true}
        />
      ))}
      <CustomPriceInput onAdd={addCustomItem} />
      <p className="text-sm text-gray-500 mt-4 text-center">
        Made with 💚 (and a little helium) by Gabriel Caterson
      </p>
      {!cookieAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 text-center">
          This site uses cookies (don't tell bakery).
          <button
            onClick={handleCookieAccept}
            className="ml-2 bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

export default App;