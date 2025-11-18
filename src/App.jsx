import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [query, setQuery] = useState('')

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${backend}/api/products`)
      const data = await res.json()
      setProducts(data.items || [])
    } catch (e) {
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id)
      if (existing) {
        return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: p.id, title: p.title, price: p.price, image_url: p.image_url, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const filtered = useMemo(() => {
    if (!query) return products
    const q = query.toLowerCase()
    return products.filter((p) =>
      [p.title, p.description, ...(p.tags || [])].join(' ').toLowerCase().includes(q)
    )
  }, [products, query])

  const checkout = async () => {
    try {
      const payload = {
        items: cart.map((i) => ({ product_id: i.id, qty: i.qty })),
        name: 'Guest',
        email: 'guest@example.com',
        address: '123 Cat St, Meow City',
      }
      const res = await fetch(`${backend}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert(`Order received! ID: ${data.order_id}\nTotal: $${data.total}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert('Checkout failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Header cartCount={cart.reduce((s, i) => s + i.qty, 0)} onCartToggle={() => setCartOpen(true)} query={query} setQuery={setQuery} />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Purrfect Toys</h1>
          <p className="text-slate-600 mt-2">Delightful toys to keep your feline friend happy and healthy.</p>
        </div>

        {loading && <p className="text-center text-slate-500">Loading products...</p>}
        {error && <p className="text-center text-rose-600">{error}</p>}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      </section>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onCheckout={checkout}
      />

      <footer className="border-t py-6 text-center text-slate-500">
        © {new Date().getFullYear()} Purrfect Toys — For happy cats.
      </footer>
    </div>
  )
}

export default App
