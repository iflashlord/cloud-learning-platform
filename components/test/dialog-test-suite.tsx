/**
 * Test script to verify dialog close button improvements
 * 
 * This script demonstrates the enhanced dialog components with improved
 * close buttons, keyboard navigation, and accessibility features.
 */

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { NativeDialog, NativeDialogContent, NativeDialogHeader, NativeDialogTitle } from '@/components/ui/native-dialog'
import { Modal } from '@/components/ui/common/Modal'
import { Button } from '@/components/ui/button'

export function DialogTestSuite() {
  const [showRadixDialog, setShowRadixDialog] = useState(false)
  const [showNativeDialog, setShowNativeDialog] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Dialog Close Button Test Suite</h1>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Click the buttons below to test the enhanced dialog components. Each dialog features:
        </p>
        
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Enhanced close button with hover animations and tooltips</li>
          <li>Keyboard navigation (Escape to close, Tab to navigate)</li>
          <li>Better accessibility with screen reader support</li>
          <li>Focus management and trapping</li>
          <li>Consistent styling across all dialog types</li>
        </ul>
        
        <div className="flex gap-4">
          <Button onClick={() => setShowRadixDialog(true)}>
            Test Radix Dialog
          </Button>
          
          <Button onClick={() => setShowNativeDialog(true)}>
            Test Native Dialog
          </Button>
          
          <Button onClick={() => setShowModal(true)}>
            Test Modal Component
          </Button>
        </div>
      </div>

      {/* Radix UI Dialog */}
      <Dialog open={showRadixDialog} onOpenChange={setShowRadixDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enhanced Radix Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses the enhanced DialogCloseButton component with improved styling and accessibility.
              Try pressing Escape to close or hovering over the close button to see the tooltip.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>This dialog demonstrates:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Enhanced close button with animations</li>
              <li>Keyboard navigation support</li>
              <li>Focus trapping within the dialog</li>
              <li>Accessible screen reader labels</li>
            </ul>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowRadixDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowRadixDialog(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Native Dialog */}
      <NativeDialog open={showNativeDialog} onOpenChange={setShowNativeDialog}>
        <NativeDialogContent>
          <NativeDialogHeader>
            <NativeDialogTitle>Enhanced Native Dialog</NativeDialogTitle>
          </NativeDialogHeader>
          
          <div className="space-y-4">
            <p>This native HTML dialog demonstrates the same enhancements:</p>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Consistent close button styling</li>
              <li>Escape key handling</li>
              <li>Focus management</li>
              <li>Hover and animation effects</li>
            </ul>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNativeDialog(false)}>
                Cancel  
              </Button>
              <Button onClick={() => setShowNativeDialog(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </NativeDialogContent>
      </NativeDialog>

      {/* Modal Component */}
      <Modal 
        open={showModal} 
        onOpenChange={setShowModal}
        title="Enhanced Modal"
        description="This modal component uses the enhanced close button system"
        closeButtonVariant="ghost"
      >
        <div className="space-y-4">
          <p>This modal component features:</p>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Consistent close button behavior</li>
            <li>Configurable close button variants</li>
            <li>Enhanced keyboard support</li>
            <li>Better visual feedback</li>
          </ul>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DialogTestSuite