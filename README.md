Περιγραφή

Το IKM Project είναι μια full stack εφαρμογή που αποτελείται από Angular frontend και Node.js / Express backend με MongoDB.
Η εφαρμογή υλοποιεί authentication με JWT, protected routes, διαχείριση χρηστών (employees) και επικοινωνία μέσω REST API.

Τεχνολογίες

Frontend:

Angular 19

Angular Material

Bootstrap 5

Reactive Forms

Angular Signals

Route Guards

JWT Authentication

HttpClient

Backend:

Node.js

Express

MongoDB

Mongoose

JSON Web Tokens (JWT)

bcrypt

cors

Δομή Project

Backend:

ikmproject-back/
 ├── controllers/
 ├── routes/
 ├── services/
 ├── models/
 ├── middleware/
 ├── app.js
 ├── server.js
 ├── package.json
 └── .env


Frontend:

ikmproject-front/
 ├── src/
 ├── angular.json
 ├── package.json
 └── tsconfig*.json

Περιβάλλον (Backend)

Δημιούργησε αρχείο .env στο root του backend:

CONNECTION_LINK=mongodb://localhost:27017/ikmproject
Token_Secret=your_secret_key_here

Εκκίνηση Backend
cd ikmproject-back
npm install
npm run dev


Ο backend server εκτελείται στο:

http://localhost:3000

Εκκίνηση Frontend
cd ikmproject-front
npm install
npm start


Το frontend εκτελείται στο:

http://localhost:4200


Στο αρχείο environment.ts:

apiURL: 'http://localhost:3000'

Build Frontend
cd ikmproject-front
npm run build


Παράγεται ο φάκελος:

dist/ikmproject/

Authentication Flow

Ο χρήστης κάνει login από το frontend

Στέλνονται credentials στο backend endpoint /ikm/auth

Το backend επιστρέφει JWT token

Το frontend αποθηκεύει το token στο localStorage

Γίνεται decode του token

Γεμίζει το global state (user$ signal)

Τα protected routes ελέγχονται μέσω guards

Protected Routes

Παράδειγμα protected route:

/registration/form


Ο έλεγχος γίνεται:

αν υπάρχει χρήστης στο global state

αν το JWT token δεν έχει λήξει

Σε αντίθετη περίπτωση γίνεται redirect στο:

/restricted/area

Backend API Endpoints

Authentication:

POST /ikm/auth


Employees:

POST   /ikm/employees
GET    /ikm/employees
GET    /ikm/employees/username/:username
PATCH  /ikm/employees/:username
DELETE /ikm/employees/adminRole/:username
GET    /ikm/employees/check_duplicate_email/:email

Employees View (Frontend)

Η σελίδα employees εμφανίζει πίνακα με τα εξής στοιχεία:

username

firstname

lastname

age

Τα δεδομένα φορτώνονται από το endpoint:

GET /ikm/employees

Global State Management (Angular)

Χρησιμοποιείται Angular Signal:

user$ = signal<LoggedInUser | null>(null);


Το state:

φορτώνεται από το localStorage στο startup

χρησιμοποιείται σε header, guards και logout

UI

Bootstrap grid layout

Angular Material components

Responsive design

Menu component με routerLinkActive

Scripts

Backend:

npm run dev
npm start


Frontend:

npm start
npm run build

Σύνοψη

Το project αποτελεί μια ολοκληρωμένη full stack εφαρμογή με:

Angular frontend

Node.js / Express backend

MongoDB database

JWT authentication

Route protection

REST API integration
