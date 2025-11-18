import { useState, useEffect } from 'react';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeedCard from './FeedCard';
import CreatePostModal from './CreatePostModal';
import { useFeedStore } from '../stores/feedStore';

interface FeedProps {
  isProfileFeed?: boolean;
  userId?: string;
}

export default function Feed({ isProfileFeed = false, userId }: FeedProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { posts, loadMorePosts, isLoading } = useFeedStore();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMorePosts]);

  const filteredPosts = isProfileFeed && userId ? posts.filter((post) => post.userId === userId) : posts;

  return (
    <div className="animate-on-scroll space-y-6">
      {filteredPosts.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}

      {isLoading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-card p-6 animate-pulse border border-border">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/6"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Create Post Button */}
      <Button
        size="lg"
        className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg bg-primary text-primary-foreground hover:bg-primary-hover z-40"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <PlusIcon className="w-6 h-6" />
      </Button>

      <CreatePostModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
