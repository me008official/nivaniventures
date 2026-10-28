
import Sidebar from '@/component/admin/layout/Sidebar'
import React from 'react'
import Provider from './Provider'

export default function page() {
  return (
    <div>
      <Provider>
        <Sidebar />
      </Provider>
    </div>
  )
}

// import React from 'react'

// export default function page() {
//   return (
//     <div  className='w-full h-full h-screen flex justify-center items-center'>
//       <p> This page is under construction </p>
//     </div>
//   )
// }
