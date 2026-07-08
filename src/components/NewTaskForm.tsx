'use client';

import React, { useState } from 'react';
import { TaskStatus, TaskPriority, Task } from '@/types/kanban';
import { PlusCircle } from 'lucide-react';

interface NewTaskFormProps {
  onAddTask: (task: Omit<Task, 'id'>) => void; // Recibe la función para insertar la tarea en el estado padre
}

export default function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  // 1. Estados controlados independientes para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [points, setPoints] = useState<number>(3);
  const [status, setStatus] = useState<TaskStatus>('backlog');

  // 2. Manejador del envío del formulario (Submit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previene que la página se recargue (comportamiento por defecto del HTML)

    // Validación básica: No permitir guardar si el título está vacío
    if (!title.trim()) return;

    // Enviamos los datos recolectados al componente padre
    onAddTask({
      title,
      description,
      priority,
      points,
      status,
    });

    // 3. Resetear el formulario para poder ingresar otro ticket
    setTitle('');
    setDescription('');
    setPriority('medium');
    setPoints(3);
    setStatus('backlog');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <PlusCircle className="text-blue-400 w-5 h-5" />
        Ingresar Nuevo Ticket al Sprint
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Input: Título */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wide">Título del Requerimiento</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Integrar pasarela..."
            className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-sm rounded-xl p-2.5 outline-none transition-all"
            required
          />
        </div>

        {/* Input: Descripción */}
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wide">Descripción Técnica</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Criterios de aceptación..."
            className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-sm rounded-xl p-2.5 outline-none transition-all"
          />
        </div>

        {/* Select: Prioridad */}
        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wide">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority)}
            className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-sm rounded-xl p-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Select: Story Points */}
        <div className="md:col-span-1 flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wide">Points</label>
          <select
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-sm rounded-xl p-2.5 outline-none transition-all cursor-pointer font-mono"
          >
            {[1, 2, 3, 5, 8, 13].map((pt) => (
              <option key={pt} value={pt}>{pt}</option>
            ))}
          </select>
        </div>

        {/* Select: Estado Inicial */}
        <div className="md:col-span-1 flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-bold uppercase tracking-wide">Columna</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="bg-slate-950 border border-slate-800 focus:border-blue-500 text-slate-100 text-sm rounded-xl p-2.5 outline-none transition-all cursor-pointer"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* Botón Submit */}
        <div className="md:col-span-12 flex justify-end mt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all"
          >
            Crear Ticket +
          </button>
        </div>
      </form>
    </div>
  );
}