from app import create_app, db
from app.models import Car, CarDealer

app = create_app()

with app.app_context():
    db.create_all()

    # Add seed data
    if not Car.query.first():
        car1 = Car(brand='Toyota', model='Camry', year=2020, mileage=20000)
        car2 = Car(brand='Honda', model='Accord', year=2021, mileage=10000)
        db.session.add(car1)
        db.session.add(car2)

    if not CarDealer.query.first():
        dealer1 = CarDealer(name='Prestige Toyota', city='New York')
        dealer2 = CarDealer(name='Honda World', city='Los Angeles')
        db.session.add(dealer1)
        db.session.add(dealer2)

    db.session.commit()
