import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import ProductCard from '../components/ProductCard'
import { PRODUCTS_CATALOGUE } from '../data/products'
import { photos } from '../data/photos'
import { useCart } from '../context/CartContext'
import { useToast } from '../components/Toast'

export default function ProductDetail() {
  const { handle } = useParams()
  const { addItem, openCart } = useCart()
  const { notify } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  const product = PRODUCTS_CATALOGUE.find((p) => p.handle === handle || p.id === handle) || PRODUCTS_CATALOGUE[0]
  const relatedProducts = PRODUCTS_CATALOGUE.filter((p) => p.id !== product.id).slice(0, 3)

  const photoKey = product.id === 'makhana-pink-salt' ? 'pinkSaltPack'
    : product.id === 'makhana-peri-peri' ? 'periPeriPack'
    : product.id === 'makhana-pudina-lime' ? 'pudinaPack'
    : product.id === 'makhana-smoky-cheese' ? 'cheddarPack'
    : product.id === 'makhana-jaggery-sesame' ? 'jaggeryPack'
    : 'stashBox'

  const photoObj = photos[photoKey]

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, 'Makhana Pack')
    }
    notify(`${quantity}x ${product.name} added to cart`, { action: 'View Cart', onAction: openCart })
  }

  return (
    <PageShell>
      <div className="bg-cream py-12 sm:py-20 border-b border-black/10">
        <div className="mx-auto max-w-[96rem] px-6 sm:px-12">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 font-mono text-xs text-muted font-medium uppercase tracking-wider flex items-center gap-2">
            <Link to="/" className="hover:text-charcoal">HOME</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-charcoal">SHOP</Link>
            <span>/</span>
            <span className="text-charcoal font-bold">{product.flavor}</span>
          </nav>

          {/* Product Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Image Gallery */}
            <div className="lg:col-span-6">
              <div className="relative aspect-square w-full rounded-3xl p-6 flex items-center justify-center border border-black/10 shadow-card bg-neutral-subtle overflow-hidden">
                {product.badge && (
                  <span className="absolute top-6 left-6 z-10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-charcoal text-white rounded-full">
                    {product.badge}
                  </span>
                )}

                {photoObj ? (
                  <img
                    src={photoObj.src}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="font-display text-6xl text-charcoal">🍿</div>
                )}
              </div>
            </div>

            {/* Right Purchase Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted">
                  {product.category} &middot; {product.size}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-black uppercase text-charcoal tracking-tight mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-black/10">
                <span className="font-mono text-3xl font-bold text-charcoal">{product.displayPrice || `₹${product.price}`}</span>
                {product.mrp && product.mrp > product.price && (
                  <span className="font-mono text-base text-muted line-through">₹{product.mrp}</span>
                )}
              </div>

              <p className="font-body text-base text-muted leading-relaxed">
                {product.description || product.blurb}
              </p>

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <div className="flex items-center justify-between border border-black/20 rounded-full px-4 py-3 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="font-mono text-base font-bold text-charcoal hover:text-muted px-2"
                  >
                    –
                  </button>
                  <span className="font-mono font-bold text-sm px-4">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="font-mono text-base font-bold text-charcoal hover:text-muted px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="btn flex-1 py-4 text-center justify-center font-bold text-xs"
                >
                  ADD TO CART ➔
                </button>
              </div>

              {/* Tabs */}
              <div className="pt-8 border-t border-black/10 space-y-4">
                <div className="flex border-b border-black/10">
                  {['description', 'ingredients', 'nutrition'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-4 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${
                        activeTab === tab ? 'border-b-2 border-charcoal text-charcoal' : 'text-muted hover:text-charcoal'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="py-2 text-sm text-muted font-body leading-relaxed">
                  {activeTab === 'description' && (
                    <p>{product.description || product.blurb}</p>
                  )}
                  {activeTab === 'ingredients' && (
                    <p className="font-mono text-xs text-charcoal">{product.ingredients || 'Jumbo Foxnuts (Makhana), Olive Oil, Himalayan Pink Salt, Black Pepper, Spices.'}</p>
                  )}
                  {activeTab === 'nutrition' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-charcoal">
                      <div className="p-2.5 bg-neutral-subtle rounded-xl">Calories: <strong>{product.nutrition?.calories || '130 kcal'}</strong></div>
                      <div className="p-2.5 bg-neutral-subtle rounded-xl">Protein: <strong>{product.nutrition?.protein || '4.2g'}</strong></div>
                      <div className="p-2.5 bg-neutral-subtle rounded-xl">Fiber: <strong>{product.nutrition?.fiber || '3.5g'}</strong></div>
                      <div className="p-2.5 bg-neutral-subtle rounded-xl">Fat: <strong>{product.nutrition?.fat || '3.2g'}</strong></div>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Related Products */}
          <div className="mt-28 pt-16 border-t border-black/10">
            <h2 className="font-display text-2xl font-bold uppercase text-charcoal mb-8">
              MORE FLAVOURS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {relatedProducts.map((rel, i) => (
                <ProductCard key={rel.id} product={rel} index={i} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageShell>
  )
}
