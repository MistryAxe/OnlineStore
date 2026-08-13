import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className='app'>
      <h1>Graded Lab 3</h1>
      <p>React Product Catalog</p>

      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {loading && <p>Loading products...</p>}

      {error && <p>Failed to load products.</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default App;