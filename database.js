const firebaseConfig = {
  apiKey: "AIzaSyAU1REMetyAHfCHPJyWMh4UZucOVONV3wo",
  authDomain: "rummy-941e4.firebaseapp.com",
  databaseURL: "https://rummy-941e4-default-rtdb.firebaseio.com",
  projectId: "rummy-941e4",
  storageBucket: "rummy-941e4.firebasestorage.app",
  messagingSenderId: "52220207568",
  appId: "1:52220207568:web:33f35453dab15dc84099d5",
  measurementId: "G-NWGL0006L7"
};

  firebase.initializeApp(firebaseConfig);
var database = firebase.database();

function write(path,value){
    database.ref(path).set(value, function(error) {
        if (error) {
          console.error("Error updating count:", error);
        } else {
          console.log("Data updated successfully!");
        }
      });
}

function read(path) {
return database.ref(path).once('value')
  .then(function(snapshot) {
    //console.log(snapshot.val());
    return snapshot.val();
  })
  .catch(function(error) {
    console.error("Error reading Data:", error);
  });
}

function removeNode(path){
database.ref(path).remove()
.then(() => {
console.log("Node deleted successfully!");
})
.catch((error) => {
console.error("Error deleting node:", error);
});
}

/* ---------------------------------------------------------------
   Additional helpers used by rummy.html.
   These are additive only - the three functions above are untouched.
--------------------------------------------------------------- */

// Promise-based set(), so callers can await a write completing.
function writeAsync(path, value){
  return database.ref(path).set(value);
}

// Partial / multi-path update. Value can use slash-separated keys
// (e.g. {'hands/p1': [...]}) to touch several nodes atomically.
function updateAsync(path, values){
  return database.ref(path).update(values);
}

// Subscribe to live changes on a path. Returns an unsubscribe function.
function listen(path, callback){
  const ref = database.ref(path);
  const handler = function(snapshot){ callback(snapshot.val()); };
  ref.on('value', handler);
  return function unsubscribe(){ ref.off('value', handler); };
}

// One-time read that resolves to null instead of throwing if missing.
function readOnce(path){
  return database.ref(path).once('value').then(snap => snap.val());
}