import React, { useState, useEffect } from 'react';
import { Home, Gift, User, HelpCircle, Users, FireExtinguisher, Computer, Blocks } from 'lucide-react';
import { FaFire, FaUserCircle } from "react-icons/fa"; // Fire
import { GiFishingPole } from "react-icons/gi"; // Slot & Fishing
import { BASE_URL } from '../config';
import jwt_decode from 'jwt-decode'
import SlotGame from './components/SlotGame';

const HCHBetClone = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [jackpot, setJackpot] = useState(0);
  const [email, setemail] = useState("")
  const [token, settoken] = useState(null)
  const [password, setpassword] = useState("")
  const [success, setSuccess] = useState(false)
  const [status, setstatus] = useState("")
  const [balance, setBalance] = useState(0)
  const [error, setError] = useState("")
  const [isPhoneLogin, setIsPhoneLogin] = useState(false); // To toggle between phone/email login
  const [selectedGame, setSelectedGame] = useState({
    name: null,
    image: null,
    amount: null
  }); // State to track the selected game for deposit popup
  const [depositAmount, setDepositAmount] = useState(null); // State to track the selected deposit amount

  const game_details = [
    {
      id: 1,
      name: "Fortune Tiger",
      amount: 3000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000089/default.avif"
    },
    {
      id: 2,
      name: "Lucky Neko",
      amount: 4000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000098/default.avif"
    },
    {
      id: 3,
      name: "Fortune Ox",
      amount: 5000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000068/default.avif"
    },
    {
      id: 4,
      name: "Dragon Hatch",
      amount: 3000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000135/default.avif"
    },
    {
      id: 5,
      name: "Mahjong Ways",
      amount: 4000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/40/3/400109/default.png"
    },
    {
      id: 6,
      name: "Gem Saviour",
      amount: 5000,
      image: "https://js.hhhbet1.com/game_pictures/g/CL/200/3/2000087/default.avif"
    },
    {
      id: 7,
      name: "The Great Icescape",
      amount: 3000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000089/default.avif"
    },
    {
      id: 8,
      name: "Bali Vacation",
      amount: 4000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000098/default.avif"
    },
    {
      id: 9,
      name: "Candy Burst",
      amount: 5000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000068/default.avif"
    },
    {
      id: 10,
      name: "Treasures of Aztec",
      amount: 3000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000135/default.avif"
    },
    {
      id: 11,
      name: "Wild Bandito",
      amount: 4000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/40/3/400109/default.png"
    },
    {
      id: 12,
      name: "Crypto Mania",
      amount: 5000,
      image: "https://js.hhhbet1.com/game_pictures/g/CL/200/3/2000087/default.avif"
    },
    {
      id: 13,
      name: "Jungle Delight",
      amount: 3000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000089/default.avif"
    },
    {
      id: 14,
      name: "Golden Dragon",
      amount: 4000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000098/default.avif"
    },
    {
      id: 15,
      name: "Ice Phoenix",
      amount: 5000,
      image: "https://js.hhhbet.org/game_pictures/g/CL/200/3/2000068/default.avif"
    }
  ];
  

  const loginNow = async () => {
    try {
      console.log("Email and pass: ", email, password)
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (!response.ok){
        const resp2 = await response.json()
        setError(resp2.message)
        console.log("Resp2re: ", response)
        console.log("PR: ", resp2)
        return
      }

      const resp2 = await response.json()
      console.log("Resp2: ", resp2)
      if (resp2.status === 200){
        setSuccess(true)
        setError("")
        setstatus("Logged in")
        localStorage.setItem("token", resp2.token)
        settoken(resp2.token)
        const decodedToken = await jwt_decode(resp2.token)
        setemail(decodedToken.email)
        const balancess = decodedToken.balance
        setBalance(balancess)
      }else{
        console.log("Resp2else: ", resp2)
        setSuccess(false)
        setError("Invalid credentials")
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  const signupNow = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })

      if (!response.ok){
        return
      }

      const resp2 = await response.json()

      if (resp2.status === 200){
        setSuccess(true)
        localStorage.setItem("token", resp2.token)
        settoken(resp2.token)
        const decodedToken = await jwt_decode(resp2.token)
        setemail(decodedToken.email)
        const balancess = decodedToken.balance
        setBalance(balancess)
      }
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  useEffect(() => {
    const getAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")
        console.log("Token")
        if (token){
          setSuccess(true)
          const decoded = await jwt_decode(token)
          console.log("Decoded: ", decoded)
          setemail(decoded.email)
          setBalance(decoded.balance)
        }
      } catch (error) {
        console.error("Error: ", error)
      }
    }
    getAuthStatus()
  }, [])
  

  // Animate the jackpot number
  useEffect(() => {
    const targetJackpot = 17585965.84;
    const interval = setInterval(() => {
      setJackpot((prev) => {
        if (prev < targetJackpot) {
          return Math.min(prev + Math.random() * 100000, targetJackpot);
        } else {
          clearInterval(interval);
          return targetJackpot;
        }
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Handle login or register form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page.
  
    if (isLoginOpen) {
      console.log("IN THE LOGIN");
      await loginNow();
    } else if (isRegisterOpen) {
      console.log("IN THE SIGNUP");
      await signupNow();
    }
  
    // Keep the popup open to show success or error messages.
    if (success) {
      setLoginOpen(false);
      setRegisterOpen(false);
      console.log("Operation successful!");
    } else {
      console.log("Operation failed:", error);
    }
  };
  const [gameStarts, setGameStarts] = useState(false)

  const [agentClicked, setAgentClicked] = useState(false);

  // Function to handle the action when the user clicks the button
  const handleAgentClick = () => {
    setAgentClicked(!agentClicked); // This will trigger the popup
  };

  // WhatsApp link (you can replace the number if needed)
  const whatsappLink = "https://wa.me/2349110520620?text=Hello%20Agent,%20I%20need%20assistance.";

  

  // Open deposit popup for selected game
  const openDepositPopup = (game) => {
    if (game && game.amount) {
      console.log("Selected Game:", game);
      setSelectedGame({
        name: game.name,
        amount: game.amount,
        image: game.image
      });
      setDepositAmount(game.amount);
    } else {
      console.error("Game data is missing or incomplete:", game);
    }
  };
  const [isOpen, setisOpen] = useState(false)
  

  // Close deposit popup
  const closeDepositPopup = () => {
    setSelectedGame(null);
    setDepositAmount(null);
  };

  useEffect(() => {
    // Log all game details when the component mounts
    console.log("Game Details: ", game_details);
  }, []);

  const [isDepositPopupOpen, setDepositPopupOpen] = useState(false);

const toggleDepositPopup = () => {
  setDepositPopupOpen((prev) => !prev);
};

const logout = async () => {
  setSuccess(false)
  localStorage.clear()
  window.location.reload()
}



const canAccessProfile = balance > 1000 && email;

const handleDeposit = () => {
  console.log("Attempting to deposit credits: ", depositAmount)
  if (balance >= depositAmount) {
    console.log("W")
    setBalance(balance - depositAmount); // Subtract deposit amount from balance
    closeDepositPopup(); // Close the deposit popup
    setGameStarts(true); // Start the game
    console.log(`Game started with ${depositAmount} credits!`);
  } else {
    toggleDepositPopup()
    console.log("Insufficient balance to deposit!");
  }
};

  return (
    <div className="bg-green-800 min-h-screen text-white font-sans">
      <header className="bg-green-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HCHBET.COM</h1>
        <div className='space-x-5'>
          {success ? (
            <>
              <div>
                <p>NGN: {balance}</p>
              </div>
            </>
          ) : (
            <>
              <button className="px-4 py-1 bg-yellow-400 text-black rounded-md text-md hover:text-yellow-400 hover:bg-green-800 transition ease duration-300 hover:border-yellow-400" onClick={() => {
                setLoginOpen(true)
                console.log("Login")
              }}>
                Login
              </button>
              <button className="px-4 py-1 border border-yellow-400 text-yellow-400 rounded-md text-md hover:text-black hover:bg-yellow-400 transition ease duration-300" onClick={() => setRegisterOpen(true)}>
                Register
              </button>
            </>
          )}
        </div>
        {
          success && (
            <div>
          <p className='text-green-500 font-bold cursor-pointer hover:text-white' onClick={logout}>Logout</p>
        </div>
          )
        }
      </header>

      {/* Horizontal Scroller */}
      <div className="overflow-hidden bg-yellow-400 text-black py-2">
        <div className="whitespace-nowrap animate-scroll">
          <span className="mx-4">Up to 2% return on betting bonuses</span>
          <span className="mx-4">Join now to earn rewards!</span>
          <span className="mx-4">New games available!</span>
        </div>
      </div>

      {gameStarts && <SlotGame/>}

      

      <div className='flex flex-row items-center justify-between p-5'>
        <div className='hover:cursor-pointer flex flex-col items-center justify-center space-y-1 hover:scale-110 transform transition duration-300 hover:text-red-500'>
          <FaFire color='red' size={30} />
          <p>Hot</p>
        </div>
        <div className='hover:cursor-pointer flex flex-col items-center justify-center space-y-1 hover:scale-110 transform transition duration-300 hover:text-green-500'>
          <Computer size={30} color='yellow' />
          <p>Slot</p>
        </div>
        <div className='hover:cursor-pointer flex flex-col items-center justify-center space-y-1 hover:scale-110 transform transition duration-300 hover:text-purple-500'>
          <Blocks size={30} color='purple' />
          <p>Blockchain</p>
        </div>
        <div className='hover:cursor-pointer flex flex-col items-center justify-center space-y-1 hover:scale-110 transform transition duration-300 hover:text-blue-500'>
          <GiFishingPole size={30} color='blue' />
          <p>Fishing</p>
        </div>
      </div>

      {/* Jackpot Section */}
      <div className="text-center p-6 bg-green-900">
        <h2 className="text-2xl font-bold">JACKPOT</h2>
        <p className="text-4xl font-extrabold text-yellow-400 animate-bounce">
          {jackpot.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </div>

      {/* Games Section */}
      <div className="p-4">
      <h3 className="text-xl font-bold mb-2">Hot Games</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {game_details.map(game => (
          <div
            key={game.id}
            className="bg-green-700 p-4 rounded-md shadow-md hover:scale-105 transform transition duration-200"
            onClick={() => {
              // Log the game details when clicked
              console.log("Game Deets: ", game); 
               setSelectedGame({
                name: game.name,
                image: game.image,
                amount: game.amount
              })
              
              // Set the deposit amount (assuming `setDepositAmount` is defined)
              setDepositAmount(game.amount);
              
            }}
          >
            <img
              src={game.image}
              alt={`${game.name} thumbnail`} // Correctly use game.name here
              className="w-full h-32 object-contain rounded-md"
            />
            <p className="text-center font-semibold text-sm">{game.name}</p>
          </div>
        ))}
      </div>


    </div>

      {/* Footer Navigation */}
      <footer className="bg-green-900 p-2 fixed bottom-0 w-full flex justify-around text-center">
  {/* Home Button - Active Style */}
  <button className="text-white flex flex-col items-center">
    <Home size={24} />
    <span>Home</span>
  </button>

  {/* Offers Button - Grey */}
  <button className="text-gray-400 flex flex-col items-center">
    <Gift size={24} color='gray' />
    <span>Offers</span>
  </button>

  {/* Agent Button - Grey */}
  <button className="text-white flex flex-col items-center" onClick={() => setAgentClicked(true)}>
    <Users size={24} color='white' />
    <span>Agent</span>
  </button>

  {/* Support Button - Grey */}
  <button className="text-gray-400 flex flex-col items-center">
    <HelpCircle size={24} color='gray' />
    <span>Support</span>
  </button>

  {/* Profile Button - Grey */}
  {success ? (
    <button className="text-white flex flex-col items-center" onClick={() => setisOpen(true)}>
      <User size={24} color='white' />
      <span>Profile</span>
    </button>
  ) : (
    <button className="text-gray-400 flex flex-col items-center" onClick={() => setisOpen(true)}>
      <User size={24} color='gray' />
      <span>Profile</span>
    </button>
  )}
</footer>


      {/* Deposit Popup */}
      {selectedGame && depositAmount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md text-black w-80">
            <div className="flex justify-between items-center flex-row mb-2">
              <h2 className="text-xl font-bold mb-0">{selectedGame.name}</h2>
              <button className="text-red-500" onClick={() => {
                closeDepositPopup()
              }}>X</button>
            </div>
            <p className="mb-4">To play {selectedGame.name}, please deposit {depositAmount} credits.</p>
            <button className="w-full bg-green-500 text-white p-2 rounded-md" onClick={handleDeposit}>Deposit</button>
          </div>
        </div>
      )}

{agentClicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-65">
          <div className="bg-white p-6 rounded-md text-black w-80">
            <div className="flex justify-between items-center flex-row mb-4">
              <h2 className="text-xl font-bold">Chat with an Agent?</h2>
              <button 
                onClick={handleAgentClick} 
                className="text-red-500"
              >
                X
              </button>
            </div>
            <p className="mb-4">Send a direct message to an agent on WhatsApp:</p>
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block w-full bg-green-500 text-white p-2 rounded-md text-center"
            >
              Send DM on WhatsApp
            </a>
          </div>
        </div>
      )}

{isDepositPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
    <div className="bg-green-800 p-6 rounded-lg shadow-lg w-96 animate-popIn">
      <h2 className="text-lg font-bold mb-4 text-yellow-400">Deposit Details</h2>

      <p className="mb-2 text-yellow-400">
        <strong>Game Name:</strong> {selectedGame.name}
      </p>
      <p className="mb-2 text-yellow-400">
        <strong>Amount:</strong> NGN {selectedGame.amount}
      </p>
      <p className="mb-2 text-yellow-400">
        <strong>Account Name:</strong> Emavworhe Efemena Mabel
      </p>
      <p className="mb-2 text-yellow-400">
        <strong>Account Bank Name:</strong> Opay (PAYCOM)
      </p>
      <p className="mb-2 text-yellow-400">
        <strong>Account Number:</strong> 9037218378
      </p>
      <p className="mb-2 text-yellow-400">
        <strong>Agent Number:</strong> +2349110520620
      </p>
      <p className="text-sm text-yellow-300 mt-4">
        Please send a confirmation message to the agent after making the payment.
      </p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={toggleDepositPopup}
          className="bg-yellow-400 text-green-800 px-4 py-2 rounded-md hover:bg-yellow-300 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


      {/* Login / Register Modals */}
      {isLoginOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg text-black">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      {error && (
        <p className='text-red-500'>{error}</p>
      )}
      {success && (
        <p className='text-green-500'>{status}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={() => setLoginOpen(false)}
      >
        X
      </button>
    </div>
  </div>
)}

{isOpen && success && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-full">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <FaUserCircle size={50} color="gray" />
          <div>
            <p className="text-2xl font-semibold text-blue-800">{email.split("@")[0]}</p>
            <p className="text-md text-gray-600">{email}</p>
            <p className="text-sm text-yellow-400">Balance: NGN {balance}</p>
          </div>
        </div>
        <button
          className="text-gray-600 text-xl"
          onClick={() => setisOpen(false)}
        >
          X
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            value={email.split("@")[0]}
            readOnly
            className="bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">Balance</label>
          <input
            type="text"
            value={`NGN ${balance}`}
            readOnly
            className="bg-gray-100 text-gray-800 p-2 rounded-md border border-gray-300"
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <button
          onClick={() => alert("Edit Profile")}
          className="w-full bg-yellow-400 text-black p-2 rounded-md hover:bg-yellow-500 transition duration-200"
          disabled={!canAccessProfile}
        >
          Edit Profile
        </button>
        <button
          onClick={() => alert("View Transactions")}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={!canAccessProfile}
        >
          View Transactions
        </button>
      </div>
    </div>
  </div>
)}



{isRegisterOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-md shadow-lg text-black">
      <h2 className="text-lg font-bold mb-4">Register</h2>
      {error && (
        <p className='text-red-500'>{error}</p>
      )}
      {success && (
        <p className='text-green-500'>{success}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
        onClick={() => setRegisterOpen(false)}
      >
        X
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default HCHBetClone;
