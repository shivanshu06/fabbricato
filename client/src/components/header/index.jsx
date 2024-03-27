import styles from "./styles.module.css";
import React from "react";
import { useEffect, useState,useRef } from "react";
import { Button, Input, Dropdown, notification } from "antd";
import Logo from "../../assets/images/header/logo.png";
import {
  ShoppingCartOutlined,
  LoginOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button as Btn } from "@chakra-ui/react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../reducer";
const { Search } = Input;

function Header() {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [isHeaderYellow, setIsHeaderYellow] = useState(false);
  // const [loggedIn, setloggedIn] = useState(false);
  const headerRef = useRef();
  // const[Token,setToken]=useState('')
  // const [LoggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.cart.user);
  const fname = useSelector((state) => state?.cart?.user?.firstname);
  //  setLoggedIn(user)
  // console.log(user, "*************");

  function setFixed() {
    if (window.scrollY >= 100) {
      setIsHeaderYellow(true);
    } else {
      setIsHeaderYellow(false);
    }
  }

  // window.addEventListener("scroll", setFixed);

  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY >= 100;

      if (isScrolled) {
        headerRef.current.classList.add(styles.opaque);
      } else {
        headerRef.current.classList.remove(styles.opaque);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    dispatch(clearUser());
    // setLoggedIn(false)
    notification.success({
      message: "Logged out successful",
      description: "Come back soon!!",
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <a href="/myprofile">My Account</a>
      </Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className={`${isHeaderFixed ? `${styles.sticky}` : ""} ${
        isHeaderYellow ? `${styles.yellowBackground}` : ""
      }`}
      id="header"
      ref={headerRef}
    >
      <div className={styles.outer}>
        <div style={{display:'flex'}}>
          <img style={{height:'35px'}} src={Logo} alt="Logo" className={styles.logo} />
          {/* <p className={styles.logoFont}>fabbricato</p> */}
        </div>

        <div className={styles.belownav}>
          <Link to="/">
            <Button className={styles.link} type="link">
              HOME
            </Button>
          </Link>
          <Link to="/category">
            <Button className={styles.link} type="link">
              COLLECTION
            </Button>
          </Link>
          <Link to="/contact">
            <Button className={styles.link} type="link">
              CONTACT
            </Button>
          </Link>
        </div>
        {/* <input
  type="text"
  placeholder="Search products"
  prefix={<SearchOutlined style={{ fontSize: '20px' }} />}

  className={styles.searchbar}
/> */}

        <div className={styles.navlinks}>
          {/* <div > {'Hello,' fname}</div> */}
          {/* {fname && <h4>Hello, {fname}</h4>} */}

          {fname && (
            <span className={styles.greeting}>
              Hello, {fname.charAt(0).toUpperCase() + fname.slice(1)}
            </span>
          )}

          <Link to="/shoppingcart">
            <Btn
              className={styles.cartBtn}
              // size="large"
              // type="link"
              leftIcon={<ShoppingCartOutlined />}
              
            >Cart</Btn>
          </Link>
          {user ? (
            <Dropdown overlay={menu} placement="bottomRight">
              <Button
                className={styles.link}
                size="large"
                type="link"
                icon={<UserOutlined />}
              />
            </Dropdown>
          ) : (
            <Link to="/login">
              <Btn color="white" background="black" width="120px" >Log in</Btn>
            </Link>
          )}
        </div>
      </div>
      {/* <div className={styles.searchbarmobile}>
       
      </div> */}

      {/* <hr></hr> */}
    </div>
  );
}

export default Header;
