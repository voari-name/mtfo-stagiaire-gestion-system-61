const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-white to-green-600 p-4 shadow-md animate-fade-in">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 text-gold animate-slide-in-left">
          <p className="text-sm text-gold font-semibold">REPOBLIKAN'I MADAGASIKARA</p>
          <p className="text-sm text-gold font-light">Fitiavana - Tanindrazana - Fandrosoana</p>
        </div>
        <div className="flex justify-center my-4 md:my-0 animate-bounce-slow">
          <img 
            src="/lovable-uploads/bbbcd3ef-0021-42ca-8d32-8796bd1cf670.png" 
            alt="MTEFoP Logo" 
            className="h-24 w-auto hover-scale transition-transform duration-300 animate-pulse-slow"
          />
        </div>
        <div className="text-right animate-slide-in-right">
          <p className="text-md font-semibold text-green-800">Ministère du Travail, de l'Emploi</p>
          <p className="text-md font-semibold text-green-800">et de la Fonction Publique</p>
        </div>
      </div>
    </div>
  );
};

export default Header;