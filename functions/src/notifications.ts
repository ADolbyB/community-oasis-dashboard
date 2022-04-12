import * as functions from "firebase-functions";
import { db } from "./admin";

/**
 * Computes the set difference between two sets and returns the difference.
 * @param a  An set of strings
 * @param b A proper subset of a
 * @returns The difference between sets a and b.
 */
function setDifference(a: Array<string>, b: Array<string>): Array<string> {
  return a.filter((item) => !b.includes(item));
}

export const sendQuarterlyFunction = functions.https.onRequest(
    async (req, res) => {
      functions.logger.log("sendQuarterly Function has been activated.");

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

      let query = db.collection("transactions").where("date", ">", startDate);
      query = query.where("date", "<", endDate);
      query = query.where("transaction_type", "==", 1);

      query.get().then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.data()["user"].id;
          functions.logger.log(`Found transaction for ${user}`);
          paidUsers.push(user);
        });
      });

      functions.logger.log(paidUsers);
      functions.logger.log("THis works well");

      // Get all users from the database
      const allUsers: Array<string> = [];

      db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const user = documentSnapshot.id;
          allUsers.push(user);
        });
      });

      // functions.logger.log(paidUsers);
      // functions.logger.log(allUsers);
      // functions.logger.log(unpaidUsers);

      // Get unpaid users using set difference
      const unpaidUsers = setDifference(allUsers, paidUsers);


      res.send("These users have not paid their maintenance fees yet:\n" +
          [ ...unpaidUsers ]);
    });
