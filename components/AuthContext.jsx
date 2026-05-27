'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for simulated auth state
    const storedUser = localStorage.getItem('popupco_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
    setLoading(false);
  }, []);

  const login = (type, userData = {}) => {
    const defaults = {
      vendor: 'Jane Vendor',
      venue: 'John Venue',
      host: 'Taylor Host',
      attendee: 'Alex Explorer',
    };
    const newUser = {
      id: Math.random().toString(36).substring(7),
      type,
      name: userData.name || defaults[type] || 'PopUpCo User',
      email: userData.email || 'user@example.com',
      ...userData
    };
    setUser(newUser);
    localStorage.setItem('popupco_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('popupco_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
