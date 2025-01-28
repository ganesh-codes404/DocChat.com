import { useState } from 'react'
import { Menu, X, ChevronRight, LogIn, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div
      className="bg-teal-50 text-teal-900 min-h-screen font-sans relative"
      style={{
        backgroundImage: `linear-gradient(rgba(13, 110, 110, 0.9), rgba(13, 110, 110, 0.9)), url('Homepage_pic.png')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
      }}
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-teal-800 bg-opacity-80 text-white shadow-lg">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/home" className="flex items-center">
              <span className="text-3xl font-extrabold text-teal-100">DoctorChat</span>
            </Link>
            <div className="hidden md:flex space-x-8 text-teal-100">
              <NavLink to="/symp" className="hover:text-teal-200 transition duration-300">Quick Help</NavLink>
              
              <NavLink to="/remind" className="hover:text-teal-200 transition duration-300">Reminders</NavLink>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="text-teal-100 hover:text-teal-200 transition duration-300 flex items-center">
                <LogIn className="mr-2" size={18} />
                LogOut
              </Link>
            </div>
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-teal-100 hover:text-teal-200 transition duration-300">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
        {mobileMenuOpen && (
          <div className="md:hidden bg-teal-700 border-t border-teal-600">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <NavLink to="/product" className="block text-teal-100 hover:text-teal-300">Product</NavLink>
              <NavLink to="/features" className="block text-teal-100 hover:text-teal-300">Features</NavLink>
              <NavLink to="/marketplace" className="block text-teal-100 hover:text-teal-300">Marketplace</NavLink>
              <NavLink to="/company" className="block text-teal-100 hover:text-teal-300">Company</NavLink>
              <Link to="/login" className="block w-full text-left py-2 text-teal-100 hover:text-teal-300 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="block w-full bg-teal-100 text-teal-800 px-4 py-2 rounded hover:bg-teal-300 hover:text-teal-900 transition duration-300">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </header>
  
      <main className="pt-24">
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-teal-100 to-teal-50 text-center">
          <div className="container mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-teal-800 animate-fade-in">
              Revolutionize Your Health Care
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-teal-700 animate-fade-in-delay-1">
              We are here for you!
            </p>
            <Link to="/chat" className="bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition duration-300 flex items-center justify-center animate-fade-in-delay-2">
              Ask Professionals!
            </Link>
          </div>
        </section>
  
        <section className="py-20 px-6 bg-white bg-opacity-90">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="Stay Connected with Specialists" 
                description="Connect with your Doctors from the comfort of your home."
                className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-teal-900"
              />
              <FeatureCard 
                title="Personalized Health Support" 
                description="Use the Chatrooms to discuss with your Doctors."
                className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-teal-900"
              />
              <FeatureCard 
                title="Quick Assistance and Prescriptions"
                description="Get help quicker than ever."
                className="bg-teal-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 text-teal-900"
              />
            </div>
          </div>
        </section>
      </main>
  
      <footer className="bg-teal-900 py-8">
        <div className="container mx-auto px-6 text-center text-teal-100">
          <p>&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )};
  

  
  

function NavLink({ to, children, mobile = false }) {
  const baseClasses = "text-white hover:text-red-400 transition duration-300"
  const mobileClasses = mobile ? "block py-2" : ""
  
  return (
    <Link to={to} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  mobile: PropTypes.bool,
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-gray-700 shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}