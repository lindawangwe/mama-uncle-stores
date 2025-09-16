import { createContext, ReactNode, useContext, useEffect, useState } from "react"

    type SidebarProviderProps = {
        children: ReactNode
    }
    
    type SidebarContextType = {
        isSidebarOpen:boolean;
        isLargeOpen: boolean;
        isSmallOpen: boolean;
        toggle: () => void;
        close: () => void;
        toggleSidebar : () => void;
        closeSidebar : () => void;
    }
    
    const SidebarContext = createContext<SidebarContextType | null >(null)
    
    export function useSidebarContext(){
        const value = useContext(SidebarContext)
    
        if (value == null) throw Error ("Only use in sidebar contexts")
    
        return value
    }
    
    export function SidebarProvider({children}:SidebarProviderProps){
        const [isLargeOpen, setIsLargeOpen] = useState(false);
        const [isSmallOpen, setIsSmallOpen] = useState(false);
        const[isSidebarOpen, setIsSidebarOpen] = useState(false);
    
        useEffect(() => {
            const handler = () => {
              if (!isScreenSmall()) setIsSmallOpen(false)
            }
        
            window.addEventListener("resize", handler)
        
            return () => {
              window.removeEventListener("resize", handler)
            }
          }, [])
    
    
        function isScreenSmall() {
            return window.innerWidth < 1024;
        }
    
        function toggle () {
            if (isScreenSmall()) {
                setIsSmallOpen(s => !s)
            }
            else {
                setIsLargeOpen(l => !l)
            }
    
        }
    
        function close () {
            if (isScreenSmall()) {
                setIsSmallOpen(false)
            }
            else {
                setIsLargeOpen(false)
            }
        }
        
        function toggleSidebar() {

            const newSidebarState = !isSidebarOpen;
            setIsSidebarOpen(newSidebarState);
            
            if (isScreenSmall()) {
                setIsSmallOpen(newSidebarState);
                setIsLargeOpen(false);
            } else {
                setIsLargeOpen(newSidebarState);
                setIsSmallOpen(false);
            }
        }
        
          function closeSidebar() {
            setIsSidebarOpen(false);
            setIsSmallOpen(false);
            setIsLargeOpen(false);
          }
    
        return <SidebarContext.Provider value={{
            isSidebarOpen,
            isLargeOpen,
            isSmallOpen,
            toggle, 
            close,
            toggleSidebar,
            closeSidebar
        }}>
                {children}
        </SidebarContext.Provider>
    }