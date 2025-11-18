// Centralized color system for the portfolio
export const colors = {
  // Primary brand color
  primary: '#00fcd2',
  
  // Theme colors
  light: {
    background: '#ffffff',
    foreground: '#000000',
    muted: '#6b7280',
  },
  
  dark: {
    background: '#000000',
    foreground: '#ffffff', 
    muted: '#9ca3af',
  },
  
  // Additional colors
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
} as const;

// CSS variable helper
export const getCSSVariable = (colorKey: keyof typeof colors) => {
  return `var(--color-${colorKey})`;
};