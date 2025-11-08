"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Home() {
  const [theme,setTheme]=useState(false)
  const [counter,setCounter] =useState(0);
  const [joke, setJoke] = useState(null)

  useEffect(()=>{
    getJoke()
  },[])

  async function getJoke(){
      try{
        const response=await axios.get("https://official-joke-api.appspot.com/random_joke")
        setJoke(response.data)
      }
      catch(error){
        console.log(error)
      }
    }

  return (
    <div className={`flex flex-col justify-center items-center h-screen gap-2 ${theme ===false? "bg-white":"bg-gray-900"}` }>
   
      {/* jokes */}
      <div >
        { joke ?
        (
          <div className="bg-amber-500 rounded-full p-4 text-center">
            <div>{joke.setup}</div>
            <div>{joke.punchline}</div>
          </div>
        ):
        (
          <div className="bg-amber-500 rounded-full p-2">
            joke loading...
          </div>
        )
      }
      </div>
      
      <div>
        <button className="bg-amber-500 rounded-full p-2" > Next Joke</button>
        <button className="bg-amber-500 rounded-full p-2" 
      onClick={()=>{
        setTheme(prev=>!prev)
        setCounter(counter+1)
      
      }}> {theme===false?"Dark ":"Light "}Theme
      </button>
      </div>
      
    </div>
  );
}
