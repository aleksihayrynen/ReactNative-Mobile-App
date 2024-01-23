# Workout-tracking-mobile-app 🍋
A mobile application made with ReactNative to track your workouts by keeping track of the movements, sets, and reps. You can add, manage, or delete workouts to your liking. By long pressing a workout, you get options to delete & archive a workout. By clicking a workout, you can add/edit your sets and reps of whatever movements. The application stores data locally by using SQLite to store all the information you want to track. I made this project a while back, so some dependencies and packages might not be up to date. The UI and style are very basic and could be a thing to upgrade in the future. Be sure to follow the installation instructions!


<div style="display:flex; justify-content:space-around;">
    <img src="./Readme_assets/adding_exercises.jpg" alt="Adding an exercise to the list" width="200" height="400"/>
    <img src="./Readme_assets/homepage_flagged.jpg" alt="Homepage of the app" width="200" height="400"/>
</div>

## Table of Contents 📖
- [Features](#features)
- [Code](#code)
- [Database](#database)
- [Installation](#installation)
- [Screenshots](#screenshots)

## Features 
- Add/Delete workouts, sets, and reps
- Store the data locally on your phone so you can keep track of workouts
- Archive a workout with a flag marker

## Code 🥇
- Most of the code for the views can be found inside the components folder.
- Database directory holds the logic for the database.
- The main app.js contains the program that initializes the db and handles the navigation
- package.json contains the dependencies

## Database 💰
- SQLite
- Stores data locally

## Installation 🗺️
1. Install Node.js (if not already installed) https://nodejs.org/
2. Install React Native CLI npm install -g react-native-cli
3. Clone the repository and go inside the repository with the terminal
4. Update the dependencies npm install
5. Run the program either locally to have it on the go or use an emulator npx react-native run-android # for Android

## Screenshots 🖼️


<div style="display:flex; justify-content: center;">
    <img src="./Readme_assets/options.jpg" alt="Options for archive & delete" width="200" height="400"/>
    <img src="./Readme_assets/added_exercises.jpg" alt="Sets and reps" width="200" height="400"/>
</div>
