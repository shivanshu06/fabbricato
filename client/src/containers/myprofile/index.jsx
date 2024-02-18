import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Tabs, Form, Input, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress, getAddress } from "../../requests";
import { updateAddress } from "../../reducer";
import { Card,Row,Col } from "antd";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [allAddress, setalladdress] = useState([]);
  const user = useSelector((state) => state?.cart?.user);
  console.log(user, "hvuevufevbkerve");
  const id = useSelector((state) => state?.cart?.user?.id);

  const handleSave = (values) => {
    console.log("Form values:", values);
    // setVisible(false);
  };

  const addressSave = async (value) => {
    try {
      const resp = await saveAddress(value, id);
      console.log(resp);
      setAddress(resp);
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
    }
  };

  const AllAddress = async () => {
    try {
      const resp = await getAddress(id);
      // console.log(resp.data.data,'all address')
      setalladdress(resp.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    AllAddress();
  }, [address]);

  console.log(allAddress);
  const tabContent = {
    1: (
      <Form
        style={{ border: "1px solid #ccc", padding: "20px" }}
        layout="vertical"
        onFinish={handleSave}
      >
        <h4>Edit Profile</h4>
        <Form.Item label="Email" name="email" initialValue={user?.email}>
          <Input disabled />
        </Form.Item>
        <div>
          <h2>General Information</h2>
          <Form.Item
            label="First Name"
            name="firstname"
            initialValue={user?.firstname}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            initialValue={user?.lastname}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="phone"
            initialValue={user?.phone}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
    ),
    2: (
      <div>
        <div>
          <div className={styles.card}>
            <Row gutter={[16,16]}>
            {allAddress.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                bordered={false}
                style={{
                  width: "300px",
                  height: "320px",
                  background: "aliceblue",
                }}
                
              >
                <h3>{`${item.fname} ${item.lname}`}</h3>
                <p>{item.street}</p>
                <p>{item.area}</p>
                <p>
                  {item.city}
                </p>
                <p>{item.zip_code}</p>
                <p>{item.country}</p>
                <p>{item.state}</p>
                
                <p>Mobile: {item.mobile}</p>
                <div style={{ display: "flex", gap: "7px" }}>
                  <Button className={styles.addressbutton}>Edit</Button>
                  <Button danger  className={styles.addressbutton}>remove</Button>
                </div>
              </Card>
              </Col>
            ))}
            </Row>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center",marginTop:'20px' }}>
          <Button
            type="dashed"
            onClick={() => setIsModalVisible(true)}
            style={{
              width: "300px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PlusOutlined style={{ fontSize: "32px" }} />
            <span>Add Address</span>
          </Button>
          </div>
        </div>
        <Modal
          title="Add Address"
          visible={isModalVisible}
          //   onOk={() => addressSave}
          footer={null}
          onCancel={() => setIsModalVisible(false)}
        >
          {/* Here, you can create a form to input address details */}
          <Form layout="vertical" onFinish={addressSave}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name='fname'>
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lname">
              <Input placeholder="Last Name" />
            </Form.Item>
            </div>
            <Form.Item name="street">
              <Input placeholder="House No. street" />
            </Form.Item>
            <Form.Item name="area">
              <Input placeholder="Area" />
            </Form.Item>
            <Form.Item name="landmark">
              <Input placeholder="Landmark" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name="zip_code">
                <Input placeholder="Postal Code" />
              </Form.Item>
              <Form.Item name="city">
                <Input placeholder="City, District" />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item name="country">
                <Input placeholder="Country" />
              </Form.Item>
              <Form.Item name="state">
                <Input placeholder="State" />
              </Form.Item>
            </div>
            <Form.Item name="mobile">
              <Input placeholder="Mobile Number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    ),
    3: "Content of tab C",
    4: "Content of tab D",
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div className={styles.container}>
      <Tabs
        defaultActiveKey={activeTab}
        type="card"
        size="small"
        onChange={handleTabChange}
      >
        <Tabs.TabPane tab="Profile" key="1">
          {tabContent[activeTab]}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Address Book" key="2">
          {tabContent[activeTab]}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Orders" key="3">
          {tabContent[activeTab]}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Track Order" key="4">
          {tabContent[activeTab]}
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MyProfile;
