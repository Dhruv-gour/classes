        // --- Global Theme System ---
        const THEME = {
            // Backgrounds
            background: "bg-gray-50 dark:bg-gray-900",
            surface: "bg-white dark:bg-gray-800",
            surfaceHighlight: "bg-gray-100 dark:bg-gray-700",
            
            // Text
            textPrimary: "text-gray-900 dark:text-gray-100",
            textSecondary: "text-gray-600 dark:text-gray-300",
            textMuted: "text-gray-500 dark:text-gray-400",
            textInvert: "text-white", // Always white (e.g., on red buttons)

            // Borders
            border: "border-gray-200 dark:border-gray-700",
            borderHighlight: "border-gray-300 dark:border-gray-600",
            divider: "divide-gray-200 dark:divide-gray-700",
            
            // Brand / Primary
            brandPrimary: "text-red-900 dark:text-red-400",
            brandSecondary: "text-yellow-600 dark:text-yellow-500",
            primaryBg: "bg-red-700 hover:bg-red-800", // Buttons
            primaryText: "text-red-700 dark:text-red-400", // Links, icons
            
            // Indicators
            indicatorActive: "bg-red-600 dark:bg-red-500",
            indicatorInactive: "bg-gray-300 dark:bg-gray-600",
            
            // Inputs
            inputBg: "bg-white dark:bg-gray-900",
            inputBorder: "border-gray-200 dark:border-gray-700",
            inputText: "text-gray-900 dark:text-gray-100",
            inputPlaceholder: "placeholder-gray-400",
        };

        const ThemeContext = React.createContext();

        const ThemeProvider = ({ children }) => {
            const [theme, setTheme] = useState('light');
            const [isLoaded, setIsLoaded] = useState(false);

            useEffect(() => {
                // 1. Load from storage
                const storedTheme = localStorage.getItem('theme');
                
                if (storedTheme) {
                    setTheme(storedTheme);
                } else {
                    // 2. Fallback to system preference
                    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    const defaultTheme = systemPrefersDark ? 'dark' : 'light';
                    setTheme(defaultTheme);
                    localStorage.setItem('theme', defaultTheme);
                }
                setIsLoaded(true);
            }, []);

            useEffect(() => {
                if (!isLoaded) return;
                
                const root = document.documentElement;
                if (theme === 'dark') {
                    root.classList.add('dark');
                    document.body.classList.add('dark-mode');
                } else {
                    root.classList.remove('dark');
                    document.body.classList.remove('dark-mode');
                }
                localStorage.setItem('theme', theme);
            }, [theme, isLoaded]);

            const toggleTheme = () => {
                setTheme(prev => prev === 'light' ? 'dark' : 'light');
            };

            const setMode = (mode) => {
                setTheme(mode);
            };

            // Don't render until theme is loaded to prevent flash
            if (!isLoaded) return null;

            return (
                <ThemeContext.Provider value={{ theme, toggleTheme, setMode, classes: THEME }}>
                    {children}
                </ThemeContext.Provider>
            );
        };

        const useTheme = () => {
            const context = React.useContext(ThemeContext);
            if (!context) {
                throw new Error('useTheme must be used within a ThemeProvider');
            }
            return context;
        };
