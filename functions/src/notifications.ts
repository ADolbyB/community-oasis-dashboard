import * as functions from "firebase-functions";
import { db } from "./admin";

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

export const sendQuarterlyFunction = functions.https.onRequest(
    async (req, res) => {
      functions.logger.log("sendQuarterlyFunction() has been called.");

      try {
        const unpaidUsers = await getUnpaidUsers();
        functions.logger.log(`Sending payment notification to: ${unpaidUsers}`);
        res.sendStatus(200);
      } catch (error) {
        functions.logger.error("Unknown Error Occurred:" + error);
        res.sendStatus(500);
      }
    });
