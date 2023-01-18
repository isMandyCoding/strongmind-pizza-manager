import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Topping } from "./ToppingsProvider";

export type Pizza = {
  id: number;
  name: string;
  toppings: Topping[];
};

export interface PizzasProviderProps {
  children?: ReactNode;
}

type PizzasContextType = {
  pizzas: Pizza[];
  getPizzas: () => Promise<Pizza[]>;
  setPizzas?: Dispatch<SetStateAction<Pizza[]>>;
  isPizzasLoading: boolean;
  isPizzasError: boolean;
};

export const PizzasContext = createContext<PizzasContextType>({
  pizzas: [],
  getPizzas: async () => [],
  isPizzasLoading: false,
  isPizzasError: false,
});

const PizzasProvider = ({ children }: PizzasProviderProps) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [isPizzasLoading, setIsPizzasLoading] = useState(false);
  const [isPizzasError, setIsPizzasError] = useState(false);

  const getPizzas = async (): Promise<Pizza[]> => {
    try {
      setIsPizzasLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/pizzas`
      );
      setIsPizzasLoading(false);
      if (result.data instanceof Array) {
        setPizzas(result.data);
        return result.data;
      }
      throw new Error();
    } catch (error) {
      setIsPizzasLoading(false);
      setIsPizzasError(true);
      return [];
    }
  };

  const value = {
    pizzas,
    getPizzas: useCallback(getPizzas, []),
    setPizzas,
    isPizzasLoading,
    isPizzasError,
  };
  return (
    <PizzasContext.Provider value={value}>{children}</PizzasContext.Provider>
  );
};

export default PizzasProvider;
