import{ useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import XhatContext from '../../context/XhatContext'

function Register() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [image, setImage] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

  const { showAndHide, userProfile, setUserProfile } = useContext(XhatContext)

  const redirect = useNavigate();
  
  const handleRegistration = async(e) =>{
    e.preventDefault()

    const formData = new FormData()
    formData.append("firstName", firstName)
    formData.append("lastName", lastName)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("confirmPassword", confirmPassword)
    
    if (image) {
      formData.append("image", image)
    }
    try {
      const res = await fetch("http://localhost:8000/xhatya/register", {
          method : "POST",
          body: formData
      })
      const data = await  res.json()
      if (data === "exists") {
          showAndHide("error", "User Already exists")
      }else if(data === "do not match"){
          showAndHide("error", "Password do not match")
      }else if(data === "Invalid password"){
          showAndHide("error", "Password must be atleast 8 character long and must contain one number and one letter")
      }else{
          redirect("/login")
          setUserProfile(data)
          showAndHide("success", "You have successfully registered")
      }
  } catch (error) {
      console.log(error);
      
  }
  }


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="mx-auto xs:w-[90%] sm:w-[30%] border-[2px] p-[5%] bg-stone-200 rounded-[10px] shadow-lg shadow-zinc-400">
        <h1 className="text-[25px] font-extrabold text-center my-[10px]">Register</h1>
        <div className=" ">
          <form onSubmit={handleRegistration} className="flex flex-col">
            <label htmlFor="firstname" className="text-[12px]">
              First name
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="firstname"
              placeholder="FirstName"
              onChange={(e)=> setFirstName(e.target.value)}
            />
            <label htmlFor="Lastname" className="text-[12px]">
              Last name
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="text"
              name="lastname"
              placeholder="LastName"
              onChange={(e)=> setLastName(e.target.value)}
            />
            <label htmlFor="email" className="text-[12px]">
              Email Address
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="email"
              name="email"
              placeholder="Enter your email address"
              onChange={(e)=> setEmail(e.target.value)}
            />
            <label htmlFor="phone" className="text-[12px]">
              Phone Number
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="number"
              name="phone"
              placeholder="Phone Number"
              onChange={(e)=> setPhone(e.target.value)}
            />
            <label htmlFor="phone" className="text-[12px]">
              Profile Image (optional)
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="file"
              accept="/image"
              name="image"
              placeholder="image"
              onChange={(e)=> setImage(e.target.files[0])}
            />
            <label htmlFor="password" className="text-[12px]">
              Password
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e)=> setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword" className="text-[12px]">
              Confirm password
            </label>
            <input
              className="p-[5%] font-Gupter focus:border-[1px] focus:border-stone-600 focus:outline-none bg-inherit border-b-stone-600 border-[2px] mb-6 pb-2"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChange={(e)=> setConfirmPassword(e.target.value)}
            />
            <button className="p-[10px] bg-gray-900 hover:bg-gray-700 my-4 text-white">Register</button>
          </form>
          <p className="text-10px font-Gupter">Already existing user ? <Link to="/login" className="text-blue-700 hover:text-blue-600">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register