function ProductCard({ product }) {
  return (
    <div className='product-card'>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p><strong>${product.price}</strong></p>
      <p>{product.category}</p>
    </div>
  );
}

export default ProductCard;