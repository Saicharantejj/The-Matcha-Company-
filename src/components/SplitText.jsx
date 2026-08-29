import { motion, useReducedMotion } from 'framer-motion'

/**
 * Character-by-character reveal with a staggered spring.
 *
 * The whole string stays readable to screen readers via an sr-only copy; the
 * animated glyphs are aria-hidden so assistive tech never hears it spelled out
 * one letter at a time. Words are wrapped in inline-block spans so the line
 * still breaks between words rather than mid-word.
 */
export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.028,
  as: Tag = 'span',
}) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')
  let index = 0

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`} className="inline-block whitespace-nowrap">
            {Array.from(word).map((char, c) => {
              const i = index++
              return (
                <motion.span
                  key={`${char}-${c}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: '0.5em', rotate: -6 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 26,
                    delay: delay + i * stagger,
                  }}
                >
                  {char}
                </motion.span>
              )
            })}
            {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
      </span>
    </Tag>
  )
}
