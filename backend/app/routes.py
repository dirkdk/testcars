from flask import Blueprint, jsonify, request
from .models import db, Car, CarDealer, Appointment
from datetime import datetime, timedelta

bp = Blueprint('routes', __name__)

@bp.route('/')
def index():
    return jsonify({"status": "ready"})

@bp.route('/cars', methods=['GET'])
def get_cars():
    cars = Car.query.all()
    return jsonify([{'id': car.id, 'brand': car.brand, 'model': car.model, 'year': car.year, 'mileage': car.mileage, 'last_appointment': car.get_last_appointment().start_time if car.get_last_appointment() else None} for car in cars])

@bp.route('/cars/<int:car_id>/mileage', methods=['PUT'])
def update_mileage(car_id):
    car = Car.query.get_or_404(car_id)
    data = request.get_json()
    car.mileage = data['mileage']
    db.session.commit()
    return jsonify({'message': 'Mileage updated'})

@bp.route('/dealers', methods=['GET'])
def get_dealers():
    dealers = CarDealer.query.all()
    return jsonify([{'id': dealer.id, 'name': dealer.name, 'city': dealer.city} for dealer in dealers])

@bp.route('/dealers/city', methods=['GET'])
def find_dealer_by_city():
    city = request.args.get('city')
    dealer = CarDealer.query.filter_by(city=city).first()
    if dealer:
        return jsonify({'id': dealer.id, 'name': dealer.name, 'city': dealer.city})
    return jsonify({'message': 'Dealer not found'}), 404

@bp.route('/appointments/available', methods=['GET'])
def find_appointment_slot():
    # For simplicity, lets assume we are looking for a slot in the next 30 days
    # And the logic for finding the next available slot is simplified
    # to be the next hour from now if no other appointments are scheduled.
    now = datetime.utcnow()
    next_hour = now.replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)

    last_appointment = Appointment.query.order_by(Appointment.start_time.desc()).first()
    if last_appointment:
        next_available = last_appointment.start_time + timedelta(hours=2)
        if next_available > next_hour:
            return jsonify({'available_slot': next_available.isoformat()})

    return jsonify({'available_slot': next_hour.isoformat()})

@bp.route('/appointments', methods=['POST'])
def schedule_appointment():
    data = request.get_json()
    car_id = data['car_id']
    dealer_id = data['dealer_id']
    start_time = datetime.fromisoformat(data['start_time'])

    appointment = Appointment(car_id=car_id, dealer_id=dealer_id, start_time=start_time)
    db.session.add(appointment)
    db.session.commit()

    return jsonify({'message': 'Appointment scheduled', 'appointment_id': appointment.id}), 201

@bp.route('/appointments/<int:appointment_id>/complete', methods=['PUT'])
def complete_appointment(appointment_id):
    appointment = Appointment.query.get_or_404(appointment_id)
    appointment.status = 'completed'
    db.session.commit()
    return jsonify({'message': 'Appointment completed'})

@bp.route('/appointments/last_day', methods=['GET'])
def get_appointments_last_day():
    one_day_ago = datetime.utcnow() - timedelta(days=1)
    appointments = Appointment.query.filter(Appointment.start_time >= one_day_ago).all()
    return jsonify([{'id': appt.id, 'car_id': appt.car_id, 'dealer_id': appt.dealer_id, 'start_time': appt.start_time.isoformat(), 'status': appt.status} for appt in appointments])

@bp.route('/appointments/next_week', methods=['GET'])
def get_appointments_next_week():
    now = datetime.utcnow()
    next_week = now + timedelta(weeks=1)
    appointments = Appointment.query.filter(Appointment.start_time >= now, Appointment.start_time <= next_week).all()
    return jsonify([{'id': appt.id, 'car_id': appt.car_id, 'dealer_id': appt.dealer_id, 'start_time': appt.start_time.isoformat(), 'status': appt.status} for appt in appointments])