import { Goal } from "@/app/(tabs)/(settings)";
import { createContext } from "react";

type ContextProps = {
    goals: Goal[];
    setGoals: (data: Goal[]) => void;
}

export const GoalContext =  createContext<ContextProps>({
    goals: [],
    setGoals: () => null,
});
