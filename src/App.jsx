import "./index.css";
import { useState } from "react";
import { 
  Navbar, 
  NavBody, 
  NavItems, 
  MobileNav, 
  MobileNavHeader, 
  MobileNavMenu, 
  MobileNavToggle, 
  NavbarLogo, 
  NavbarButton 
} from "./components/ui/resizable-navbar";
import { HeroParallax } from "./components/ui/hero-parallax";

// Sample navigation items
const navItems = [
  { name: "Home", link: "#home" },
  { name: "About", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "Portfolio", link: "#portfolio" },
  { name: "Contact", link: "#contact" },
];

// Sample products for HeroParallax
const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Editrix AI", 
    link: "https://editrix.ai",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Codeium",
    link: "https://codeium.com",
    thumbnail: "https://images.unsplash.com/photo-1547104442-44bc4c26c272?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  }
];

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleMobileNavClose = () => {
    setIsMobileNavOpen(false);
  };

  return (
    <div className="relative w-full">
      <Navbar className="top-2">
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex w-full flex-row items-center justify-between">
            <NavbarLogo />
            <NavItems 
              items={navItems} 
              onItemClick={() => {}}
            />
            <div className="flex items-center space-x-2">
              <NavbarButton variant="secondary" href="#login">
                Login
              </NavbarButton>
              <NavbarButton variant="primary" href="#signup">
                Sign up
              </NavbarButton>
            </div>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle 
              isOpen={isMobileNavOpen}
              onClick={handleMobileNavToggle}
            />
          </MobileNavHeader>
          
          <MobileNavMenu 
            isOpen={isMobileNavOpen}
            onClose={handleMobileNavClose}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={handleMobileNavClose}
                className="flex w-full items-center justify-start rounded-md px-2 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                {item.name}
              </a>
            ))}
            <div className="flex w-full flex-col space-y-2">
              <NavbarButton variant="secondary" href="#login">
                Login
              </NavbarButton>
              <NavbarButton variant="primary" href="#signup">
                Sign up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Parallax Section */}
      <HeroParallax products={products} />

      {/* Additional content sections */}
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black dark:text-white mb-6">
              Experience Our Amazing Components
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Scroll up to see the parallax effect in action, and notice how the navbar 
              transforms as you scroll. This is just a taste of what Aceternity UI can do 
              for your projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                Responsive Design
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Our components work seamlessly across all devices and screen sizes.
              </p>
            </div>
            
            <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                Smooth Animations
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Built with Framer Motion for buttery smooth animations and transitions.
              </p>
            </div>
            
            <div className="p-6 border border-neutral-200 dark:border-neutral-800 rounded-lg">
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                Dark Mode Ready
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                Full dark mode support with beautiful color schemes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;