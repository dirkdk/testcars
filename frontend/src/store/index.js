import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
  cars: [],
  dealers: [],
  appointmentsLastDay: [],
  appointmentsNextWeek: [],

  fetchCars: async () => {
    const response = await axios.get('/cars');
    set({ cars: response.data });
  },
  updateMileage: async (carId, mileage) => {
    const mileageAsInt = parseInt(mileage, 10);
    await axios.put(`/cars/${carId}/mileage`, { mileage: mileageAsInt });
    set((state) => ({
      cars: state.cars.map((car) =>
        car.id === carId ? { ...car, mileage: mileageAsInt } : car
      ),
    }));
  },
  fetchDealers: async () => {
    const response = await axios.get('/dealers');
    set({ dealers: response.data });
  },
  fetchAppointmentsLastDay: async () => {
    const response = await axios.get('/appointments/last_day');
    set({ appointmentsLastDay: response.data });
  },
  fetchAppointmentsNextWeek: async () => {
    const response = await axios.get('/appointments/next_week');
    set({ appointmentsNextWeek: response.data });
  },
}));

export default useStore;