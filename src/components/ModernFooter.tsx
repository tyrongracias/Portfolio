import { useEffect, useState } from 'react';

interface ModernFooterProps {
  isDarkMode: boolean;
}

export default function ModernFooter({ isDarkMode }: ModernFooterProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Dubai'
      };
      
      const dateOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        timeZone: 'Asia/Dubai'
      };
      
      setCurrentTime(now.toLocaleTimeString('en-US', timeOptions));
      setCurrentDate(`LAST UPDATED ${now.toLocaleDateString('en-US', dateOptions).toUpperCase()}`);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`py-6 px-6 lg:px-8 border-t transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-black border-white/10' 
        : 'bg-white border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Left Side - Title and Skills */}
          <div className="flex flex-col">
            <h3 className={`text-sm lg:text-base font-medium mb-1 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: '"Doto", sans-serif' }}>
              DIGITAL PRODUCT DESIGNER CURRENTLY BASED IN DUBAI, UAE
            </h3>
            <p className={`text-xs lg:text-sm ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: '"Doto", sans-serif' }}>
              UX, UI, WEB, INTERACTION, MOTION, VISUAL
            </p>
          </div>

          {/* Right Side - Location and Time */}
          <div className="flex flex-col lg:items-end">
            <p className={`text-sm lg:text-base font-medium ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: '"Doto", sans-serif' }}>
              DUBAI, UAE — {currentTime}
            </p>
            <p className={`text-xs lg:text-sm ${
              isDarkMode ? 'text-white' : 'text-black'
            }`} style={{ fontFamily: '"Doto", sans-serif' }}>
              {currentDate || 'LAST UPDATED NOV 2025'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}