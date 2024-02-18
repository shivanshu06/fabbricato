import React from "react";
import { useState } from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Upload,
  message,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { addproducttoServer } from "../../requests";

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [image4, setimage4] = useState(null);

  const onFinish = async (values) => {
    try {
      const formValuesWithImages = {
        ...values,
        image1: image1,
        image2: image2,
        image3: image3,
        image4: image4,
      };

      console.log("Form values with images:", formValuesWithImages);

      const response = await addproducttoServer(formValuesWithImages);

      console.log("Server response:", response);

      form.resetFields();
    } catch (error) {
      console.error("Error calling addproducttoServer:", error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  function convertToBase64image1(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setimage1(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  }

  function convertToBase64image2(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setimage2(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  }

  function convertToBase64image3(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setimage3(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  }

  function convertToBase64image4(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setimage4(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  }

  return (
    <Form
      form={form}
      name="addProductForm"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Please enter the product name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select>
          <Option value="men">Men</Option>
          <Option value="women">Women</Option>
          <Option value="kids">Kids</Option>
        </Select>
      </Form.Item>

      <Form.Item name="subcategory" label="Subcategory">
        <Select>
          <Option value="anime">Anime</Option>
          <Option value="spiderman">Spiderman</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          { required: true, message: "Please enter the product description" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter the product price" }]}
      >
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="discount" label="Discount">
        <InputNumber min={0} max={100} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="colour" label="Colour">
        <Input />
      </Form.Item>

      <Form.Item
        name="productType"
        label="Product Type"
        rules={[{ required: true, message: "Please type" }]}
      >
        <Select>
          <Option value="tshirt">T-shirt</Option>
          <Option value="hoodie">Hoodie</Option>
          <Option value="versityjacket">Versity jacket</Option>
          <Option value="lower">Lower</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="size"
        label="Sizes"
        rules={[{ required: true, message: "Please select at least one size" }]}
      >
        <Select>
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
        </Select>
      </Form.Item>

      <Form.Item name="topSelling" label="Top Selling" valuePropName="checked">
        <Checkbox />
      </Form.Item>

      <Form.Item
        name="newArrivals"
        label="New Arrivals"
        valuePropName="checked"
      >
        <Checkbox />
      </Form.Item>

      <Form.Item name="image1" label="Image 1">
        <input accept="image/*" type="file" onChange={convertToBase64image1} />
        <br></br>
        {image1 == "" || image1 == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image1} />
        )}
      </Form.Item>

      <Form.Item name="image2" label="Image 2">
        <input accept="image/*" type="file" onChange={convertToBase64image2} />
        <br></br>
        {image2 == "" || image2 == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image2} />
        )}
      </Form.Item>

      <Form.Item name="image3" label="Image 3">
        <input accept="image/*" type="file" onChange={convertToBase64image3} />
        <br></br>
        {image3 == "" || image3 == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image3} />
        )}
      </Form.Item>

      <Form.Item name="image4" label="Image 4">
        <input accept="image/*" type="file" onChange={convertToBase64image4} />
        <br></br>
        {image4 == "" || image4 == null ? (
          ""
        ) : (
          <img width={100} height={100} src={image4} />
        )}
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset} style={{ margin: "0 8px" }}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
