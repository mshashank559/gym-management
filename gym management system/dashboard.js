// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const memberForm = document.getElementById('member-form');
const membersList = document.getElementById('members-list');

// Add a new member
memberForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const membership = document.getElementById('membership').value;

    try {
        await db.collection('members').add({ name, age, membership });
        alert('Member added successfully!');
        memberForm.reset();
        fetchMembers();
    } catch (error) {
        console.error('Error adding member:', error);
    }
});

// Fetch all members
async function fetchMembers() {
    membersList.innerHTML = '';
    const snapshot = await db.collection('members').get();
    snapshot.forEach(doc => {
        const member = doc.data();
        const li = document.createElement('li');
        li.textContent = `${member.name}, Age: ${member.age}, Membership: ${member.membership}`;
        membersList.appendChild(li);
    });
}

// Fetch members on load
fetchMembers();
