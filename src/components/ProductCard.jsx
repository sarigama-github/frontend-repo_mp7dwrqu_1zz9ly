function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image_url || 'https://placekitten.com/600/600'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-slate-900">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAdd(product)}
            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
