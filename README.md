# Bberfarepro: The Best times to book Uber rides

### Overview

UberFare Pro is a Machine Learning project to Estimate the best times when a person can book an Uber Ride.

The preprocessing for the project was developed in Python in a jupyter notebook. It uses a trained model using different Regression methods and compares
which of the Regression models gives the best results. In Machine Learning, the metric used to measure the precision of an statistical model is the 
R squared.

The preprocessing uses the best R squared scored from the different Regression models and uses that model to predicts the fares of an uber ride. Also, the preprocessing
involves expanding the features of the Dataset to include Hour Segments, which is the main feature of this project.

Accordingly to the predicted fare amount and the real amount, we check that comparison and use the time of that ride and then we extract the hours according to the hour
segment definition:

Hour Segment 1 -> 00:00 AM - 03:59 AM

Hour Segment 2 -> 04:00 AM - 07:59 AM

Hour Segment 3 -> 08:00 AM - 11:59 AM

Hour Segment 4 -> 12:00 PM - 03:59 PM

Hour Segment 5 -> 04:00 PM - 07:59 PM

Hour Segment 6 -> 08:00 PM - 11:59 PM.



## Implementation

This project was implemented following the Full-Stack structure:

Front-end -> Javascript (Html & CSS)

Back-end -> Flask (Python)

## Run
To run the project install the necessary modules:

Flask
```
pip install flask
```

Flask CORS 
```
pip install -U flask-cors
```

Pandas
```
pip install pandas
```

After having the necessary modules installed, navigate to the /backend folder to run app with:
```
python -m flask run
```

This will start the flask app in http://localhost:5000.

Additionally, start a development server for the front-end, this can be done using Live Server if using VS Code.
