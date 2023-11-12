const Index = () => {
  return (
    <div className="mt-10 py-[1.5rem] border-t border-t-[#dddddd]">
      <div className="w-full max-w-[1200px] mx-auto flex items-center">
        {/* Footer Links */}
        <div className="grow-0 shrink-0 basis-1/3 max-w-[33.33333%] px-[10px] text-[0.9rem] ">
          <a
            href="https://pricespeoplepay.com.au/sitemap"
            className="text-[#00a0df] no-underline"
          >
            Sitemap
          </a>
          <span className="text-[##6c757d] mx-[5px] my-[0.6rem]">|</span>
          <a
            href="https://pricespeoplepay.com.au/privacy-policy"
            className="text-[#00a0df] no-underline"
          >
            Privacy Policy
          </a>
          <span className="text-[##6c757d] mx-[5px] my-[0.6rem]">|</span>
          <a
            href="https://pricespeoplepay.com.au/terms-condition"
            className="text-[#00a0df] no-underline"
          >
            Terms & Conditions
          </a>
        </div>

        {/* Footer Logo */}
        <div className="flex grow-0 shrink-0 basis-1/3 max-w-[33.33333%] px-[10px] items-center justify-center">
          <svg width="29px" height="49px" className="mr-4 -mt-3">
            <path
              fill-rule="evenodd"
              fill="rgb(255, 90, 96)"
              d="M-0.000,48.996 L-0.000,22.400 L5.296,17.197 L11.869,17.197 L16.634,22.400 L16.634,48.996 L-0.000,48.996 ZM4.579,39.167 C4.579,39.814 5.102,40.339 5.748,40.339 C6.393,40.339 6.916,39.814 6.916,39.167 C6.916,38.519 6.393,37.994 5.748,37.994 C5.102,37.994 4.579,38.519 4.579,39.167 ZM8.323,21.820 C6.914,21.820 5.771,22.988 5.771,24.428 C5.771,25.869 6.914,27.036 8.323,27.036 C9.733,27.036 10.875,25.869 10.875,24.428 C10.875,22.988 9.733,21.820 8.323,21.820 ZM11.447,37.994 C10.815,37.994 10.303,38.519 10.303,39.167 C10.303,39.814 10.815,40.339 11.447,40.339 C12.080,40.339 12.592,39.814 12.592,39.167 C12.592,38.519 12.080,37.994 11.447,37.994 ZM13.342,41.542 C12.986,41.401 12.572,41.551 12.417,41.877 C11.739,43.311 10.135,44.238 8.332,44.238 C6.486,44.238 4.873,43.312 4.222,41.879 C4.110,41.631 3.848,41.482 3.572,41.482 C3.482,41.482 3.391,41.498 3.303,41.531 C2.944,41.668 2.773,42.044 2.923,42.372 C3.793,44.287 5.916,45.524 8.332,45.524 C10.697,45.524 12.807,44.293 13.709,42.388 C13.863,42.062 13.699,41.683 13.342,41.542 Z"
            ></path>
            <path
              fill-rule="evenodd"
              fill="rgb(166, 166, 166)"
              d="M10.555,23.316 C10.555,23.316 8.032,24.928 9.169,22.349 C9.161,22.383 12.784,18.315 15.779,17.406 C15.844,17.387 15.924,17.445 15.987,17.428 C15.993,17.406 16.277,17.872 14.180,19.663 L14.713,20.307 C14.713,20.307 16.774,18.875 18.018,16.654 C18.018,16.654 18.729,15.043 29.000,13.861 L28.680,13.109 C28.680,13.109 22.567,13.467 19.298,14.935 C19.298,14.935 22.176,10.315 22.603,7.951 C22.603,7.951 24.167,3.546 24.202,0.107 L23.456,-0.000 C23.456,-0.000 22.994,5.802 20.577,10.422 C20.577,10.422 19.333,13.109 18.338,14.828 C18.342,14.779 18.211,15.507 15.430,16.481 C14.767,17.063 11.515,18.272 8.529,21.382 C8.529,21.382 6.823,23.638 8.743,24.820 C8.743,24.820 9.880,25.107 10.982,24.176 L10.555,23.316 Z"
            ></path>
          </svg>
          <span>© 2023 Copyright Prices People Pay</span>
        </div>

        {/* Social Icons */}
        <div className="flex grow-0 shrink-0 basis-1/3 max-w-[33.33333%] justify-end">
          <a
            href="https://www.facebook.com/pricespeoplepay/?ref=br_rs"
            target="_blank"
            className="ml-[0.5rem]"
          >
            <img
              src="./facebook_icon.png"
              alt="Facebook"
              className="max-w-[38px]"
            ></img>
          </a>
          <a
            href="https://www.instagram.com/pricespeoplepay/"
            target="_blank"
            className="ml-[0.5rem]"
          >
            <img
              src="./instagram_icon.png"
              alt="Facebook"
              className="max-w-[38px]"
            ></img>
          </a>
          <a
            href="http://linkedin.com/company/pricespeoplepay/"
            target="_blank"
            className="ml-[0.5rem]"
          >
            <img
              src="./linkedin_icon.png"
              alt="Facebook"
              className="max-w-[38px]"
            ></img>
          </a>
          <a
            href="https://twitter.com/PricesPeoplePay"
            target="_blank"
            className="ml-[0.5rem]"
          >
            <img
              src="./twitter_icon.png"
              alt="Facebook"
              className="max-w-[38px]"
            ></img>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Index
