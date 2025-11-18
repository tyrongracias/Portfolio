import { colors } from './colors';

// Centralized button styling system
export const buttonStyles = {
  // Base styles for all buttons
  base: 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 border-0',
  
  // Size variants
  sizes: {
    sm: 'px-4 py-2 text-sm h-[36px]',
    md: 'px-6 py-3 text-base h-[44px]',
    lg: 'px-8 py-4 text-lg h-[54px]',  // Our standard size
    xl: 'px-10 py-5 text-xl h-[64px]'
  },
  
  // Button variants for different use cases
  variants: {
    // Primary CTA buttons
    primary: (isDarkMode: boolean) => ({
      light: `bg-black text-white hover:bg-[${colors.primary}] hover:text-black hover:scale-105`,
      dark: `bg-white text-black hover:bg-[${colors.primary}] hover:text-black hover:scale-105`
    }[isDarkMode ? 'dark' : 'light']),
    
    // Secondary buttons
    secondary: (isDarkMode: boolean) => ({
      light: `bg-black text-white border border-black hover:bg-[${colors.primary}] hover:text-black hover:border-[${colors.primary}]`,
      dark: `bg-white text-black border border-white hover:bg-[${colors.primary}] hover:text-black hover:border-[${colors.primary}]`
    }[isDarkMode ? 'dark' : 'light']),
    
    // Accent buttons (teal background)
    accent: (_isDarkMode: boolean) => `bg-[${colors.primary}] text-black hover:opacity-90 shadow-xl`,
    
    // Outline buttons
    outline: (isDarkMode: boolean) => ({
      light: `border-2 border-black text-black hover:bg-black hover:text-white`,
      dark: `border-2 border-white text-white hover:bg-white hover:text-black`
    }[isDarkMode ? 'dark' : 'light']),
    
    // Ghost/transparent buttons
    ghost: (isDarkMode: boolean) => ({
      light: `text-black hover:bg-black/10`,
      dark: `text-white hover:bg-white/10`
    }[isDarkMode ? 'dark' : 'light'])
  }
};

// Helper function to generate complete button className
export const getButtonClass = (
  variant: keyof typeof buttonStyles.variants,
  size: keyof typeof buttonStyles.sizes = 'lg',
  isDarkMode: boolean = false,
  additionalClasses: string = ''
): string => {
  return [
    buttonStyles.base,
    buttonStyles.sizes[size],
    buttonStyles.variants[variant](isDarkMode),
    additionalClasses
  ].join(' ');
};

// Text color system for headings and accents
export const textColors = {
  // For headings and important text
  accent: (isDarkMode: boolean) => ({
    light: '#334155', // Slate grey dark for light mode
    dark: colors.primary // Teal works well on dark backgrounds
  }[isDarkMode ? 'dark' : 'light']),
  
  // For less important accents
  muted: (isDarkMode: boolean) => ({
    light: '#4a5568', // Medium gray
    dark: '#a0aec0'   // Light gray
  }[isDarkMode ? 'dark' : 'light'])
};