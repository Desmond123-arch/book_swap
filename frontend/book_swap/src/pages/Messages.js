import profile from "../images/pica.gif"
import { useState } from "react";
export default function Messages() {
    const [showMessage, setShowMessage] = useState(false);

    const buttonClicked = () => {
        setShowMessage(!showMessage);
    }

    return (
        <div className="w-[95%] mx-auto flex gap-20">
            <button className={` w-[95%] md:w-1/4  ${!showMessage ? 'block' : 'hidden md:block'} `} onClick={buttonClicked}>
                <div className="w-[85%] md:w-full my-4 flex items-center justify-center mx-auto md:mx-0">
                    <label htmlFor="search" className="block mb-1 text-gray-600 font-bold text-lg hidden">Search</label>
                    <input type="search" id="search" name="search" className="text-md rounded-lg block w-full p-2 text-gray-700 border border-gray-400" placeholder="&#x1F50E; Search" />
                </div>
                <div className="flex gap-4">
                    <div className=" w-[4rem] h-[4rem] border border-black rounded-full" >
                        <img className="w-full h-full rounded-full align-middle object-fill object-center" src={profile} alt="Rounded avatar" width={64} />
                    </div>
                    <div>
                        <h1 className="font-bold">Jen</h1>
                        <p className=" text-gray-400">I'm looking for a book on cooking</p>
                    </div>
                </div>
            </button>
            <div className={`md:w-2/4 self-center md:block ${showMessage ? 'block mx-auto w-[90%] md:mx-0' : 'hidden'}`}>
                <div className="flex items-center">
                    <h1 className="font-semibold text-gray-400 text-center mx-auto"> Today </h1>
                    <button className={` text-black text-md self-end justify-self-end ${!showMessage? 'hidden': 'block md:hidden'}`} onClick={buttonClicked}>&#967;</button>
                </div>
                <div className="flex flex-col">
                    <div>
                        <h1 className="font-bold text-black">Jen</h1>
                        <p>Do you have books on cooking?</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-black">John</h1>
                        <p>Hi, Jen  i do have a book on itailian cooking</p>
                    </div>
                    <div>
                        <div className="w-[85%] md:w-[70%] mb-4">
                            <label htmlFor="message" className="block mb-1 text-gray-600 font-bold text-lg self-start hidden">Message</label>
                            <div className="relative">
                                <input type="message" id="message" name="message" className="text-sm rounded-xl block w-full p-2 text-gray-700 border border-gray-400" />
                                <button className="text-sm rounded-xl block mx-auto p-2 px-5 w-max border border-gray-400 bg-orange-500 font-bold text-white absolute top-0 right-0">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}