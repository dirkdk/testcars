import React, { useEffect, useState } from 'react';
import useStore from '../store';

const CarList = () => {
  const { cars, fetchCars, updateMileage } = useStore();
  const [mileage, setMileage] = useState({});

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleMileageChange = (carId, value) => {
    setMileage({ ...mileage, [carId]: value });
  };

  const handleUpdateMileage = (carId) => {
    updateMileage(carId, mileage[carId]);
  };

  return (
    <div>
      <h1>Cars</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.year}) - {car.mileage} miles
            <div>
              Last appointment: {car.last_appointment ? new Date(car.last_appointment).toLocaleString() : 'N/A'}
            </div>
            <div>
              <input
                type="number"
                value={mileage[car.id] || ''}
                onChange={(e) => handleMileageChange(car.id, e.target.value)}
              />
              <button onClick={() => handleUpdateMileage(car.id)}>
                Update Mileage
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
