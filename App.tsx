import React, { useState, useMemo } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import CategoryGrid from './components/Home/CategoryGrid';
import DishGrid from './components/Food/DishGrid';
import LateNightSection from './components/Restaurants/LateNightSection';
import { mockDishes } from './data/mockData';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredDishes = useMemo(() => {
    let filtered = mockDishes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(dish =>
        dish.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const popularDishes = mockDishes.filter(dish => dish.isPopular);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header 
            onSearchChange={setSearchTerm} 
            searchTerm={searchTerm}
          />
          
          <main>
            {/* Hero Section */}
            <Hero />
            
            {/* Category Grid */}
            <CategoryGrid 
              onCategorySelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            
            {/* Popular Dishes */}
            {!searchTerm && !selectedCategory && (
              <DishGrid 
                dishes={popularDishes} 
                title="Popular Dishes"
              />
            )}
            
            {/* Filtered Results */}
            {(searchTerm || selectedCategory) && (
              <DishGrid 
                dishes={filteredDishes}
                title={
                  searchTerm 
                    ? `Search results for "${searchTerm}"` 
                    : `${selectedCategory?.charAt(0).toUpperCase()}${selectedCategory?.slice(1)} Dishes`
                }
              />
            )}
            
            {/* All Dishes (when no filter is applied) */}
            {!searchTerm && !selectedCategory && (
              <DishGrid 
                dishes={mockDishes}
                title="All Dishes"
              />
            )}
            
            {/* Late Night Section */}
            <LateNightSection />
          </main>
          
          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">SB Foods</h3>
                  <p className="text-gray-400">
                    Your favorite food delivered fresh, anytime, anywhere.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Restaurants</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Contact Info</h4>
                  <div className="text-gray-400 space-y-2">
                    <p>📞 (555) 123-4567</p>
                    <p>📧 support@sbfoods.com</p>
                    <p>📍 123 Food Street, City</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 SB Foods. All rights reserved. Built with ❤️ for food lovers.</p>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;