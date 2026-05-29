const API_URL = 'http://localhost:3000';
import { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SyncPage from './pages/SyncPage';
import Status from './components/Status';
import './App.css';

function App() {
  const [shops, setShops] = useState([]); //to jest do przechowywania sklepow

  const saveToLocalStorage = (data) => { //to do zapisywania w local storage
    localStorage.setItem('shops', JSON.stringify(data));
  };

  {/*useEffect(() => { //to laduje dane z localstorage przy odpaleniu strony
    const savedShops = localStorage.getItem('shops');
    if(savedShops) {
      setShops(JSON.parse(savedShops));
    }
  }, []);*/}
  useEffect(() => {

    const fetchData = async () => {

        if(navigator.onLine){

            const response = await fetch(
                `${API_URL}/items`
            );

            const data = await response.json();

            setShops(data);

            saveToLocalStorage(data);

        } else {

            const saved =
            localStorage.getItem('shops');

            if(saved){

                setShops(JSON.parse(saved));

            }

        }

    };

    fetchData();

}, []);

  //dodawanie sklepow
  const addShop = (shopName) => {
    const newShop = {
      id: Date.now(),
      name: shopName,
      products: [],
      synced: false
    };
    const updatedShops = [...shops, newShop];
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
    const updatedShops = shops.map(shop => {
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

  const [syncStatus, setSyncStatus] = useState('ready');

  {/*const manualSync = () => {
    setSyncStatus('synchronization . . .');
    setTimeout(() => {
      localStorage.setItem('lastSync', new Date().toISOString());
      setSyncStatus('synchronized');
      alert('Dane zostały zapisane!');
    }, 1000);
  };*/}
  const manualSync = async() => {

    setSyncStatus('synchronizing');

    try{

        await fetch(
            `${API_URL}/sync`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(shops)
            }
        );

        const syncedData = shops.map(
            shop => ({
                ...shop,
                synced:true
            })
        );

        setShops(syncedData);

        saveToLocalStorage(syncedData);

        setSyncStatus('synchronized');

    }

    catch{

        setSyncStatus('sync error');

    }

};
//synchronizacja online
useEffect(()=>{

  const handleOnline = ()=>{

      manualSync();

  };

  window.addEventListener(
      'online',
      handleOnline
  );

  return ()=>{

      window.removeEventListener(
          'online',
          handleOnline
      );

  };

},[shops]);


  
  return (
    <div className='app'>
      <Status/>
        <nav className="nav">
          <Link to="/">Strona główna</Link>
          <Link to="/sync">Synchronizacja</Link>
        </nav>

        <Routes>

          <Route path="/" element={
            <HomePage 
            shops={shops}
            onAddShop={addShop}
            onDeleteShop={deleteShop}
            onAddProduct={addProduct}
            onCheckProduct={checkProduct}
            />
          } />

          <Route path="/sync" element={
            <SyncPage
            syncStatus={syncStatus}
            onManualSync={manualSync}
            />
          } />
        </Routes>
    </div>
  );
}

export default App;
