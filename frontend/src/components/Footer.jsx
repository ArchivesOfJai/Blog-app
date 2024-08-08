import React from 'react'
import '../css/footer.css'

export default function Footer() {
  return (
   <>
    <footer>
        <div className="container-fluid fixed-bottom ">
            <p className='my-2'>&copy; Copyright {new Date().getFullYear()} </p>
        </div>
    </footer>
   </>
  )
}
