import { useContext } from "react"
import XhatContext from "../../context/XhatContext"

function Alert() {

    const {alertInfo } = useContext(XhatContext)

  return (
    <div>
        {alertInfo.show && <div className={`${alertInfo.type === "success" ? "bg-gray-700" : "bg-red-950"} fixed top-[60px] z-[30] w-[30%] m-auto left-0 right-0 rounded text-center text-white p-[10px] font-Gupter`}>{alertInfo.message}</div>}
    </div>
  )
}

export default Alert