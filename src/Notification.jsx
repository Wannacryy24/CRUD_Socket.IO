import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export default function Notification({socket}) {
    const [isData, setIsData] = useState(false);
    

    useEffect(()=>{
        socket.on('notification',(data)=>{
            console.log(data);
            setIsData(data);
            toast(data.message);
        })

        return ()=> socket.off('notification');
    },[])

  return (
    <>
        <div>
            {/* {isData && (<p>{isData.message}</p>)} */}
            {/* <ToastContainer/> */}
        </div>
    </>
  )
}
