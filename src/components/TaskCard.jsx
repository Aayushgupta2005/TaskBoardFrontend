import { Draggable } from "react-beautiful-dnd";

export default function TaskCard({ task, index, onEdit, onDelete }) {
  return (
    <Draggable 
      draggableId={task._id} 
      index={index}
      type="TASK"
    >
      {(provided) => (
        <div
          className="bg-white p-3 rounded shadow flex flex-col gap-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              {task.description && (
                <p className="text-sm text-gray-600">{task.description}</p>
              )}
            </div>
            <div className="flex gap-2 text-sm">
              <button onClick={() => onEdit(task)} className="text-blue-500">✏️</button>
              <button onClick={() => onDelete(task._id)} className="text-red-500">🗑</button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}