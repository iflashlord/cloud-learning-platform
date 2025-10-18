/**
 * Close Button Position Test
 * 
 * This component helps test and verify that close buttons are fully visible
 * in different dialog configurations.
 */

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { NativeDialog, NativeDialogContent, NativeDialogHeader, NativeDialogTitle } from '@/components/ui/native-dialog';
import { Button } from '@/components/ui/button';

export function CloseButtonPositionTest() {
  const [showDialog, setShowDialog] = useState(false);
  const [showNativeDialog, setShowNativeDialog] = useState(false);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Close Button Position Test</h1>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          Test the close button positioning in different dialog types to ensure they are fully visible:
        </p>
        
        <div className="flex gap-4">
          <Button onClick={() => setShowDialog(true)}>
            Test Radix Dialog
          </Button>
          
          <Button onClick={() => setShowNativeDialog(true)}>
            Test Native Dialog
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 space-y-2">
          <p>✅ The close button should be fully visible in the top-right corner</p>
          <p>✅ The close button should not be cut off or partially hidden</p>
          <p>✅ The close button should have proper spacing from the dialog edges</p>
          <p>✅ Hover over the close button to see the tooltip</p>
        </div>
      </div>

      {/* Radix Dialog Test */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Close Button Position Test</DialogTitle>
            <DialogDescription>
              Check if the close button (X) in the top-right corner is fully visible and not cut off.
              The button should be completely within the dialog boundaries.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-sm text-red-800">
                <strong>Test Instructions:</strong>
              </p>
              <ul className="text-sm text-red-700 mt-2 space-y-1">
                <li>• Look at the top-right corner of this dialog</li>
                <li>• The X button should be fully visible</li>
                <li>• No part should be cut off or hidden</li>
                <li>• Hover to see the tooltip</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setShowDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Native Dialog Test */}
      <NativeDialog open={showNativeDialog} onOpenChange={setShowNativeDialog}>
        <NativeDialogContent>
          <NativeDialogHeader>
            <NativeDialogTitle>Native Dialog Position Test</NativeDialogTitle>
          </NativeDialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-sm text-blue-800">
                <strong>Native Dialog Test:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Close button should be fully visible</li>
                <li>• Should have proper spacing from edges</li>
                <li>• Should work with keyboard (Escape key)</li>
                <li>• Tooltip should appear on hover</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setShowNativeDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </NativeDialogContent>
      </NativeDialog>
    </div>
  );
}

export default CloseButtonPositionTest;