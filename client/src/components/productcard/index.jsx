import React from 'react';
import { Card, Button } from 'antd';
import styles from './styles.module.css'; 
import './styles.css'
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Link  to={`/details/${product._id}`} className={styles.linkWithoutUnderline}>
    <Card hoverable style={{margin:'10px'}}>
      <img src={product.image1} alt="image" className={styles.cardImage}/>
      <br></br>
      <p className={styles.nameOfProduct}>{product.name}</p>
      <br></br>
      <h2>₹ {product.priceAfterDiscount}</h2>
      <br></br>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ textDecoration: 'line-through' }}>M.R.P: {product.price},</p>
        <p>Discount: {product.discount}%</p>
      </div>
      <br></br>
      <Button
        type="primary"
        className={styles.addToCardButton} // Add your styles here if needed
      >
        Add to Cart
      </Button>
    </Card>
    </Link>
  );
};

export default ProductCard;
