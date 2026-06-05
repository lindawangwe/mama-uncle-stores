import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const RecentPage = () => {
  const { products, loading, fetchRecentProducts } = useProductStore();

  useEffect(() => {
    fetchRecentProducts();
  }, [fetchRecentProducts]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-teal-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-400 mb-2">
          Recently Purchased
        </h1>
        <p className="text-teal-300 mb-8">
          Products other customers have recently bought
        </p>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-teal-400 text-xl">
              No recent purchases yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPage;