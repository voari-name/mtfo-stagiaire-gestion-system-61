const AboutSection = () => {
  return (
    <div className="bg-gray-100 dark:bg-card py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Enhanced Madagascar Emblem positioned above À propos */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <img 
                src="/lovable-uploads/00f9c523-711b-4306-a064-0c9681e407f3.png" 
                alt="République de Madagascar" 
                className="h-40 w-auto hover-scale transition-transform duration-500 animate-glow shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-xl animate-pulse-slow"></div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-400 mb-4 animate-gradient-text">République de Madagascar</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 animate-fade-in" style={{animationDelay: '0.2s'}}>Fitiavana - Tanindrazana - Fandrosoana</p>
        </div>

        <h2 className="text-2xl font-bold text-center text-blue-900 dark:text-blue-400 mb-8 animate-fade-in">À propos du MTEFoP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-blue-50 hover:to-white dark:hover:from-blue-950 dark:hover:to-card">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Notre Mission</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Le Ministère du Travail, de l'Emploi et de la Fonction Publique œuvre pour l'amélioration 
              des conditions de travail et la promotion de l'emploi à Madagascar.
            </p>
          </div>
          <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-green-50 hover:to-white dark:hover:from-green-950 dark:hover:to-card" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Services</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Nous offrons divers services pour les employeurs, les employés et les stagiaires, 
              incluant des programmes de formation et d'insertion professionnelle.
            </p>
          </div>
          <div className="bg-white dark:bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover-scale animate-fade-in-up hover:bg-gradient-to-br hover:from-red-50 hover:to-white dark:hover:from-red-950 dark:hover:to-card" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-400 mb-3">Nos Valeurs</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Intégrité, professionnalisme, transparence et engagement envers le développement 
              du capital humain de Madagascar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;