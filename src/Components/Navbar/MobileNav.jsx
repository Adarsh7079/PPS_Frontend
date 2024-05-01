import React, { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import {links} from "../../utils/link"
import { Link } from "react-router-dom";

const MobileNav = () => {
  const [activeId, setActiveId] = useState(null);

  const togglerFunction = (index) => {
    if (activeId === index) {
      setActiveId(null);
    } else {
      setActiveId(index);
    }
  };

  return (
    <div>
      <section className="">
        <div className=" flex overflow-auto">
          <div className="w-full flex flex-col ">
            {links.map((item, i) => (
              <div key={i} className=" border-b-2">
                <div
                  className={` py-4 flex flex-col px-2 justify-between ${
                    activeId === i ? "bg-white" : "bg-gray-100"
                  }`}
                  onClick={() => togglerFunction(i)}
                >   
                  <div className=" flex">
                     <div className=" w-full flex justify-between">
                         <p className="">{item.name}</p>
                         <div>
                         {
                            activeId === i ?(
                            <div className=" bg-gray-100 w-full p-2 rounded-full">
                                 <IoIosArrowUp className=" text-blue-300 font-extrabold  text-"/>
                            </div>):(
                                <div className=" bg-gray-200 w-full p-2 rounded-full">
                                <MdKeyboardArrowDown className=" text-blue-300 font-extrabold  text-"/>
                           </div>
                            )
                         }
                         </div>
                        
                     </div>
                  </div>
                  <span className=" flex flex-row">
                    {activeId === i ? (
                        <div className=" flex justify-betwee">
                            <div className="flex flex-col mx-5">
                            {
                                item.sublinks.map((item,index)=>(
                                   <Link className=" w-full" to={item.link}>{item.Head}</Link>
                                ))
                            }
                            </div>
                         
                        </div>
                    
                    ) : (
                     <p></p>
                    )}
                  </span>
                </div>
               
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MobileNav;
