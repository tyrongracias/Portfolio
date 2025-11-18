import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import Feed from '../components/Feed';
import Footer from '../components/Footer';

export default function ProfilePage() {
  const { id } = useParams();
  // navigate removed — not used yet

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ProfileHeader userId={id || '1'} />
      <main className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Feed isProfileFeed userId={id} />
      </main>
      <Footer />
    </div>
  );
}
