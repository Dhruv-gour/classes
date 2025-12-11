        // Lock orientation to portrait
        function lockOrientation() {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('portrait').catch((err) => {
                    console.log('Orientation lock failed:', err);
                });
            } else if (screen.lockOrientation) {
                screen.lockOrientation('portrait');
            } else if (screen.mozLockOrientation) {
                screen.mozLockOrientation('portrait');
            } else if (screen.msLockOrientation) {
                screen.msLockOrientation('portrait');
            }
        }

        // Try to lock on load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', lockOrientation);
        } else {
            lockOrientation();
        }

        // Also try on orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(lockOrientation, 100);
        });
        // Global restriction script
        const preventDefault = (e) => {
            // Allow interaction with inputs and textareas
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
                return true;
            }
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // Disable right-click context menu (allow for inputs if needed, or keep disabled)
        // Usually right click on input is useful for paste, so let's allow it for inputs
        document.addEventListener('contextmenu', preventDefault, true);

        // Disable text selection
        document.addEventListener('selectstart', preventDefault, true);

        // Smart selection change handling
        document.addEventListener('selectionchange', () => {
            const active = document.activeElement;
            const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);

            if (!isInput && window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        }, true);

        // Disable copy, cut, paste but allow for inputs
        document.addEventListener('copy', preventDefault, true);
        document.addEventListener('cut', preventDefault, true);
        document.addEventListener('paste', preventDefault, true);

        // Disable drag and drop
        document.addEventListener('dragstart', preventDefault, true);
        document.addEventListener('drop', preventDefault, true);

        // Prevent long press on mobile
        window.oncontextmenu = (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable) {
                return true;
            }
            event.preventDefault();
            event.stopPropagation();
            return false;
        };

        // Add touch listeners to prevent long-press text selection on mobile
        document.addEventListener('touchstart', function (e) {
            if (e.touches.length > 1) {
                // Prevent multi-touch pinch/zoom if needed, but primarily focusing on selection
                // e.preventDefault(); 
            }
        }, { passive: false });

        // Force select-none in CSS via JS to be sure
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
            * {
                -webkit-touch-callout: none !important; /* iOS Safari */
                -webkit-user-select: none !important; /* Safari */
                -khtml-user-select: none !important; /* Konqueror HTML */
                -moz-user-select: none !important; /* Old versions of Firefox */
                -ms-user-select: none !important; /* Internet Explorer/Edge */
                user-select: none !important; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
            }
            input, textarea {
                -webkit-user-select: auto !important;
                user-select: auto !important;
            }
        `;
        document.head.appendChild(style);
