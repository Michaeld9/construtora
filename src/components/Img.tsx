import { useState, type ImgHTMLAttributes } from "react";
import { photoSrcSet, photoUrl, type PhotoKey } from "../lib/images";

type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  photo: PhotoKey;
  alt: string;
  priority?: boolean;
  width?: number;
};

/** Imagem com skeleton enquanto carrega e fade-in ao concluir. */
export function Img({ photo, alt, priority, className = "", sizes = "100vw", width = 1200, ...rest }: ImgProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";

  return (
    <span className={`${position} block overflow-hidden ${loaded ? "" : "img-skeleton"} ${className}`}>
      {failed ? (
        <span className="absolute inset-0 grid place-items-center bg-surface-2 px-4 text-center text-sm text-muted">
          Imagem indisponível
        </span>
      ) : (
        <img
          src={photoUrl(photo, width)}
          srcSet={photoSrcSet(photo)}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ease-out-expo ${loaded ? "opacity-100" : "opacity-0"}`}
          {...rest}
        />
      )}
    </span>
  );
}
