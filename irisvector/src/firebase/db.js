import { db } from "./firebase";

export const gethexdata = () => db.collection("hexdata").get();
export const getbetcategories = () => db.collection("bet_categories").get();


export const addbet = (params) => db.collection("bets").add(params);
export const addchatroom = (params) => db.collection("chatrooms").add(params);
export const addorder = (params) => db.collection("orders").add(params);