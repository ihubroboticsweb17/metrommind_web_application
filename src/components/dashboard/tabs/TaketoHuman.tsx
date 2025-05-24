import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
const TaketoHuman = () => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const handleSheetOpenChange = (open: boolean) => {
      setIsSheetOpen(open);
    };
  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
       <SheetTrigger >

       </SheetTrigger>
         <SheetContent className="w-[400px] sm:max-w-md dark:bg-metro-dark-highlight dark:border-metro-dark-border backdrop-blur-lg">
          haii
         </SheetContent>
    </Sheet>
  )
}

export default TaketoHuman
