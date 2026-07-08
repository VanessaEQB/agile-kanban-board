import React from 'react';
import { Task, TaskStatus } from '@/types/kanban';
import { ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task; // La tarea específica que va a renderizar
  onMoveTask: (taskId: string, newStatus: TaskStatus) => void; // Función para mover la tarea
}

export default function TaskCard({ task, onMoveTask }: TaskCardProps) {
  
  // Diccionario de colores dinámicos según la prioridad (Ingeniería de estilos limpia)
  const priorityStyles = {
    high: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    low: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  };

  // Definimos el orden lógico del flujo Kanban para los botones de mover
  const statuses: TaskStatus[] = ['backlog', 'todo', 'in_progress', 'done'];
  const currentIndex = statuses.indexOf(task.status);

  return (
    <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl shadow-md transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:-translate-y-0.5 group">
      
      {/* Cabecera de la Tarjeta: Identificador y Prioridad */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-mono text-slate-500 font-semibold tracking-wider">
          TSK-{task.id}
        </span>
        <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border font-bold ${priorityStyles[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {/* Título y Descripción */}
      <h4 className="text-sm font-bold text-slate-100 mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
        {task.title}
      </h4>
      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
        {task.description}
      </p>

      {/* Pie de Tarjeta: Puntos de Historia y Controles de Flujo */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-900">
        <div className="flex items-center gap-1 text-slate-400 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
          <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-xs font-bold text-slate-300">{task.points} <span className="text-[10px] font-normal text-slate-500">SP</span></span>
        </div>

        {/* Botones de control de estado del flujo ágil */}
        <div className="flex gap-1.5">
          {/* Botón de retroceder en el flujo */}
          {currentIndex > 0 && (
            <button
              onClick={() => onMoveTask(task.id, statuses[currentIndex - 1])}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95"
              title="Retroceder estado"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Botón de avanzar en el flujo */}
          {currentIndex < statuses.length - 1 && (
            <button
              onClick={() => onMoveTask(task.id, statuses[currentIndex + 1])}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-all active:scale-95"
              title="Avanzar estado"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
}