# FitbitTeam

Our project is developing an Alexa skill with Fitbit scales to manage weight and minimize risks for those struggling with congestive heart failure. To do this, we are developing a webapp using HTML and JS/CSS/TS scripting to work with the FitBitSDK in order to load data into a database which will then use Alexa to aid users in accessing this data such as but not limiting to: weight progression, medical reccomendations- factual and reccomended, prescription information, weight reminders, etc..
# Technologies
To build this project you will need to install: 
- Node.js
- Angular/cli 
- Cypress (for testing)

A sidenote: Fitbit API only allows servers to request Fitbit information from a user's account for the past 31 days.
## This app is Live

Check out our latest version here : https://fitbittester.herokuapp.com/

## To run this project locally 

1. mkdir FitbitTeam on your desktop
2. git clone https://github.com/SCCapstone/FitbitTeam.git
3. npm install
4. npm install -g @angular/cli@1.0.0
5. npm run build
6. cd FitbitTeam
7. ng serve

## Development server

Once you've ran built the project correctly and have run the command 'ng serve' you will have a live development server to work on. You can find it by putting http://localhost:4200/ into your browser. The app will automatically reload if you change any of the source files.

## Testing Account

If you don't want to make an account, here are a couple used for testing :\
(Client Account)\
Email : test@email.com\
Password : 123456\
(Admin Account)\
Email : admin@email.com\
Password : 123456

## Fitbit Account 

To test the functionality of FitBit data, you can login to a FitBit account here: https://accounts.fitbit.com/login
email: capstonefitbitteam@gmail.com
password: capstone490
## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Testing

For testing you must install cypress:
-npm init
-npm install cypress

Run cypress:
-/node_modules/.bin/cypress open

Run tests:
-click test firsttest.spec.js
Here is good for cypress if you need further help https://www.youtube.com/watch?v=VvLocgtCQnY

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
