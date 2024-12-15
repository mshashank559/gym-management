// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration (you get this from the Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements for the forms and buttons
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const authForm = document.getElementById("auth-form");
const registerForm = document.getElementById("register-form");

// Toggle Forms
showRegister.addEventListener("click", () => {
    authForm.style.display = "none";
    registerForm.style.display = "block";
});

showLogin.addEventListener("click", () => {
    registerForm.style.display = "none";
    authForm.style.display = "block";
});

// Register User
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Registration successful!");
            authForm.style.display = "block";
            registerForm.style.display = "none";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Login User
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Logged in successfully!");
            window.location = "dashboard.html"; // Redirect to the dashboard page
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Logout User
document.getElementById('logout-btn').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("User logged out");
            // Redirect to login page after logout
            window.location = "login.html"; 
        })
        .catch((error) => {
            console.error("Logout error:", error.message);
        });
});

// Check auth state (if user is logged in or out)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
        // Optionally, display user details or handle session
    } else {
        console.log("No user is signed in");
    }
});
