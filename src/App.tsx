import React from 'react';
import './App.scss';
import Torch from './components/Torch/Torch';
import Socials from './components/Socials/Socials';

function App() {  
  return (
    <div className={`App`}>
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
