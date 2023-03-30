import { collection } from "firebase/firestore";
import { db } from ".";

export const weeRef = collection(db, "wees");
export const userRef = collection(db, "users");
