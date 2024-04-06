import PropTypes from 'prop-types';

function ProductCard({ product }) {
	return (
		<div className="card h-100">
			<img
				src={product.image.url}
				alt={product.image.alt || product.title}
				className="card-img-top"
			/>
			<div className="card-body">
				<h5 className="card-title">{product.title}</h5>
				<p className="card-text">{product.description}</p>
				<p className="card-text">
					Price: $
					{product.discountedPrice < product.price
						? product.discountedPrice
						: product.price}
				</p>
				{product.discountedPrice < product.price && (
					<p className="text-danger">
						Discount: ${product.price - product.discountedPrice}
					</p>
				)}
			</div>
		</div>
	);
}

ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountedPrice: PropTypes.number,
      image: PropTypes.shape({
        url: PropTypes.string.isRequired,
        alt: PropTypes.string
      }).isRequired
    }).isRequired
  };
  

export default ProductCard;