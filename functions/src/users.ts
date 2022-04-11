import * as functions from "firebase-functions";

import { db } from "./admin";
import { UserRecord } from "firebase-functions/v1/auth";

/**
 * Creates a new user document for a user the first time they sign-up.
 *
 * @activation auth.user().onCreate() On first time sign-up for user
 */
export const newUserActivation = functions.auth.user().onCreate(
    (user: UserRecord) => {
      functions.logger.info(`New user created: ${user.email} ${user.uid}`);

      const userDoc = db.collection("users").doc(user.uid);

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

      // Cannot create empty subcollection so I'm not making
      // for visitors, the application will have to handle that.

      return 0;
    });
