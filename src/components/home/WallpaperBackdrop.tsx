import Image from "next/image";

/**
 * Fixed-position backdrop shared by every dark homepage section (Trust
 * Strip through the FAQ). `position: fixed` means it only ever has to
 * cover a single viewport — it doesn't scroll, so there's no seam or
 * repeat between sections, and no need for the image to be tall enough
 * to span the whole page. Never rendered behind the Hero (which has its
 * own photo) since Hero sits above this in the DOM and is fully opaque.
 */
export default function WallpaperBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src="/images/landing-page/wallpaper.png"
        alt=""
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary-dark/55" />
    </div>
  );
}
