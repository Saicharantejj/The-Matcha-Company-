import PageShell from '../components/PageShell'
import Reveal, { StaggerGroup, StaggerItem } from '../components/Reveal'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Matchas() {
  return (
    <PageShell>
      <section className="border-b border-ink bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-olive">Five Flavors</p>
            <h1 className="mt-2 font-display text-4xl tracking-display sm:text-5xl">Our Matchas</h1>
            <p className="mt-4 max-w-xl font-body text-base text-ink/75">
              Stone-ground matcha, sourced from Uji, Kyoto — blended into single-serve sachets.
              Tear, stir into milk or water, and skip the ceremony entirely.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-camel">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-ink/50">
              {products.length} flavors
            </p>
          </Reveal>

          <StaggerGroup className="mt-6 grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} index={i} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  )
}
