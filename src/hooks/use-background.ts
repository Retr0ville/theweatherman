import { useOutletContext } from "react-router-dom";
import { ActiveBackgroundEnum } from "../enums/ActiveBackgroundEnum";

type ContextType = { setActiveBackground: React.Dispatch<React.SetStateAction<ActiveBackgroundEnum>> };

export function useBackground() {
  return useOutletContext<ContextType>();
}