import { useState } from 'react';
import { MessageCircleIcon, UserPlusIcon, CoinsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileHeaderProps {
  userId: string;
}

export default function ProfileHeader({ userId: _userId }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock profile data
  const profile = {
    name: 'John Doe',
    handle: '@johndoe',
    avatar: 'https://placehold.co/200x200',
    banner: 'https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_3.png',
    bio: 'Creator, entrepreneur, and blockchain enthusiast. Building the future of the creator economy.',
    followers: '125K',
    following: '342',
    posts: '1.2K',
    tokenValue: '$2.45',
    tokenChange: '+12.5%',
  };

  return (
    <div className="animate-on-scroll">
      {/* Banner */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img
          src={profile.banner}
          alt="Profile banner"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      {/* Profile Info */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
          <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-h2">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-h3 sm:text-h2 font-semibold text-foreground">{profile.name}</h1>
            <p className="text-body text-muted-foreground">{profile.handle}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className={`${
                isFollowing
                  ? 'bg-secondary text-secondary-foreground border border-border hover:bg-muted'
                  : 'bg-primary text-primary-foreground hover:bg-primary-hover'
              } rounded-badge font-normal`}
              onClick={() => setIsFollowing(!isFollowing)}
            >
              <UserPlusIcon className="w-5 h-5 mr-2" />
              {isFollowing ? 'Following' : 'Follow'}
            </Button>

            <Button className="bg-secondary text-secondary-foreground border border-border hover:bg-muted rounded-badge font-normal">
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              Message
            </Button>

            <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-badge font-normal">
              <CoinsIcon className="w-5 h-5 mr-2" />
              Tip Token
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-body text-foreground max-w-2xl">{profile.bio}</p>

          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-h4 font-semibold text-foreground">{profile.followers}</p>
              <p className="text-small text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-h4 font-semibold text-foreground">{profile.following}</p>
              <p className="text-small text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="text-h4 font-semibold text-foreground">{profile.posts}</p>
              <p className="text-small text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-h4 font-semibold text-foreground">{profile.tokenValue}</p>
              <p className="text-small text-success">{profile.tokenChange}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="posts" className="mt-8">
          <TabsList className="bg-muted border-b border-border rounded-none w-full justify-start">
            <TabsTrigger value="posts" className="text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Posts
            </TabsTrigger>
            <TabsTrigger value="media" className="text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Media
            </TabsTrigger>
            <TabsTrigger value="tokens" className="text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
              Tokens
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
