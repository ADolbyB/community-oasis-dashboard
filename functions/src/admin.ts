// Firebase Admin Configuration File
// Author: Midlight25

import * as admin from "firebase-admin";

admin.initializeApp();

export const db = admin.firestore();
