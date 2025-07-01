import './globals.css'
export const metadata = {
  title: 'CRM Clientes',
  description: 'Cartera de clientes y créditos'
}

export default function RootLayout({ children }) {

  
  return (
    <html lang="es">
      <body className="bg-[#1a1a1a] text-white min-h-screen">
        <div className="flex flex-col md:flex-row">
          
          <main className="flex-1 p-4">{children}</main>
        </div>
      </body>
    </html>
  )
}
