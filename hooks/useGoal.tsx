import { Goal } from "@/app/(tabs)/(settings)";
import { createContext } from "react";

type ContextProps = {
    goals: Goal[];
    setGoals: (data: Goal[]) => void;
    current: Goal | null;
    setCurrent: (data: Goal | null) => void;
}

export const GoalContext =  createContext<ContextProps>({
    goals: [],
    setGoals: () => null,
    current: null,
    setCurrent: () => null
});
