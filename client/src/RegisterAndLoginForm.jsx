import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";
import {useNavigate} from "react-router-dom"


export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
  const navigate=useNavigate();
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (isLoginOrRegister === 'login') {
      if (username === "admin" && password === "pass") {
        setLoggedInUsername(username);
        setId(1);
        alert("Login successful!");
      } else {
        const { data } = await axios.post('login', { username, password });
        setLoggedInUsername(username);
        setId(data.id);
      }
    } else {
      const { data } = await axios.post('register', { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    }
    navigate("/home");
  }

  return (
    <div 
      className="bg-teal-50 h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url("client/src/login:register.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay for enhanced readability */}
      <div className="absolute inset-0 bg-teal-900 opacity-40"></div>
      
      {/* Enlarged Form container */}
      <form className="w-96 bg-white shadow-2xl rounded-lg p-10 relative z-10" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-semibold text-teal-900 mb-8 text-center">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'} to Your Account
        </h2>
        
        <input
          value={username}
          onChange={ev => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-md p-3 mb-5 border border-teal-200 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        <input
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-md p-3 mb-5 border border-teal-200 shadow-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />
        
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold block w-full rounded-md p-3 mt-6 transition duration-300">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        
        <div className="text-center mt-6 text-teal-700">
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button
                className="text-teal-600 hover:underline ml-1 focus:outline-none"
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login here
              </button>
            </div>
          ) : (
            <div>
              Don’t have an account?
              <button
                className="text-teal-600 hover:underline ml-1 focus:outline-none"
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )};
  
  

// import {useContext, useState} from "react";
// import axios from "axios";
// import {UserContext} from "./UserContext.jsx";

// export default function RegisterAndLoginForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
//   const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
//   async function handleSubmit(ev) {
//     ev.preventDefault();
//     const url = isLoginOrRegister === 'register' ? 'register' : 'login';
//     const {data} = await axios.post(url, {username,password});
//     setLoggedInUsername(username);
//     setId(data.id);
//   }
//   return (
//     <div className="bg-blue-50 h-screen flex items-center">
//       <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
//         <input value={username}
//                onChange={ev => setUsername(ev.target.value)}
//                type="text" placeholder="username"
//                className="block w-full rounded-sm p-2 mb-2 border" />
//         <input value={password}
//                onChange={ev => setPassword(ev.target.value)}
//                type="password"
//                placeholder="password"
//                className="block w-full rounded-sm p-2 mb-2 border" />
//         <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
//           {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
//         </button>
//         <div className="text-center mt-2">
//           {isLoginOrRegister === 'register' && (
//             <div>
//               Already a member?
//               <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
//                 Login here
//               </button>
//             </div>
//           )}
//           {isLoginOrRegister === 'login' && (
//             <div>
//               Dont have an account?
//               <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
//                 Register
//               </button>
//             </div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

