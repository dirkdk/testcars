from . import db
from sqlalchemy.sql import func
from sqlalchemy import BigInteger

class Car(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.BigInteger, primary_key=True)
    brand = db.Column(db.String(100), nullable=False)
    model = db.Column(db.String(100), nullable=False)
    year = db.Column(db.BigInteger, nullable=False)
    mileage = db.Column(db.BigInteger, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def get_last_appointment(self):
        return Appointment.query.filter_by(car_id=self.id).order_by(Appointment.start_time.desc()).first()

class CarDealer(db.Model):
    __tablename__ = 'car_dealers'
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

class Appointment(db.Model):
    __tablename__ = 'appointments'
    id = db.Column(db.BigInteger, primary_key=True)
    car_id = db.Column(db.BigInteger, db.ForeignKey('cars.id'), nullable=False)
    dealer_id = db.Column(db.BigInteger, db.ForeignKey('car_dealers.id'), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='scheduled')
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    car = db.relationship('Car', backref=db.backref('appointments', lazy=True))
    dealer = db.relationship('CarDealer', backref=db.backref('appointments', lazy=True))
