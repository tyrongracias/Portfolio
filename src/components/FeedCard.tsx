import { useState } from 'react';
import { HeartIcon, MessageCircleIcon, Share2Icon, BookmarkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

interface FeedCardProps {
  post: Post;
}

export default function FeedCard({ post }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <Card className="bg-card border-border rounded-card shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${post.userId}`}>
            <Avatar className="w-12 h-12 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src={post.userAvatar} alt={post.userName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {post.userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link to={`/profile/${post.userId}`}>
              <h3 className="text-body font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {post.userName}
              </h3>
            </Link>
            <p className="text-small text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-body text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-lg object-cover"
            loading="lazy"
          />
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            className={`text-foreground hover:text-primary hover:bg-muted ${
              isLiked ? 'text-error' : ''
            }`}
            onClick={handleLike}
          >
            <HeartIcon className={`w-5 h-5 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-small">{likesCount}</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-muted">
            <MessageCircleIcon className="w-5 h-5 mr-2" />
            <span className="text-small">{post.comments}</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-foreground hover:text-primary hover:bg-muted">
            <Share2Icon className="w-5 h-5 mr-2" />
            <span className="text-small">{post.shares}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`text-foreground hover:text-primary hover:bg-muted ${
              isSaved ? 'text-primary' : ''
            }`}
            onClick={() => setIsSaved(!isSaved)}
          >
            <BookmarkIcon className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
