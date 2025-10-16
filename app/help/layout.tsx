import { HelpHeader } from "@/components/help/help-header"
import { HelpSidebar } from "@/components/help/help-sidebar"

type Props = {
  children: React.ReactNode
}

const HelpLayout = ({ children }: Props) => {
  return (
    <div className='min-h-screen bg-background'>
      <HelpHeader />

      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar */}
          <div className='lg:col-span-1'>
            <HelpSidebar />
          </div>

          {/* Main Content */}
          <div className='lg:col-span-3'>
            <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm border'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpLayout
