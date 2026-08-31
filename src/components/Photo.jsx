import { ImageReveal, Parallax } from './Motion'

/**
 * A photograph, revealed on scroll like every other image on the site.
 *
 * The wrapper owns the shape — an aspect ratio or a height, passed in as
 * className — and the picture fills it, so a photograph can be a full-bleed
 * band on one page and a column on another without a second component. The
 * intrinsic width and height come from the photo record, which keeps the
 * layout from shifting while the file loads.
 *
 * `natural` drops the crop and lets the picture keep its own proportions,
 * which is what the wide plates use: paired with a max-width at or under the
 * file's own pixel width, nothing is ever enlarged and nothing goes soft.
 *
 * `parallax` drifts the plate against the page as it passes. It is applied to
 * the whole frame rather than to the picture inside it, which matters: the
 * reveal clips its contents, so moving the picture within that clip would open
 * a gap along one edge. Moving the frame keeps the photograph whole and still
 * reads as depth.
 */
export default function Photo({
  photo,
  className = '',
  delay = 0,
  priority = false,
  natural = false,
  parallax = 0,
  position = 'object-center',
}) {
  const plate = (
    <ImageReveal delay={delay} className={parallax ? 'h-full w-full' : className}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={natural ? 'h-auto w-full' : `h-full w-full object-cover ${position}`}
      />
    </ImageReveal>
  )

  if (!parallax) return plate

  return (
    <Parallax distance={parallax} className={className}>
      {plate}
    </Parallax>
  )
}
