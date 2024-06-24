import React, { LazyExoticComponent } from "react";

const LazyImportComponent = (props: {
  lazyChildren: LazyExoticComponent<() => JSX.Element>;
}) => {
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <props.lazyChildren />
    </React.Suspense>
  );
};

export default LazyImportComponent;
