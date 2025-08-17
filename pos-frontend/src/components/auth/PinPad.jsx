import { useState } from "react";

export default function PinPad() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleKeyPress = (digit) => {
    if (pin.length < 4) {
      setPin(pin + digit);
      setError("");
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
    setError("");
  };

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError("Enter a 4-digit PIN");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes - treat '1234' as successful login
      if (pin === "1234") {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setPin("");
        }, 1500);
      } else {
        setError("Invalid PIN");
        setPin("");
      }
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#111315] text-white p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Employee Login</h1>
        <p className="text-[#ababab]">Enter your 4-digit PIN</p>
      </div>

      {/* PIN Indicator */}
      <div className="flex space-x-3 mb-8">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-5 h-5 md:w-6 md:h-6 rounded-full transition-colors ${
              i < pin.length 
                ? success 
                  ? "bg-green-500" 
                  : "bg-purple-500" 
                : "bg-[#1e1e1e]"
            }`}
          />
        ))}
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs md:max-w-sm">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleKeyPress(num.toString())}
            disabled={isLoading || success}
            className="aspect-square rounded-full bg-[#1a1a1a] hover:bg-[#1e1e1e] active:bg-purple-500 transition-colors text-xl font-bold disabled:opacity-50"
          >
            {num}
          </button>
        ))}
        
        <button
          onClick={handleBackspace}
          disabled={isLoading || success || pin.length === 0}
          className="aspect-square rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors text-xl font-bold disabled:opacity-50"
        >
          ⌫
        </button>
        
        <button
          onClick={() => handleKeyPress("0")}
          disabled={isLoading || success}
          className="aspect-square rounded-full bg-[#1a1a1a] hover:bg-[#1e1e1e] active:bg-purple-500 transition-colors text-xl font-bold disabled:opacity-50"
        >
          0
        </button>
        
        <button
          onClick={handleLogin}
          disabled={isLoading || success || pin.length !== 4}
          className={`aspect-square rounded-full transition-colors text-xl font-bold disabled:opacity-50 ${
            success 
              ? "bg-green-500" 
              : "bg-green-600 hover:bg-green-700 active:bg-green-800"
          }`}
        >
          {isLoading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : success ? (
            "✓"
          ) : (
            "↵"
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="mt-6 min-h-6 text-center">
        {error && (
          <p className="text-red-400 animate-pulse">{error}</p>
        )}
        {success && (
          <p className="text-green-400">Login successful!</p>
        )}
      </div>

      {/* Responsive Note */}
      <p className="mt-8 text-[#ababab] text-sm text-center max-w-xs">
         PIN: <span className="text-purple-400">1234</span>
      </p>
    </div>
  );
}