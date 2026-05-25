import AddShop from '../components/AddShop';
import ShopList from '../components/ShopList';

function HomePage({ shops, onAddShop, onDeleteShop, onAddProduct, onCheckProduct }) {
  return (
    <div>
      <h1>Lista Zakupów</h1>
      <AddShop onAdd={onAddShop} />
      <div className="shops-container">
        {shops.map(shop => (
          <ShopList
            key={shop.id}
            shop={shop}
            onDeleteShop={onDeleteShop}
            onAddProduct={onAddProduct}
            onCheckProduct={onCheckProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;