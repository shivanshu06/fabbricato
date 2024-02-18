import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import styles from "./styles.module.css"; // Import your CSS file

function BasicLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>{children}
      <Footer />
      </div>
    </div>
  );
}

export default BasicLayout;
