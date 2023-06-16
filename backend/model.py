from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# note this should only be created once per project
db = SQLAlchemy()


class Order(db.Model):
    _id = db.Column( db.Integer, primary_key=True, autoincrement=True)
    name = db.Column ( db.String(100), nullable=False )
    email = db.Column ( db.String(100), nullable=False )
    date_ordered = db.Column ( db.DateTime, nullable=False )
    num_bagels = db.Column ( db.Integer, nullable=False )

    num_plain = db.Column ( db.Integer, nullable=True )
    num_sesame = db.Column ( db.Integer, nullable=True )
    num_everything = db.Column ( db.Integer, nullable=True )
    num_poppy_seed = db.Column ( db.Integer, nullable=True )
    num_cin_sugar = db.Column ( db.Integer, nullable=True )
    order_cost = db.Column ( db.Integer, nullable=False)




    # bagel_type = db.Column( db.String(100), nullable=False )
    # num_dozen = db.Column ( db.Integer, nullable=False )

    def __init__( self, name, email, date_ordered, num_bagels, num_plain, num_sesame, num_everything, num_poppy_seed, num_cin_sugar, order_cost ):
        self.name = name
        self.email = email
        self.date_ordered = date_ordered
        self.num_bagels = num_bagels

        self.num_plain = num_plain
        self.num_sesame = num_sesame
        self.num_everything = num_everything
        self.num_poppy_seed = num_poppy_seed
        self.num_cin_sugar = num_cin_sugar
        self.order_cost = order_cost


    def to_dict(self):
        return {
            "id" : self._id,
            "name" : self.name,
            "email" : self.email, 
            "date_ordered" : str(self.date_ordered),
            "num_bagels" : self.num_bagels, 
            "num_plain" : self.num_plain, 
            "num_sesame" : self.num_sesame, 
            "num_everything" : self.num_everything,
            "num_poppy_seed" : self.num_poppy_seed,
            "num_cin_sugar" : self.num_cin_sugar,
            "order_cost" : self.order_cost,
        }


    # name, number of bagels, 5 boxes come up 