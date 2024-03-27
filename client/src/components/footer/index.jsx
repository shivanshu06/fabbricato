import React from 'react'
import styles from "./styles.module.css"
// import logo from "../../assets/images/header/logo.png"
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <div>
    <footer className={styles.footer}>
      <div className={styles.footerlogo}>
        {/* <img style={{height:'50px',width:'30%'}} src={logo} alt="Company Logo" /> */}
        <p className={styles.logoFont}>fabbricato</p>
        <p>Fabbricato is your ultimate source for finding the perfect T-shirt that matches your style and personality. Our dedicated team of designers and creators are committed to bringing you a diverse range of T-shirt designs that inspire and make a statement.</p>
      </div>
      <div className={styles.footerlinks}>
        <ul>
          <h3>Quick Links</h3>
          <li><a href="/">Home</a></li>
          <br></br>
          <li><a href="/products">Products</a></li>
          <br></br>
          <li><a href="/about">About Us</a></li>
          <br></br>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className={styles.footerlinks}>
        <h3>Collections </h3>
        <ul >
          <li>Graphic Tees</li>
          <br></br>
          <li>Nature-Inspired</li>
          <br></br>
          <li>Pop Culture</li>
          <br></br>
          <li>Personalized Favorites</li>
        </ul>
      </div>
      <div className={styles.footersocial}>
        <h3>Contact Us</h3>
        <p>Feel free to reach out to us with any questions, feedback, or concerns.</p>
        {/* <br></br> */}
        <h4>Phone:- 9458538368</h4>
        {/* <br></br> */}
        <h4>Email:- fabbricato88@gmail.com</h4>
        
        <div className="footer-social">
        {/* <a href="https://www.facebook.com/your-page"><FacebookOutlined /></a> */}
        {/* <a href="https://www.twitter.com/your-page"><TwitterOutlined /></a> */}
        <a href="https://instagram.com/fabbricato.in?igshid=NzZlODBkYWE4Ng=="><InstagramOutlined /></a>
      </div>
      </div>
      
      
    </footer>
    {/* <hr></hr>
    <h5 className={styles.copyright}>Luxetee© 2023. All rights reserved.</h5> */}
    </div>
  )
}

export default Footer