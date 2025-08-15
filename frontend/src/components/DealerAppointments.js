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
    <div>
      <h1>Dealers</h1>
      <ul>
        {dealers.map((dealer) => (
          <li key={dealer.id}>
            {dealer.name} - {dealer.city}
          </li>
        ))}
      </ul>

      <h2>Appointments Last Day</h2>
      <ul>
        {appointmentsLastDay.map((appt) => (
          <li key={appt.id}>
            Car ID: {appt.car_id}, Dealer ID: {appt.dealer_id}, Start Time: {new Date(appt.start_time).toLocaleString()}, Status: {appt.status}
          </li>
        ))}
      </ul>

      <h2>Upcoming Appointments (Next Week)</h2>
      <ul>
        {appointmentsNextWeek.map((appt) => (
          <li key={appt.id}>
            Car ID: {appt.car_id}, Dealer ID: {appt.dealer_id}, Start Time: {new Date(appt.start_time).toLocaleString()}, Status: {appt.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealerAppointments;
