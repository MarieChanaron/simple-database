// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOjZOZtmkPML8twHhi8OnKzmMvSxChvcs",
    authDomain: "simpledatabase-766b4.firebaseapp.com",
    databaseURL: "https://simpledatabase-766b4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "simpledatabase-766b4",
    storageBucket: "simpledatabase-766b4.appspot.com",
    messagingSenderId: "560293743263",
    appId: "1:560293743263:web:1763e4f46ea4349baa30aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase, 
    set, // add some data to the database
    get, // get data from the database
    update, // update the database
    remove, // remove elements from the database
    ref, // get a specific reference in the database (where I am going to put the data in the db)
    child // access the child part of that data
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";


// Store the database in a variable
const db = getDatabase();


// Retrieve HTML elements

// Left form
const enterID = document.getElementById('enterID');
const enterName = document.getElementById('enterName');
const enterAge = document.getElementById('enterAge');

// Right form
const findID = document.getElementById('findID');

// h3
const findName = document.getElementById('findName');
const findAge = document.getElementById('findAge');

// Buttons
const insertBtn = document.getElementById('insert');
const updateBtn = document.getElementById('update');
const removeBtn = document.getElementById('remove');
const findBtn = document.getElementById('find');


// Functions

function insertData() {
    set(ref(db, "People/" + enterID.value), {
        ID: enterID.value,
        Name: enterName.value,
        Age: enterAge.value
    })
    .then( () => {
        alert('Data added successfully!');
    })
    .catch( (error) => {
        alert(error);
    });
}

function updateData() {
    update(ref(db, 'People/' + enterID.value), {
        Name: enterName.value,
        Age: enterAge.value
    })
    .then( () => {
        alert('Data updated successfully!');
    })
    .catch( error => {
        alert(error);
    });
}

function removeData() {
    remove(ref(db, 'People/' + enterID.value))
    .then( () => {
        alert('Data removed successfully');
    })
    .catch( error => {
        alert(error);
    }); 
}

function findData() {
    const dbref = ref(db);
    get(child(dbref, 'People/' + findID.value))
    .then( (snapshot) => {
        if (snapshot.exists()) {
            findName.innerText = 'Name: ' + snapshot.val().Name;
            findAge.innerText = 'Age: ' + snapshot.val().Age;
        } else {
            alert('No data found');
        }
    })
    .catch( (error) => {
        alert(error);
    });
}


// Event listeners (click on the buttons)
insertBtn.onclick = insertData;
updateBtn.onclick = updateData;
removeBtn.onclick = removeData;
findBtn.onclick = findData;