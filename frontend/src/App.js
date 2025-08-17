import React, { useState } from 'react';
import CarList from './components/CarList';
import DealerAppointments from './components/DealerAppointments';

function App() {
  const [view, setView] = useState('cars'); // 'cars' or 'dealers'

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold">Car Management</h1>
          <div>
            <button
              onClick={() => setView('cars')}
              className={`px-4 py-2 rounded-md mr-2 ${view === 'cars' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
            >
              Car Overview
            </button>
            <button
              onClick={() => setView('dealers')}
              className={`px-4 py-2 rounded-md ${view === 'dealers' ? 'bg-blue-700' : 'hover:bg-blue-500'}`}
            >
              Dealers & Appointments
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {view === 'cars' && <CarList />}
        {view === 'dealers' && <DealerAppointments />}
      </main>
    </div>
  );
}

export default App;
