// Firebase Cloud Messaging Functions
// Author: Midlight25

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import { db } from "./admin";

// Re-namespacing this function that I'm using extensively
const arrayUnion = admin.firestore.FieldValue.arrayUnion;

/**
 * Get uid of users who haven't submitted a payment this quarter
 * @returns Uid of users who haven't submitted a maintenance payment
 */
async function getUnpaidUsers(): Promise<Array<string>> {
  functions.logger.log("getUnpaidUsers() was called");

  // Get which fiscal quarter we're currently in
  const today = new Date();
  const quarter: number = Math.floor((today.getMonth() + 3) / 3);

  // Get start and end date of quarter
  const startDate = new Date(today.valueOf());
  startDate.setMonth((quarter - 1) * 3);
  startDate.setDate(1);
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date(startDate.valueOf());
  endDate.setMonth(startDate.getMonth() + 3);

  // Get all users who made qualifying transactions in this quarter
  const paidUsers: Array<string> = [];

  let query = db.collection("transactions").where("date", ">=", startDate);
  query = query.where("date", "<", endDate);
  query = query.where("transaction_type", "==", 1);

  const querySnapshot = await query.get();
  querySnapshot.forEach((doc) => {
    const user = doc.get("user").id;
    paidUsers.push(user);
  });

  // Get users from database who haven't made a transaction this quarter.
  const unpaidUsers: Array<string> = [];
  const usersCol = db.collection("users");
  const updQuery = usersCol.where("__name__", "not-in", paidUsers);

  const updQuerySnapshot = await updQuery.get();
  updQuerySnapshot.forEach((doc) => {
    const user = doc.id;
    unpaidUsers.push(user);
  });

  functions.logger.log(`Unpaid users found: ${unpaidUsers}`);

  return unpaidUsers;
}

/**
 * Send notification to users who haven't made a quarterly payment yet.
 */
export const sendQuarterlyFunction = functions.https.onRequest(
    async (req, res) => {
      functions.logger.log("sendQuarterlyFunction() has been called.");

      try {
        const unpaidUsers = await getUnpaidUsers();
        functions.logger.log(`Sending payment notification to: ${unpaidUsers}`);

        const notif: admin.messaging.Notification = {
          title: "Maintenance Payment Due!",
          body: "It's time to make your quarterly maintenance payment.",
        };

        // const payload: admin.messaging.Message = {
        //   notification: notif,
        //   webpush: {

        //   }

        // };

        res.sendStatus(200);
      } catch (error) {
        functions.logger.error("Unknown Error Occurred:" + error);
        res.sendStatus(500);
      }
    });

// Subscribe device to notification topic
export const subscribeToTopic = functions.https.onCall(
    async (data) => {
      functions.logger.log(`New subscriber "${data.token}" for ${data.topic}`);
      await admin.messaging().subscribeToTopic(data.token, data.topic);
      return `subscribed to ${data.topic}`;
    }
);

// Unsubscribe device from notification topic
export const unsubscribeFromTopic = functions.https.onCall(
    async (data) => {
      await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
      functions.logger.log(`Subscriber "${data.token}" removed: ${data.topic}`);
      return `unsubscribed from ${data.topic}`;
    }
);
