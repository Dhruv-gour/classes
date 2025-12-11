        const { useState, useEffect } = React;

        // --- Inline Icons (Replaces Lucide dependency for better stability) ---
        const Icons = {
            Download: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>,
            ExternalLink: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>,
            ChevronRight: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6" /></svg>,
            Library: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" /></svg>,
            Search: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>,
            Book: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
            GraduationCap: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
            ArrowLeft: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="19" x2="5" y1="12" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>,
            Menu: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>,
            Lock: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
            User: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
            Eye: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
            EyeOff: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" x2="23" y1="1" y2="23" /></svg>,
            LogOut: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>,
            Edit: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
            Phone: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
            MapPin: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
            FileText: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>,
            Grid: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
            Star: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
            Share2: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>,
            Bell: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>,
            Bot: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="10" rx="2" ry="2" /><circle cx="12" cy="16" r="1" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
            Sparkles: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>,
            ChevronLeft: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6" /></svg>,
            Network: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><path d="M12 12V8" /></svg>,
            Shield: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
            BadgeCheck: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.74Z" /><path d="m9 12 2 2 4-4" /></svg>,
        };

        const { Download, ExternalLink, ChevronRight, ChevronLeft, Library, Search, Book, GraduationCap, ArrowLeft, Menu, Lock, User, Eye, EyeOff, LogOut, Edit, Phone, MapPin, FileText, Grid, Star, Share2, Bell, Bot, Sparkles, Network, Shield, BadgeCheck } = Icons;

        // --- Data Configuration (Moved outside component for clarity, but remains in the HTML file) ---
        const NCERT_DATA = {
            9: [
                {
                    title: "Mathematics",
                    code: "iemh1",
                    cover: "blue",
                    chapters: [
                        "Number Systems", "Polynomials", "Coordinate Geometry", "Linear Equations in Two Variables",
                        "Introduction to Euclid's Geometry", "Lines and Angles", "Triangles", "Quadrilaterals",
                        "Circles", "Heron's Formula", "Surface Areas and Volumes", "Statistics"
                    ]
                },
                {
                    title: "Science",
                    code: "iesc1",
                    cover: "emerald",
                    chapters: [
                        "Matter in Our Surroundings", "Is Matter Around Us Pure?", "Atoms and Molecules", "Structure of the Atom",
                        "The Fundamental Unit of Life", "Tissues", "Motion", "Force and Laws of Motion",
                        "Gravitation", "Work and Energy", "Sound", "Improvement in Food Resources"
                    ]
                },
                { title: "Beehive (English)", code: "iebe1", count: 11, cover: "orange" },
                { title: "Moments (English)", code: "iemo1", count: 10, cover: "orange" },
                { title: "Democratic Politics", code: "iess4", count: 5, cover: "red" },
                { title: "Contemporary India", code: "iess1", count: 6, cover: "yellow" },
                { title: "Economics", code: "iess2", count: 4, cover: "pink" },
                { title: "India & Contemp. World", code: "iess3", count: 5, cover: "purple" },
                { title: "Kshitij (Hindi)", code: "ihks1", count: 17, cover: "red" },
                { title: "Kritika (Hindi)", code: "ihkr1", count: 5, cover: "red" },
            ],
            10: [
                {
                    title: "Mathematics",
                    code: "jemh1",
                    cover: "blue",
                    chapters: [
                        "Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables", "Quadratic Equations",
                        "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Introduction to Trigonometry",
                        "Some Applications of Trigonometry", "Circles", "Areas Related to Circles", "Surface Areas and Volumes",
                        "Statistics", "Probability"
                    ]
                },
                {
                    title: "Science",
                    code: "jesc1",
                    cover: "emerald",
                    chapters: [
                        "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and Its Compounds",
                        "Life Processes", "Control and Coordination", "How Do Organisms Reproduce?", "Heredity",
                        "Light – Reflection and Refraction", "The Human Eye and the Colourful World", "Electricity", "Magnetic Effects of Electric Current",
                        "Our Environment"
                    ]
                },
                { title: "First Flight (English)", code: "jeff1", count: 11, cover: "orange" },
                { title: "Footprints (English)", code: "jefp1", count: 10, cover: "orange" },
                { title: "Democratic Politics II", code: "jess4", count: 5, cover: "red" },
                { title: "Contemporary India II", code: "jess1", count: 7, cover: "yellow" },
                { title: "Economics", code: "jess2", count: 5, cover: "pink" },
                { title: "India & Contemp. World II", code: "jess3", count: 5, cover: "purple" },
                { title: "Kshitij II (Hindi)", code: "jhks1", count: 17, cover: "red" },
                { title: "Kritika II (Hindi)", code: "jhkr1", count: 5, cover: "red" },
            ],
            11: [
                {
                    title: "Mathematics",
                    code: "kemh1",
                    cover: "blue",
                    chapters: [
                        "Sets", "Relations and Functions", "Trigonometric Functions", "Principle of Mathematical Induction",
                        "Complex Numbers and Quadratic Equations", "Linear Inequalities", "Permutations and Combinations", "Binomial Theorem",
                        "Sequences and Series", "Straight Lines", "Conic Sections", "Introduction to Three Dimensional Geometry",
                        "Limits and Derivatives", "Mathematical Reasoning", "Statistics", "Probability"
                    ]
                },
                {
                    title: "Biology",
                    code: "kebo1",
                    cover: "green",
                    chapters: [
                        "The Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
                        "Morphology of Flowering Plants", "Anatomy of Flowering Plants", "Structural Organisation in Animals", "Cell: The Unit of Life",
                        "Biomolecules", "Cell Cycle and Cell Division", "Photosynthesis in Higher Plants", "Respiration in Plants",
                        "Plant Growth and Development", "Breathing and Exchange of Gases", "Body Fluids and Circulation", "Excretory Products and their Elimination",
                        "Locomotion and Movement", "Neural Control and Coordination", "Chemical Coordination and Integration"
                    ]
                },
                { title: "Physics Part I", code: "keph1", count: 8, cover: "indigo" },
                { title: "Physics Part II", code: "keph2", count: 7, cover: "indigo" },
                { title: "Chemistry Part I", code: "kech1", count: 7, cover: "teal" },
                { title: "Chemistry Part II", code: "kech2", count: 7, cover: "teal" },
                { title: "Hornbill (English)", code: "kehb1", count: 8, cover: "orange" },
                { title: "Snapshot (English)", code: "kesp1", count: 8, cover: "orange" },
                { title: "Aroh (Hindi)", code: "khar1", count: 10, cover: "red" },
                { title: "Vitan (Hindi)", code: "khvt1", count: 4, cover: "red" },
            ],
            12: [
                {
                    title: "Mathematics Part I",
                    code: "lemh1",
                    cover: "blue",
                    chapters: [
                        "Relations and Functions", "Inverse Trigonometric Functions", "Matrices", "Determinants",
                        "Continuity and Differentiability", "Application of Derivatives"
                    ]
                },
                {
                    title: "Mathematics Part II",
                    code: "lemh2",
                    cover: "blue",
                    chapters: [
                        "Integrals", "Application of Integrals", "Differential Equations", "Vector Algebra",
                        "Three Dimensional Geometry", "Linear Programming", "Probability"
                    ]
                },
                {
                    title: "Biology",
                    code: "lebo1",
                    cover: "green",
                    chapters: [
                        "Sexual Reproduction in Flowering Plants", "Human Reproduction", "Reproductive Health", "Principles of Inheritance and Variation",
                        "Molecular Basis of Inheritance", "Evolution", "Human Health and Disease", "Microbes in Human Welfare",
                        "Biotechnology: Principles and Processes", "Biotechnology and its Applications", "Organisms and Populations", "Ecosystem",
                        "Biodiversity and Conservation"
                    ]
                },
                { title: "Physics Part I", code: "leph1", count: 8, cover: "indigo" },
                { title: "Physics Part II", code: "leph2", count: 7, cover: "indigo" },
                { title: "Chemistry Part I", code: "lech1", count: 9, cover: "teal" },
                { title: "Chemistry Part II", code: "lech2", count: 7, cover: "teal" },
                { title: "Flamingo (English)", code: "lefl1", count: 8, cover: "orange" },
                { title: "Vistas (English)", code: "levt1", count: 8, cover: "orange" },
                { title: "Aroh II (Hindi)", code: "lhar1", count: 10, cover: "red" },
                { title: "Vitan II (Hindi)", code: "lhvt1", count: 4, cover: "red" },
            ]
        };

        // Light mode colors matching the requested logo (Red/Yellow theme)
        const COLOR_MAP = {
            blue: "bg-blue-50 text-blue-700 border-blue-100",
            emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
            orange: "bg-orange-50 text-orange-700 border-orange-100",
            red: "bg-red-50 text-red-700 border-red-100",
            yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
            pink: "bg-pink-50 text-pink-700 border-pink-100",
            purple: "bg-purple-50 text-purple-700 border-purple-100",
            indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
            teal: "bg-teal-50 text-teal-700 border-teal-100",
            green: "bg-green-50 text-green-700 border-green-100",
        };

        // --- Login Page Component ---
        function LoginPage({ onLogin }) {
            const [error, setError] = useState("");
            const [isLoading, setIsLoading] = useState(false);
            const [otpEmail, setOtpEmail] = useState("");
            const [otpCode, setOtpCode] = useState("");
            const [showOtpInput, setShowOtpInput] = useState(false);

            const [otpMessage, setOtpMessage] = useState({ type: '', text: '' });
            const [isSendingOtp, setIsSendingOtp] = useState(false);

            const getFcmToken = async () => {
                try {
                    if (window.firebaseMessaging) {
                         const currentToken = await window.firebaseMessaging.getToken({
                            vapidKey: 'BJCYS5m8FycB44kLL9BHrwaFmL5BPm2eGLtCnaJ7MR1gNA2x6Mp1ZNC9xNXUssmTtxLGM2trs6W25XDJryLu7E0'
                        });
                        if (currentToken) {
                            console.log("FCM Token retrieved:", currentToken);
                            return currentToken;
                        } else {
                            console.log('No registration token available. Request permission to generate one.');
                        }
                    }
                } catch (err) {
                    console.log('An error occurred while retrieving token. ', err);
                }
                return '';
            };

            const handleSendOtp = async () => {
                const email = otpEmail.trim();
                setOtpMessage({ type: '', text: '' });

                if (!email) {
                    setOtpMessage({ type: 'error', text: 'Please enter your email' });
                    return;
                }

                setIsSendingOtp(true);
                try {
                    const { error } = await window.supabaseClient.auth.signInWithOtp({ email: email });
                    if (error) throw error;

                    setOtpMessage({ type: 'success', text: 'OTP sent to your email' });
                    setShowOtpInput(true);
                } catch (err) {
                    setOtpMessage({ type: 'error', text: err.message });
                } finally {
                    setIsSendingOtp(false);
                }
            };

            const handleVerifyOtp = async () => {
                const email = otpEmail.trim();
                const token = otpCode.trim();
                setOtpMessage({ type: '', text: '' });

                if (!email || !token) {
                    setOtpMessage({ type: 'error', text: 'Please enter both email and OTP' });
                    return;
                }

                setIsLoading(true);
                try {
                    const { data, error } = await window.supabaseClient.auth.verifyOtp({
                        email: email,
                        token: token,
                        type: 'email'
                    });

                    if (error) throw error;

                    const user = data.user;
                    if (user) {
                        // Process user data similar to Google login
                        const db = window.firebaseDb;
                        const displayName = user.user_metadata?.full_name || email.split('@')[0];
                        const photoURL = user.user_metadata?.avatar_url || '';

                        // Store in localStorage (UI requires this)
                        localStorage.setItem('username', displayName);
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('userId', user.id);
                        if (photoURL) localStorage.setItem('userPhoto', photoURL);

                        // Get FCM Token
                        const fcmToken = await getFcmToken();

                        // Check Firestore for user existence
                        const userRef = db.collection("users").doc(user.id);
                        const userDoc = await userRef.get();

                        if (userDoc.exists) {
                            // Existing user
                            await userRef.update({
                                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                                email: email,
                                fcmToken: fcmToken // Update FCM Token
                            });
                            onLogin(userDoc.data().name || displayName, false);
                        } else {
                            // New user
                            localStorage.setItem('isNewUser', 'true');
                            const userData = {
                                name: displayName,
                                email: email,
                                phone: '',
                                fcmToken: fcmToken, // Store FCM Token instead of photoURL
                                class: '',
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                            };

                            await userRef.set(userData);
                            onLogin(displayName, true);
                        }
                    }
                } catch (err) {
                    setOtpMessage({ type: 'error', text: err.message });
                    setIsLoading(false);
                }
            };

            // Firebase is available globally via window.firebaseAuth and window.firebaseDb

            const handleGoogleSignIn = async () => {
                setError("");
                setIsLoading(true);

                try {
                    const auth = window.firebaseAuth;
                    const db = window.firebaseDb;
                    const provider = new firebase.auth.GoogleAuthProvider();

                    // Sign in with Google
                    const result = await auth.signInWithPopup(provider);
                    const user = result.user;

                    // Check if this is a new user
                    const isNewUser = result.additionalUserInfo.isNewUser;

                    // Get user data
                    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
                    const email = user.email || '';
                    const photoURL = user.photoURL || '';
                    const phoneNumber = user.phoneNumber || '';

                    // Store in localStorage
                    localStorage.setItem('username', displayName);
                    localStorage.setItem('userEmail', email);
                    localStorage.setItem('userId', user.uid);
                    if (photoURL) localStorage.setItem('userPhoto', photoURL);
                    if (phoneNumber) localStorage.setItem('userPhone', phoneNumber);

                    // Get FCM Token
                    const fcmToken = await getFcmToken();

                    if (isNewUser) {
                        // New user signup
                        localStorage.setItem('isNewUser', 'true');

                        // Store user data in Firestore - only essential fields
                        const userData = {
                            name: displayName,
                            email: email,
                            phone: phoneNumber,
                            fcmToken: fcmToken, // Store FCM token instead of photoURL
                            class: '', // Will be set in profile
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                        };

                        try {
                            await db.collection("users").doc(user.uid).set(userData);
                            console.log("✅ New user data saved to Firestore:", user.uid);
                        } catch (firestoreError) {
                            console.error("❌ Error saving to Firestore:", firestoreError);
                            // Continue even if Firestore fails - data is in localStorage
                        }

                        // Redirect to profile page for new users
                        onLogin(displayName, true);
                    } else {
                        // Existing user login
                        const userDoc = await db.collection("users").doc(user.uid).get();
                        let finalDisplayName = displayName;

                        if (userDoc.exists) {
                            const userData = userDoc.data();
                            finalDisplayName = userData.name || displayName;

                            // Update last login and sync data - only essential fields
                            try {
                                await db.collection("users").doc(user.uid).update({
                                    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                                    email: email,
                                    fcmToken: fcmToken, // Update FCM token
                                    name: displayName
                                });
                                console.log("✅ Last login updated in Firestore");
                            } catch (err) {
                                console.error("❌ Error updating last login:", err);
                            }
                        } else {
                            // Create user doc if doesn't exist - only essential fields
                            const newUserData = {
                                name: displayName,
                                email: email,
                                phone: phoneNumber,
                                fcmToken: fcmToken, // Store FCM Token instead of photoURL
                                class: '',
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                            };

                            try {
                                await db.collection("users").doc(user.uid).set(newUserData);
                                console.log("✅ User data saved to Firestore:", user.uid);
                            } catch (firestoreError) {
                                console.error("❌ Error saving user to Firestore:", firestoreError);
                            }
                        }

                        // Update localStorage
                        localStorage.setItem('username', finalDisplayName);
                        localStorage.setItem('userEmail', email);
                        if (photoURL) localStorage.setItem('userPhoto', photoURL);

                        // Redirect to home
                        onLogin(finalDisplayName, false);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error("Google Sign-In error:", error);

                    let errorMessage = "Failed to sign in with Google. Please try again.";

                    if (error.code === "auth/popup-closed-by-user") {
                        errorMessage = "Sign-in was cancelled. Please try again.";
                    } else if (error.code === "auth/popup-blocked") {
                        errorMessage = "Popup was blocked. Please allow popups and try again.";
                    } else if (error.code === "auth/operation-not-allowed") {
                        errorMessage = "Google sign-in is not enabled. Please contact administrator.";
                    } else if (error.message) {
                        errorMessage = error.message;
                    }

                    setError(errorMessage);
                }
            };

            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-red-50 to-yellow-50 px-4 py-8">
                    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {/* Logo and Title Section */}
                        <div className="text-center mb-8">
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 flex items-center justify-center overflow-hidden bg-white rounded-full shadow-lg p-1">
                                    <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2">
                                Chaturvedi <span className="text-yellow-600">Classes</span>
                            </h1>
                            <p className="text-sm text-gray-600 font-semibold tracking-wider uppercase">Excellence in Education</p>
                        </div>

                        {/* Login Card */}
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 md:p-10">
                            {/* Welcome Message */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                                <p className="text-gray-600 text-sm">Sign in to continue your learning journey</p>
                            </div>

                            {/* Error Message */}
                            {(error || otpMessage.text) && (
                                <div className={`px-4 py-3 rounded-xl text-sm mb-6 border ${otpMessage.type === 'success'
                                    ? 'bg-green-50 border-green-200 text-green-700'
                                    : 'bg-red-50 border-red-200 text-red-700'
                                    }`}>
                                    {error || otpMessage.text}
                                </div>
                            )}

                            {/* Email OTP Login Section */}
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label htmlFor="emailInput" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="emailInput"
                                            placeholder="name@example.com"
                                            value={otpEmail}
                                            onChange={(e) => setOtpEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                                {!showOtpInput && (
                                    <button
                                        id="sendOtpBtn"
                                        onClick={handleSendOtp}
                                        disabled={isSendingOtp}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {isSendingOtp ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send OTP</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </>
                                        )}
                                    </button>
                                )}

                                {showOtpInput && (
                                    <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label htmlFor="otpInput" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 ml-1">One-Time Password</label>
                                        <div className="relative mb-4">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="otpInput"
                                                inputMode="numeric"
                                                placeholder="Enter 6-digit code"
                                                value={otpCode}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (/^\d{0,6}$/.test(val)) {
                                                        setOtpCode(val);
                                                    }
                                                }}
                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 outline-none transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 tracking-widest"
                                            />
                                        </div>
                                        <button
                                            id="verifyOtpBtn"
                                            onClick={handleVerifyOtp}
                                            disabled={isLoading}
                                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            )}
                                            <span>Verify & Login</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Quick & Secure</span>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>No password required</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Secure authentication</span>
                                </div>
                                <div className="flex items-start gap-3 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span>Instant access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- Profile Edit Page Component ---
        function ProfileEditPage({ onBackToHome, username, onUsernameUpdate }) {
            const [displayName, setDisplayName] = useState(username || '');
            const [selectedClass, setSelectedClass] = useState('');
            const [email, setEmail] = useState('');
            const [phone, setPhone] = useState('');
            const [isSaving, setIsSaving] = useState(false);
            const [message, setMessage] = useState({ type: '', text: '' });

            useEffect(() => {
                const loadUserData = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        let userId = auth.currentUser?.uid;
                        let userEmail = auth.currentUser?.email;

                        // Fallback to localStorage if Firebase Auth user is missing (Supabase login)
                        if (!userId) {
                            userId = localStorage.getItem('userId');
                            userEmail = localStorage.getItem('userEmail');
                        }

                        if (userId) {
                            setEmail(userEmail || '');

                            // Get phone from localStorage or Firestore
                            const cachedPhone = localStorage.getItem('userPhone') || '';
                            setPhone(cachedPhone);

                            // Get user data from Firestore
                            try {
                                const userDoc = await db.collection("users").doc(userId).get();
                                if (userDoc.exists) {
                                    const userData = userDoc.data();
                                    setDisplayName(userData.name || username || '');
                                    setSelectedClass(userData.class || '');
                                    setEmail(userData.email || userEmail || '');
                                    setPhone(userData.phone || cachedPhone || '');
                                    console.log("✅ Profile data loaded from Firestore:", userData);
                                } else {
                                    setDisplayName(username || '');
                                    console.log("⚠️ User doc not found in Firestore, using cached data");
                                }
                            } catch (error) {
                                console.error("❌ Error loading profile data from Firestore:", error);
                                console.error("Error details:", {
                                    code: error.code,
                                    message: error.message
                                });
                                // Use cached data if Firestore fails
                                setDisplayName(username || '');
                            }
                        }
                    } catch (error) {
                        console.error("Error loading user data:", error);
                        setDisplayName(username || '');
                    }
                };

                loadUserData();
            }, [username]);

            const handleSave = async () => {
                if (!displayName.trim()) {
                    setMessage({ type: 'error', text: 'Please enter your name' });
                    return;
                }

                // Check if class is selected (mandatory)
                if (!selectedClass) {
                    setMessage({ type: 'error', text: 'Please select your class' });
                    return;
                }


                setIsSaving(true);
                setMessage({ type: '', text: '' });

                try {
                    const auth = window.firebaseAuth;
                    const db = window.firebaseDb;
                    let userId = auth.currentUser?.uid;

                    // Fallback to localStorage if Firebase Auth user is missing (Supabase login)
                    if (!userId) {
                        userId = localStorage.getItem('userId');
                    }

                    if (!userId) {
                        setMessage({ type: 'error', text: 'User not authenticated. Please login again.' });
                        setIsSaving(false);
                        return;
                    }

                    // Get existing user data
                    const userDoc = await db.collection("users").doc(userId).get();
                    const existingData = userDoc.exists ? userDoc.data() : {};

                    // Check if this is a new user
                    const isNewUser = localStorage.getItem('isNewUser') === 'true';

                    // Prepare user data - only essential fields
                    const userData = {
                        name: displayName,
                        class: selectedClass,
                        email: email || existingData.email || '',
                        phone: phone, // Use the state variable which can be edited
                        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                    };

                    // Try to get FCM token again if missing
                    if (!userData.fcmToken && window.firebaseMessaging) {
                         try {
                                const token = await window.firebaseMessaging.getToken();
                                if (token) {
                                    userData.fcmToken = token;
                                }
                         } catch (e) {
                             console.log("Could not retrieve FCM token on save", e);
                         }
                    }

                    // If new user, preserve creation timestamp
                    if (isNewUser) {
                        if (existingData.createdAt) {
                            userData.createdAt = existingData.createdAt;
                        } else {
                            userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                        }
                    } else if (existingData.createdAt) {
                        // Preserve existing creation timestamp for existing users
                        userData.createdAt = existingData.createdAt;
                    }

                    // Update Firestore with all data
                    try {
                        await db.collection("users").doc(userId).set(userData, { merge: true });
                        console.log("✅ Profile data saved to Firestore successfully:", userId);
                        console.log("Saved data:", userData);
                    } catch (firestoreError) {
                        console.error("❌ Error saving profile to Firestore:", firestoreError);
                        console.error("Error details:", {
                            code: firestoreError.code,
                            message: firestoreError.message
                        });
                        throw firestoreError; // Re-throw to be caught by outer catch
                    }

                    // Update localStorage
                    localStorage.setItem('username', displayName);
                    localStorage.removeItem('isNewUser'); // Remove flag after first save

                    // Update parent component username
                    if (onUsernameUpdate) {
                        onUsernameUpdate(displayName);
                    }

                    setMessage({ type: 'success', text: 'Profile updated successfully!' });

                    // Redirect to home after save
                    setTimeout(() => {
                        onBackToHome();
                    }, 1500);
                } catch (error) {
                    console.error("Error updating profile:", error);
                    console.error("Error details:", {
                        code: error.code,
                        message: error.message,
                        stack: error.stack
                    });

                    let errorMessage = 'Failed to update profile. Please try again.';

                    // Provide more specific error messages
                    if (error.code === 'permission-denied') {
                        errorMessage = 'Permission denied. Please check your Firebase security rules.';
                    } else if (error.code === 'unavailable') {
                        errorMessage = 'Service temporarily unavailable. Please check your internet connection.';
                    } else if (error.message) {
                        errorMessage = `Error: ${error.message}`;
                    }

                    setMessage({ type: 'error', text: errorMessage });
                } finally {
                    setIsSaving(false);
                }
            };

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (!selectedClass) {
                                            setMessage({ type: 'error', text: 'Please select your class before leaving.' });
                                            return;
                                        }
                                        onBackToHome();
                                    }}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Edit Profile</h2>

                                {/* Message */}
                                {message.text && (
                                    <div className={`mb-6 px-4 py-3 rounded-xl text-sm ${message.type === 'success'
                                        ? 'bg-green-50 border border-green-200 text-green-700'
                                        : 'bg-red-50 border border-red-200 text-red-700'
                                        }`}>
                                        {message.text}
                                    </div>
                                )}

                                <div className="space-y-6">
                                    {/* Name Field */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="text"
                                                value={displayName}
                                                onChange={(e) => setDisplayName(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                    </div>

                                    {/* Class Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Class <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={selectedClass}
                                            onChange={(e) => setSelectedClass(e.target.value)}
                                            className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                        >
                                            <option value="">Select your class</option>
                                            <option value="9">Class 9th</option>
                                            <option value="10">Class 10th</option>
                                            <option value="11">Class 11th</option>
                                            <option value="12">Class 12th</option>
                                        </select>
                                    </div>

                                    {/* Email Field (Read-only) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <input
                                                type="email"
                                                value={email}
                                                readOnly
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-500 bg-gray-50 cursor-not-allowed"
                                                placeholder="Email address"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>

                                    {/* Phone Field (Display only) */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                                                placeholder="Enter your mobile number"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Update your contact number</p>
                                    </div>

                                    {/* Save Button */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="flex-1 bg-red-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-md shadow-red-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {isSaving ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>Saving...</span>
                                                </>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (!selectedClass) {
                                                    setMessage({ type: 'error', text: 'Please select your class before leaving.' });
                                                    return;
                                                }
                                                onBackToHome();
                                            }}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // --- Home Page Component ---
        function HomePage({ onNavigateToLibrary, username, onLogout, onNavigateToProfile, onNavigateToQuiz, onNavigateToAI, onNavigateToFeatures, onNavigateToLocation, onNavigateToNotifications, onNavigateToAllClasses, onNavigateToPYQ, onNavigateToMindMap }) {
            const [isNavOpen, setIsNavOpen] = useState(false);
            const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || '');
            const [bannerIndex, setBannerIndex] = useState(0);
            const [showLeftArrow, setShowLeftArrow] = useState(false);
            const [showRightArrow, setShowRightArrow] = useState(true);
            const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
            const [touchStart, setTouchStart] = useState(null);
            const [touchEnd, setTouchEnd] = useState(null);
            const [helpPhoneNumber, setHelpPhoneNumber] = useState(localStorage.getItem('helpPhoneNumber') || '+1234567890');
            const [notificationPermission, setNotificationPermission] = useState(checkNotificationPermission());
            const [showNotificationBanner, setShowNotificationBanner] = useState(false);

            // Check notification permission status
            useEffect(() => {
                const checkPermission = () => {
                    const permission = checkNotificationPermission();
                    setNotificationPermission(permission);

                    // Show banner if permission is not granted and user is logged in
                    const auth = window.firebaseAuth;
                    const userId = auth?.currentUser?.uid || localStorage.getItem('userId');

                    if (userId && permission !== 'granted' && permission !== 'unsupported') {
                        setShowNotificationBanner(true);
                    } else {
                        setShowNotificationBanner(false);
                    }
                };

                // Check immediately
                checkPermission();

                // Check every 5 seconds
                const interval = setInterval(checkPermission, 5000);

                return () => clearInterval(interval);
            }, []);

            // Handle notification permission request
            const handleRequestNotificationPermission = async () => {
                const auth = window.firebaseAuth;
                const userId = auth?.currentUser?.uid || localStorage.getItem('userId');

                if (userId) {
                    const granted = await initializePushNotifications(userId, true);
                    if (granted) {
                        setNotificationPermission('granted');
                        setShowNotificationBanner(false);
                    }
                }
            };

            // Listen for help phone number changes
            useEffect(() => {
                const rtdb = window.firebaseRtdb;
                const phoneRef = rtdb.ref('settings/helpPhoneNumber');

                const handleData = (snapshot) => {
                    const val = snapshot.val();
                    if (val) {
                        setHelpPhoneNumber(val);
                        localStorage.setItem('helpPhoneNumber', val);
                    }
                };

                phoneRef.on('value', handleData);

                return () => {
                    phoneRef.off('value', handleData);
                };
            }, []);

            // Check for unread notifications
            useEffect(() => {
                const checkNotifications = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        if (!user) return;

                        // Get user class
                        const userDoc = await db.collection("users").doc(user.uid).get();
                        const userClass = userDoc.exists ? userDoc.data().class : '';

                        // Get last check time
                        const lastCheck = localStorage.getItem('lastNotificationCheck');
                        const lastCheckTime = lastCheck ? parseInt(lastCheck) : 0;

                        // Load notifications
                        const notificationsSnapshot = await db.collection('adminNotifications').get();
                        const allNotifications = notificationsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        // Filter by user's class or "all"
                        const relevantNotifications = allNotifications.filter(notif =>
                            notif.targetClass === 'all' || notif.targetClass === userClass
                        );

                        // Check if there are new notifications
                        const hasNew = relevantNotifications.some(notif => {
                            const notifTime = notif.createdAt?.toMillis?.() || notif.createdAt?.seconds * 1000 || 0;
                            return notifTime > lastCheckTime;
                        });

                        setHasUnreadNotifications(hasNew);
                        localStorage.setItem('hasUnreadNotifications', hasNew ? 'true' : 'false');
                    } catch (error) {
                        console.error('Error checking notifications:', error);
                    }
                };

                checkNotifications();
                // Check every 30 seconds
                const interval = setInterval(checkNotifications, 30000);
                return () => clearInterval(interval);
            }, []);

            // Auto-scroll banners
            useEffect(() => {
                const interval = setInterval(() => {
                    setBannerIndex((prev) => (prev + 1) % 3); // Assuming 3 banners
                }, 4000); // Change every 4 seconds
                return () => clearInterval(interval);
            }, []);

            // Share function
            const handleShare = (shareText) => {
                const playStoreLink = 'https://play.google.com/store/apps/dev?id=8205647922049206296&hl=en_IN';
                const fullText = `${shareText}\n\nDownload now: ${playStoreLink}`;

                if (navigator.share) {
                    navigator.share({
                        title: 'Chaturvedi Classes',
                        text: fullText,
                        url: playStoreLink
                    }).catch(err => console.log('Error sharing:', err));
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(fullText).then(() => {
                        alert('Link copied to clipboard!');
                    }).catch(() => {
                        // Final fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = fullText;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Link copied to clipboard!');
                    });
                }
            };

            const toggleNav = () => {
                setIsNavOpen(!isNavOpen);
            };

            const closeNav = () => {
                setIsNavOpen(false);
            };

            // Handle profile picture upload
            const handleProfilePictureUpload = (e) => {
                const file = e.target.files[0];
                if (file) {
                    // Validate file type
                    if (!file.type.startsWith('image/')) {
                        alert('Please select an image file');
                        return;
                    }

                    // Validate file size (max 2MB)
                    if (file.size > 2 * 1024 * 1024) {
                        alert('Image size should be less than 2MB');
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const imageData = event.target.result;
                        // Store in localStorage
                        localStorage.setItem('profilePicture', imageData);
                        setProfilePicture(imageData);
                    };
                    reader.readAsDataURL(file);
                }
            };

            // Trigger file input when user icon is clicked
            const handleUserIconClick = () => {
                document.getElementById('profile-picture-input').click();
            };

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    {/* Header */}
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={toggleNav}
                                        className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                        aria-label="Open navigation menu"
                                    >
                                        <Menu className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Navigation Drawer */}
                    <div
                        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        onClick={closeNav}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Drawer */}
                        <div
                            className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isNavOpen ? 'translate-x-0' : 'translate-x-full'}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                {/* Drawer Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                            <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-bold text-red-900">{username}</h2>
                                            <p className="text-xs text-gray-500">Chaturvedi Classes</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={closeNav}
                                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                                        aria-label="Close menu"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Navigation Items */}
                                <div className="flex-1 overflow-y-auto py-4">
                                    <nav className="space-y-1 px-4">
                                        <button
                                            onClick={() => { closeNav(); onNavigateToProfile(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <User className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Profile</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); onNavigateToLibrary(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Library className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">NCERT Library</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Book className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">My Books</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <GraduationCap className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Classes</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); onNavigateToNotifications(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <div className="relative">
                                                <Bell className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                                {hasUnreadNotifications && (
                                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                                )}
                                            </div>
                                            <span className="font-medium">Notifications</span>
                                        </button>

                                        <div className="border-t border-gray-200 my-2"></div>

                                        <button
                                            onClick={() => { closeNav(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="font-medium">Settings</span>
                                        </button>

                                        <div className="border-t border-gray-200 my-2"></div>

                                        {/* More Apps Section */}
                                        <button
                                            onClick={() => {
                                                closeNav();
                                                window.open('https://play.google.com/store/apps/dev?id=8205647922049206296', '_blank');
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Grid className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">More Apps</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Star className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Rate App</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                closeNav();
                                                const playStoreLink = 'https://play.google.com/store/apps/dev?id=8205647922049206296&hl=en_IN';
                                                const shareText = 'Check out Chaturvedi Classes - Best educational app for NCERT books, daily quizzes, and more!';
                                                const fullText = `${shareText}\n\nDownload now: ${playStoreLink}`;

                                                if (navigator.share) {
                                                    navigator.share({
                                                        title: 'Chaturvedi Classes',
                                                        text: fullText,
                                                        url: playStoreLink
                                                    }).catch(err => console.log('Error sharing:', err));
                                                } else {
                                                    navigator.clipboard.writeText(fullText).then(() => {
                                                        alert('Link copied to clipboard!');
                                                    }).catch(() => {
                                                        const textArea = document.createElement('textarea');
                                                        textArea.value = fullText;
                                                        document.body.appendChild(textArea);
                                                        textArea.select();
                                                        document.execCommand('copy');
                                                        document.body.removeChild(textArea);
                                                        alert('Link copied to clipboard!');
                                                    });
                                                }
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Share2 className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Share App</span>
                                        </button>

                                        <button
                                            onClick={() => { closeNav(); onNavigateToLocation(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <MapPin className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Location</span>
                                        </button>



                                        <button
                                            onClick={() => { closeNav(); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-yellow-50 hover:text-red-700 rounded-xl transition-colors group"
                                        >
                                            <Shield className="w-5 h-5 text-gray-400 group-hover:text-red-700" />
                                            <span className="font-medium">Privacy Policy</span>
                                        </button>
                                    </nav>
                                </div>

                                {/* Logout Button at Bottom */}
                                <div className="border-t border-gray-200 p-4">
                                    <button
                                        onClick={() => { closeNav(); onLogout(); }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                            {/* Username Card - Overlapping with navbar */}
                            <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-2xl border border-red-100 p-6 mb-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 -mt-6 pt-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            onClick={handleUserIconClick}
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm cursor-pointer hover:shadow-md transition-all overflow-hidden"
                                            title="Click to change profile picture"
                                        >
                                            {profilePicture ? (
                                                <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                                            ) : (
                                                <User className="w-8 h-8 text-red-700" />
                                            )}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                                                Hey, <span className="text-red-700">{username.split(' ')[0]}</span>
                                            </h2>
                                            <p className="text-sm text-gray-600 mt-1">Ready to learn today?</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onNavigateToProfile}
                                        className="p-2 text-gray-400 hover:text-red-700 hover:bg-white/50 rounded-lg transition-all duration-300"
                                        aria-label="Edit profile"
                                        title="Edit profile"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                </div>
                                {/* Hidden file input for profile picture */}
                                <input
                                    id="profile-picture-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfilePictureUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>

                            {/* Notification Permission Banner */}
                            {showNotificationBanner && (
                                <div className="mb-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-4 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                                            <Bell className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900 mb-1">Enable Notifications</h3>
                                            <p className="text-sm text-gray-700 mb-3">
                                                Stay updated with important announcements, class schedules, and new content!
                                            </p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleRequestNotificationPermission}
                                                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg">
                                                    Enable Now
                                                </button>
                                                <button
                                                    onClick={() => setShowNotificationBanner(false)}
                                                    className="px-4 py-2 bg-white text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 border border-gray-300">
                                                    Maybe Later
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Auto-scrollable Banners */}
                            <div className="mb-6">
                                <div className="relative overflow-hidden rounded-2xl">
                                    <div
                                        className="flex transition-transform duration-500 ease-in-out"
                                        style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
                                        onTouchStart={(e) => {
                                            setTouchStart(e.targetTouches[0].clientX);
                                            setTouchEnd(null);
                                        }}
                                        onTouchMove={(e) => {
                                            setTouchEnd(e.targetTouches[0].clientX);
                                        }}
                                        onTouchEnd={() => {
                                            if (!touchStart || !touchEnd) return;
                                            const distance = touchStart - touchEnd;
                                            const isLeftSwipe = distance > 50;
                                            const isRightSwipe = distance < -50;

                                            if (isLeftSwipe) {
                                                setBannerIndex((prev) => (prev + 1) % 3);
                                            } else if (isRightSwipe) {
                                                setBannerIndex((prev) => (prev - 1 + 3) % 3);
                                            }
                                        }}
                                    >
                                        {/* Banner 1 */}
                                        <div className="min-w-full bg-gradient-to-r from-red-500 to-yellow-500 rounded-2xl p-6 text-white relative overflow-hidden">
                                            <div className="relative z-10">
                                                <h3 className="text-2xl font-bold mb-2">Welcome to Chaturvedi Classes!</h3>
                                                <p className="text-sm opacity-90">Excellence in Education</p>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                        </div>

                                        {/* Banner 2 */}
                                        <div className="min-w-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white relative overflow-hidden">
                                            <div className="relative z-10">
                                                <h3 className="text-2xl font-bold mb-2">Daily Quiz Available!</h3>
                                                <p className="text-sm opacity-90">Test your knowledge every day</p>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                        </div>

                                        {/* Banner 3 */}
                                        <div className="min-w-full bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
                                            <div className="relative z-10">
                                                <h3 className="text-2xl font-bold mb-2">NCERT Books Library</h3>
                                                <p className="text-sm opacity-90">Access all classes 9-12</p>
                                            </div>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                        </div>
                                    </div>

                                    {/* Banner Indicators */}
                                    <div className="flex justify-center gap-2 mt-4">
                                        {[0, 1, 2].map((index) => (
                                            <button
                                                key={index}
                                                onClick={() => setBannerIndex(index)}
                                                className={`w-2 h-2 rounded-full transition-all ${bannerIndex === index ? 'bg-red-700 w-6' : 'bg-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Actions - Horizontal Scrollable with Arrows */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Actions</h3>
                                <div className="relative group">
                                    {/* Scroll Fade Masks */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showLeftArrow ? 'opacity-100' : 'opacity-0'}`} />
                                    <div className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${showRightArrow ? 'opacity-100' : 'opacity-0'}`} />

                                    {showLeftArrow && (
                                        <button
                                            onClick={() => {
                                                const container = document.getElementById('quick-actions-scroll');
                                                if (container) container.scrollBy({ left: -100, behavior: 'smooth' });
                                            }}
                                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition-all"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                                        </button>
                                    )}
                                    <div
                                        id="quick-actions-scroll"
                                        className="overflow-x-auto scrollbar-hide scroll-smooth"
                                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                        onScroll={(e) => {
                                            const container = e.target;
                                            const scrollLeft = container.scrollLeft;
                                            const scrollWidth = container.scrollWidth;
                                            const clientWidth = container.clientWidth;

                                            setShowLeftArrow(scrollLeft > 0);
                                            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
                                        }}
                                    >
                                        <div className="flex gap-2 pb-2 px-2 pt-3" style={{ width: 'max-content' }}>
                                            <a
                                                href={`tel:${helpPhoneNumber}`}
                                                className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-20 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300 group"
                                            >
                                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                                                    <Phone className="w-5 h-5 text-red-700" />
                                                </div>
                                                <span className="text-[10px] font-semibold text-gray-700 text-center">Help</span>
                                            </a>

                                            <button
                                                onClick={() => onNavigateToNotifications()}
                                                className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-20 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-yellow-300 transition-all duration-300 group relative"
                                            >
                                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors relative">
                                                    <Bell className="w-5 h-5 text-yellow-700" />
                                                    {/* Notification badge - only show if unread */}
                                                    {hasUnreadNotifications && (
                                                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-semibold text-gray-700 text-center">Notifications</span>
                                            </button>

                                            <button
                                                onClick={() => onNavigateToAI()}
                                                className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-20 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all duration-300 group relative"
                                            >
                                                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-yellow-100 rounded-full flex items-center justify-center group-hover:from-red-200 group-hover:to-yellow-200 transition-colors">
                                                    <Sparkles className="w-5 h-5 text-red-700" />
                                                </div>
                                                <span className="text-[10px] font-semibold text-gray-700 text-center">Ask AI</span>
                                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                                                    TRENDING
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => onNavigateToQuiz()}
                                                className="flex-shrink-0 flex flex-col items-center justify-center gap-1.5 w-20 h-20 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 group relative"
                                            >
                                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                                                    <Book className="w-5 h-5 text-green-700" />
                                                </div>
                                                <span className="text-[10px] font-semibold text-gray-700 text-center">Daily Quiz</span>
                                                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                                                    NEW
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    {showRightArrow && (
                                        <button
                                            onClick={() => {
                                                const container = document.getElementById('quick-actions-scroll');
                                                if (container) container.scrollBy({ left: 100, behavior: 'smooth' });
                                            }}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-md rounded-full p-2 transition-all"
                                        >
                                            <ChevronRight className="w-5 h-5 text-gray-700" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Feature Cards - Grid Layout */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Tools & Resources</h3>
                                    <button
                                        onClick={onNavigateToFeatures}
                                        className="text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
                                    >
                                        View all
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div
                                        onClick={onNavigateToLibrary}
                                        className="bg-gradient-to-br from-red-50 to-yellow-50 rounded-2xl border border-red-100 p-4 hover:shadow-xl hover:shadow-gray-200/50 hover:border-red-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                    >
                                        {/* Background decorative elements */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/20 rounded-full -mr-10 -mt-10"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-yellow-200/20 rounded-full -ml-8 -mb-8"></div>
                                        <div className="absolute top-1/2 right-4 w-12 h-12 bg-red-300/10 rounded-full"></div>

                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                                    <Book className="w-6 h-6 text-red-700" />
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-900">NCERT Books</h3>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-700 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>

                                    <div
                                        onClick={onNavigateToAllClasses}
                                        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-4 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                    >
                                        {/* Background decorative elements */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -mr-10 -mt-10"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-200/20 rounded-full -ml-8 -mb-8"></div>
                                        <div className="absolute top-1/2 right-4 w-12 h-12 bg-blue-300/10 rounded-full"></div>

                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                                    <GraduationCap className="w-6 h-6 text-blue-700" />
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-900">Sample Papers</h3>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>

                                    <div
                                        onClick={onNavigateToMindMap}
                                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-4 hover:shadow-xl hover:shadow-gray-200/50 hover:border-purple-400 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                    >
                                        {/* Background decorative elements */}
                                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-200/20 rounded-full -mr-10 -mt-10"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-200/20 rounded-full -ml-8 -mb-8"></div>
                                        <div className="absolute top-1/2 right-4 w-12 h-12 bg-purple-300/10 rounded-full"></div>

                                        {/* Useful Badge */}
                                        <span className="absolute top-0 right-0 bg-gradient-to-bl from-purple-600 to-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm z-20">
                                            USEFUL
                                        </span>

                                        <div className="relative z-10 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                                    <Network className="w-6 h-6 text-purple-700" />
                                                </div>
                                                <h3 className="text-base font-semibold text-gray-900">Mind Map</h3>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Videos Section */}
                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Videos</h3>
                                    <button
                                        onClick={() => {/* Handle view all videos */ }}
                                        className="text-sm font-semibold text-red-700 hover:text-red-800 transition-colors"
                                    >
                                        View all
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer group">
                                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Educational Videos</h4>
                                        <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                                    </div>
                                    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all cursor-pointer group">
                                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-3 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                                                <svg className="w-8 h-8 text-red-700" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Lecture Series</h4>
                                        <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                                    </div>
                                </div>
                            </div>

                            {/* Our Teachers Section */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Our Teachers</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Teacher 1 */}
                                    <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-red-100 group-hover:border-red-300 transition-colors">
                                            <img
                                                src="img/team-2.png"
                                                alt="Anubhav Sir"
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <h4 className="font-bold text-gray-900 text-sm">Anubhab Sir</h4>
                                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                                        </div>                               
                                    </div>

                                    {/* Teacher 2 */}
                                    <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:shadow-lg transition-all duration-300 group text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-2 border-red-100 group-hover:border-red-300 transition-colors">
                                            <img
                                                src="img/team-1.png"
                                                alt="Anupriya Ma'am"
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <h4 className="font-bold text-gray-900 text-sm">Anupriya Ma'am</h4>
                                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                </div>
            );
        }

        // --- Daily Quiz Component ---
        function DailyQuiz({ onBackToHome, username }) {
            const [currentQuestion, setCurrentQuestion] = useState(0);
            const [selectedAnswer, setSelectedAnswer] = useState(null);
            const [score, setScore] = useState({ correct: 0, wrong: 0 });
            const [showResult, setShowResult] = useState(false);
            const [quizCompleted, setQuizCompleted] = useState(false);
            const [userClass, setUserClass] = useState('');

            // Quiz questions by class (10 questions per class)
            const quizQuestions = {
                9: [
                    { question: "What is the value of π (pi) approximately?", options: ["3.14", "2.71", "1.41", "4.56"], correct: 0 },
                    { question: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], correct: 0 },
                    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
                    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], correct: 1 },
                    { question: "What is 15 × 8?", options: ["100", "120", "110", "130"], correct: 1 },
                    { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: 1 },
                    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
                    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], correct: 2 },
                    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 1 },
                    { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 }
                ],
                10: [
                    { question: "What is the formula for the area of a circle?", options: ["πr²", "2πr", "πd", "r²"], correct: 0 },
                    { question: "What is the chemical formula for glucose?", options: ["C6H12O6", "H2O", "CO2", "NaCl"], correct: 0 },
                    { question: "Who discovered the law of gravity?", options: ["Einstein", "Newton", "Galileo", "Darwin"], correct: 1 },
                    { question: "What is the speed of light in vacuum (approximately)?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correct: 0 },
                    { question: "What is the value of sin(90°)?", options: ["0", "0.5", "1", "√2/2"], correct: 2 },
                    { question: "Which process do plants use to make food?", options: ["Respiration", "Photosynthesis", "Digestion", "Transpiration"], correct: 1 },
                    { question: "What is the atomic number of Carbon?", options: ["4", "5", "6", "7"], correct: 2 },
                    { question: "What is the derivative of x²?", options: ["x", "2x", "x²", "2x²"], correct: 1 },
                    { question: "Which blood group is known as universal donor?", options: ["A", "B", "AB", "O"], correct: 3 },
                    { question: "What is the pH value of pure water?", options: ["5", "6", "7", "8"], correct: 2 }
                ],
                11: [
                    { question: "What is the derivative of eˣ?", options: ["eˣ", "xeˣ", "eˣ/x", "ln(x)"], correct: 0 },
                    { question: "What is the SI unit of force?", options: ["Joule", "Newton", "Watt", "Pascal"], correct: 1 },
                    { question: "What is the chemical symbol for Gold?", options: ["Go", "Gd", "Au", "Ag"], correct: 2 },
                    { question: "What is the value of log₁₀(100)?", options: ["1", "2", "10", "100"], correct: 1 },
                    { question: "Which law states F = ma?", options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Ohm's Law"], correct: 1 },
                    { question: "What is the molecular formula of methane?", options: ["CH4", "C2H6", "C3H8", "CO2"], correct: 0 },
                    { question: "What is the integral of 1/x?", options: ["x", "ln(x)", "1/x²", "x²"], correct: 1 },
                    { question: "Which particle has no charge?", options: ["Proton", "Electron", "Neutron", "Ion"], correct: 2 },
                    { question: "What is the value of tan(45°)?", options: ["0", "1", "√3", "∞"], correct: 1 },
                    { question: "What is Avogadro's number approximately?", options: ["6.022 × 10²³", "6.022 × 10²²", "6.022 × 10²⁴", "6.022 × 10²¹"], correct: 0 }
                ],
                12: [
                    { question: "What is the derivative of ln(x)?", options: ["1/x", "x", "1/ln(x)", "ln(x)/x"], correct: 0 },
                    { question: "What is the speed of light in vacuum?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"], correct: 0 },
                    { question: "What is the chemical formula for benzene?", options: ["C6H6", "C6H12", "C7H8", "C8H10"], correct: 0 },
                    { question: "What is the value of ∫x dx?", options: ["x²", "x²/2", "x", "1"], correct: 1 },
                    { question: "What is Planck's constant (h) approximately?", options: ["6.626 × 10⁻³⁴ J·s", "6.626 × 10⁻³³ J·s", "6.626 × 10⁻³⁵ J·s", "6.626 × 10⁻³² J·s"], correct: 0 },
                    { question: "What is the molecular formula of ethanol?", options: ["CH3OH", "C2H5OH", "C3H7OH", "C4H9OH"], correct: 1 },
                    { question: "What is the limit of (sin x)/x as x approaches 0?", options: ["0", "1", "∞", "undefined"], correct: 1 },
                    { question: "What is the charge of an electron?", options: ["+1.6 × 10⁻¹⁹ C", "-1.6 × 10⁻¹⁹ C", "0", "1.6 × 10⁻¹⁹ C"], correct: 1 },
                    { question: "What is the value of e (Euler's number) approximately?", options: ["2.718", "3.141", "1.414", "1.732"], correct: 0 },
                    { question: "What is the formula for kinetic energy?", options: ["mgh", "½mv²", "mv", "Fd"], correct: 1 }
                ]
            };

            // Get today's date string for unique quiz per day
            const getTodayKey = () => {
                const today = new Date();
                return `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
            };

            // Simple seeded random function for consistent daily quiz
            const seededRandom = (seed) => {
                const x = Math.sin(seed) * 10000;
                return x - Math.floor(x);
            };

            // Shuffle array using seed (for consistent daily order)
            const shuffleWithSeed = (array, seed) => {
                const shuffled = [...array];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(seededRandom(seed + i) * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            };

            // Check if quiz is already completed today
            useEffect(() => {
                const checkQuizStatus = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        if (user) {
                            // Get user class from Firestore
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                const classNum = userData.class || localStorage.getItem('userClass') || '10';
                                setUserClass(classNum);

                                // Check if quiz completed today
                                const todayKey = getTodayKey();
                                const quizData = localStorage.getItem(`quiz_${user.uid}_${todayKey}`);

                                if (quizData) {
                                    const parsed = JSON.parse(quizData);
                                    if (parsed.completed && parsed.questionsCompleted >= 10) {
                                        setQuizCompleted(true);
                                        setScore({ correct: parsed.correct, wrong: parsed.wrong });
                                        setShowResult(true);
                                    }
                                }
                            } else {
                                // Fallback to localStorage
                                const classNum = localStorage.getItem('userClass') || '10';
                                setUserClass(classNum);
                            }
                        } else {
                            // Testing mode - use default class
                            setUserClass('10');
                        }
                    } catch (error) {
                        console.error("Error checking quiz status:", error);
                        setUserClass('10');
                    }
                };

                checkQuizStatus();
            }, []);

            // Get questions for user's class and shuffle them based on today's date for unique daily quiz
            const getQuestions = () => {
                if (!userClass) return quizQuestions[10]; // Default to class 10 if not loaded yet
                const baseQuestions = quizQuestions[userClass] || quizQuestions[10];
                const todayKey = getTodayKey();
                // Create seed from today's date for consistent daily quiz
                const dateSeed = parseInt(todayKey.replace(/-/g, '')) || Date.now();
                return shuffleWithSeed(baseQuestions, dateSeed);
            };

            // Check if user can take quiz today
            const canTakeQuiz = () => {
                const todayKey = getTodayKey();
                const userId = window.firebaseAuth?.currentUser?.uid || 'test_user';
                const quizData = localStorage.getItem(`quiz_${userId}_${todayKey}`);
                if (!quizData) return true;

                const parsed = JSON.parse(quizData);
                return !parsed.completed || parsed.questionsCompleted < 10;
            };

            const handleAnswerSelect = (index) => {
                if (selectedAnswer !== null) return; // Already answered
                setSelectedAnswer(index);
            };

            const handleNext = () => {
                if (selectedAnswer === null) return;

                const questions = getQuestions();
                const todayKey = getTodayKey();
                const userId = window.firebaseAuth?.currentUser?.uid || 'test_user';
                const isCorrect = selectedAnswer === questions[currentQuestion].correct;
                const newScore = {
                    correct: score.correct + (isCorrect ? 1 : 0),
                    wrong: score.wrong + (isCorrect ? 0 : 1)
                };
                setScore(newScore);

                // Save progress
                const quizData = {
                    completed: (currentQuestion + 1) >= questions.length,
                    questionsCompleted: currentQuestion + 1,
                    correct: newScore.correct,
                    wrong: newScore.wrong,
                    date: todayKey
                };
                localStorage.setItem(`quiz_${userId}_${todayKey}`, JSON.stringify(quizData));

                if (currentQuestion + 1 >= questions.length) {
                    setShowResult(true);
                    setQuizCompleted(true);
                } else {
                    setCurrentQuestion(currentQuestion + 1);
                    setSelectedAnswer(null);
                }
            };

            const handleShare = () => {
                const playStoreLink = 'https://play.google.com/store/apps/dev?id=8205647922049206296&hl=en_IN';
                const shareText = `🎯 Daily Quiz Score: ${score.correct}/${score.correct + score.wrong} correct! Test your knowledge with Chaturvedi Classes Daily Quiz!\n\nDownload the best educational app: ${playStoreLink}`;

                if (navigator.share) {
                    navigator.share({
                        title: 'Daily Quiz Score - Chaturvedi Classes',
                        text: shareText,
                        url: playStoreLink
                    }).catch(err => console.log('Error sharing:', err));
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(shareText).then(() => {
                        alert('Score and app link copied to clipboard!');
                    }).catch(() => {
                        // Final fallback
                        const textArea = document.createElement('textarea');
                        textArea.value = shareText;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        alert('Score and app link copied to clipboard!');
                    });
                }
            };

            // If quiz already completed, show report card
            if (quizCompleted && showResult) {
                const totalQuestions = score.correct + score.wrong;
                const percentage = Math.round((score.correct / totalQuestions) * 100);

                return (
                    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                    <div className="flex items-center gap-3 select-none">
                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                            <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                            <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onBackToHome}
                                        className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                    >
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8 text-center">
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Star className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                                        <p className="text-gray-600">Here's your score for today</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 mb-6">
                                        <div className="text-5xl font-bold text-red-700 mb-2">{percentage}%</div>
                                        <div className="text-lg text-gray-700">
                                            <span className="text-green-600 font-semibold">{score.correct}</span> Correct |
                                            <span className="text-red-600 font-semibold"> {score.wrong}</span> Wrong
                                        </div>
                                        <div className="text-sm text-gray-500 mt-2">Out of {totalQuestions} questions</div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleShare}
                                            className="flex-1 bg-red-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-md shadow-red-200 flex items-center justify-center gap-2"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </button>
                                        <button
                                            onClick={onBackToHome}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Go Back
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-4">Come back tomorrow for a new quiz!</p>
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }

            // If can't take quiz, show message
            if (!canTakeQuiz()) {
                return (
                    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                    <div className="flex items-center gap-3 select-none">
                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                            <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                            <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onBackToHome}
                                        className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                    >
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8 text-center">
                                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Bell className="w-8 h-8 text-yellow-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Already Completed!</h2>
                                    <p className="text-gray-600 mb-6">You've already completed today's quiz. Come back tomorrow for a new challenge!</p>
                                    <button
                                        onClick={onBackToHome}
                                        className="bg-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-800 transition-all duration-300"
                                    >
                                        Go Back
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }

            // Show quiz questions
            if (showResult && currentQuestion >= questions.length) {
                const totalQuestions = score.correct + score.wrong;
                const percentage = Math.round((score.correct / totalQuestions) * 100);

                return (
                    <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between items-center h-16">
                                    <div className="flex items-center gap-3 select-none">
                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                            <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                            <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onBackToHome}
                                        className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                    >
                                        <ArrowLeft className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </header>

                        <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8 text-center">
                                    <div className="mb-6">
                                        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Star className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
                                        <p className="text-gray-600">Here's your score</p>
                                    </div>

                                    <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-xl p-6 mb-6">
                                        <div className="text-5xl font-bold text-red-700 mb-2">{percentage}%</div>
                                        <div className="text-lg text-gray-700">
                                            <span className="text-green-600 font-semibold">{score.correct}</span> Correct |
                                            <span className="text-red-600 font-semibold"> {score.wrong}</span> Wrong
                                        </div>
                                        <div className="text-sm text-gray-500 mt-2">Out of {totalQuestions} questions</div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleShare}
                                            className="flex-1 bg-red-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-md shadow-red-200 flex items-center justify-center gap-2"
                                        >
                                            <Share2 className="w-5 h-5" />
                                            Share
                                        </button>
                                        <button
                                            onClick={onBackToHome}
                                            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
                                        >
                                            Go Back
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-4">Come back tomorrow for a new quiz!</p>
                                </div>
                            </div>
                        </main>
                    </div>
                );
            }

            const questions = getQuestions();
            const question = questions[currentQuestion];
            const progress = ((currentQuestion + 1) / questions.length) * 100;

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 md:p-8">
                                {/* Progress Bar */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-gray-700">Question {currentQuestion + 1} of {questions.length}</span>
                                        <span className="text-sm font-semibold text-gray-700">
                                            <span className="text-green-600">{score.correct}</span> ✓ |
                                            <span className="text-red-600"> {score.wrong}</span> ✗
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-gradient-to-r from-red-600 to-yellow-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{question.question}</h2>

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {question.options.map((option, index) => {
                                            const isSelected = selectedAnswer === index;
                                            const isCorrect = index === question.correct;
                                            const showResult = selectedAnswer !== null;

                                            let bgColor = "bg-white border-gray-200 hover:border-red-300";
                                            if (showResult) {
                                                if (isCorrect) {
                                                    bgColor = "bg-green-50 border-green-400";
                                                } else if (isSelected && !isCorrect) {
                                                    bgColor = "bg-red-50 border-red-400";
                                                }
                                            } else if (isSelected) {
                                                bgColor = "bg-red-50 border-red-400";
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(index)}
                                                    disabled={showResult}
                                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${bgColor} ${!showResult ? 'cursor-pointer hover:shadow-md' : 'cursor-default'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium text-gray-900">{option}</span>
                                                        {showResult && isCorrect && (
                                                            <span className="text-green-600 font-bold">✓</span>
                                                        )}
                                                        {showResult && isSelected && !isCorrect && (
                                                            <span className="text-red-600 font-bold">✗</span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Next Button */}
                                {selectedAnswer !== null && (
                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-red-700 text-white py-3 rounded-xl font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-md shadow-red-200"
                                    >
                                        {currentQuestion + 1 >= questions.length ? 'Finish Quiz' : 'Next Question'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // --- AI Chat Component ---
        function AIChat({ onBackToHome }) {
            const [messages, setMessages] = useState([
                { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you with your studies today?' }
            ]);
            const [inputMessage, setInputMessage] = useState('');
            const [isLoading, setIsLoading] = useState(false);

            const handleSend = async () => {
                if (!inputMessage.trim() || isLoading) return;

                const userMessage = { role: 'user', content: inputMessage };
                setMessages(prev => [...prev, userMessage]);
                setInputMessage('');
                setIsLoading(true);

                // TODO: Replace with actual API endpoint
                const API_ENDPOINT = 'YOUR_API_ENDPOINT_HERE';
                const API_KEY = 'AIzaSyB_RQkwhGIVyfI2DbO0yCklWSEyU7ZV_hg';

                try {
                    // Placeholder for API call - replace with actual implementation
                    setTimeout(() => {
                        const aiResponse = {
                            role: 'assistant',
                            content: 'I understand your question. Once you integrate the AI API, I\'ll be able to provide detailed answers to your study questions!'
                        };
                        setMessages(prev => [...prev, aiResponse]);
                        setIsLoading(false);
                    }, 1000);
                } catch (error) {
                    console.error('Error:', error);
                    const errorResponse = {
                        role: 'assistant',
                        content: 'Sorry, I encountered an error. Please try again later.'
                    };
                    setMessages(prev => [...prev, errorResponse]);
                    setIsLoading(false);
                }
            };

            const handleKeyPress = (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            };

            return (
                <div className="h-screen flex flex-col font-sans bg-gray-50 text-gray-900 allow-select overflow-hidden">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm flex-none">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative">
                        <div className="flex-1 overflow-y-auto mb-0 space-y-4 py-4 pb-20">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-white border border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        <p className="text-sm md:text-base whitespace-pre-wrap break-words">{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-3 shadow-sm flex-shrink-0 mt-auto">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your question..."
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!inputMessage.trim() || isLoading}
                                    className="p-2.5 bg-red-700 text-white rounded-xl hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    title="Send"
                                >
                                    <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // --- Notifications Screen ---
        function NotificationsScreen({ onBackToHome }) {
            const [notifications, setNotifications] = useState([]);
            const [isLoading, setIsLoading] = useState(true);
            const [userClass, setUserClass] = useState('');

            useEffect(() => {
                const loadNotifications = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        // Get user class
                        if (user) {
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                setUserClass(userData.class || '');
                            }
                        }

                        // Load notifications from Firestore
                        const notificationsSnapshot = await db.collection('adminNotifications').get();

                        const allNotifications = notificationsSnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));

                        // Filter by user's class or "all"
                        const filteredNotifications = allNotifications.filter(notif =>
                            notif.targetClass === 'all' || notif.targetClass === userClass
                        );

                        // Sort by date (newest first)
                        filteredNotifications.sort((a, b) => {
                            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.seconds * 1000 || 0;
                            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.seconds * 1000 || 0;
                            return bTime - aTime;
                        });

                        setNotifications(filteredNotifications);

                        // Mark as read
                        localStorage.setItem('hasUnreadNotifications', 'false');
                        localStorage.setItem('lastNotificationCheck', Date.now().toString());

                        setIsLoading(false);
                    } catch (error) {
                        console.error('Error loading notifications:', error);
                        setIsLoading(false);
                    }
                };

                loadNotifications();
            }, []);

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading notifications...</p>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="text-center py-12">
                                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg">No notifications yet</p>
                                <p className="text-gray-500 text-sm mt-2">You'll see notifications here when admin posts them</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{notification.title}</h3>
                                        <p className="text-gray-600 mb-3">{notification.message}</p>
                                        {notification.createdAt && (
                                            <p className="text-xs text-gray-400">
                                                {notification.createdAt.toDate ?
                                                    notification.createdAt.toDate().toLocaleDateString() :
                                                    'Recently'}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // --- Location Screen ---
        function LocationScreen({ onBackToHome }) {
            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="w-full" style={{ height: '450px' }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.7909936864025!2d77.7220828!3d22.736008599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397dcf4f083c154b%3A0xa6215fa845fa456!2spradhan%20mantri%20jan%20aushadhi%20kendra!5e0!3m2!1sen!2sin!4v1764523816489!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                            <div className="p-6">
                                <a
                                    href="https://maps.app.goo.gl/a4KxYCngiZKd65Q26"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-red-700 text-white py-3 rounded-xl font-semibold hover:bg-red-800 transition-all duration-300 shadow-md shadow-red-200 flex items-center justify-center gap-2"
                                >
                                    <MapPin className="w-5 h-5" />
                                    Open in Google Maps
                                </a>
                            </div>
                        </div>
                    </main>
                </div>
            );
        }

        // --- All Classes Screen (Sample Papers) ---
        function AllClassesScreen({ onBackToHome }) {
            const [selectedClass, setSelectedClass] = useState('');
            const [userClass, setUserClass] = useState('');
            const [searchQuery, setSearchQuery] = useState("");

            useEffect(() => {
                const loadUserClass = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        if (user) {
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                const classNum = userData.class;
                                if (classNum && [9, 10, 11, 12].includes(parseInt(classNum))) {
                                    setUserClass(classNum);
                                    setSelectedClass(classNum);
                                }
                            } else {
                                // Fallback to localStorage
                                const cachedClass = localStorage.getItem('userClass');
                                if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                    setSelectedClass(cachedClass);
                                }
                            }
                        } else {
                            // Testing mode - check localStorage
                            const cachedClass = localStorage.getItem('userClass');
                            if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                setSelectedClass(cachedClass);
                            }
                        }
                    } catch (error) {
                        console.error("Error loading user class:", error);
                    }
                };

                loadUserClass();
            }, []);

            const samplePapers = {
                9: [
                    { title: "CBSE Sample Paper 2025-26 - Mathematics", subject: "Mathematics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/MathsStandard-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Science", subject: "Science", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/Science-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - English", subject: "English", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/EnglishComm-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Social Science", subject: "Social Science", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/SocialScience-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Hindi A", subject: "Hindi", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/HindiA-SQP.pdf" }
                ],
                10: [
                    { title: "CBSE Sample Paper 2025-26 - Mathematics", subject: "Mathematics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/MathsStandard-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Science", subject: "Science", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/Science-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - English", subject: "English", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/EnglishComm-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Social Science", subject: "Social Science", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/SocialScience-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Hindi A", subject: "Hindi", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/HindiA-SQP.pdf" }
                ],
                11: [
                    { title: "CBSE Sample Paper 2025-26 - Mathematics", subject: "Mathematics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Maths-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Physics", subject: "Physics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Physics-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Chemistry", subject: "Chemistry", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Chemistry-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Biology", subject: "Biology", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Biology-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Hindi Core", subject: "Hindi", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/HindiCore-SQP.pdf" }
                ],
                12: [
                    { title: "CBSE Sample Paper 2025-26 - Mathematics", subject: "Mathematics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Maths-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Physics", subject: "Physics", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Physics-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Chemistry", subject: "Chemistry", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Chemistry-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Biology", subject: "Biology", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Biology-SQP.pdf" },
                    { title: "CBSE Sample Paper 2025-26 - Hindi Core", subject: "Hindi", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/HindiCore-SQP.pdf" }
                ]
            };

            const handleDownload = (paper) => {
                // Open the direct PDF link in the same tab (replacing current page)
                window.location.href = paper.pdfUrl;
            };

            const filteredPapers = samplePapers[selectedClass]?.filter(paper =>
                paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) || [];

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                        <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Class</h2>
                            <div className="flex flex-nowrap overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                {[9, 10, 11, 12].map((cls) => (
                                    <button
                                        key={cls}
                                        onClick={() => setSelectedClass(cls.toString())}
                                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 border ${selectedClass === cls.toString()
                                            ? 'bg-yellow-400 text-red-900 border-yellow-500 shadow-lg shadow-yellow-200 scale-105'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                                            }`}
                                    >
                                        <GraduationCap className={`w-5 h-5 ${selectedClass === cls.toString() ? 'text-red-900' : 'text-gray-400'}`} />
                                        <span className="whitespace-nowrap">Class {cls}th</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedClass && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                            Class {selectedClass} <span className="text-red-700">Sample Papers</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">Download official CBSE sample papers</p>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search papers..."
                                            className="w-full bg-white pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredPapers.map((paper, index) => (
                                        <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                    <FileText className="w-6 h-6 text-blue-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{paper.subject}</h4>
                                                    <p className="text-sm text-gray-600">{paper.title}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(paper)}
                                                className="w-full mt-4 px-4 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download PDF
                                            </button>
                                        </div>
                                    ))}
                                    {filteredPapers.length === 0 && (
                                        <div className="col-span-full text-center py-12 text-gray-500">
                                            No papers found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // --- PYQ Screen (Previous Year Questions) ---
        function PYQScreen({ onBackToHome }) {
            const [selectedClass, setSelectedClass] = useState('');
            const [userClass, setUserClass] = useState('');
            const [searchQuery, setSearchQuery] = useState("");

            useEffect(() => {
                const loadUserClass = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        if (user) {
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                const classNum = userData.class;
                                if (classNum && [9, 10, 11, 12].includes(parseInt(classNum))) {
                                    setUserClass(classNum);
                                    setSelectedClass(classNum);
                                }
                            } else {
                                // Fallback to localStorage
                                const cachedClass = localStorage.getItem('userClass');
                                if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                    setSelectedClass(cachedClass);
                                }
                            }
                        } else {
                            // Testing mode - check localStorage
                            const cachedClass = localStorage.getItem('userClass');
                            if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                setSelectedClass(cachedClass);
                            }
                        }
                    } catch (error) {
                        console.error("Error loading user class:", error);
                    }
                };

                loadUserClass();
            }, []);

            // Placeholder data for PYQs - using sample links
            const pyqData = {
                9: [
                    { title: "Mathematics PYQ 2024", subject: "Mathematics", year: "2024", pdfUrl: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf" },
                    { title: "Science PYQ 2024", subject: "Science", year: "2024", pdfUrl: "https://ncert.nic.in/textbook/pdf/iesc1ps.pdf" },
                    { title: "Mathematics PYQ 2023", subject: "Mathematics", year: "2023", pdfUrl: "https://ncert.nic.in/textbook/pdf/iemh1ps.pdf" },
                    { title: "Science PYQ 2023", subject: "Science", year: "2023", pdfUrl: "https://ncert.nic.in/textbook/pdf/iesc1ps.pdf" },
                    { title: "Hindi PYQ 2023", subject: "Hindi", year: "2023", pdfUrl: "https://ncert.nic.in/textbook/pdf/ihks1ps.pdf" }
                ],
                10: [
                    { title: "Mathematics Standard PYQ 2024", subject: "Mathematics", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/MathsStandard-SQP.pdf" },
                    { title: "Science PYQ 2024", subject: "Science", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/Science-SQP.pdf" },
                    { title: "English PYQ 2024", subject: "English", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/EnglishComm-SQP.pdf" },
                    { title: "Social Science PYQ 2024", subject: "Social Science", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/SocialScience-SQP.pdf" },
                    { title: "Hindi A PYQ 2024", subject: "Hindi", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2024_25/HindiA-SQP.pdf" },
                    { title: "Mathematics Standard PYQ 2023", subject: "Mathematics", year: "2023", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2023_24/MathsStandard-SQP.pdf" },
                    { title: "Science PYQ 2023", subject: "Science", year: "2023", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassX_2023_24/Science-SQP.pdf" }
                ],
                11: [
                    { title: "Mathematics PYQ 2024", subject: "Mathematics", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Maths-SQP.pdf" },
                    { title: "Physics PYQ 2024", subject: "Physics", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Physics-SQP.pdf" },
                    { title: "Chemistry PYQ 2024", subject: "Chemistry", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Chemistry-SQP.pdf" },
                    { title: "Biology PYQ 2024", subject: "Biology", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Biology-SQP.pdf" },
                    { title: "Hindi Core PYQ 2024", subject: "Hindi", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/HindiCore-SQP.pdf" },
                ],
                12: [
                    { title: "Mathematics PYQ 2024", subject: "Mathematics", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Maths-SQP.pdf" },
                    { title: "Physics PYQ 2024", subject: "Physics", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Physics-SQP.pdf" },
                    { title: "Chemistry PYQ 2024", subject: "Chemistry", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Chemistry-SQP.pdf" },
                    { title: "Biology PYQ 2024", subject: "Biology", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/Biology-SQP.pdf" },
                    { title: "Hindi Core PYQ 2024", subject: "Hindi", year: "2024", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2024_25/HindiCore-SQP.pdf" },
                    { title: "Mathematics PYQ 2023", subject: "Mathematics", year: "2023", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Maths-SQP.pdf" },
                    { title: "Physics PYQ 2023", subject: "Physics", year: "2023", pdfUrl: "https://cbseacademic.nic.in/web_material/SQP/ClassXII_2023_24/Physics-SQP.pdf" }
                ]
            };

            const handleDownload = (paper) => {
                // Open the direct PDF link in the same tab
                window.location.href = paper.pdfUrl;
            };

            const filteredPapers = pyqData[selectedClass]?.filter(paper =>
                paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                paper.title.toLowerCase().includes(searchQuery.toLowerCase())
            ) || [];

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                        <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Class</h2>
                            <div className="flex flex-nowrap overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                {[9, 10, 11, 12].map((cls) => (
                                    <button
                                        key={cls}
                                        onClick={() => setSelectedClass(cls.toString())}
                                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 border ${selectedClass === cls.toString()
                                            ? 'bg-yellow-400 text-red-900 border-yellow-500 shadow-lg shadow-yellow-200 scale-105'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                                            }`}
                                    >
                                        <GraduationCap className={`w-5 h-5 ${selectedClass === cls.toString() ? 'text-red-900' : 'text-gray-400'}`} />
                                        <span className="whitespace-nowrap">Class {cls}th</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedClass && (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                            Class {selectedClass} <span className="text-red-700">PYPs</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">Download Previous Year Question Papers</p>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search papers..."
                                            className="w-full bg-white pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredPapers.map((paper, index) => (
                                        <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                                    <FileText className="w-6 h-6 text-green-700" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{paper.subject}</h4>
                                                    <p className="text-sm text-gray-600">{paper.title}</p>
                                                    <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                                                        {paper.year}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(paper)}
                                                className="w-full mt-4 px-4 py-2 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download PDF
                                            </button>
                                        </div>
                                    ))}
                                    {filteredPapers.length === 0 && (
                                        <div className="col-span-full text-center py-12 text-gray-500">
                                            No papers found matching "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // --- AI Study Mind Map Component ---
        function AIStudyMindMap({ onBackToHome }) {
            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full relative h-[calc(100vh-4rem)]">
                        <iframe
                            src="https://aigeneratormind.netlify.app/"
                            className="w-full h-full border-0 absolute inset-0"
                            title="AI Mind Map Generator"
                            allowFullScreen
                        />
                    </main>
                </div>
            );
        }

        // --- All Features Screen ---
        function AllFeatures({ onBackToHome, onNavigateToLibrary, onNavigateToAllClasses, onNavigateToPYQ, onNavigateToMindMap }) {
            const [searchQuery, setSearchQuery] = useState("");

            const features = [
                {
                    id: 'ncert',
                    title: 'NCERT Books',
                    description: 'Access official NCERT textbooks for all classes',
                    icon: Book,
                    colorTheme: {
                        bg: 'from-red-50 to-yellow-50',
                        border: 'border-red-100',
                        hoverBorder: 'hover:border-red-400',
                        iconColor: 'text-red-700',
                        circle1: 'bg-red-200/20',
                        circle2: 'bg-yellow-200/20'
                    },
                    onClick: onNavigateToLibrary
                },
                {
                    id: 'sample_papers',
                    title: 'Sample Papers',
                    description: 'Practice with latest CBSE sample papers',
                    icon: GraduationCap,
                    colorTheme: {
                        bg: 'from-blue-50 to-indigo-50',
                        border: 'border-blue-100',
                        hoverBorder: 'hover:border-blue-400',
                        iconColor: 'text-blue-700',
                        circle1: 'bg-blue-200/20',
                        circle2: 'bg-indigo-200/20'
                    },
                    onClick: onNavigateToAllClasses
                },
                {
                    id: 'pyq',
                    title: 'Previous Year Sample Papers',
                    description: 'Download past year question papers for exam prep',
                    icon: FileText,
                    colorTheme: {
                        bg: 'from-green-50 to-emerald-50',
                        border: 'border-green-100',
                        hoverBorder: 'hover:border-green-400',
                        iconColor: 'text-green-700',
                        circle1: 'bg-green-200/20',
                        circle2: 'bg-emerald-200/20'
                    },
                    onClick: onNavigateToPYQ
                },
                {
                    id: 'mindmap',
                    title: 'AI Study Mind Map',
                    description: 'Generate visual study aids for any topic',
                    icon: Network,
                    colorTheme: {
                        bg: 'from-purple-50 to-pink-50',
                        border: 'border-purple-100',
                        hoverBorder: 'hover:border-purple-400',
                        iconColor: 'text-purple-700',
                        circle1: 'bg-purple-200/20',
                        circle2: 'bg-pink-200/20'
                    },
                    onClick: onNavigateToMindMap
                }
            ];

            const filteredFeatures = features.filter(feature =>
                feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                feature.description.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onBackToHome}
                                    className="p-2 text-gray-600 hover:text-red-700 transition-colors rounded-lg hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Search Bar */}
                        <div className="mb-8 relative max-w-2xl mx-auto">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tools and resources..."
                                className="w-full bg-white pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all shadow-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredFeatures.map((feature) => (
                                <div
                                    key={feature.id}
                                    onClick={feature.onClick}
                                    className={`bg-gradient-to-br ${feature.colorTheme.bg} rounded-2xl border ${feature.colorTheme.border} p-4 hover:shadow-xl hover:shadow-gray-200/50 ${feature.colorTheme.hoverBorder} transition-all duration-300 cursor-pointer group relative overflow-hidden h-full`}
                                >
                                    <div className={`absolute top-0 right-0 w-20 h-20 ${feature.colorTheme.circle1} rounded-full -mr-10 -mt-10`}></div>
                                    <div className={`absolute bottom-0 left-0 w-16 h-16 ${feature.colorTheme.circle2} rounded-full -ml-8 -mb-8`}></div>

                                    <div className="relative z-10 flex items-center justify-between h-full">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                                                <feature.icon className={`w-6 h-6 ${feature.colorTheme.iconColor}`} />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-medium text-gray-900 mb-0.5">{feature.title}</h3>
                                                <p className="text-xs text-gray-600 leading-tight">{feature.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 text-gray-400 group-hover:${feature.colorTheme.iconColor} group-hover:translate-x-1 transition-all flex-shrink-0 ml-2`} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredFeatures.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No tools found matching "{searchQuery}"
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // --- NCERT Library Component (Existing Code - Unchanged) ---
        function NCERTLibrary({ onBackToHome }) {
            const [selectedClass, setSelectedClass] = useState(10);
            const [selectedBook, setSelectedBook] = useState(null);
            const [searchQuery, setSearchQuery] = useState("");

            // Auto-select user's class from profile
            useEffect(() => {
                const loadUserClass = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;
                        const user = auth.currentUser;

                        if (user) {
                            const userDoc = await db.collection("users").doc(user.uid).get();
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                const userClass = userData.class;
                                if (userClass && [9, 10, 11, 12].includes(parseInt(userClass))) {
                                    setSelectedClass(parseInt(userClass));
                                }
                            } else {
                                // Fallback to localStorage
                                const cachedClass = localStorage.getItem('userClass');
                                if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                    setSelectedClass(parseInt(cachedClass));
                                }
                            }
                        } else {
                            // Testing mode - check localStorage
                            const cachedClass = localStorage.getItem('userClass');
                            if (cachedClass && [9, 10, 11, 12].includes(parseInt(cachedClass))) {
                                setSelectedClass(parseInt(cachedClass));
                            }
                        }
                    } catch (error) {
                        console.error("Error loading user class:", error);
                    }
                };

                loadUserClass();
            }, []);

            const getChapterUrl = (bookCode, chapterNum) => {
                const paddedNum = chapterNum.toString().padStart(2, '0');
                return `https://ncert.nic.in/textbook/pdf/${bookCode}${paddedNum}.pdf`;
            };

            const handleClassChange = (cls) => {
                setSelectedClass(cls);
                setSelectedBook(null);
            };

            const filteredBooks = NCERT_DATA[selectedClass].filter(book =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const getChapterCount = (book) => {
                return book.chapters ? book.chapters.length : book.count;
            };

            return (
                <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
                    {/* Header - Optimized for Mobile */}
                    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between items-center h-16">
                                <div className="flex items-center gap-3 select-none">
                                    {/* Logo Area */}
                                    <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
                                        <img src="img/logo.png" alt="Chaturvedi Classes Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg md:text-xl font-bold text-red-900 leading-tight">Chaturvedi <span className="text-yellow-600">Classes</span></h1>
                                        <p className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-wider">EXCELLENCE IN EDUCATION</p>
                                    </div>
                                </div>

                                {/* Desktop Nav */}
                                <div className="hidden md:flex items-center gap-6">
                                    <button
                                        onClick={onBackToHome}
                                        className="text-gray-600 hover:text-red-700 font-medium text-sm transition-colors"
                                    >
                                        Home
                                    </button>
                                </div>

                                {/* Mobile Back Button */}
                                <button
                                    onClick={onBackToHome}
                                    className="md:hidden text-gray-600 hover:text-red-700 transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">

                        {/* Class Selector - Horizontal Scroll on Mobile */}
                        {!selectedBook && (
                            <div className="mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Select Class</h2>
                                <div className="flex flex-nowrap overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                                    {[9, 10, 11, 12].map((cls) => (
                                        <button
                                            key={cls}
                                            onClick={() => handleClassChange(cls)}
                                            className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 border ${selectedClass === cls
                                                ? 'bg-yellow-400 text-red-900 border-yellow-500 shadow-lg shadow-yellow-200 scale-105'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50'
                                                }`}
                                        >
                                            <GraduationCap className={`w-5 h-5 ${selectedClass === cls ? 'text-red-900' : 'text-gray-400'}`} />
                                            <span className="whitespace-nowrap">Class {cls}th</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Content Area */}
                        {!selectedBook ? (
                            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                                {/* Search Bar Area */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                            Class {selectedClass} <span className="text-red-700">Library</span>
                                        </h2>
                                        <p className="text-gray-500 text-sm">Select a subject to begin learning</p>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search subjects..."
                                            className="w-full bg-white pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all shadow-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Books Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {filteredBooks.map((book) => (
                                        <div
                                            key={book.code}
                                            onClick={() => setSelectedBook(book)}
                                            className="group bg-white rounded-2xl border border-gray-200 p-5 md:p-6 hover:shadow-xl hover:shadow-gray-200/50 hover:border-yellow-400 transition-all duration-300 cursor-pointer flex flex-col items-start relative overflow-hidden"
                                        >
                                            {/* Card Content */}
                                            <div className={`p-4 rounded-xl mb-4 ${COLOR_MAP[book.cover]} bg-opacity-30`}>
                                                <Book className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-red-700 transition-colors">{book.title}</h3>
                                            <p className="text-sm text-gray-500 mb-6">{getChapterCount(book)} Chapters</p>

                                            <div className="w-full mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-sm font-semibold text-red-700">
                                                <span>Open Book</span>
                                                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                                {/* Book Header */}
                                <div className="mb-6 md:mb-8">
                                    <button
                                        onClick={() => setSelectedBook(null)}
                                        className="flex items-center gap-2 text-gray-500 hover:text-red-700 mb-4 transition-colors group font-medium"
                                    >
                                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to Library
                                    </button>
                                    <div className="flex items-start justify-between bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{selectedBook.title}</h2>
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">CLASS {selectedClass}</span>
                                                <span className="text-gray-500 text-sm">NCERT Official Edition</span>
                                            </div>
                                        </div>
                                        <div className={`hidden md:block p-4 rounded-xl ${COLOR_MAP[selectedBook.cover]}`}>
                                            <Book className="w-8 h-8" />
                                        </div>
                                    </div>
                                </div>

                                {/* Chapter List */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="divide-y divide-gray-100">
                                        {Array.from({ length: getChapterCount(selectedBook) }, (_, i) => i + 1).map((chapterNum) => {
                                            const url = getChapterUrl(selectedBook.code, chapterNum);

                                            // Check if we have a real name, or fallback to generic
                                            const hasRealName = selectedBook.chapters && selectedBook.chapters[chapterNum - 1];
                                            const chapterName = hasRealName
                                                ? selectedBook.chapters[chapterNum - 1]
                                                : `Chapter ${chapterNum}`;

                                            return (
                                                <div key={chapterNum} className="p-4 md:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                                                    <div className="flex items-start md:items-center gap-4">
                                                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-lg group-hover:bg-yellow-400 group-hover:text-red-900 transition-all duration-300">
                                                            {chapterNum}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-base md:text-lg font-bold text-gray-800 group-hover:text-red-700 transition-colors">
                                                                {chapterName}
                                                            </h4>
                                                            {/* Subtitle logic: Show nothing if we don't have a real name (to avoid 'PDF Document' clutter) */}
                                                            {hasRealName && (
                                                                <p className="text-xs md:text-sm text-gray-400 mt-1">
                                                                    Chapter {chapterNum}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons - Stacked on Mobile, Row on Desktop */}
                                                    <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-0 w-full md:w-auto">
                                                        <a
                                                            href={url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:border-red-600 hover:text-red-700 transition-all"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            View
                                                        </a>
                                                        <a
                                                            href={url}
                                                            download={`Class-${selectedClass}-${selectedBook.title}-Ch-${chapterNum}.pdf`}
                                                            
                                                            rel="noreferrer"
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-700 text-white rounded-lg text-sm font-semibold hover:bg-red-800 transition-all shadow-md shadow-red-200"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            );
        }

        // --- Push Notification Logic ---
        const initializePushNotifications = async (userId, forceRequest = false) => {
            if (!window.firebaseMessaging) {
                console.log('Firebase Messaging not available');
                return false;
            }

            try {
                const messaging = window.firebaseMessaging;

                // Check current permission status
                let permission = Notification.permission;

                // If permission is default (not asked yet) or forceRequest is true, request permission
                if (permission === 'default' || forceRequest) {
                    console.log('Requesting notification permission...');
                    permission = await Notification.requestPermission();
                }

                if (permission === 'granted') {
                    console.log('✅ Notification permission granted.');
                    localStorage.setItem('notificationPermission', 'granted');

                    // Get Token
                    const token = await messaging.getToken({
                        vapidKey: 'BJCYS5m8FycB44kLL9BHrwaFmL5BPm2eGLtCnaJ7MR1gNA2x6Mp1ZNC9xNXUssmTtxLGM2trs6W25XDJryLu7E0'
                    });

                    if (token) {
                        console.log('FCM Token:', token);
                        // Save token to Realtime Database
                        const rtdb = window.firebaseRtdb;
                        await rtdb.ref(`fcmTokens/${userId}/token`).set(token);

                        // Also save a timestamp
                        await rtdb.ref(`fcmTokens/${userId}/lastUpdated`).set(firebase.database.ServerValue.TIMESTAMP);

                        // Save to Firestore as well
                        const db = window.firebaseDb;
                        if (db && userId) {
                             await db.collection("users").doc(userId).set({
                                 fcmToken: token
                             }, { merge: true });
                             console.log("✅ FCM Token saved to Firestore");
                        }

                        return true;
                    } else {
                        console.log('No registration token available.');
                        return false;
                    }
                } else if (permission === 'denied') {
                    console.log('❌ Notification permission denied.');
                    localStorage.setItem('notificationPermission', 'denied');
                    return false;
                } else {
                    console.log('⚠️ Notification permission not granted yet.');
                    localStorage.setItem('notificationPermission', 'default');
                    return false;
                }
            } catch (error) {
                console.error('An error occurred while setting up notifications:', error);
                return false;
            }
        };

        // Function to check notification permission status
        const checkNotificationPermission = () => {
            if (!('Notification' in window)) {
                return 'unsupported';
            }
            return Notification.permission;
        };

        // --- Main App Component (Router) ---
        // 🔧 TESTING MODE: Set to false to enable login page, true to skip login
        const DISABLE_LOGIN_FOR_TESTING = false;

        function App() {
            const [currentView, setCurrentView] = useState(DISABLE_LOGIN_FOR_TESTING ? 'home' : 'login'); // 'login', 'home', 'library', 'profile', 'quiz', 'ai', 'features', 'location', 'notifications', 'allclasses', 'pyq', 'mindmap'
            const [username, setUsername] = useState(DISABLE_LOGIN_FOR_TESTING ? 'Test User' : '');
            const [isCheckingAuth, setIsCheckingAuth] = useState(!DISABLE_LOGIN_FOR_TESTING);

            // Handle mobile back button - navigate to home if not on home/login
            useEffect(() => {
                const handleBackButton = () => {
                    if (currentView !== 'home' && currentView !== 'login') {
                        setCurrentView('home');
                    }
                };

                // Listen for popstate (back button)
                window.addEventListener('popstate', handleBackButton);

                // Push state to enable back button detection
                window.history.pushState(null, '', window.location.href);

                return () => {
                    window.removeEventListener('popstate', handleBackButton);
                };
            }, [currentView]);

            // Check authentication state on mount
            useEffect(() => {
                // Skip auth check if login is disabled for testing
                if (DISABLE_LOGIN_FOR_TESTING) {
                    setIsCheckingAuth(false);
                    return;
                }

                const checkAuthState = async () => {
                    try {
                        const auth = window.firebaseAuth;
                        const db = window.firebaseDb;

                        // Unified Auth Handler
                        const handleAuthUser = async (user, type) => {
                            // User is signed in - use cached data first (fast)
                            const cachedUsername = localStorage.getItem('username');
                            // Handle both Firebase (uid) and Supabase (id) user objects
                            const userId = user.uid || user.id;
                            const displayName = cachedUsername || user.email?.split('@')[0] || 'User';

                            // Initialize Push Notifications
                            initializePushNotifications(userId);

                            // Update UI immediately with cached data
                            setUsername(displayName);
                            setCurrentView('home');
                            setIsCheckingAuth(false);

                            // Fetch fresh data from Firestore in background (non-blocking)
                            try {
                                const userDoc = await db.collection("users").doc(userId).get();
                                if (userDoc.exists) {
                                    const userData = userDoc.data();
                                    const fetchedName = userData.name || displayName;

                                    // Update if different
                                    if (fetchedName !== displayName) {
                                        localStorage.setItem('username', fetchedName);
                                        setUsername(fetchedName);
                                    }
                                    console.log(`✅ User data fetched from Firestore (${type}):`, userData);
                                } else {
                                    // Create user doc in background if doesn't exist
                                    const newUserData = {
                                        email: user.email || '',
                                        username: displayName,
                                        displayName: displayName,
                                        phone: user.phone || user.phoneNumber || '',
                                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                                    };

                                    db.collection("users").doc(userId).set(newUserData)
                                        .then(() => {
                                            console.log(`✅ User doc created in Firestore (${type}):`, userId);
                                        })
                                        .catch(err => {
                                            console.error("❌ Error creating user doc:", err);
                                        });
                                }
                            } catch (err) {
                                console.error("❌ Error fetching user data from Firestore:", err);
                            }
                        };

                        // Listen to Firebase Auth
                        firebase.auth().onAuthStateChanged(async (firebaseUser) => {
                            if (firebaseUser) {
                                await handleAuthUser(firebaseUser, 'firebase');
                            } else {
                                // Check Supabase Session if Firebase is null
                                const { data: { session } } = await window.supabaseClient.auth.getSession();
                                if (session?.user) {
                                    await handleAuthUser(session.user, 'supabase');
                                } else {
                                    // Really logged out
                                    setUsername('');
                                    setCurrentView('login');
                                    localStorage.removeItem('username');
                                    localStorage.removeItem('userEmail');
                                    localStorage.removeItem('userId');
                                    setIsCheckingAuth(false);
                                }
                            }
                        });

                    } catch (error) {
                        console.error("Error checking auth state:", error);
                        setIsCheckingAuth(false);
                        // Fallback to localStorage
                        const savedUsername = localStorage.getItem('username');
                        if (savedUsername) {
                            setUsername(savedUsername);
                            setCurrentView('home');
                        }
                    }
                };

                // Wait for Firebase to be ready
                if (window.firebaseAuth) {
                    checkAuthState();
                } else {
                    // Wait a bit for Firebase to load
                    setTimeout(checkAuthState, 500);
                }
            }, []);

            // Internet connection detection
            useEffect(() => {
                // Save current URL to localStorage
                const saveCurrentUrl = () => {
                    const currentUrl = window.location.pathname.split('/').pop() || 'index.html';
                    localStorage.setItem('lastVisitedUrl', currentUrl);
                };

                // Check internet connectivity
                const checkInternet = async () => {
                    try {
                        const response = await fetch('https://www.google.com/favicon.ico?' + new Date().getTime(), {
                            method: 'HEAD',
                            mode: 'no-cors',
                            cache: 'no-cache'
                        });
                        return true;
                    } catch (error) {
                        return navigator.onLine;
                    }
                };

                // Handle offline event
                const handleOffline = async () => {
                    // Double check with actual fetch
                    const hasInternet = await checkInternet();
                    if (!hasInternet) {
                        saveCurrentUrl();
                        window.location.href = 'offline.html';
                    }
                };

                // Periodic check (every 5 seconds)
                const intervalCheck = setInterval(async () => {
                    if (!navigator.onLine) {
                        const hasInternet = await checkInternet();
                        if (!hasInternet) {
                            saveCurrentUrl();
                            window.location.href = 'offline.html';
                        }
                    }
                }, 5000);

                // Save URL on page load and navigation
                saveCurrentUrl();
                window.addEventListener('beforeunload', saveCurrentUrl);
                window.addEventListener('offline', handleOffline);

                return () => {
                    clearInterval(intervalCheck);
                    window.removeEventListener('beforeunload', saveCurrentUrl);
                    window.removeEventListener('offline', handleOffline);
                };
            }, []);

            const handleLogin = (user, isNewUser = false) => {
                setUsername(user);
                localStorage.setItem('username', user);

                // Request notification permissions for logged-in users
                const auth = window.firebaseAuth;
                const currentUser = auth?.currentUser;
                if (currentUser) {
                    // Request notification permission (non-blocking)
                    initializePushNotifications(currentUser.uid).catch(err => {
                        console.log('Notification setup will be retried:', err);
                    });
                }

                // If new user, redirect to profile page
                if (isNewUser) {
                    setCurrentView('profile');
                } else {
                    setCurrentView('home');
                }
            };

            const handleLogout = async () => {
                try {
                    await firebase.auth().signOut();
                    await window.supabaseClient.auth.signOut();

                    setUsername('');
                    setCurrentView('login');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userId');
                } catch (error) {
                    console.error("Error signing out:", error);
                    // Still logout locally even if signout fails
                    setUsername('');
                    setCurrentView('login');
                    localStorage.removeItem('username');
                    localStorage.removeItem('userEmail');
                    localStorage.removeItem('userId');
                }
            };

            const handleNavigateToLibrary = () => {
                setCurrentView('library');
            };

            const handleBackToHome = () => {
                setCurrentView('home');
            };

            const handleNavigateToProfile = () => {
                setCurrentView('profile');
            };

            const handleNavigateToQuiz = () => {
                setCurrentView('quiz');
            };

            const handleNavigateToAI = () => {
                setCurrentView('ai');
            };

            const handleNavigateToFeatures = () => {
                setCurrentView('features');
            };

            const handleNavigateToLocation = () => {
                setCurrentView('location');
            };

            const handleNavigateToNotifications = () => {
                setCurrentView('notifications');
            };

            const handleNavigateToAllClasses = () => {
                setCurrentView('allclasses');
            };

            const handleNavigateToPYQ = () => {
                setCurrentView('pyq');
            };

            const handleNavigateToMindMap = () => {
                setCurrentView('mindmap');
            };

            // Show loading while checking authentication
            if (isCheckingAuth) {
                return (
                    <div className="min-h-screen flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="w-12 h-12 border-4 border-red-700 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading...</p>
                        </div>
                    </div>
                );
            }

            // Render based on current view
            if (currentView === 'login') {
                return <LoginPage onLogin={handleLogin} />;
            } else if (currentView === 'home') {
                return <HomePage onNavigateToLibrary={handleNavigateToLibrary} username={username} onLogout={handleLogout} onNavigateToProfile={handleNavigateToProfile} onNavigateToQuiz={handleNavigateToQuiz} onNavigateToAI={handleNavigateToAI} onNavigateToFeatures={handleNavigateToFeatures} onNavigateToLocation={handleNavigateToLocation} onNavigateToNotifications={handleNavigateToNotifications} onNavigateToAllClasses={handleNavigateToAllClasses} onNavigateToPYQ={handleNavigateToPYQ} onNavigateToMindMap={handleNavigateToMindMap} />;
            } else if (currentView === 'library') {
                return <NCERTLibrary onBackToHome={handleBackToHome} />;
            } else if (currentView === 'profile') {
                return <ProfileEditPage onBackToHome={handleBackToHome} username={username} onUsernameUpdate={setUsername} />;
            } else if (currentView === 'quiz') {
                return <DailyQuiz onBackToHome={handleBackToHome} username={username} />;
            } else if (currentView === 'ai') {
                return <AIChat onBackToHome={handleBackToHome} />;
            } else if (currentView === 'features') {
                return <AllFeatures onBackToHome={handleBackToHome} onNavigateToLibrary={handleNavigateToLibrary} onNavigateToAllClasses={handleNavigateToAllClasses} onNavigateToPYQ={handleNavigateToPYQ} onNavigateToMindMap={handleNavigateToMindMap} />;
            } else if (currentView === 'location') {
                return <LocationScreen onBackToHome={handleBackToHome} />;
            } else if (currentView === 'notifications') {
                return <NotificationsScreen onBackToHome={handleBackToHome} />;
            } else if (currentView === 'allclasses') {
                return <AllClassesScreen onBackToHome={handleBackToHome} />;
            } else if (currentView === 'pyq') {
                return <PYQScreen onBackToHome={handleBackToHome} />;
            } else if (currentView === 'mindmap') {
                return <AIStudyMindMap onBackToHome={handleBackToHome} />;
            }

            return null;
        }

        // Standard React initialization block
        const rootElement = document.getElementById('root');
        const root = ReactDOM.createRoot(rootElement);
        root.render(<App />);
