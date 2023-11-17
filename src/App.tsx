import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import Header from './components/Header'
import SearchFilter from './components/searchFilter/SearchFilter'

function App() {
  return (
    <>
      <Header></Header>
      <div className="w-full max-w-[1200px] px-[10px] mx-auto">
        <div className="w-full pt-[1rem] lg:pt-[0.8rem] pb-12 min-h-[70vh]">
          {/* page Title */}
          <h1 className="mb-5 md:mb-2 color-[#212529] text-[20px] md:text-[30px] lg:text-[2em] font-bold">
            Search Used Car Prices
          </h1>
          {/* Search Filter */}
          <SearchFilter></SearchFilter>
        </div>
      </div>
      <Footer></Footer>
      <BackToTop></BackToTop>
    </>
  )
}

export default App
