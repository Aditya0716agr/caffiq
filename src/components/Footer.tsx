import { Instagram, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="p-3 rounded-full border border-border hover:border-ring hover:bg-accent/10 transition-all duration-200 group"
              aria-label="Follow us on Instagram">

              <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-ring transition-colors duration-200" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full border border-border hover:border-ring hover:bg-accent/10 transition-all duration-200 group"
              aria-label="Connect with us on LinkedIn">

              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-ring transition-colors duration-200" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full border border-border hover:border-ring hover:bg-accent/10 transition-all duration-200 group"
              aria-label="Message us on WhatsApp">

              <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-ring transition-colors duration-200" />
            </a>
          </div>

          {/* Brand Tagline */}
          <div className="text-center space-y-3">
            <p className="text-xl md:text-2xl font-heading font-semibold text-foreground tracking-[0.5px]">
              Chew it. Sip it. Own it.
            </p>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg">
              The energy revolution is caffeinated. And it's very, very Indian.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Questions? Reach out to us
            </p>
            <a
              href="mailto:hertofhelp@gmail.com"
              className="text-sm text-ring hover:text-ring/80 transition-colors duration-200 font-medium">

              hertofhelp@gmail.com
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border w-full text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 Caffiq. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>);

}