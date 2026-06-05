import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const DealsPage = () => {
  const { products, loading, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  // Filter products that have a discount or are marked as deals
  const dealProducts = products.filter(
    (p) => p.isOnSale || p.discount > 0 || p.originalPrice > p.price
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-teal-900 text-white px-4 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">
          Today's Deals
        </h1>
        <p className="text-teal-300 mb-8">
          Limited time offers on your everyday essentials
        </p>

        {dealProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-teal-400 text-xl">
              No deals available right now. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;