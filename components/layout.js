import Header from './header';
import Footer from './footer'
import Meta from './meta'

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen container mx-auto">
        <Header />
        <main className="mx-24">{children}</main>
      </div>
      <Footer />
    </>
  )
}
