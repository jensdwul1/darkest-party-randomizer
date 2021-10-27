import React, { lazy, Suspense } from 'react';

const LazySocials = lazy(() => import('./Socials'));

const Socials = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySocials {...props} />
  </Suspense>
);

export default Socials;
