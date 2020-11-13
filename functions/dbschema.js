let db = {
  users: [
    {
      userId: "fdsgrvrsvsdvdsfv",
      email: "user@email.com",
      handle: "user",
      createdAt: "2020-10-15T10:59:52.798Z",
      imageUrl: "image/asgasvsvfdf/dfdfvfvf",
      bio: "Hello, my name is user, nice to meet you",
      website: "https://user.com",
      location: "Salt Lake City, UT",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-09-18T17:25:20.061Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "fbeaergerdgteg",
      body: "Nice one, mate!",
      createdAt: "2020-09-18T17:25:20.061Z",
    },
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "dfbdfbaerdfvdfvbf",
      type: "like | comment",
      createdAt: "2020-09-18T17:25:20.061Z",
    },
  ],
};
const userDetails = {
  // Redux data
  credentials: {
    userId: "HH8GO384NO8VLE9349FJ49",
    email: "user@email.com",
    handle: "user",
    createdAt: "2020-10-28T10:59:52.798Z",
    imageUrl: "image/dfbdfbaebdbf/dfbdfbdfbdb",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "London, UK",
  },
  likes: [
    {
      userHandle: "user",
      screamId: "ijorinovielierij",
    },
    {
      userHandle: "user",
      screamId: "oijg9w8rhouinivd",
    },
  ],
};
//Doing this will minimize the number of "reads" on my FIrebase DB so it doesn't rape me on charges $
