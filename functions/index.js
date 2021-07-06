const functions = require("firebase-functions");
const admin = require('firebase-admin');
const firebase_tools = require('firebase-tools');

admin.initializeApp();

exports.deleteUser = functions.runWith({
        timeoutSeconds: 540,
        memory: '2GB'
    }).firestore
    .document('characters/{charID}')
    .onDelete((snap, context) => {
        const path = `characters/${context.params.charID}`;
        console.log(
            `Requested to delete path ${path}`
        );
        // Get an object representing the document prior to deletion
        // e.g. {'name': 'Marie', 'age': 66}
        return firebase_tools.firestore
            .delete(path, {
                project: process.env.GCLOUD_PROJECT,
                recursive: true,
                yes: true,
                token: functions.config().fb.token
            });

        // perform desired operations ...
    });