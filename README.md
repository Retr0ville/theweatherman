
![Logo](https://i.ibb.co/RcH0xH6/weatherapp.png)

## TheWeatherMan (TWM)

## About

A weather application that allows users to view real-time weather information for various cities around the world. It utilizes the WeatherAPI.com service to fetch weather data. The app is designed as a front-end application without any back-end or database, utilizing only local storage for data persistence. It was built in React using Typescript, HTML and CSS.

## Features

- Displays the current temperature for the 15 largest cities in the world by population, sorted alphabetically.
- Users can remove individual cities from the default list to keep it clean and personalized.
- Exhaustive weather condition icons: The app offers 39 carefully selected and sorted icons to match every possible weather conditions, with day and night time variants.
- Dynamic background: The app features dynamic background switching in certain scenarios to match current time of day.
- Clicking on a city opens a detailed weather information page.
- The detailed view includes a textarea field for users to add and save notes.
- Users can edit and remove notes associated with each city.
- A search field allows users to look up weather details for other cities.
- Users can mark cities as favorites, which appear at the top of the list on the home screen, sorted alphabetically.
- Offline functionality: The app caches the most up-to-date information and retains basic functionality even without an internet connection.
- Secure data-persistence: Data stored locally are AES encrypted for an extra layer of security.
- User permission: The app asks for permission to access the user's current location and automatically opens the details page for their city upon granting permission.
- User weather information is displayed on the homepage on granting location permission.
- Unit testing: Applicable functionality has been thoroughly tested.
- Modern design: The application features a clean and modern user interface.
- Minimal Dependencies: No animation libraries or UI frameworks were used in addition to only the bare minimum of external javascript libraries i.e. (axios, crypto and sass).
- Fully Responsive: Application is fully responsive on Desktop, Tab and Mobile displays.



## Tech Stack

- Typescript 
- React
- HTML
- SCSS
- Jest
## Installation and Running

To install and run the Weather App using Yarn, follow these steps:

    1. Navigate to the project directory,
    2. Install the dependencies using Yarn: `yarn`
    3. Start the development server: `yarn start`
    4. Open your web browser and visit `http://localhost:3000` to access the app.

## Testing with Jest

The Weather Man utilizes Jest for unit testing. To run the tests, follow these steps:

    1. Make sure you have completed the installation steps mentioned above.
    2. In the project directory, run the following command: `yarn test`
    3. Jest will execute the tests and display the results in the console.
## Style Guide

Style variables used throughout the app can be found in a variables.scss folder in the styles directory.

#### Fonts

| Category       | Font                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Text | Karla |
| Digits | Exo 2 |


## Screenshots

##### Homepage (daytime)
![App Screenshot](https://i.ibb.co/Bc6C2qX/Screenshot-2023-06-24-225401.png)
##### Homepage (nightime)
![App Screenshot](https://i.ibb.co/bKYL47W/Screenshot-2023-06-24-225430.png)
##### Searchbar - with result
![App Screenshot](https://i.ibb.co/1KwGL42/Screenshot-2023-06-24-225654.png)
##### Homepage - Favourites section
![App Screenshot](https://i.ibb.co/X3NwWj8/Screenshot-2023-06-24-225736.png)
##### Homepage - Top Cities section (nightime)
![App Screenshot](https://i.ibb.co/g3GNZzq/Screenshot-2023-06-24-225800.png)
##### Homepage - Top Cities section (daytime)
![App Screenshot](https://i.ibb.co/fx0xt1g/Screenshot-2023-06-24-225855.png)
##### Weather strip Actions (daytime)
![App Screenshot](https://i.ibb.co/bNYY4tz/Screenshot-2023-06-24-230148.png)
##### Weather strip Actions (nightime)
![App Screenshot](https://i.ibb.co/s1435Dg/Screenshot-2023-06-24-230252.png)
##### Weather Detail Page (daytime)
![App Screenshot](https://i.ibb.co/z7bWmWb/Screenshot-2023-06-24-230412.png)
##### Weather Detail Page (nightime)
![App Screenshot](https://i.ibb.co/6HzKwvW/Screenshot-2023-06-24-230455.png)
##### Weather Detail Page - note section (preview) (no note) (nightime)
![App Screenshot](https://i.ibb.co/3BspPb8/Screenshot-2023-06-24-230610.png)
##### Weather Detail Page - note section (edit) (no note) (nightime)
![App Screenshot](https://i.ibb.co/qrHcHq6/Screenshot-2023-06-24-230631.png)
##### Weather Detail Page - note section (preview) (has note) (nightime)
![App Screenshot](https://i.ibb.co/XWLvfdc/Screenshot-2023-06-24-230917.png)
##### Weather Detail Page - note section (edit) (has note) (nightime)
![App Screenshot](https://i.ibb.co/gDb8Wz1/Screenshot-2023-06-24-230939.png)
##### Homepage (mobile view) (nightime) 01
![App Screenshot](https://i.ibb.co/N14jgkw/Screenshot-2023-06-24-231524.png)
##### Homepage (mobile view) (nightime) 02
![App Screenshot](https://i.ibb.co/nP4HVvF/Screenshot-2023-06-24-231551.png)
##### Weather Detail Page (mobile view) (nightime)
![App Screenshot](https://i.ibb.co/xzcpmcX/Screenshot-2023-06-24-231643.png)
##### Weather Detail Page ( note section) (mobile view) (nightime)
![App Screenshot](https://i.ibb.co/PWBK27F/Screenshot-2023-06-24-232005.png)
##### Weather Detail Page (tab view - portrait) (daytime)
![App Screenshot](https://i.ibb.co/9y0gm4C/Screenshot-2023-06-24-231812.png)
##### Weather Detail Page (tab view - landscape) (nightime)
![App Screenshot](https://i.ibb.co/g3GsXXg/Screenshot-2023-06-24-231858.png.png)
##### Weather Detail Page (tab view - square aspect ratio) (nightime)
![App Screenshot](https://i.ibb.co/fQfNgvX/Screenshot-2023-06-24-231936.png)
##### Location permission prompt
![App Screenshot](https://i.ibb.co/m83MW5F/Screenshot-2023-06-24-231038.png)
##### Encrypted Localstorage entries
![App Screenshot](https://i.ibb.co/fQPXm9h/Screenshot-2023-06-24-231340.png)
##### Test Coverage
![App Screenshot](https://i.ibb.co/ChbWf2W/Screenshot-2023-06-24-232336.png)