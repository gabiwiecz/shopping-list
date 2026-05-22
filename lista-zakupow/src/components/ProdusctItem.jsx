import React from "react";

function ProductItem({product, onCheck}) {
    return(
        <div className="product-item">
            <label>
                <input type="checkbox"
                onChange={onCheck}
                />
                <span>{product.name}</span>
            </label>
        </div>
    );
}

export default ProductItem;