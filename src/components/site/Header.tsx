"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Container } from "@/components/ui/Container";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { 
  Search, 
  Menu, 
  ShoppingCart, 
  Heart,
  Brain,
  Command,
  BookOpen,
  Users,
  Award,
  Zap,
  User,
  LogOut,
  Settings,
  CreditCard,
  BookMarked,
  ChevronDown,
  Sparkles,
  Star,
  TrendingUp,
  Globe,
  Shield,
  Bell
} from "lucide-react";
import {
  Menu as NavbarMenu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const { getItemCount: getWishlistCount } = useWishlistStore();
  const cartItemCount = getItemCount();
  const wishlistItemCount = getWishlistCount();

  // Prevent hydration mismatch by only rendering cart count on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search with debouncing
  useEffect(() => {
    if (searchQuery.trim()) {
      const timeoutId = setTimeout(() => {
        // In a real app, this would trigger search
        console.log("Searching for:", searchQuery);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [searchQuery]);

  // Handle Command+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle click outside to close user menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu) {
        const target = event.target as Element;
        if (!target.closest('[data-user-menu]')) {
          setShowUserMenu(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500 ease-out",
          isScrolled
            ? "bg-white/98 backdrop-blur-2xl border-b border-gray-200/60 shadow-2xl shadow-gray-900/10"
            : "bg-white/95 backdrop-blur-lg border-b border-gray-100/60"
        )}
      >
        <Container>
          <div className="flex h-18 items-center justify-between py-2">
            {/* Enhanced Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 shadow-xl shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Brain className="h-6 w-6 text-white drop-shadow-sm" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 group-hover:animate-ping"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-indigo-600 transition-all duration-500">
                  Skillery
                </span>
                <span className="text-xs text-gray-500 -mt-1 font-semibold tracking-wide group-hover:text-blue-600 transition-colors duration-300">Learn. Grow. Excel.</span>
              </div>
            </Link>

            {/* Desktop Navigation with Navbar Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              <NavbarMenu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Courses">
                  <div className="flex flex-col space-y-6 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <ProductItem
                        title="Web Development"
                        description="Learn modern web technologies"
                        href="/catalog?category=web-development"
                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=140&h=70&fit=crop&crop=center"
                      />
                      <ProductItem
                        title="Data Science"
                        description="Master data analysis and ML"
                        href="/catalog?category=data-science"
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=140&h=70&fit=crop&crop=center"
                      />
                      <ProductItem
                        title="Design"
                        description="Create beautiful user experiences"
                        href="/catalog?category=design"
                        src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=140&h=70&fit=crop&crop=center"
                      />
                      <ProductItem
                        title="AI/ML"
                        description="Build intelligent applications"
                        href="/catalog?category=ai-ml"
                        src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=140&h=70&fit=crop&crop=center"
                      />
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <HoveredLink href="/catalog" className="flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                        <BookOpen className="h-4 w-4" />
                        <span>Browse All Courses</span>
                        <Sparkles className="h-3 w-3 ml-1" />
                      </HoveredLink>
                    </div>
                  </div>
                </MenuItem>
                
                <MenuItem setActive={setActive} active={active} item="Instructors">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/instructors" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>All Instructors</span>
                    </HoveredLink>
                    <HoveredLink href="/instructors?featured=true" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Featured Instructors</span>
                      <Star className="h-3 w-3 text-yellow-400" />
                    </HoveredLink>
                    <HoveredLink href="/instructors?new=true" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Zap className="h-4 w-4 text-green-500" />
                      <span>New Instructors</span>
                      <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                    </HoveredLink>
                  </div>
                </MenuItem>
                
                <MenuItem setActive={setActive} active={active} item="Resources">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/blog" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <TrendingUp className="h-4 w-4 text-purple-500" />
                      <span>Blog</span>
                    </HoveredLink>
                    <HoveredLink href="/guides" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <BookOpen className="h-4 w-4 text-indigo-500" />
                      <span>Learning Guides</span>
                    </HoveredLink>
                    <HoveredLink href="/certificates" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>Certificates</span>
                    </HoveredLink>
                    <HoveredLink href="/community" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <Globe className="h-4 w-4 text-cyan-500" />
                      <span>Community</span>
                    </HoveredLink>
                  </div>
                </MenuItem>
              </NavbarMenu>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearchSubmit} className="relative w-full group">
                <div className="relative">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
                  <Input
                    type="search"
                    placeholder="Search for courses, instructors, topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={cn(
                      "pl-14 pr-24 py-4 w-full h-14 border-2 border-gray-200 bg-gray-50/90 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-2xl transition-all duration-500 placeholder:text-gray-400 text-base font-medium backdrop-blur-sm",
                      isSearchFocused && "shadow-2xl shadow-blue-500/25 scale-105"
                    )}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    <div className="hidden sm:flex items-center space-x-1">
                      <kbd className="h-7 select-none items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 font-mono text-[11px] text-gray-500 shadow-sm font-semibold">
                        <Command className="h-3 w-3" />
                        K
                      </kbd>
                    </div>
                    {searchQuery && (
                      <div className="h-4 w-px bg-gray-300"></div>
                    )}
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="h-7 w-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <span className="text-sm font-bold text-gray-600">×</span>
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Enhanced Wishlist & Cart - Hidden on mobile */}
              <div className="hidden sm:flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative h-12 w-12 rounded-2xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-300 hover:scale-110 group shadow-sm hover:shadow-md" 
                  asChild
                >
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    {isMounted && wishlistItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-xl animate-bounce border-2 border-white">
                        {wishlistItemCount}
                      </span>
                    )}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative h-12 w-12 rounded-2xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110 group shadow-sm hover:shadow-md" 
                  asChild
                >
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    {isMounted && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-xl animate-bounce border-2 border-white">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </Button>
              </div>

              {/* Auth Buttons or User Menu */}
              {!isMounted ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="h-10 w-24 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              ) : isAuthenticated && user ? (
                <div className="hidden sm:flex items-center space-x-2">
                  {/* Notifications */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative h-10 w-10 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                  >
                    <Bell className="h-4 w-4" />
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                  </Button>

                  {/* User Avatar & Menu */}
                  <div className="relative" data-user-menu>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105 group"
                    >
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 group-hover:ring-blue-500 transition-all duration-200"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {user.firstName}
                        </span>
                        <span className="text-xs text-gray-500">Premium</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 text-gray-400 transition-transform duration-200",
                        showUserMenu && "rotate-180"
                      )} />
                    </button>
                    
                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-4 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <img
                              src={user.avatar}
                              alt={user.firstName}
                              className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-900">
                                {user.firstName} {user.lastName}
                              </p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Shield className="h-3 w-3 text-blue-500" />
                                <span className="text-xs text-blue-600 font-medium">Premium Member</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="py-2">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="h-4 w-4 group-hover:text-blue-600" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/my-courses"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <BookMarked className="h-4 w-4 group-hover:text-blue-600" />
                            <span>My Courses</span>
                            <div className="ml-auto h-2 w-2 bg-blue-500 rounded-full"></div>
                          </Link>
                          <Link
                            href="/billing"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <CreditCard className="h-4 w-4 group-hover:text-blue-600" />
                            <span>Billing</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Settings className="h-4 w-4 group-hover:text-blue-600" />
                            <span>Settings</span>
                          </Link>
                        </div>
                        
                        <div className="border-t border-gray-100 py-2">
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors group"
                          >
                            <LogOut className="h-4 w-4 group-hover:text-red-700" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden sm:flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-12 px-6 rounded-2xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 font-semibold hover:scale-105 shadow-sm hover:shadow-md" 
                    asChild
                  >
                    <Link href="/auth/login">Log in</Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-12 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110 relative overflow-hidden group" 
                    asChild
                  >
                    <Link href="/auth/signup">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">Sign up</span>
                    </Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                  <SheetHeader>
                    <SheetTitle className="text-left">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-6 mt-6">
                    {/* Mobile Search */}
                    <div className="md:hidden">
                      <form onSubmit={handleSearchSubmit}>
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <Input
                            type="search"
                            placeholder="Search for courses..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-11 py-3 w-full rounded-xl border-gray-200 bg-gray-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                          />
                        </div>
                      </form>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex flex-col space-y-2">
                      <Link 
                        href="/catalog" 
                        className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 py-3 px-4 rounded-xl flex items-center space-x-3 group"
                      >
                        <BookOpen className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                        <span className="font-medium">Courses</span>
                        <Sparkles className="h-4 w-4 text-yellow-500 ml-auto" />
                      </Link>
                      <Link 
                        href="/instructors" 
                        className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 py-3 px-4 rounded-xl flex items-center space-x-3 group"
                      >
                        <Users className="h-5 w-5 text-green-500 group-hover:text-green-600" />
                        <span className="font-medium">Instructors</span>
                        <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                      </Link>
                      <Link 
                        href="/blog" 
                        className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 py-3 px-4 rounded-xl flex items-center space-x-3 group"
                      >
                        <TrendingUp className="h-5 w-5 text-purple-500 group-hover:text-purple-600" />
                        <span className="font-medium">Resources</span>
                        <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse ml-auto"></div>
                      </Link>
                    </nav>

                    {/* Mobile Auth Buttons or User Menu */}
                    {!isMounted ? (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    ) : isAuthenticated && user ? (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <img
                            src={user.avatar}
                            alt={user.firstName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Link
                            href="/profile"
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                          <Link
                            href="/my-courses"
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <BookMarked className="h-4 w-4" />
                            <span>My Courses</span>
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={logout}
                            className="flex items-center space-x-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="/auth/login">Log in</Link>
                        </Button>
                        <Button className="w-full bg-brand hover:bg-brand-600" asChild>
                          <Link href="/auth/signup">Sign up</Link>
                        </Button>
                      </div>
                    )}

                    {/* Mobile Wishlist & Cart */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      <Button 
                        variant="ghost" 
                        className="flex-1 h-12 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium" 
                        asChild
                      >
                        <Link href="/wishlist">
                          <Heart className="h-4 w-4 mr-2" />
                          Wishlist
                          {wishlistItemCount > 0 && (
                            <span className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full px-2 py-1 font-semibold shadow-lg">
                              {wishlistItemCount}
                            </span>
                          )}
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 h-12 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 font-medium" 
                        asChild
                      >
                        <Link href="/cart">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Cart
                          {cartItemCount > 0 && (
                            <span className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs rounded-full px-2 py-1 font-semibold shadow-lg">
                              {cartItemCount}
                            </span>
                          )}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
