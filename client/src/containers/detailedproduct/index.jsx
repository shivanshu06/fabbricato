import React, { useEffect, useState } from "react";
import style from "../../style.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducer";
import { Row, Col, Card, Image, Select, Button } from "antd";
import styles from "./styles.module.css";
import { Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { detailById, detailOfDash } from "../../requests";

const { Meta } = Card;
const { Option } = Select;

const Details = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [Data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let imagefix = Data.image1;
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(Data.image1);

  const getData = async () => {
    try {
      const data = await detailById(id);
      const { collections } = data;

      setData(collections);
      // console.log(collections, "--------------");
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(id);

  useEffect(() => {
    getData();
  }, []);

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  const handleImageClick = (clickedImage) => {
    console.log("Clicked Image:", clickedImage); // Add this line for debugging
    setSelectedImage(clickedImage);
  };

  const handleAddToCart = (id, name, price, image) => {
    dispatch(addToCart({ id, name, price, image }));
  };

  return (
    <>
      {isLoading ? (
        <div className={styles.centered}>
          <Spinner size="xl" />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.mainContainer}>
            <div>
              {/* Big Image Frame */}
              <div style={{ marginBottom: "16px" }}>
                <img
                  src={selectedImage}
                  alt="Big Image"
                  // width={400}
                  className={styles.bigImage}
                  // height={500}
                />
              </div>

              {/* Small Images */}
              <div className={styles.smallImages}>
                {[1, 2, 3, 4].map((index) => {
                  const imageKey = `image${index}`;
                  const smallImage = Data[imageKey];

                  return (
                    <Image
                      key={index}
                      src={smallImage}
                      alt={`Small Image ${index}`}
                      width={80}
                      height={60}
                      onClick={() => handleImageClick(smallImage)}
                      preview={false}
                      style={{ cursor: "pointer", marginRight: "8px" }}
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.detailsOfPro}>
              <p className={styles.productname}>{Data.name}</p>
              <p>{Data.description}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <p className={styles.price}> ₹ {Data.price}</p>
                <p className={styles.afterPrice}>₹ {Data.priceAfterDiscount}</p>
              </div>
              <p>Size: {Data.size}</p>
              <p>Discount: {Data.discount}%</p>

              <Button
                type="primary"
                className={styles.addToCartBtn}
                // disabled={!selectedSize}
                onClick={() =>
                  handleAddToCart(Data._id, Data.name, Data.price, Data.image1)
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
