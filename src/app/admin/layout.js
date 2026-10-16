import React from 'react'
import Provider from './Provider'


export const metadata = {
    title: "Nivini Admin panel"
}
export default function layout({ children }) {

    return (
        <html
            lang="en"
            className='h-full'
        >

            <body className=" font-normal"> <Provider>{children}</Provider></body>

        </html>
    )
}

