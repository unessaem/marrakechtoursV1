import { useState } from "react";

/**
 * Affiche `/images/<name>.jpg` si la photo existe, sinon l'illustration
 * provisoire `/images/<name>.svg`. Aucune configuration : il suffit de
 * déposer le fichier .jpg dans public/images/.
 */
export default function SmartImage({ name, alt = "", className = "", loading = "lazy" }) {
  const [src, setSrc] = useState(`/images/${name}.jpg`);

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setSrc(`/images/${name}.svg`)}
      className={className}
    />
  );
}
