import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative w-40 h-40">
        <div className="w-full h-full rounded-full flex items-center justify-center text-[10rem]">
          <span className="shadow-text">H</span>
          <span className="animate-jump shadow-text">2</span>
          <span className="shadow-text">O</span>
        </div>
        <div className="absolute mt-5 w-full text-center text-primaryUser text-sm font-bold">
            <span className="animate-pulse">Loading...</span>
            <div className="absolute mt-2 left-0 right-0 h-1 bg-dark">
              <div className="w-1/6 h-full bg-gradient-to-r from-primaryUser to-primaryBusiness animate-slide"></div>
            </div>
          </div>
        <div className="absolute w-12 h-12 rounded-full animate-orbit">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <path
                id="search-a"
                d="M11.7099609,0.572509766 C9.46940104,1.29012044 7.99951172,3.05419922 7.30029297,5.86474609 C6.25146484,10.0805664 4.95166016,10.6181641 0.719970703,9.11865234 C2.23974609,11.9257813 5.32006836,13.0512695 7.30029297,13.0512695 C9.28051758,13.0512695 14.4091797,10.2941895 13.8215332,5.0534668 C13.3114421,3.52709961 12.6075846,2.03344727 11.7099609,0.572509766 Z"
              />
              <path
                id="search-c"
                d="M14.1791377,12.7701494 L19.7100661,18.3101411 C20.0966446,18.6967197 20.0966446,19.3234875 19.7100661,19.7100661 C19.3234875,20.0966446 18.6967197,20.0966446 18.3101411,19.7100661 L12.7803471,14.1712106 C11.4385246,15.2160226 9.75152329,15.8383427 7.91917136,15.8383427 C3.54553379,15.8383427 0,12.2928089 0,7.91917136 C0,3.54553379 3.54553379,0 7.91917136,0 C12.2928089,0 15.8383427,3.54553379 15.8383427,7.91917136 C15.8383427,9.74688445 15.2191696,11.4299819 14.1791377,12.7701494 Z M7.91917136,13.8585499 C11.1993995,13.8585499 13.8585499,11.1993995 13.8585499,7.91917136 C13.8585499,4.63894318 11.1993995,1.97979284 7.91917136,1.97979284 C4.63894318,1.97979284 1.97979284,4.63894318 1.97979284,7.91917136 C1.97979284,11.1993995 4.63894318,13.8585499 7.91917136,13.8585499 Z"
              />
            </defs>
            <g fill="none" fillRule="evenodd" transform="translate(2 2)">
              <g transform="translate(1 2)">
                <mask id="search-b" fill="#ffffff">
                  <use xlinkHref="#search-a" />
                </mask>
                <use fill="#D8D8D8" xlinkHref="#search-a" />
                <g fill="#4B99FA" mask="url(#search-b)">
                  <rect width="24" height="24" transform="translate(-3 -4)" />
                </g>
              </g>
              <mask id="search-d" fill="#ffffff">
                <use xlinkHref="#search-c" />
              </mask>
              <use fill="#000000" fillRule="nonzero" xlinkHref="#search-c" />
              <g fill="#DC9832" mask="url(#search-d)">
                <rect width="24" height="24" transform="translate(-2 -2)" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;
