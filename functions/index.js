const functions = require('firebase-functions');
const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllScreams, postOneScream, getScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser } = require('./handlers/users');

//Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
// TODO Delete scream
// TODO Like a scream
// TODO Unlike a scream
// TODO Comment on a scream

//Users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

// exports.api = functions.https.onRequest(app);
exports.api = functions.region('us-west3').https.onRequest(app); //region for SLC