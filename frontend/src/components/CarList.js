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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Car Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-900">{car.brand} {car.model} ({car.year})</h2>
            <p className="text-gray-600 mt-2">Mileage: {car.mileage.toLocaleString()} miles</p>
            <p className="text-gray-500 text-sm mt-1">
              Last appointment: {car.last_appointment ? new Date(car.last_appointment).toLocaleString() : 'N/A'}
            </p>
            <div className="mt-4 flex">
              <input
                type="number"
                placeholder="New Mileage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={mileage[car.id] || ''}
                onChange={(e) => handleMileageChange(car.id, e.target.value)}
              />
              <button
                onClick={() => handleUpdateMileage(car.id)}
                className="ml-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
