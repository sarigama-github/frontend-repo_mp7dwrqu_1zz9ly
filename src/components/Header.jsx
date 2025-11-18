import { ShoppingCart, Cat, Search } from "lucide-react"

function Header({ cartCount, onCartToggle, query, setQuery }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-xl">
          <Cat className="text-purple-600" />
          <span>Purrfect Toys</span>
        </div>
        <div className="ml-auto flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cat toys..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <button
          onClick={onCartToggle}
          className="relative ml-3 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <ShoppingCart size={18} />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header
