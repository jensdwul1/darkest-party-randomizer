import React from 'react';
import './App.scss';
import Torch from './components/Torch/Torch';
import Socials from './components/Socials/Socials';
import { useAppSelector } from './app/hooks';
import { selectTorch } from './components/Torch/torchSlice';

function App() {  
  const torch = useAppSelector(selectTorch);
  return (
    <div className={`App state-${torch}`}>
      <main>
        <Torch />
      </main>
      <aside>
        <Socials />
      </aside>
    </div>
  );
}

export default App;
