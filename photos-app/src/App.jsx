import React, { useEffect, useState } from 'react'
import axious from 'axios'

const App = () => {
  // https://picsum.photos/v2/list?page=2&limit=100

  const [userData, setUserData] = useState([]);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return (window.removeEventListener("scroll", handleScroll));
  }, []);

  const data = async ()=>{
    const response = await axious.get(`https://picsum.photos/v2/list?page=2&limit=100`)
    setUserData(response.data);
  }
  useEffect(function(){
    data()
  }, [])

  let printUserData = 'loading'
  if(printUserData.length > 0){
    printUserData = userData.map(function(elem, idx){
      return(
        <div
        key={idx}>
          <img
          className='h-70 w-85 rounded-2xl overflow-hidden cursor-pointer' 
          src={elem.download_url} alt="" />
          <h2 
          className='pl-1 pt-0.5'>
            {elem.author}
          </h2>
        </div>
      )
    })
  }

  return (
    <div 
    className='text-white bg-[#111] min-h-screen'>
      <h1
      className={
        `text-center font-bold text-4xl tracking-widest font-[Piedra] py-5 w-full z-99
        ${isFixed
          ? "fixed top-0 bg-black/60 backdrop-blur-md shadow-md"
          : "relative bg-transparent"}`
      }
    >
      Photos
    </h1>
      <div 
      className='flex flex-wrap gap-8 justify-center font-[Ubuntu] text-xl'>
        {printUserData}
      </div>
    </div>
  )

}

export default App