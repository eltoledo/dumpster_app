 
 'use client'
import "./globals.css";   
 

 


export default  function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {   
  
    return (
        <html>
        <body className="min-h-screen bg-gray-100 text-gray-900">
         {children}
        </body>
        </html>
    );
}