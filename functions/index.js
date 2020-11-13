const functions = require("firebase-functions");
const app = require("express")();
const FBAuth = require("./util/fbAuth");

const { db } = require("./util/admin");

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
} = require("./handlers/users");

//Scream routes
app.get("/screams", getAllScreams);
app.post("/scream", FBAuth, postOneScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

//Users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);

// exports.api = functions.https.onRequest(app);
exports.api = functions.region("us-west3").https.onRequest(app); //region for SLC

// Create a notification when someone likes something
exports.createNotificationsOnLike = functions
  .region("us-west3")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return; //Only holds a write result
      })
      .catch((err) => {
        console.error(err);
        return; //Don't need to respond because this is a DB trigger
      });
  });

// Create a notification when someone unlikes something
exports.deleteNotificationOnUnLike = functions
  .region("us-west3")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    db.doc(`/notifications/${snapshot.id}`) //The ID of the like is the same as the ID of the notification
      .delete()
      .then(() => {
        return;
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  });

// Create a notification when someone comments
exports.createNotificationsOnComment = functions
  .region("us-west3")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    db.doc(`/screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return db.doc(`/notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .then(() => {
        return; //Only holds a write result
      })
      .catch((err) => {
        console.error(err);
        return; //Don't need to respond because this is a DB trigger
      });
  });
