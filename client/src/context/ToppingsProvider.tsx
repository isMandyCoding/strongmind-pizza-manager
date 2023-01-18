import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";

export type Topping = {
  id: number;
  name: string;
};

type ToppingsContextType = {
  toppings: Topping[];
  getToppings: () => Promise<Topping[]>;
  setToppings?: Dispatch<SetStateAction<Topping[]>>;
  isToppingsLoading: boolean;
  isToppingsError: boolean;
};

export const ToppingsContext = createContext<ToppingsContextType>({
  toppings: [],
  getToppings: async () => [],
  isToppingsLoading: false,
  isToppingsError: false,
});

export interface ToppingsProviderProps {
  children?: ReactNode;
}

const ToppingsProvider = ({ children }: ToppingsProviderProps) => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [isToppingsLoading, setIsToppingsLoading] = useState(true);
  const [isToppingsError, setIsToppingsError] = useState(false);

  const getToppings = async (): Promise<Topping[]> => {
    try {
      setIsToppingsLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/toppings`
      );
      setToppings(result.data);
      setIsToppingsLoading(false);
      if (result.data instanceof Array) {
        return result.data;
      }
      throw new Error();
    } catch (error) {
      setIsToppingsLoading(false);
      setIsToppingsError(true);
      return [];
    }
  };

  const value = {
    toppings,
    getToppings: useCallback(getToppings, []),
    isToppingsLoading,
    isToppingsError,
    setToppings,
  };
  return (
    <ToppingsContext.Provider value={value}>
      {children}
    </ToppingsContext.Provider>
  );
};

export default ToppingsProvider;
