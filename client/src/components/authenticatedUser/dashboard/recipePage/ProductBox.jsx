import React, { useState } from "react";


const ProductBox = ({ product, onIncrease, onDecrease, onRemove }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // track quantities
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
        onIncrease(product.sku, updatedQuantity);
      };
      
      const handleDecrease = () => {
        if (quantity > 1) {
          const updatedQuantity = quantity - 1;
          setQuantity(updatedQuantity);
          onDecrease(product.sku, updatedQuantity);
        }
      };
      
    

  
    return (
      <div 
        style={{
          maxWidth: '140px',
          minWidth: '140px',
          minHeight: '110px',
          position: 'relative',
        }}
        className="max-h-28 border-solid border-2 border-black p-0 box-border rounded-lg bg-yellow-50 flex flex-col justify-center items-center relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
          
        <div>{product.name}</div>
        <QuantityTracker className='absolute -top-1 left-0 text-sm' quantity={quantity}></QuantityTracker>
        {isHovered && (
          <>
          
          <UpButton className='z-30 absolute -top-0' onIncrease={handleIncrease}></UpButton>  
          <RemoveButton className='z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' onRemove={onRemove} />
          <DownButton className='z-30 absolute bottom-0' onDecrease={handleDecrease}></DownButton>
        </>
        )}
        <div>${product.eachPrice}</div>
        <div>SKU: {product.sku}</div>
        {/* Check if totalEachs is defined before using it */}
  
      </div>
    );
  };
  

const RemoveButton = ({ onRemove, className }) => {
    return (
      <button className={`${className} text-6xl text-red-500 font-bold h-1/2 w-11/12 bg-zinc-500 bg-opacity-30 rounded-lg flex items-center justify-center hover:bg-red-300 hover:bg-opacity-50 hover:scale-110`} onClick={onRemove}>
        <span style={{ lineHeight: "1.2", paddingBottom: "2px" }}>X</span>
      </button>
    );
};

const UpButton = ({ onIncrease, className }) => {
    return (
      <button className={`${className} text-2xl font-bold border-0 hover:bg-green-200 bg-opacity-50 h-6 flex items-center justify-items-center pb-2 pl-5 pr-5 border-black hover:border-2 hover:border-opacity-30 hover:scale-110 rounded-md`}  onClick={onIncrease}>
        +
      </button>
    );
};

const DownButton = ({ onDecrease, className }) => {
    return (
      <button className={`${className} text-2xl font-bold border-0 hover:bg-red-300 bg-opacity-70 h-6 flex items-center justify-items-center pb-2 pl-5 pr-5 border-red-950 hover:border-2 hover:border-opacity-30 hover:scale-110 rounded-md`} onClick={onDecrease}>
        -
      </button>
    );
};

const QuantityTracker = ({ quantity, className }) => {
    return (
        <div className={`${className}`}>
            qt:{quantity}
        </div>
    );
};

export default ProductBox;
