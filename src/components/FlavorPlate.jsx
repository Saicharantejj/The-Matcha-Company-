import SachetGraphic from './SachetGraphic'
import { photos } from '../data/photos'

/**
 * The picture for one flavour, wherever a flavour is shown at size.
 *
 * A product or a kit names its photograph with a `photo` key; if that
 * photograph exists it is used, and if it does not, the drawn sachet stands in
 * exactly as it did before. That is what lets the five flavours be
 * photographed one at a time instead of all at once — a flavour without a
 * picture yet is not a hole in the page.
 *
 * The caller owns the shape. This fills it.
 */
export default function FlavorPlate({ item, className = '' }) {
  const photo = photos[item.photo]

  if (!photo) {
    return <SachetGraphic swatch={item.swatch} flavor={item.flavor} className={className} />
  }

  return (
    <img
      src={photo.src}
      alt={photo.alt}
      width={photo.width}
      height={photo.height}
      loading="lazy"
      decoding="async"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
