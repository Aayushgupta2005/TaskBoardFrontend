import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

export default function Column({ status, title, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Droppable 
        droppableId={status}
        type="TASK"
        isCombineEnabled={false}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-2 min-h-[50px]"
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task._id}
                task={task}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}