/**
 * Development optimization utility
 * Helps reduce unnecessary re-renders and rebuilds during development
 */

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Debounce frequently fired events
  let resizeTimer: NodeJS.Timeout;
  const originalAddEventListener = window.addEventListener;
  
  window.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
    if (type === 'resize') {
      const debouncedListener = (event: Event) => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (typeof listener === 'function') {
            listener(event);
          } else if (listener && typeof listener.handleEvent === 'function') {
            listener.handleEvent(event);
          }
        }, 100);
      };
      return originalAddEventListener.call(this, type, debouncedListener, options);
    }
    
    return originalAddEventListener.call(this, type, listener, options);
  };

  // Prevent excessive logging during development
  const logCounts = new Map<string, number>();
  const originalLog = console.log;
  
  console.log = (...args) => {
    const message = args.join(' ');
    const count = logCounts.get(message) || 0;
    
    // Only log the first 3 occurrences of the same message per minute
    if (count < 3) {
      logCounts.set(message, count + 1);
      originalLog(...args);
      
      // Reset count after 1 minute
      setTimeout(() => {
        logCounts.delete(message);
      }, 60000);
    }
  };
}

export {};
