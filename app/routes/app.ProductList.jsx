import { useState, useEffect } from 'react';
import Polaris from '@shopify/polaris';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products'); // Assuming you have an API route to fetch products
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const updateProductPrice = async (productId, newPrice) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: newPrice }),
      });
      if (response.ok) {
        const updatedProducts = products.map(product =>
          product.id === productId ? { ...product, price: newPrice } : product
        );
        setProducts(updatedProducts);
        console.log('Product price updated:', productId, newPrice);
      } else {
        console.error('Failed to update product price:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product price:', error);
    }
  };

  return (
    <Polaris.Page>
      <Polaris.Layout>
        <Polaris.Layout.Section>
          <Polaris.Card title="Product List">
            <Polaris.Card.Section>
              <Polaris.Stack vertical>
                {products.map(product => (
                  <Polaris.Stack key={product.id} alignment="center" distribution="equalSpacing">
                    <div>{product.title}</div>
                    <div>Price: ${product.price}</div>
                    <Polaris.TextField
                      type="number"
                      label="New Price"
                      value={product.price}
                      onChange={value => updateProductPrice(product.id, value)}
                    />
                  </Polaris.Stack>
                ))}
              </Polaris.Stack>
            </Polaris.Card.Section>
          </Polaris.Card>
        </Polaris.Layout.Section>
      </Polaris.Layout>
    </Polaris.Page>
  );
};

export default ProductListPage;
