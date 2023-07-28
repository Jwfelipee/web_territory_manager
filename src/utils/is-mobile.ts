export const isMobileWidthSize = () => {
   if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 768) {
         return true;
      }
      return false;
   }
   return false;
}