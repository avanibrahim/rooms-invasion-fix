interface LoadingScreenProps {
    transparent?: boolean;
  }
  
  const LoadingScreen = ({ transparent }: LoadingScreenProps) => (
    <div
      className={`
        fixed inset-0 
        ${transparent ? 'bg-transparent pointer-events-none' : 'bg-white'} 
        flex items-center justify-center 
        z-40 transition-opacity duration-500
      `}
    >
      <img
        src="/loading.png"
        alt="Loading..."
        className="w-28 h-28 animate-pulse"
      />
    </div>
  );
  
  export default LoadingScreen;
  