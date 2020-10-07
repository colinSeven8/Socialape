const { admin } = require('./admin');

module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1]; //Bearer is convention and precedes the actual token
        console.log(`Starts with 'Bearer ${idToken}'`);
    } else {
        console.error('No token found');
        return res.status(403).json({ error: 'Unauthorized' });
    }

    // Verify that the token actually came from us
    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => { //THis will add to our "req" data when we proceed in our post
        req.user = decodedToken;
        console.log(`decodedToken: ${decodedToken}`);
        return db.collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1) //Limit to one record
        .get();
    })
    .then(data => {
        req.user.handle = data.docs[0].data().handle;
        return next(); //Allows request to proceed
    })
    .catch(err => {
        console.error(`Error while verifying token ${err}`);
        return res.status(403).json(err);
    });
}