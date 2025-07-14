const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 text-white py-6 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© 2025 MTEFoP - Tous droits réservés</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline transition-all duration-300 hover:text-gold">Mentions légales</a>
            <a href="#" className="hover:underline transition-all duration-300 hover:text-gold">Politique de confidentialité</a>
            <a href="/contact" className="hover:underline transition-all duration-300 hover:text-gold">
              Contact: 038 51 621 07
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;