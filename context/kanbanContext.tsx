import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type groupType = {
  id: number;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  variant: number;
  tasks: taskForm[];
};

type taskForm = {
  groupId?: number;
  name: string;
  progress_percentage: number;
  isOptionOpen: boolean;
};

type kanbanContextType = {
  groups: groupType[];
  setGroup: Dispatch<SetStateAction<groupType[]>>;
};

const kanbanContext = createContext<kanbanContextType>({
  groups: [],
  setGroup: () => {
    console.log("test");
  },
});

export const KanbanContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [groups, setGroup] = useState<groupType[]>([]);

  return (
    <kanbanContext.Provider value={{ groups, setGroup }}>
      {children}
    </kanbanContext.Provider>
  );
};

export const kanbanGroups = () => {
  return useContext(kanbanContext);
};
