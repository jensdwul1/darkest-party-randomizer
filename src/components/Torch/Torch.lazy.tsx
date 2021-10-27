import React, { lazy, Suspense } from 'react';

const LazyTorch = lazy(() => import('./Torch'));

const Torch = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTorch {...props} />
  </Suspense>
);

export default Torch;
