import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducer';
import { useParams, Link ,useSearchParams} from 'react-router-dom';
import { getfilterProducts } from '../../requests';
import styles from './styles.module.css';
import { Button, Card, Row, Col, Skeleton } from 'antd';

import ProductCard from '../../components/productcard';
const { Meta } = Card;

const Collection = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  // const { category } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const uppercaseCategory = category.toUpperCase();

  const fetchdata = async () => {
    try {
      const data = await getfilterProducts({category:category});
      // console.log(data.collections, 'data is coming');
      setData(data.data.data.filteredProducts);
      
      console.log(data.data.data.filteredProducts, 'ye hai');
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false); 
    }
  };
// console.log(category)
  useEffect(() => {
    fetchdata();
  }, []);

  const handleAddToCart = (id, name, price) => {
    // Dispatch the addToCart action with the product information
    dispatch(addToCart({ id, name, price }));
  };

  return (
    <div className={styles.container}>
      <h1>{uppercaseCategory} Collection</h1>
      <Row gutter={[16, 16]}>
        {/* Conditionally render skeleton or card based on loading state */}
        {isLoading ? (
          // Display skeleton while loading
          Array.from({ length: 8 }).map((_, index) => (
            <Col key={index} span={8} xs={24} sm={12} md={8} lg={6}>
              <Skeleton active />
            </Col>
          ))
        ) : (
          // Display actual card content when data is available
          data.map((item) => (
            <Col key={item._id} span={8} xs={24} sm={12} md={8} lg={6}>
              <ProductCard key={item._id} product={item} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Collection;
