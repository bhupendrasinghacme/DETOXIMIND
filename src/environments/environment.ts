// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAyWO339cN86vxCD0Y4fl91yIuD-Gc-DGA",
    authDomain: "detoximindchatapp.firebaseapp.com",
    databaseURL: "https://detoximindchatapp-default-rtdb.firebaseio.com",
    projectId: "detoximindchatapp",
    storageBucket: "detoximindchatapp.appspot.com",
    messagingSenderId: "699416696843",
    appId: "1:699416696843:web:108c9ef5d5ca5be6964f0e"
  },

  wordpress: {
    api_url: "http://www.detoximind.com/wp-json/wp/v2/"
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
