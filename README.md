# Bagels

Modern Bagel webiste.

Backend: Flask and SQLAlchemy are used to create a restfulAPI; stores and sends weekly orders to the owner
Frontend: React
 - Integrates the Stripe payment API to accept payments
Backend: Flask and SQLAlchemy are used to create a RESTful API; 
- stores and sends weekly orders to the owner


Frontend: React app that integrates the Stripe payment API

To run locally:
1) Download the repository
2) Start the backend server
   - navigate to /Bagels/backend and run . venv/bin/activate to activate the virtual environment
   - navigate to /Bagels/backend and run '. venv/bin/activate' to activate the virtual environment
   - pip install -r requirements.txt
   - FLASK_APP=bagel.py
   - FLASK_APP=bagel.py flask initdb
   - FLASK_APP=bagel.py flask run --host=0.0.0.0 --port=5001

3) Start the frontend server
   - navigate to /Bagels/frontend/bagel_app
   - ensure you have Node.js installed before the next command
   - ensure you have Node.js installed before the following command
   - npm run