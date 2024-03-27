import React from 'react';
import { Card, } from 'antd';
import { Button, ButtonGroup } from '@chakra-ui/react'
import styles from './styles.module.css'; 
import './styles.css'
import { Link } from 'react-router-dom';

const { Meta } = Card;

const ProductCard = ({ product }) => {

  const priceAfterDiscount = product.price - (product.price * product.discount) / 100;
  

  return (
    <Link  to={`/details/${product._id}`} className={styles.linkWithoutUnderline}>
    <Card className={styles.card}>
      <img src={product?.image1} alt="image" className={styles.cardImage}/>
      <br></br>
      <p className={styles.nameOfProduct}>{product?.name}</p>
      <br></br>
      <h2>₹ {priceAfterDiscount}</h2>
      <br></br>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ textDecoration: 'line-through' }}>M.R.P: {product.price},</p>
        <p>Discount: {product?.discount}%</p>
      </div>
      <br></br>
      <Button
       background="black"
        className={styles.addToCardButton}
      >
        Add to Cart
      </Button>
    </Card>
    </Link>
  );
};

export default ProductCard;
