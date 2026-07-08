import React from 'react';
import { Task, TaskStatus } from '@/types/kanban';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  title: string;          // Nombre visual de la columna (ej: "En Progreso")
  status: TaskStatus;     // El estado técnico que representa (ej: "in_progress")
  tasks: Task[];          // El arreglo GLOBAL de tareas
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void; // Función para mover
}

export default function KanbanColumn({ title, status, tasks, onMoveTask }: KanbanColumnProps) {
  
  // 1. Lógica de Filtrado: Extraemos SOLO las tareas que pertenecen a esta columna específica
  const columnTasks = tasks.filter(task => task.status === status);

  return (
    <div className="bg-slate-900/50 flex flex-col rounded-2xl border border-slate-800 overflow-hidden h-full">
      
      {/* Cabecera de la Columna */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          {/* Indicador visual de estado */}
          <span className={`w-2 h-2 rounded-full ${
            status === 'done' ? 'bg-emerald-500' : 
            status === 'in_progress' ? 'bg-blue-500' : 
            status === 'todo' ? 'bg-amber-500' : 'bg-slate-500'
          }`}></span>
          {title}
        </h3>
        
        {/* Contador de tickets en la columna */}
        <div className="bg-slate-800 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-md">
          {columnTasks.length}
        </div>
      </div>

      {/* Cuerpo de la Columna (Zona de renderizado de tarjetas) */}
      <div className="flex-1 p-3 overflow-y-auto min-h-[150px] custom-scrollbar flex flex-col gap-3">
        {columnTasks.length === 0 ? (
          // Estado vacío (Empty State) para UX
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-slate-800/50 rounded-xl">
            <p className="text-xs text-slate-500 font-medium">Sin tickets</p>
          </div>
        ) : (
          // Mapeo iterativo de las tareas filtradas
          columnTasks.map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onMoveTask={onMoveTask} 
            />
          ))
        )}
      </div>

    </div>
  );
}