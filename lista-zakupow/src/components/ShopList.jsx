import React, { useState } from "react";
import AddProduct from './AddProduct';
import ProductItem from './ProdusctItem';

function ShopList({shop, onDeleteShop, onAddProduct, onCheckProduct}) {
    const [showAddProduct, setShowAddProduct] = useState(false);

    return (
        <div className="shop-card"> 
            <div className="shop-header">
                <h2>{shop.name}</h2> 
                <button onClick={() => onDeleteShop(shop.id)} className="delete-btn">
                    Usuń sklep
                </button>
            </div>

            <div className="product-list">
                {shop.products.map(product => (
                    <ProductItem 
                    key={product.id}
                    product={product}
                    onCheck={() => onCheckProduct(shop.id, product.id)}
                    />
                ))}
            </div>

            {showAddProduct ? (
                <AddProduct
                odAdd={(productName) => {
                    onAddProduct(shop.id, productName);
                    setShowAddProduct(false);
                }}
                onCancel={() => setShowAddProduct(false)}
                />
            ) : (
                <button onClick={() => setShowAddProduct(true)} className="add-product-btn">
                    Dodaj produkt
                </button>
            )}
        </div>
    );
}

export default ShopList;