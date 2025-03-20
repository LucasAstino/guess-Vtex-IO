import React from "react";
import { useRuntime } from "vtex.render-runtime";
import { useCssHandles } from "vtex.css-handles";

export const handle__breadcrumb = [
  'breadcrumb__institucional',
  'breadcrumb__institucional-wrapper',
  'breadcrumb__institucional-wrapper--link',
] as const

export const SimpleBreadcrumb: React.FC = () => {
  const { route } = useRuntime();
  const {handles} = useCssHandles(handle__breadcrumb)
  
  const currentPage = route.path.replace('/','') || "Página";

  return (
    <nav className={handles.breadcrumb__institucional} aria-label="breadcrumb">
      <span className={handles["breadcrumb__institucional-wrapper"]}>
        <a className={handles["breadcrumb__institucional-wrapper--link"]} href="/">Home</a> / {currentPage}
      </span>
    </nav>
  );
};

