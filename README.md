
# Bidirectional Infinite Scrolling through SectionList

A movie information APP that displays a list of movies from The
Movie Database (TMDb) API. The app shows top movies for each year and users can filter by genre, the app also loads top movies from previous / next years as the user scrolls through the
list in both direction.

## Prerequistes
- Install the Expo App in your mobile Device. 
```bash
https://play.google.com/store/apps/details?id=host.exp.exponent
```
OR

- Install Android Studio with any AVD

## Installation

These are instructions to get things working locally.

```bash
  - git clone https://github.com/sahildigikar15/Bidirectional-SectionList-Implementation.git
  - cd Bidirectional-SectionList-Implementation
  - npm install
  - Add the TMDb license in .env file (eg. API_KEY=123456789)
  - npm start
  - Open Expo App and scan the QR mentioned in console. 
    OR 
    Run emulator in Android Studio and press "a" in console to open app in AVD.

  - To build APK 
    eas build -p android
```

## Features

- Infinite Scroll in both Direction
- Filter through genre
- Movie Details Page when click on the Movie Tile.
- Movie trailer and a callback Image to handle if trailer not present
- Top Cast
- Similar Movies Added
- Can click on Similar Movies to show there details page.
- Handling of back page through stack Navigation




## Demo

Video: http://bit.ly/41iQZGo

APK: https://bit.ly/46MqD0Q



