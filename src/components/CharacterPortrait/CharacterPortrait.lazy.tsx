import React, { lazy, Suspense } from 'react';

const LazyCharacterPortrait = lazy(() => import('./CharacterPortrait'));

const CharacterPortrait = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyCharacterPortrait {...props} />
  </Suspense>
);

export default CharacterPortrait;
