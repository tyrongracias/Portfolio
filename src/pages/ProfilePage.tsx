import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import Feed from '../components/Feed';
import Footer from '../components/Footer';

interface ProfilePageProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function ProfilePage({ isDarkMode, setIsDarkMode }: ProfilePageProps) {
  const { id } = useParams();
  // navigate removed — not used yet

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-20 transition-colors duration-300 ${
      isDarkMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <ProfileHeader userId={id || '1'} />
      <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Feed isProfileFeed userId={id} />
      </main>
      <Footer />
    </div>
  );
}
