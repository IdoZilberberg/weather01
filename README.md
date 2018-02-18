# General

My personal Weather app, started as an exercise for myself after completing the excellent Udemy course [Ionic 2 - the practial guide to building iOS and Android apps](https://www.udemy.com/ionic-2-the-practical-guide-to-building-ios-android-apps/learn/v4/overview) by Maximillian Schwartzmüller.

This is a **personal project for demonstration purpose only**. 
Feel free to fork and modify, but I'm not responsible for any damages that may arise as result of doing anything whatsoever with this software, either in its current form or any fork thereof.
I will add a license and relevant attributions before pushing to any app store.
This is completely free software and has no ads or in-app purchases of any kind.

## Installation

- Clone the repo
- Make sure you have npm 5+ and Ionic 3.9+ installed
- For Android, make sure you have Android Studio with Platform Tools v27+ installed.
- For iOS you'll need a Mac with XCode - haven't tested build this yet, will do so using XCode 9.2.
- Build & deploy to Android:
  - Connect your phone and enable USB Debugging 
  - Run: ionic cordova build android
  - Run: adb install -r <output_apk>
- Build & deploy to iOS: TBD


## Notes

The app uses the free tier of Weather Underground's API so it will not automatically fetch weather data at this time to conserve the quota.

## Tech

The app was built with Ionic 3 / Angular 5.

## 3rd party integrations
- [@agm/core](https://www.npmjs.com/package/@agm/core) - Angular wrapper for Google Maps API
- [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/) - Reverse geocoding, Places Autocomplete (free tier)
- [Weather underground API](https://www.wunderground.com/weather/api/d/docs) for current conditions and forecasts
- [REST Countries](https://restcountries.eu/) for displaying population, captial, flag, etc.

