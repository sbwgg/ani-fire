"use client";

import { useParams, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const INITIAL_STATE = {
    isMenuOpen: false,
    isSearchOpen: false,
    toggleMenu: () => {},
    toggleSearch: () => {},
    closeMenu: () => {},
}

const MenuContext = createContext(INITIAL_STATE)

const MenuProvider = ({ children } : { children: React.ReactNode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const params = useSearchParams();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    useEffect(() => {
        setIsMenuOpen(false)
    }, [params])

    useEffect(() => {
        if(isMenuOpen === true) {
            setIsSearchOpen(false)
        }
    }, [isMenuOpen])

    useEffect(() => {
        if (isMenuOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isMenuOpen]);

      return (
        <MenuContext.Provider
        value={{
            isMenuOpen,
            isSearchOpen,
            toggleMenu,
            toggleSearch,
            closeMenu,
        }}
        >
            {children}
        </MenuContext.Provider>
      )
}

export { MenuContext, MenuProvider };