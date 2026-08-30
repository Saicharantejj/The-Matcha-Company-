import { ImageReveal } from './Motion'

/**
 * A photograph, revealed on scroll like every other image on the site.
 *
 * The wrapper owns the shape — an aspect ratio or a height, passed in as
 * className — and the picture fills it, so a photograph can be a full-bleed
 * band on one page and a column on another without a second component. The
 * intrinsic width and height come from the photo record, which keeps the
 * layout from shifting while the file loads.
 */
export default function Photo({ photo, className = '', delay = 0, priority = false, position = 'object-center' }) {
  return (
    <ImageReveal delay={delay} className={className}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={`h-full w-full object-cover ${position}`}
      />
    </ImageReveal>
  )
}
