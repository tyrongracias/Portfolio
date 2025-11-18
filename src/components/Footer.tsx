import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  const footerLinks = {
    company: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Us', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Community', href: '#' },
    ],
    legal: [
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Disclaimer', href: '#' },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-h4 font-semibold text-foreground mb-4">CreatorVerse</h3>
            <p className="text-body text-muted-foreground mb-6">
              Revolutionizing the creator economy with blockchain-powered tools and community-driven monetization.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
                <FacebookIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
                <TwitterIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
                <InstagramIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
                <LinkedinIcon className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary hover:bg-muted">
                <YoutubeIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-h6 font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-h6 font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-h6 font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md">
            <h4 className="text-h6 font-semibold text-foreground mb-4">Subscribe to our newsletter</h4>
            <p className="text-body text-muted-foreground mb-4">
              Get the latest updates on creator economy trends and platform features.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-background border-border text-foreground placeholder:text-muted-foreground rounded-input"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-badge font-normal">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-small text-muted-foreground">
            © 2024 CreatorVerse. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-small text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Terms
            </a>
            <a href="#" className="text-small text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Privacy
            </a>
            <a href="#" className="text-small text-muted-foreground hover:text-primary transition-colors cursor-pointer">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
