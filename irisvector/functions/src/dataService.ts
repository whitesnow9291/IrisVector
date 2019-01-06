import * as functions from 'firebase-functions';
import * as elasticsearch from 'elasticsearch';
import * as admin from 'firebase-admin';

const ENTITY_PATH = "entities/";
let client = new elasticsearch.Client({
    hosts: [{
        host: functions.config().es.host,
        port: '9243',
        protocol: 'https',
        auth: functions.config().es.auth
    }], requestTimeout: Infinity
});

export const persist = function (objType: string, body: any, index: Boolean): Promise<any> {
    let dbRef = admin.database().ref(ENTITY_PATH + objType);
    if (!body['id']) {
        body['id'] = dbRef.push();
    }
    return dbRef.update(body).then(async result => {
        if (index) {
            //TODO refactor this:
            //Move out the indexing logic to a firebase queue (like for order)
            //If the index comes as true then queue the data object for indexing.
            //If indexing fails set the status to failed. If it succeeds then simply remove it.
            //A housekeeping job can restart the indexing by resetting the status to 'retry'
            await client.index({
                index: 'firebase',
                type: objType,
                id: body.id,
                body: body
            });
        }
    });
};