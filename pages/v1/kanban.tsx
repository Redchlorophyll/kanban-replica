import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import DefaultLayout from "@/layouts";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Tag from "@/components/Tag";
import Modal from "@/components/Modal";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useRef, useState } from "react";
import Textarea from "@/components/Textarea";
import Card from "@/components/Card";
import icMore from "@/assets/ic_more.svg";
import icArrowRight from "@/assets/ic_arrow-right.svg";
import icArrowRightActive from "@/assets/ic_arrow-right-active.svg";
import icArrowLeft from "@/assets/ic_arrow-left.svg";
import icArrowLeftActive from "@/assets/ic_arrow-left-active.svg";
import icEdit from "@/assets/ic_edit.svg";
import icEditActive from "@/assets/ic_edit-active.svg";
import icTrash from "@/assets/ic_trash.svg";
import icTrashActive from "@/assets/ic_trash-active.svg";
import icCreate from "@/assets/ic_create.svg";

type groupType = {
  id: number;
  title: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  variant: number;
  tasks: taskForm[];
};

type groupForm = {
  title: string;
  description: string;
};

type taskForm = {
  groupId?: number;
  name: string;
  progress_percentage: number;
  isOptionOpen: boolean;
};

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [taskFormType, setTaskFormtype] = useState<"create" | "edit">("create");
  const [groupForm, setGroupForm] = useState<groupForm>({
    title: "",
    description: "",
  });
  const [taskForm, setTaskForm] = useState<taskForm>({
    name: "",
    progress_percentage: 0,
    isOptionOpen: false,
  });
  const [imageHover, setImageHover] = useState({
    isArrowRightActive: false,
    isArrowLeftActive: false,
    isEditActive: false,
    isTrashActive: false,
  });
  const [variantCounter, setVariantCounter] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeTask, setActiveTask] = useState(0);
  const [iseCreateTaskModalOpen, setIseCreateTaskModalOpen] = useState(false);
  const [groups, setGroup] = useState<groupType[]>([]);
  const groupVariants = ["primary", "alert", "danger", "success"];
  const onOptionOpen = (
    event: React.FormEvent<HTMLInputElement>,
    groupIdx: number,
    taskIdx: number
  ) => {
    console.log("should be clicked");
    const { checked } = event.target as HTMLInputElement;
    const data = [...groups];
    console.log("open", data[groupIdx].tasks[taskIdx], checked);
    data[groupIdx].tasks[taskIdx].isOptionOpen = checked;
    setGroup(data);
  };

  const variantSelector = () => {
    let tmpVariantCounter = groups.length;
    let totalMultiples = Math.floor(tmpVariantCounter / 3) * 3;
    tmpVariantCounter = tmpVariantCounter - totalMultiples;
    setVariantCounter(tmpVariantCounter);

    return tmpVariantCounter;
  };

  const onSubmitCreateGroup = () => {
    const data = {
      id: groups.length + 1,
      title: groupForm.title,
      created_by: "1",
      created_at: "2021-04-20T23:47:50.046Z",
      updated_at: "2021-04-20T23:47:50.046Z",
      variant: variantSelector(),
      tasks: [],
    };

    const result = [...groups];
    result.push(data);
    setGroup(result);
    setIsCreateGroupModalOpen(false);
    setGroupForm({
      title: "",
      description: "",
    });
  };

  const onSubmitCreateTask = () => {
    let data;
    if (taskFormType === "create") {
      data = groups.map((group) => {
        if (group.id === activeGroup) {
          group.tasks.push(taskForm);
        }
        return group;
      });
    } else {
      data = [...groups];
      data[activeGroup].tasks[activeTask] = taskForm;
    }

    setGroup(data);

    setIseCreateTaskModalOpen(false);
    setTaskForm({
      name: "",
      progress_percentage: 0,
      isOptionOpen: false,
    });
  };

  const TasksHtml = ({ id }: { id: number }) => {
    const dropdownRef = useRef<HTMLDivElement[]>([]);
    const [refIdx, setrefIdx] = useState(0);

    const deleteTask = (groupNumber: number, taskIndex: number) => {
      const data = [...groups];
      data[groupNumber].tasks.splice(taskIndex, 1);
      setGroup(data);
    };

    const editTask = (groupNumber: number, taskIndex: number) => {
      const data = groups[groupNumber].tasks[taskIndex];
      setTaskFormtype("edit");
      setActiveGroup(groupNumber);
      setActiveTask(taskIndex);
      setIseCreateTaskModalOpen(true);
      setTaskForm(data);
    };

    const moveTo = (
      direction: string,
      groupNumber: number,
      taskIndex: number
    ) => {
      const data = [...groups];
      const val = data[groupNumber].tasks[taskIndex];
      console.log("testsssss", data[groupNumber], data[id + 1]);
      data[groupNumber].tasks.splice(taskIndex, 1);
      if (direction === "next" && data[groupNumber + 1]) {
        data[groupNumber + 1].tasks.push(val);
        setGroup(data);
      } else if (direction === "prev" && data[groupNumber - 1]) {
        data[groupNumber - 1].tasks.push(val);
        setGroup(data);
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        let isOtherDropdownNotClicked = false;
        dropdownRef.current.forEach((divData) => {
          console.log("test", event.target as Node, divData);
          if (divData === (event.target as Node)) {
            isOtherDropdownNotClicked = false;
          } else isOtherDropdownNotClicked = true;
        });
        console.log(dropdownRef.current);

        // if (
        //   dropdownRef.current[refIdx] &&
        //   !dropdownRef.current[refIdx].contains(event.target as Node) &&
        //   isOtherDropdownNotClicked
        // ) {
        //   const datas = [...groups];
        //   datas[id].tasks.forEach((data: taskForm) => {
        //     data.isOptionOpen = false;
        //   });
        //   setGroup(datas);
        //   console.log("converted");
        // }
        console.log(dropdownRef.current);
      };
      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    const result = groups[id].tasks.map((task, idx) => {
      return (
        <div className="pb-2" key={`group_${id}_task_${idx}`}>
          <Card variant="mute">
            <div className="pb-4 font-bold border-dashed border-b-[1px] border-[#E0E0E0]">
              {task.name}
            </div>
            <div className="flex w-full relative">
              <div className="w-[85%]">
                <ProgressBar precentage={task.progress_percentage} />
              </div>
              <div className="absolute right-0 top-1">
                <div className="relative overflow-hidden">
                  <input
                    ref={(el) =>
                      (dropdownRef.current[idx] = el as HTMLDivElement)
                    }
                    type="checkbox"
                    checked={task.isOptionOpen}
                    onChange={(event) => {
                      onOptionOpen(event, id, idx);
                      setrefIdx(idx);
                    }}
                    className="peer z-10 w-full h-full absolute top-0 left-0 opacity-0"
                  />
                  <div className="peer-hover:bg-[#EDEDED] relative p-1 rounded peer-checked:bg-[#EDEDED]">
                    <Image
                      src={icMore}
                      width={15}
                      height={15}
                      alt="icon more"
                    />
                  </div>
                </div>
                {task.isOptionOpen ? (
                  <div className="w-[280px] p-[14px_16px_14px_19px] absolute -right-0 translate-y-1 bg-white rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.08)] z-50">
                    <button
                      className="p-[6px_0_6px_0] flex w-full hover:text-[#01959F] group"
                      onClick={() => moveTo("next", id, idx)}
                    >
                      <div className="pr-[22px] translate-y-[6px] ">
                        <div className="absolute invisible group-hover:visible">
                          <Image
                            src={icArrowRightActive}
                            alt="icon move right"
                          />
                        </div>
                        <div className="absolute visible group-hover:invisible">
                          <Image src={icArrowRight} alt="icon move right" />
                        </div>
                      </div>

                      <div>Move Right</div>
                    </button>
                    <button
                      className="p-[6px_0_6px_0] flex w-full hover:text-[#01959F] group"
                      onClick={() => moveTo("prev", id, idx)}
                    >
                      <div className="pr-[22px] translate-y-[6px] ">
                        <div className="absolute invisible group-hover:visible">
                          <Image src={icArrowLeftActive} alt="icon move left" />
                        </div>
                        <div className="absolute visible group-hover:invisible">
                          <Image src={icArrowLeft} alt="icon move left" />
                        </div>
                      </div>
                      <div>Move Left</div>
                    </button>
                    <button
                      className="p-[6px_0_6px_0] flex w-full hover:text-[#01959F] group"
                      onClick={() => editTask(id, idx)}
                      onMouseEnter={() =>
                        setImageHover({
                          isArrowLeftActive: false,
                          isEditActive: true,
                          isTrashActive: false,
                          isArrowRightActive: false,
                        })
                      }
                      onMouseLeave={() =>
                        setImageHover({
                          isArrowLeftActive: false,
                          isEditActive: false,
                          isTrashActive: false,
                          isArrowRightActive: false,
                        })
                      }
                    >
                      <div className="pr-[22px] translate-y-[6px] ">
                        <div className="absolute invisible group-hover:visible">
                          <Image src={icEditActive} alt="icon edit" />
                        </div>
                        <div className="absolute visible group-hover:invisible">
                          <Image src={icEdit} alt="icon edit" />
                        </div>
                      </div>
                      <div>edit</div>
                    </button>
                    <button
                      className="p-[6px_0_6px_0] flex w-full hover:text-[#E11428] group"
                      onClick={() => deleteTask(id, idx)}
                    >
                      <div className="pr-[22px] translate-y-[6px] ">
                        <div className="absolute invisible group-hover:visible">
                          <Image src={icTrashActive} alt="icon trash" />
                        </div>
                        <div className="absolute visible group-hover:invisible">
                          <Image src={icTrash} alt="icon trash" />
                        </div>
                      </div>
                      <div>Delete</div>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Card>
        </div>
      );
    });

    return <>{result}</>;
  };

  const groupsHtml = groups.map((group, idx) => {
    return (
      <div
        key={idx}
        style={{
          transform: `translateX(${1 * idx}rem)`,
        }}
        className="w-[326px] relative pr-4 inline-block whitespace-normal"
      >
        <div className="absolute top-0 w-[326px]">
          <Card
            variant={
              groupVariants[group.variant] as
                | "success"
                | "alert"
                | "danger"
                | "success"
            }
          >
            <div>
              <Tag
                variant={
                  groupVariants[group.variant] as
                    | "success"
                    | "alert"
                    | "danger"
                    | "success"
                }
              >
                {group.title}
              </Tag>
            </div>
            <div className="py-4">desember - januari</div>
            <TasksHtml id={idx} />
            <div className="mt-2">
              <button
                className="flex"
                onClick={() => {
                  setIseCreateTaskModalOpen(true);
                  setActiveGroup(group.id);
                  setTaskFormtype("create");
                  setTaskForm({
                    name: "",
                    progress_percentage: 0,
                    isOptionOpen: false,
                  });
                }}
              >
                <div className="pr-1 translate-y-[2px]">
                  <Image src={icCreate} alt="icon crate" />
                </div>{" "}
                Add Card
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout onClick={() => setIsCreateGroupModalOpen(true)}>
          <div className="overflow-x-auto whitespace-nowrap h-full p-[24px] w-full">
            {groupsHtml}
          </div>

          {iseCreateTaskModalOpen ? (
            <Modal
              title={taskFormType === "create" ? "Create Task" : "Edit Task"}
              style={{ width: "420px", minHeight: "200px" }}
              closeBtn={() => setIseCreateTaskModalOpen(false)}
            >
              <div className="pb-8">
                <div className="pb-5">
                  <Input
                    label="Task Name"
                    placeholder="Type Your Task"
                    value={taskForm.name}
                    onChange={(val) => {
                      setTaskForm({ ...taskForm, name: val });
                    }}
                  />
                </div>
                <div className="w-[170px]">
                  <Input
                    label="Progress"
                    placeholder="70%"
                    value={
                      taskForm.progress_percentage
                        ? taskForm.progress_percentage.toString()
                        : ""
                    }
                    onChange={(val) => {
                      setTaskForm({
                        ...taskForm,
                        progress_percentage: val ? parseInt(val, 10) : 0,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="pr-4">
                  <Button
                    variant="outline"
                    onClick={() => setIseCreateTaskModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <Button onClick={() => onSubmitCreateTask()}>Submit</Button>
              </div>
            </Modal>
          ) : (
            ""
          )}

          {isCreateGroupModalOpen ? (
            <Modal
              title="Add New Group"
              style={{ width: "420px", minHeight: "200px" }}
            >
              <div className="pb-8">
                <div className="pb-5">
                  <Input
                    label="Title"
                    value={groupForm.title}
                    onChange={(val) => {
                      setGroupForm({ ...groupForm, title: val });
                    }}
                  />
                </div>
                <div>
                  <Textarea
                    label="Description"
                    value={groupForm.description}
                    onChange={(val) => {
                      setGroupForm({ ...groupForm, description: val });
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="pr-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateGroupModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
                <Button onClick={onSubmitCreateGroup}>Submit</Button>
              </div>
            </Modal>
          ) : (
            ""
          )}
        </DefaultLayout>
      </main>
    </>
  );
}
