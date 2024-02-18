import React from 'react';
import { Card } from 'antd';
import styles from "./styles.module.css"
import marvel from "../../assets/images/homepage/marvel2.jpg"

const ClickableRoundCard = ({ imageSrc, title }) => {
  return (
    <div className={`${styles.clickableSquareCard} ${styles.squareCard}`}>
    <div className={styles.cardCover}>
      <img src={imageSrc} alt="title" className={styles.cardImage} />
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>{title}</div>
      </div>
    </div>
  </div>
  );
};

export default ClickableRoundCard;
