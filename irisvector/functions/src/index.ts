import * as functions from 'firebase-functions';
import {persist} from './dataService';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


export const orderqueue = functions.database.ref('/listener/orders/{userid}/{refkey}').onCreate(async (data, context) => {

    //At the moment it is only order object being persisted directly
    //But this should create multiple entities as mentioned in issue #5
    //The idea is to chain such persist calls and return promise at the end, as cloud functions does not like unhandled promise
    return persist('order', data.val(), true);
});
