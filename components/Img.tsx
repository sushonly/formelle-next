import Image from 'next/image'
import type { CSSProperties } from 'react'

// Images we can safely run through Next's optimizer (WebP/AVIF, resized per device).
// Anything else falls back to a plain <img> so an unknown host can never break a page.
const OPTIMIZABLE = /^(\/(?!\/)|https:\/\/psdaycsuawyoqtppbgec\.supabase\.co\/storage\/v1\/object\/public\/)/

type Props = {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  /** Rough display width, e.g. "(max-width: 768px) 100vw, 50vw". Smaller = lighter download. */
  sizes?: string
  /** Above-the-fold image: load immediately, no lazy loading. */
  preload?: boolean
  width?: number
  height?: number
}

export default function Img({ src, alt, className, style, sizes = '100vw', preload = false, width = 1200, height = 1500 }: Props) {
  if (!src || !OPTIMIZABLE.test(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} style={style} loading={preload ? 'eager' : 'lazy'} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      style={style}
      sizes={sizes}
      width={width}
      height={height}
      preload={preload}
      loading={preload ? undefined : 'lazy'}
    />
  )
}
