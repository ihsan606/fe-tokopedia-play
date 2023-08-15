import Header from "../components/header"

type MainLayoutProps = {
    children: React.ReactNode,
    className?: string,
    backgroundColor: string,
    bgImage?: any,
    showHeader: boolean,
};
  

const MainLayout = ({children, className, backgroundColor, bgImage, showHeader}: MainLayoutProps) => {
  return (
    <div style={{backgroundImage: `url(${bgImage})`, objectFit: 'scale-down', backgroundRepeat: 'no-repeat'}} className={`${backgroundColor} w-screen h-screen overflow-y-auto overflow-x-scroll  text-white ${className}`} >
        <Header show={showHeader} className={backgroundColor}/>
        <main className="p-0 lg:px-6 xl:px-6 md:px-5">
            {children}
        </main>
    </div>
  )
}

export default MainLayout