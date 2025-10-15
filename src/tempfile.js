const firebaseConfig = {
    apiKey: "AIzaSyAvOlYzBnj9nTxyznxb_0ie3ILPXD9zmcg",
    authDomain: "flutter-kanpur.firebaseapp.com",
    projectId: "flutter-kanpur",
    storageBucket: "flutter-kanpur.firebasestorage.app",
    messagingSenderId: "455424177537",
    appId: "1:455424177537:web:91173e99df27e96659e480",
    measurementId: "G-6TZFHE02NL"
};


Object.entries(firebaseConfig).forEach(([key, value]) => {
    ('NEXT_PUBLIC_FIREBASE_API_KEY' + '=' + value);
})

