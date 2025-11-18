import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, BellIcon, MessageCircleIcon, MenuIcon, XIcon, MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { useThemeStore } from '../stores/themeStore';
import { useNotificationStore } from '../stores/notificationStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useThemeStore();
  const { notifications, unreadCount } = useNotificationStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-navbar border-b border-border shadow-sm'
          : 'bg-background/90 backdrop-blur-navbar'
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-h4 font-semibold text-foreground">CreatorVerse</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-body font-normal transition-colors hover:text-primary cursor-pointer ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Feed
            </Link>
            <Link
              to="/explore"
              className={`text-body font-normal transition-colors hover:text-primary cursor-pointer ${
                isActive('/explore') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Explore
            </Link>
            <Link
              to="/creators"
              className={`text-body font-normal transition-colors hover:text-primary cursor-pointer ${
                isActive('/creators') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Creators
            </Link>
          </div>

          {/* SearchIcon Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="SearchIcon creators, posts..."
                className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-input"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:text-primary hover:bg-muted"
            >
              {isDark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </Button>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-foreground hover:text-primary hover:bg-muted">
                  <BellIcon className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 bg-popover text-popover-foreground border-border">
                <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-small">No notifications</div>
                ) : (
                  notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem key={notification.id} className="text-foreground hover:bg-muted cursor-pointer">
                      <div className="flex flex-col space-y-1">
                        <p className="text-small">{notification.message}</p>
                        <p className="text-small text-muted-foreground">{notification.time}</p>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Messages */}
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
              <MessageCircleIcon className="w-5 h-5" />
            </Button>

            {/* User Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-muted">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/100x100" alt="User avatar" />
                    <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover text-popover-foreground border-border">
                <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                  <Link to="/profile/1">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Wallet</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile MenuIcon Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-foreground hover:text-primary hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile MenuIcon */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background">
            <NavigationMenu className="w-full">
              <NavigationMenuList className="flex flex-col space-y-2 w-full">
                <NavigationMenuItem className="w-full">
                  <Link
                    to="/"
                    className={`block px-4 py-3 text-body font-normal transition-colors hover:bg-muted rounded-md cursor-pointer ${
                      isActive('/') ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Feed
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <Link
                    to="/explore"
                    className={`block px-4 py-3 text-body font-normal transition-colors hover:bg-muted rounded-md cursor-pointer ${
                      isActive('/explore') ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Explore
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="w-full">
                  <Link
                    to="/creators"
                    className={`block px-4 py-3 text-body font-normal transition-colors hover:bg-muted rounded-md cursor-pointer ${
                      isActive('/creators') ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Creators
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="mt-4 px-4">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="SearchIcon creators, posts..."
                  className="pl-10 bg-muted border-border text-foreground placeholder:text-muted-foreground rounded-input"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
