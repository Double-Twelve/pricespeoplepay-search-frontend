import { useEffect, useState } from 'react'
import { Button } from './ui/Button'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          className={`bg-[#00a0df] hover:bg-[#00a0df] hover:right-0 rounded-tl-[7px] border border-[#ffffff4d] fixed bottom-[120px] border-r-0 flex transition-all duration-200 shadow-[0_3px_0_(99,114,130,0.40)] p-0 h-fit ${
            isVisible ? 'right-[-63px]' : 'right-[-122px]'
          }`}
          onClick={scrollToTop}
        >
          <span className="px-[15px] py-[10px]">
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px">
              <defs>
                <filter
                  filterUnits="userSpaceOnUse"
                  id="Filter_0"
                  x="0px"
                  y="0px"
                  width="25px"
                  height="25px"
                >
                  <feOffset in="SourceAlpha" dx="0.669" dy="0.743"></feOffset>
                  <feGaussianBlur
                    result="blurOut"
                    stdDeviation="1.414"
                  ></feGaussianBlur>
                  <feFlood
                    floodColor="rgb(0, 0, 0)"
                    result="floodOut"
                  ></feFlood>
                  <feComposite
                    operator="atop"
                    in="floodOut"
                    in2="blurOut"
                  ></feComposite>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.22"></feFuncA>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#Filter_0)">
                <path
                  fillRule="evenodd"
                  fill="rgb(255, 255, 255)"
                  d="M2.187,12.875 L9.687,5.437 L9.687,21.688 L12.313,21.688 L12.313,5.437 L19.750,12.875 L21.688,11.000 L11.000,0.312 L0.312,11.000 L2.187,12.875 Z"
                ></path>
              </g>
            </svg>
          </span>
          <span className="px-[15px] py-[10px] text-white border-l border-l-[#ffffff4d] block">
            TOP
          </span>
        </Button>
      )}
    </>
  )
}

export default BackToTop
