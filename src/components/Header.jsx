import { RiWechatPayLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import XhatContext from '../context/XhatContext'
import { useContext } from "react";

function Header() {
  const { isAuthenticated, setUserProfile, userProfile } = useContext(XhatContext)

  const logout = ()=>{
    localStorage.removeItem("auth-token")
    setUserProfile(null)
  }
  console.log(userProfile.firstName);
  
  return (
    <>
    <div className=" flex justify-between font-Arima p-4 bg-slate-800 text-white font-extrabold min-h-10 sticky top-0 left-0 ">
        <div className="flex text-3xl">
        <h1 className="">XhatYa</h1>
        <RiWechatPayLine />
        </div>
        <div className="flex space-x-5">
            {/* <CgProfile className="text-[20px]"/> */}
            <p className="text-white">Hi, {userProfile.firstName}</p>
            {isAuthenticated? <button onClick={logout}>Logout</button>: <Link to='/login'>Login</Link>}
        </div>
    </div>
    </>
  )
}

export default Header