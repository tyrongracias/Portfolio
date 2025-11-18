import { TrendingUpIcon, UsersIcon, CoinsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const trendingTopics = [
    { id: 1, tag: '#CreatorEconomy', posts: '12.5K' },
    { id: 2, tag: '#Web3', posts: '8.2K' },
    { id: 3, tag: '#NFTs', posts: '6.7K' },
    { id: 4, tag: '#Blockchain', posts: '5.3K' },
    { id: 5, tag: '#Metaverse', posts: '4.1K' },
  ];

  const recommendedCreators = [
    { id: '2', name: 'Sarah Johnson', handle: '@sarahj', avatar: 'https://placehold.co/100x100', followers: '125K' },
    { id: '3', name: 'Mike Chen', handle: '@mikechen', avatar: 'https://placehold.co/100x100', followers: '98K' },
    { id: '4', name: 'Emma Davis', handle: '@emmad', avatar: 'https://placehold.co/100x100', followers: '87K' },
  ];

  const topTokens = [
    { id: 1, name: 'CREATOR', value: '$2.45', change: '+12.5%' },
    { id: 2, name: 'VERSE', value: '$1.89', change: '+8.3%' },
    { id: 3, name: 'TOKEN', value: '$0.95', change: '+5.7%' },
  ];

  return (
    <aside className="animate-on-scroll space-y-6 lg:sticky lg:top-24 lg:self-start">
      {/* Trending Topics */}
      <Card className="bg-card border-border rounded-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-h5 text-foreground">
            <TrendingUpIcon className="w-5 h-5 mr-2 text-primary" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors cursor-pointer">
              <div>
                <p className="text-body font-semibold text-foreground">{topic.tag}</p>
                <p className="text-small text-muted-foreground">{topic.posts} posts</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recommended Creators */}
      <Card className="bg-card border-border rounded-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-h5 text-foreground">
            <UsersIcon className="w-5 h-5 mr-2 text-primary" />
            Recommended Creators
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendedCreators.map((creator) => (
            <div key={creator.id} className="flex items-center justify-between">
              <Link to={`/profile/${creator.id}`} className="flex items-center space-x-3 flex-1">
                <Avatar className="w-10 h-10 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-body font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                    {creator.name}
                  </p>
                  <p className="text-small text-muted-foreground">{creator.followers} followers</p>
                </div>
              </Link>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-badge text-small font-normal"
              >
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Tokens */}
      <Card className="bg-card border-border rounded-card shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-h5 text-foreground">
            <CoinsIcon className="w-5 h-5 mr-2 text-primary" />
            Top Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topTokens.map((token) => (
            <div key={token.id} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors cursor-pointer">
              <div>
                <p className="text-body font-semibold text-foreground">{token.name}</p>
                <p className="text-small text-success">{token.change}</p>
              </div>
              <p className="text-body font-semibold text-foreground">{token.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}
