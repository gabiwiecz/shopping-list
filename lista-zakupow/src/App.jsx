import { useState, useEffect } from 'react';
import AddShop from "./components/AddShop";
import ShopList from './components/ShopList';
import './App.css';

function App() {
  const [count, setShops] = useState([]); //to jest do przechowywania sklepow

  const saveToLocalStorage = (data) => { //to do zapisywania w local storage
    localStorage.setItem('shops', JSON.stringify(data));
  };

  useEffect(() => { //to laduje dane z localstorage przy odpaleniu strony
    const savesShops = localStorage.getItem('shops');
    if(savedShops) {
      setShops(JSON.parse(savedShops));
    }
  }, []);

  //dodawanie sklepow
  const addShop = (shopName) => {
    const newShop = {
      id: Date.now(),
      name: shopName,
      products: []
    };
    const updatedShops = [...ShopList, newShop];
    setShops(updatedShops);
    saveToLocalStorage(updatedShops);
  };

  //usuwanie sklepow z localstorage
  const deleteShop = (shopId) => {
    const updatedShops = shops.filter(shop => shop.id !== shopId);
    setShops(updatedShops);
    saveToLocalStorage(updatedShops);
  };

  const addProduct = (shopId, productName) => { //to dodaje produkty do danego sklepu
    const updatedShops = shops.map(shop => {
      if (shop.id === shopId) {
        const newProduct = {
          id: Date.now(),
          name: productName,
          checked: false
        };
        return { ...shop, products: [...shop.products, newProduct]};
      }
      return shop;
    });
    setShops(updatedShops);
    saveToLocalStorage(updatedShops);
  };

  //usuwa zaznaczony produkt z listy
  const checkProduct = (shopId, productId) => {
    const updatedShops = shop.map(shop => {
      if (shop.id === shopId) {
        const filteredProducts = shop.products.filter(
          product => product.id !== productId
        );
        return {...shop, products: filteredProducts };
      }
      return shop;
    });
    setShops(updatedShops);
    saveToLocalStorage(updatedShops);
  };

  return (
    <div className='app'>
      <h1>Lista Zakupów</h1>
      <addShop onAdd={addShop} />
      <div className='shops-container'>
        {shops.map(shop => (
          <ShopList
          key={shop.id}
          shop={shop}
          onDeleteShop={deleteShop}
          onAddProduct={addProduct}
          onCheckProduct={checkProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
