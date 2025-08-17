import React, { useEffect } from 'react';
import useStore from '../store';

const DealerAppointments = () => {
  const { dealers, appointmentsLastDay, appointmentsNextWeek, fetchDealers, fetchAppointmentsLastDay, fetchAppointmentsNextWeek } = useStore();

  useEffect(() => {
    fetchDealers();
    fetchAppointmentsLastDay();
    fetchAppointmentsNextWeek();
  }, [fetchDealers, fetchAppointmentsLastDay, fetchAppointmentsNextWeek]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dealers & Appointments</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dealers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <div key={dealer.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">{dealer.name}</h3>
              <p className="text-gray-600">{dealer.city}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Appointments in the Last 24 Hours</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {appointmentsLastDay.map((appt) => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">Car ID: {appt.car_id}</p>
                  <p className="text-sm text-gray-600">Dealer ID: {appt.dealer_id}</p>
                  <p className="text-sm text-gray-500">Time: {new Date(appt.start_time).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  appt.status === 'completed' ? 'bg-green-100 text-green-800' :
                  appt.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upcoming Appointments (Next 7 Days)</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200">
            {appointmentsNextWeek.map((appt) => (
              <li key={appt.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">Car ID: {appt.car_id}</p>
                  <p className="text-sm text-gray-600">Dealer ID: {appt.dealer_id}</p>
                  <p className="text-sm text-gray-500">Time: {new Date(appt.start_time).toLocaleString()}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  appt.status === 'completed' ? 'bg-green-100 text-green-800' :
                  appt.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appt.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DealerAppointments;
