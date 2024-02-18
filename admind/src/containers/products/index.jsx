import { useEffect, useState } from "react";
import { getAllProducts ,deleteProduct} from "../../requests";
import {Text,Row,Col,Card,Meta,Typography,Button} from 'antd'


const { Title, Paragraph } = Typography


const Products = () => {
  const [products, setproducts] = useState([]);

  const allprod = async () => {
    try {
      const resp = await getAllProducts();
      // console.log(resp.data.data.product)
      setproducts(resp.data.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allprod();
  }, []);

  const handleDeleteClick = async(productId) => {
    try{
        const resp=await deleteProduct(productId)
        console.log(resp)

    }catch(err){
        console.log(err)
    }finally{
        allprod()
    }
  };

  return <div> <Row gutter={[16, 16]}>
  {products.map(product => (
    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
      <Card hoverable cover={<img alt={product.name} src={product.image1} />}>
        <div>
          <Title level={4}>{product.name}</Title>
          <Paragraph>{product.description}</Paragraph>
        </div>
        <div className="mt-2">
          <h2>${(product.price - (product.price * product.discount) / 100).toFixed(2)}</h2>
          {product.discount > 0 && <p className="text-danger">-{product.discount}%</p>}
        </div>
        <div className="mt-2">
          <p className="text-secondary">Color: {product.colour}</p>
          <p className="text-secondary">Size: {product.size}</p>
          <p>price:{product.price}</p>
          <p>productId: {product.proId}</p>
        </div>
        <div className="mt-2">
          {product.topSelling && <p className="text-success">Top Selling</p>}
          {product.newArrival && <p className="text-warning">New Arrival</p>}
        </div>

        <Button type='primary' danger onClick={() => handleDeleteClick(product._id)}>Delete</Button>
      </Card>
    </Col>
  ))}
</Row></div>;
};

export default Products;
