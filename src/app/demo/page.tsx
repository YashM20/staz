import React from 'react'

const page = (props: object) => {
  return (
    <section className="bg-neutral-900">
      <div className="bg-neutral-900 p-4 text-neutral-50 md:p-12">
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-between bg-neutral-950 p-6 md:h-80 md:p-9">
            <h2 className="text-4xl uppercase leading-tight">
              <span className="text-neutral-400 transition-colors duration-500 group-hover:text-emerald-300">Join our</span>
              <br/>Weekly Newsletter</h2>
            <div className="flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z">
                </path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z">
                </path>
              </svg>
              <span>your.beehiiv.com</span>
            </div>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 text-2xl text-neutral-400 transition-colors duration-500 group-hover:text-emerald-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <line x1="7" y1="17" x2="17" y2="7">
              </line>
              <polyline points="7 7 17 7 17 17">
              </polyline>
            </svg>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>12 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">The Framer Motion Crash Course</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&amp;w=2264&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>5 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Horizontal Scroll Animations</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&amp;w=2379&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border-x border-b border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>12 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Staggered Text Animations</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1563089145-599997674d42?q=80&amp;w=2370&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>14 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Complex Sequence Animations</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
              // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&amp;w=2487&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>13 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Parallax Effects</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&amp;w=2487&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-700 border-x border-b border-neutral-700 md:grid-cols-3 md:divide-x md:divide-y-0">
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>11 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">On-Scroll Reveal Animation</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&amp;w=2370&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>21 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Advanced Sortable Drag &amp; Drop</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&amp;w=2487&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
          <a href="#" target="_blank" className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-neutral-950 md:h-80 md:p-9">
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-neutral-400 transition-colors duration-500 group-hover:text-neutral-50">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-base" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="7">
                </circle>
                <polyline points="12 9 12 12 13.5 13.5">
                </polyline>
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83">
                </path>
              </svg>
              <span>7 min</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight transition-transform duration-500 group-hover:-translate-y-3">Advanced Framer Motion Tips</h2>
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="absolute right-3 top-4 z-10 text-2xl text-neutral-400 transition-colors group-hover:text-neutral-50" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z">
              </path>
              <circle cx="12" cy="12" r="3">
              </circle>
            </svg>
            <div className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
            // style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506259091721-347e791bab0f?q=80&amp;w=2370&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center'}}
             >
            </div>
            <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
            <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-emerald-300 transition-all duration-500 group-hover:scale-100">
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default page