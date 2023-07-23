import { useEffect } from 'react';

function useUnFocus(elementRefs: React.MutableRefObject<any>[], toggler: () => void) {
  useEffect(() => {
    if (elementRefs.length) {
      document.addEventListener('click', handleClickOut, false);
      return () => document.removeEventListener('click', handleClickOut, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRefs]);

  const handleClickOut = (e: any) => {
    e.stopPropagation();
    let shouldToggle: boolean = elementRefs.every(elementRef => !elementRef?.current?.contains(e.target));

    shouldToggle && toggler();
  };
}

export default useUnFocus;
