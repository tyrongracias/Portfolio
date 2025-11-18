import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function TokenSection() {
  return (
    <section className="animate-on-scroll py-24 bg-muted">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-semibold text-foreground mb-4">
            Launch Your Creator Token
          </h2>
          <p className="text-large text-muted-foreground max-w-2xl mx-auto">
            Empower your community with blockchain-powered tokens. Create value, reward engagement, and build a sustainable creator economy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Card className="bg-card border-border rounded-card shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-h4 font-semibold text-foreground mb-4">How Creator Tokens Work</h3>
                <ul className="space-y-4 text-body text-foreground">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    <span>Launch your own token and set the initial supply</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    <span>Fans can buy, trade, and hold your tokens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    <span>Reward top holders with exclusive content and perks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-3"></span>
                    <span>Build a sustainable revenue stream from your community</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary-hover rounded-button h-14 px-8 text-body font-normal"
            >
              Launch My Token
            </Button>
          </div>

          <div className="relative">
            <div className="aspect-video rounded-card overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/j5a0jTc9S10"
                title="Creator Tokens Explained"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Feature Images */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-card border-border rounded-card shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src="https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_1.png"
              alt="creator community network"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <CardContent className="p-6">
              <h4 className="text-h5 font-semibold text-foreground mb-2">Community Network</h4>
              <p className="text-body text-muted-foreground">
                Connect with creators and fans in a decentralized ecosystem
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-card shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src="https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_2.png"
              alt="social media feed abstract"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <CardContent className="p-6">
              <h4 className="text-h5 font-semibold text-foreground mb-2">Social Feed</h4>
              <p className="text-body text-muted-foreground">
                Share content and engage with your community in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border rounded-card shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
              src="https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_4.png"
              alt="digital token concept art"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <CardContent className="p-6">
              <h4 className="text-h5 font-semibold text-foreground mb-2">Digital Tokens</h4>
              <p className="text-body text-muted-foreground">
                Create and manage your own blockchain-powered creator tokens
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Feature Image */}
        <div className="mt-12">
          <Card className="bg-card border-border rounded-card shadow-sm overflow-hidden">
            <img
              src="https://c.animaapp.com/mi4krc4mAxvTl2/img/ai_5.png"
              alt="connected network illustration"
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <CardContent className="p-8 text-center">
              <h4 className="text-h4 font-semibold text-foreground mb-4">
                Join the Connected Creator Economy
              </h4>
              <p className="text-body text-muted-foreground max-w-2xl mx-auto">
                Be part of a revolutionary platform where creators and fans connect directly, building sustainable communities powered by blockchain technology.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
