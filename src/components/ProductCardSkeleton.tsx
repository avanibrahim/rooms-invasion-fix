const ProductCardSkeleton = () => (
    <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="w-full aspect-square bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-100 rounded w-1/4" />
      </div>
    </div>
  );
  
  export default ProductCardSkeleton;
  