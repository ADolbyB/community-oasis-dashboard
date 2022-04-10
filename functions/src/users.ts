import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { UserRecord } from "firebase-functions/v1/auth";

// Initializing Access to Firestore
admin.initializeApp();

// Auth Trigger on new User Signup
export const newUserActivation = functions.auth.user().onCreate(
    (user: UserRecord) => {
      functions.logger.info(`New user created: ${user.email} ${user.uid}`);

      const userDoc = admin.firestore().collection("users").doc(user.uid);

      // Fill public user info with properties
      userDoc.set({
        first_name: "",
        last_name: "",
        privilege: 0,
      });

      // Init private user info as collection.
      userDoc.collection("private").doc("details").set({
        address: "",
        birthday: new Date("January 1, 1970"),
        email: user.email,
        gender: "",
        license_plate: "",
        phone: 0,
      });

      // Init visitor store
      userDoc.collection("visitors").add({
        register_date: new Date("January 1, 1999"),
        first_name: "John",
        last_name: "Doe",
        license_plate: "JHDE19",
      });

      return 0;
    });
