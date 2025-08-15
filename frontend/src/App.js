import React, { useState } from 'react';
import CarList from './components/CarList';
import DealerAppointments from './components/DealerAppointments';

function App() {
  const [view, setView] = useState('cars'); // 'cars' or 'dealers'

  return (
    <div className="App">
      <nav>
        <button onClick={() => setView('cars')}>Car Overview</button>
        <button onClick={() => setView('dealers')}>Dealers & Appointments</button>
      </nav>

      {view === 'cars' && <CarList />}
      {view === 'dealers' && <DealerAppointments />}
    </div>
  );
}

export default App;
