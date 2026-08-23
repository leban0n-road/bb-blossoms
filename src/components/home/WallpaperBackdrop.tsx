import Image from "next/image";
import wallpaperImage from "../../../public/images/landing-page/wallpaper.jpg";

/**
 * Fixed-position backdrop shared by every dark homepage section (Trust
 * Strip through the FAQ). `position: fixed` means it only ever has to
 * cover a single viewport — it doesn't scroll, so there's no seam or
 * repeat between sections, and no need for the image to be tall enough
 * to span the whole page. Never rendered behind the Hero (which has its
 * own photo) since Hero sits above this in the DOM and is fully opaque.
 *
 * On short/laptop viewports this can be visible without scrolling (the
 * fixed layer covers the full viewport from y=0, and Hero doesn't always
 * fill it), so it needs the same instant, correctly-colored fallback as
 * Hero: an explicit bg color plus a real (statically-imported) blur
 * placeholder, instead of the transparent gap next/image otherwise
 * leaves — a gap browsers can paint as an incomplete-tile placeholder
 * color while the full image decodes.
 */
export default function WallpaperBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 bg-primary-dark">
      <Image
        src={wallpaperImage}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/55" />
    </div>
  );
}
