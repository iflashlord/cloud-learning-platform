"use client"

import { HelpCircle, Search, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { BRAND_CONFIG } from "@/lib/config"

export const HelpHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          {/* Logo and Title */}
          <div className='flex items-center gap-3'>
            <Link href='/' className='flex items-center gap-2'>
              <Button variant='ghost' size='sm'>
                <Home className='w-4 h-4' />
                Back to {BRAND_CONFIG.PLATFORM_NAME}
              </Button>
            </Link>
            <div className='hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-600' />
            <div className='flex items-center gap-2'>
              <HelpCircle className='w-6 h-6 text-blue-500' />
              <h1 className='text-xl font-bold'>Help Center</h1>
            </div>
          </div>

          {/* Search */}
          <div className='flex-1 max-w-md ml-8'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search help articles...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-10'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
