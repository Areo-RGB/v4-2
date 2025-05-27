/**
 * Error suppression utility for development mode
 * Suppresses known HLS and video loading errors that occur during development
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Store original console methods
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // List of error patterns to suppress
  const suppressedErrorPatterns = [
    /Failed to read the 'responseText' property from 'XMLHttpRequest'/,
    /InvalidStateError.*responseText.*arraybuffer/,
    /SyntaxError.*Unexpected token.*DOCTYPE/,
    /NetworkError when attempting to fetch resource/,
    /ERR_INTERNET_DISCONNECTED/,
    // Add more patterns as needed
  ];

  // Override console.error to filter out known development errors
  console.error = (...args) => {
    const errorMessage = args.join(' ');
    
    // Check if this error should be suppressed
    const shouldSuppress = suppressedErrorPatterns.some(pattern => 
      pattern.test(errorMessage)
    );

    if (!shouldSuppress) {
      originalConsoleError(...args);
    }
  };

  // Override console.warn for warnings we want to suppress
  console.warn = (...args) => {
    const warnMessage = args.join(' ');
    
    // Suppress specific development warnings
    if (warnMessage.includes('HLS playlist request failed') ||
        warnMessage.includes('Received HTML instead of expected JSON')) {
      return;
    }
    
    originalConsoleWarn(...args);
  };

  // Add global error handler for unhandled XMLHttpRequest errors
  window.addEventListener('error', (event) => {
    if (event.message && 
        (event.message.includes('XMLHttpRequest') || 
         event.message.includes('responseText') ||
         event.message.includes('arraybuffer'))) {
      event.preventDefault();
      return false;
    }
  });

  // Add unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && 
        typeof event.reason === 'string' &&
        (event.reason.includes('XMLHttpRequest') ||
         event.reason.includes('responseText'))) {
      event.preventDefault();
      return false;
    }
  });
}

export {};
