from flask import Flask, request, abort, url_for, redirect, session, render_template, flash, get_flashed_messages, make_response, jsonify
import json
from model import db, Order
from flask_cors import CORS
import stripe
import os
import yagmail
from datetime import datetime, timedelta
import schedule
import time



from dotenv import load_dotenv

load_dotenv()
key = os.environ.get('STRIPE_API_KEY')
stripe.api_key = key

app = Flask( __name__ )








app.secret_key = os.getenv("SESSION_KEY") # for sessions
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///bagel.db' 
db.init_app(app) # instead of passing 'app' to db = SQLAlchemy(app) in model.py

CORS(app, origins=["https://shmuelsmondaybagels.com",
"https://shmuelsmondaybagels.com", 
"https://www.shmuelsmondaybagels.com",
"http://localhost:3000",

"https://localhost:3000", 
"http://127.0.0.1:3000", 
"http://10.0.0.153:3000", 
"http://10.1.10.153:5001", 
"https://10.0.0.153:3000"]
) 


@app.cli.command('initdb')
def initdb_command():
    db.drop_all()
    db.create_all() # creates tabel for all defined models
    print('Initialized the database.')


# Gets a single order
@app.route("/order/<_id>", methods=["GET"])
def get_order(_id):
    order = Order.query.get(_id)
    if order is not None:
        return order.to_dict()
    else:
        return make_response("Not in DB", 404)


# Gets all orders in DB
@app.route("/orders/", methods=["GET"])
def get_all_orders():
    all_orders = Order.query.all()

    if all_orders is not None:
        all_orders_list = [ order.to_dict() for order in all_orders]
        return json.dumps(all_orders_list)
    else:
        abort(404)



# Adds order to DB
# this route needs to be different than my React /orders one, so i added a slash, was getting 500 error
@app.route("/order/", methods=["POST"])
def add_order():
    print("in add_order ##########################################################################")
    order_info = request.get_json()
    
    name = order_info["name"]
    email = order_info["email"]
    _date = datetime.now()
    num_bagels = order_info["num_bagels"]

    num_plain = order_info["num_plain"]
    num_sesame = order_info["num_seseme"]
    num_everything = order_info["num_everything"]
    num_poppy_seed = order_info["num_poppy_seed"]
    num_cin_sugar = order_info["num_cin_sugar"]
    num_cream_bagels = order_info["num_cream_bagels"]


    order_cost = order_info["total_cost"] # name in js file is in " "

    print("name:", name)
    print("email:", email)
    print("_date:", _date)
    print("num_bagels:", num_bagels)
    print("num_plain:", num_plain)
    print("num_sesame:", num_sesame)
    print("num_everything:", num_everything)
    print("num_poppy_seed:", num_poppy_seed)
    print("num_cin_sugar:", num_cin_sugar)
    print("num_cream_bagels", num_cream_bagels)
    print("order_cost:", order_cost)

   
    new_order = Order(name=name, email=email, date_ordered=_date, num_bagels=num_bagels, 
    num_plain=num_plain, num_sesame=num_sesame, num_everything=num_everything, 
    num_poppy_seed=num_poppy_seed, num_cin_sugar=num_cin_sugar, num_cream_bagels=num_cream_bagels, order_cost=order_cost )

    db.session.add(new_order)
    db.session.commit()
    print("Order processed")
    # send_orders()
    return make_response( jsonify(new_order.to_dict()), 201 )

# Deletes an Order
@app.route("/order/<_id>/", methods=["DELETE"])
def delete_order(_id):
    order = Order.query.filter_by( _id = _id ).first()
    db.session.delete(order)
    db.session.commit()
    return '', 204

# gets client publishable api key thingy 
@app.route("/config", methods=["GET"])
def get_api_key():
    # api_key = {
    #     "publishableKey" : 'pk_test_51NBJW4Ih7LOkeOi8v3t3IHufZD2TOIZm3GDA1py22lrZxGR3ALnAEFmBqXgtFasg5JQd8MTTvbkrtdPd5p73H88Y00KezH5ItL'
    # }
    api_key = {
        "publishableKey" : 'pk_live_51NCkM8I8OaFVzBusmOLBipTXzwTwwExOcfrsGelxGVY3L8AkEeAvQ7AKiXcr9CH3uMrcbnsJXj5ewcTowYL5Uuz200kTG7OH9c'
    }
    return api_key

# gets client secret jawn
@app.route("/create-payment-intent/", methods=["POST"])
def create_payment_intent():
    
    try:
        data = request.get_json()
        # payment_method_type = data["paymentMethodType"]
        currency = data['currency']
        amount = data['amount']
        # payment_method = data['payment_method']
        amount *= 100



        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            # automatic_payment_methods={"enabled": True}, # it has to be thsi one or the one below
            payment_method_types = ["card","link"]
            # payment_method= payment_method
        )

        return_dict = {
            "clientSecret" : payment_intent.client_secret
        }
        # print(payment_intent.client_secret)
        
        return return_dict


    except Exception as e:
        return jsonify({"error" : { 'message' : str(e) }}), 500




@app.route('/webhook', methods=['POST'])
def webhook_received():
    # You can use webhooks to receive information about asynchronous payment events.
    # For more about our webhook events check out https://stripe.com/docs/webhooks.
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
        # data_object = data['object']

    # there are a bunch of payment_intent.<somethings> ( processing, cancelled, ect )
    if event_type == 'payment_intent.succeeded':
        print('💰 Payment received!')
        # Fulfill any orders, e-mail receipts, etc
        # To cancel the payment you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    elif event_type == 'payment_intent.payment_failed':
        print('❌ Payment failed.')
    return jsonify({'status': 'success'})
 


def email_orders(last_weeks_orders):

    # give totals of each bagel amount, maybe add order amount to db and 

    # now i have to format the orders nicely in the text file and send tthat txt file : ) 
    document = "orders.txt"

    total_bagels = 0
    total_plain = 0
    total_seseme = 0
    total_everything = 0
    total_poppy = 0
    total_cin_sugar = 0
    total_cream_bagels = 0
    total_cost = 0
    with open("orders.txt", "w") as _file:
        _file.write("Good Morning Sam. Here are the Orders\n\n")
        for order in last_weeks_orders:
            total_cost += order.order_cost
            total_bagels += order.num_bagels
            total_plain += order.num_plain
            total_seseme += order.num_sesame
            total_everything += order.num_everything
            total_poppy += order.num_poppy_seed
            total_cin_sugar += order.num_cin_sugar
            total_cream_bagels += order.num_cream_bagels


            _file.write( f" Name: {order.name}\n" )  
            _file.write( f" Date: {order.date_ordered}\n") 
            _file.write( f" Order Amount: ${order.order_cost}\n") 
            _file.write( f" Plain: {order.num_plain}\n") 
            _file.write( f" Seseme: {order.num_sesame}\n")
            _file.write( f" Everything: {order.num_everything}\n")
            _file.write( f" Poppy: {order.num_poppy_seed}\n")
            _file.write( f" Cinnamon Sugar: {order.num_cin_sugar}\n")
            _file.write( f" Cream Cheese Bagel: {order.num_cream_bagels}\n")
            _file.write("________________________________________________________\n\n")
        
        _file.write(f"Total Bagels: {total_bagels}\n")
        _file.write(f"Total Plain: {total_plain}\n")
        _file.write(f"Total Seseme: {total_seseme}\n")
        _file.write(f"Total Everything: {total_everything}\n")
        _file.write(f"Total Poppy Seed: {total_poppy}\n")
        _file.write(f"Total Cinnamon Sugar: {total_cin_sugar}\n")
        _file.write(f"Total Cream Cheese Bagels: {total_cream_bagels}\n")
        _file.write(f"Revenue this week: ${total_cost}\n")

    

    try:
        yag = yagmail.SMTP("samskosherbagels@gmail.com", "xduiwunswcnurcdq")

        body = "These are the Weekly Orders : )"
        yag.send(
            to='glulu4444@gmail.com', 
            subject="Bagel orders", 
            contents=body,
            attachments=document,
        )

        print("Email sent successfully")
    except BaseException as e:
        print("Email not sent: ", e)

@app.route('/send-orders', methods=['POST'])
def send_orders():

    now = datetime.now()
    last_monday = now - timedelta(days=6)

    all_orders = Order.query.all()

    last_weeks_orders = []
    for order in all_orders:
        # if the order is before now, <, and greater than/ after last monday

        if ( order.date_ordered < now) and ( order.date_ordered > last_monday ):
        # if True:
            last_weeks_orders.append(order)

    
    email_orders(last_weeks_orders)
    return jsonify({"message": "Emails ordered"}), 201


    



    


if __name__ == '__main__':
    app.run()

    





