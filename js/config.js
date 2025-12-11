        const supabaseUrl = 'https://zbkgsjhhleqrrvtfwaxw.supabase.co'
        const supabaseKey = 'sb_publishable_Pj5veRk50Az4h2ChQmMkmA_Mn1UhoJc'
        // Initialize Supabase client
        // The supabase-js library exposes 'supabase' globally
        const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)
        // Make the client available globally
        window.supabaseClient = supabaseClient;
        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyD8P6IzzXC9eXpOyJsJthV21s1bbL4kEKQ",
            authDomain: "classes-cfb71.firebaseapp.com",
            databaseURL: "https://classes-cfb71-default-rtdb.asia-southeast1.firebasedatabase.app",
            projectId: "classes-cfb71",
            storageBucket: "classes-cfb71.firebasestorage.app",
            messagingSenderId: "678474968676",
            appId: "1:678474968676:web:9644c9bc6380c857983971"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Make Firebase available globally
        window.firebaseAuth = firebase.auth();
        window.firebaseDb = firebase.firestore();
        window.firebaseRtdb = firebase.database();

        // Initialize Messaging
        try {
            window.firebaseMessaging = firebase.messaging();
        } catch (e) {
            console.log("Firebase Messaging not supported in this browser:", e);
        }

        // Enable Firestore persistence for faster offline access
        try {
            firebase.firestore().enablePersistence().catch(err => {
                console.log("Firestore persistence not available:", err);
            });
        } catch (e) {
            console.log("Firestore persistence error:", e);
        }
