import Header from './header';
import Footer from './footer'
import Meta from './meta'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto my-14 px-container">{children}</main>
      </div>
      <Footer />
    </>
  )
}
