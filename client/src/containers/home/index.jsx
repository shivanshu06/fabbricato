import React, { useEffect, useState } from "react";
import '../../global.css'
import axios from "axios";
import marvel from "../../assets/images/homepage/marvel2.jpg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import style from "../../style.module.css";
import spiderman from "../../assets/images/homepage/spiderman.jpeg";
import off from "../../assets/images/homepage/latest.jpeg";
import { Carousel as AntdCarousel } from "antd";
import test from "../../assets/images/homepage/men.png";
import woman from "../../assets/images/homepage/women.png";
import { getAllProducts } from "../../requests";
import ProductCard from "../../components/productcard";
import kids from "../../assets/images/homepage/kids.jpg";
import img1 from "../../assets/images/homepage/img1.jpg";
import img2 from "../../assets/images/homepage/img2.jpg";
import img3 from "../../assets/images/homepage/img3.jpg";
import styles from "./styles.module.css";
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Homepage = () => {
  const navigate = useNavigate();
  const [allProductsApi, setallproducts] = useState([]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const content = [
    { image: marvel, title: "Marvel" },
    { image: marvel, title: "Marvel" },
    { image: marvel, title: "Marvel" },
    { image: marvel, title: "Marvel" },
    // Add more content as needed
  ];

  const images = [
    {
      src: img1,
      alt: "T-shirt 1",
      text: "T-SHIRTS",
    },
    {
      src: img2,
      alt: "T-shirt 2",
      text: "JOGGERS",
    },
    {
      src: img3,
      alt: "T-shirt 3",
      text: "HOODIES",
    },
  ];

  // console.log(items)
  const handleCardClick = (category) => {
    console.log(category);
    navigate(`/collection?category=${category}`);
  };

  const AllProducts = async () => {
    try {
      const resp = await getAllProducts();
      // console.log(resp.data.data.product)
      setallproducts(resp.data.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AllProducts();
  }, []);

  function filterProducts(products, key) {
    return products.filter((product) => product[key]);
  }

  const topsellingProducts = filterProducts(allProductsApi, "topSelling");
  const newarrivalsProducts = filterProducts(allProductsApi, "newArrival");

  return (
    <div>
      <AntdCarousel autoplay>
        <div className={styles.poster}>
          <img src={off} alt="off" />
        </div>
        <div className={styles.poster}>
          <img src={spiderman} alt="spidermancollection" />
        </div>
      </AntdCarousel>
      <br></br>
      <div className={styles.container}>
        <div className={styles.blueback}>
          <h3>Collection For your loved ones!!</h3>
          {/* <h5>Gift the style</h5> */}
          <br></br>
          <br></br>
          <div className={styles.collec}>
            <Card
              style={{ width: "180px" }}
              hoverable
              cover={<img alt="Image" src={test} />}
              onClick={() => handleCardClick("men")}
            >
              {" "}
              <Meta title="Men" />
            </Card>

            <Card
              style={{ width: "180px" }}
              hoverable
              cover={<img alt="Image" src={woman} />}
              onClick={() => handleCardClick("women")}
            >
              {" "}
              <Meta title="Women" />
            </Card>

            <Card
              style={{ width: "180px" }}
              hoverable
              cover={<img alt="Image" src={kids} style={{ height: "209px" }} />}
              onClick={() => handleCardClick("kids")}
            >
              {" "}
              <Meta title="Kids" />
            </Card>
          </div>
        </div>

        <div className={styles.align}>
          <div className={styles.headtag}>
            <h1 style={{ color: "white" }}>
              Crafted for comfort & designed for you.
            </h1>
            <p style={{ color: "white" }}>
              Luxetee is your ultimate source for finding the perfect T-shirt
              that matches your style and personality. Our dedicated team of
              designers and creators are committed to bringing you a diverse
              range of T-shirt designs that inspire and make a statement.{" "}
            </p>
            <Link to="/category">
              <Button type="primary" className={style.buttonglobal}>
                Shop now
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.text}>
          <div className={styles.imagegallery}>
            {images.map((image, index) => (
              <div className={styles.imagecontainer} key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className={styles.clickImage}
                />
                <h1 className={styles.textoverlay}>{image.text}</h1>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.text}>
          <h1>NEW ARRIVALS</h1>
          <br></br>
          <div className={styles.aligncards}>
            <Carousel responsive={responsive}>
              {newarrivalsProducts.map((item, index) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </Carousel>
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.bannerTwo}>
            <div className={styles.left}>
              <h1>PEACE OF MIND</h1>
              <br></br>
              <p>
                A one-stop platform for all your fashion needs, hassle-free. Buy
                with a peace of mind.
              </p>
              <br></br>
              <button className={styles.buynowBUtton}>BUY NOW</button>
            </div>
            <div className={styles.right}>
              <h1>Buy 2 Get 1 Free</h1>
              <br></br>
              <p>
                End of season sale. Buy any 2 items of your choice and get 1
                free.
              </p>
              <br></br>
              <button className={styles.buynowBUtton}>BUY NOW</button>
            </div>
          </div>
        </div>

        <div className={styles.text}>
          <h1>Based on Choice</h1>
          <br></br>
          <div className={styles.aligncards}>
            <Carousel responsive={responsive}>
              {content.map((item, index) => (
                <div key={index} className={styles.card}>
                  <img
                    style={{ borderRadius: "10px" }}
                    src={item.image}
                    alt={item.title}
                  />
                  <h4>{item.title}</h4>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <div className={styles.text}>
          <h1>TOP SELLING</h1>
          <br></br>
          <div className={styles.aligncards}>
            <Carousel responsive={responsive}>
              {topsellingProducts.map((item, index) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </Carousel>
          </div>
        </div>

        <div className={styles.banner}>
          <h1>Teespiration wear your imagination</h1>
          <h2>
            We sell what we tell{" "}
            <span style={{ color: "yellow" }}>TOH SHOPPING KARO BINDASS</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
