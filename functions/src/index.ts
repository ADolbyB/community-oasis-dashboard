import * as functions from "firebase-functions";
import {newUserActivation} from "./users";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const newUser = newUserActivation;

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


