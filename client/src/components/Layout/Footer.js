const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">EduHub</h3>
            <p className="text-gray-300 dark:text-gray-400">
              Your premier destination for online learning and skill development.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li><a href="/courses" className="hover:text-white dark:hover:text-gray-200">Courses</a></li>
              <li><a href="/about" className="hover:text-white dark:hover:text-gray-200">About</a></li>
              <li><a href="/contact" className="hover:text-white dark:hover:text-gray-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li><a href="/help" className="hover:text-white dark:hover:text-gray-200">Help Center</a></li>
              <li><a href="/privacy" className="hover:text-white dark:hover:text-gray-200">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white dark:hover:text-gray-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 dark:border-gray-600 text-center text-gray-300 dark:text-gray-400">
          <p>&copy; 2024 EduHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;