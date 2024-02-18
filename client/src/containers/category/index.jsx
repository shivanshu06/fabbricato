import React, { useEffect } from "react";
import styles from "./styles.module.css";
import marvel from "../../assets/images/homepage/marvel2.jpg";
import Roundcard from "../../components/roundcard";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { getfullcollection } from "../../requests";
import women from '../../assets/images/women.jpg'
import men from '../../assets/images/men.jpg'

const Products = () => {
  return (
    <div className={styles.container}>
      <h1>OUR COLLECTIONS</h1>
      <div className={styles.alignround}>
        <Link to="/collection/women">
          <Roundcard imageSrc={women} title="Women" />
        </Link>
        <Link to="/collection/men">
          <Roundcard imageSrc={men} title="Men" />
        </Link>
        <Link to="/collection/kids">
          <Roundcard imageSrc={marvel} title="Kids" />
        </Link>
      </div>
      <div>
        <h1>Legendary Icons Collection</h1>
        <div className={styles.alignround}>
          <Roundcard imageSrc={marvel} title="#1 choice" />
          <Roundcard imageSrc={marvel} title="Starwars" />
          <Roundcard imageSrc={marvel} title="Anime" />
          <Roundcard imageSrc={marvel} title="Batman" />
          <Roundcard imageSrc={marvel} title="Teady Bear" />
          <Roundcard imageSrc={marvel} title="Spiderman" />
        </div>
      </div>
    </div>
  );
};

export default Products;
