const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
admin.initializeApp();

const config = { //Was firebaseConfig
    apiKey: process.env.API_KEY,
    authDomain: "socialape-632ab.firebaseapp.com",
    databaseURL: "https://socialape-632ab.firebaseio.com",
    projectId: "socialape-632ab",
    storageBucket: "socialape-632ab.appspot.com",
    messagingSenderId: "223978902412",
    appId: "1:223978902412:web:8dab69c46ac265dce3fca9",
    measurementId: "G-HG2WNPXPDL"
  };

const firebase = require ('firebase');
firebase.initializeApp(config);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                ...doc.data() //Spread operator
            });
        });
        return res.json(screams);
    })
    .catch(err => console.error(err));
});

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };
    db
    .collection('screams')
    .add(newScream)
    .then(doc => {
        res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
        res.status(500) //Server error
        .json({error: 'something went wrong'});
        console.error(err);
    })
});

//Signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle    
    };

    //TODO: validate data
    let token, userId;

    db.doc(`/users/${newUser.handle}`)
    .get()
    .then(doc => {
        if (doc.exists) {
            return res.status(400).json({ handle: 'This handle is already taken' }); //400 Invalid request
        } else {
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
    })
    .then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then(idToken => {
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        };
        return db.doc(`/users'/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: 'Email is already in use' });
        } else {
            return res.status(500).json({ error: err.code });
        }
    })
});

// exports.api = functions.https.onRequest(app);
exports.api = functions.region('us-west3').https.onRequest(app); //region for SLC