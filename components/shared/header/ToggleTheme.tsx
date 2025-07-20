'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from 'next-themes'
import {SunIcon, MoonIcon, SunMoon} from 'lucide-react'
import { Button } from '@/components/ui/button';
function ToggleTheme() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    useEffect(()=>
        {
            setMounted(true);
    }, [])
    if(!mounted)
        return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className='focus-visible:ring-0 focus-visible:ring-offset-0'>{theme === 'system'? <SunMoon/>: theme === 'dark'? <MoonIcon/> : <SunIcon/>}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onCheckedChange={() => setTheme('system')}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onCheckedChange={() => setTheme('dark')}
        >
          dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onCheckedChange={() => setTheme('light')}
        >
          light
        </DropdownMenuCheckboxItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ToggleTheme
