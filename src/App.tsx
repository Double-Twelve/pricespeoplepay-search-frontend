import Footer from './components/footer'
import Header from './components/header'
import SearchFilter from './components/searchFilter'

function App() {
  return (
    <>
      <Header></Header>
      <div className="w-full max-w-[1200px] px-[10px] mx-auto">
        <div className="w-full pt-[0.8rem] pb-12 min-h-[70vh]">
          {/* page title */}
          <h1 className="mb-2 color-[#212529] text-[2em] font-bold">
            Search Used Car Prices
          </h1>

          {/* search filter */}
          <SearchFilter></SearchFilter>
        </div>
      </div>
      <Footer></Footer>
    </>
  )
}

export default App
