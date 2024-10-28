import { useEffect, useState } from 'react'

function App() {
  let buttonStart = 'bg-[#9eba6e] p-1   pb-2 px-6  max-w-fit rounded-full text-2xl font-medium'
  let buttonReset = 'bg-[#da9f88] p-1   pb-2 px-5  max-w-fit rounded-full text-2xl font-medium'
  //State for timer
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [startTime, setStartTime] = useState(Date.now)
  //State for Button(true = Start(Timer is stop) / false = Reset(Timer is running ))
  const [isToggled, setIsToggled] = useState(true)

  // useEffect to manage the timer functionality
  useEffect(() => {
    let interval = null;
    // Check if the timer is active (isToggled is false when the timer is running)
    if (!isToggled) {
        interval = setInterval(() => {
        // Calculate the number of seconds that have passed since the start time
        const seconds = (Math.floor((Date.now() - startTime)/1000));
        // Update the elapsed time state
        setElapsedSeconds(() => {
          //If more than 60 seconds have pass reset the timer
          if (seconds > 60) {
            setStartTime(Date.now)
            return 0; // Reset Elapse Time to 0
          }
          return seconds; // Otherwise, update the elapsed time with the current seconds
        });
      }, 1000); //Run interval function every 1 second(1000 miliseconds)
    }  
    // Clean up the interval when the component is unmounted or dependencies change
    return () => {
      clearInterval(interval);
    }
  }, [startTime]) // Restart the effect if startTime changes
  
  
  let handleChange = () => { 
    //toggle button function
    setIsToggled(!isToggled);
    console.log('toggle status: ', isToggled)

    //set timer
    setStartTime(Date.now()); 
    setElapsedSeconds(0)
  }
  
  return (
    <>
      <div className='content-center h-screen bg-[#020b42] text-white'>
        <div className='grid grid-cols-1 justify-items-center content-center'>
          <div className='text-[138px] text font-medium '>{elapsedSeconds}</div>
          <button onClick={handleChange} className= {isToggled? buttonStart : buttonReset} >{isToggled ? 'Start' : 'Reset'}</button>
        </div>
        <center>Funcking test!</center> 
      </div>
    </>
  )
}

export default App
