import { X } from "lucide-react"
import { useMemo } from "react"

function CartDrawer({ open, onClose, items, onUpdateQty, onCheckout }) {
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])

  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
            <X />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-180px)]">
          {items.length === 0 && <p className="text-slate-500">Your cart is empty.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 items-center">
              <img src={item.image_url} alt={item.title} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button className="px-2 py-1 bg-slate-100 rounded" onClick={() => onUpdateQty(item.id, Math.max(1, item.qty - 1))}>-</button>
                  <span>{item.qty}</span>
                  <button className="px-2 py-1 bg-slate-100 rounded" onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
                </div>
              </div>
              <div className="font-semibold">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-lg font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
