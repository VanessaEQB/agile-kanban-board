'use client';

import React, { useState } from 'react';
import { Task, TaskStatus } from '@/types/kanban';
import { INITIAL_TASKS } from '@/constants/mockTasks';
import SprintMetrics from '@/components/SprintMetrics';
import KanbanColumn from '@/components/KanbanColumn';
import NewTaskForm from '@/components/NewTaskForm'; // 👈 ¡Importamos el nuevo componente!

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  // 1. Función para insertar la nueva tarea creada por el usuario
  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    // Generamos un ID secuencial autoincremental sumándole 1 al ID más alto que exista
    const nextId = tasks.length > 0 
      ? String(Math.max(...tasks.map(t => Number(t.id))) + 1) 
      : '101';

    // Construimos el objeto completo de la nueva tarea
    const newTask: Task = {
      id: nextId,
      ...taskData, // Copiamos el title, description, priority, points y status del formulario
    };

    // Actualizamos el estado insertando la nueva tarea (Inmutabilidad con el operador Spread)
    setTasks([...tasks, newTask]);
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <main className="min-h-screen bg-[#0b1329] text-slate-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Scrum Sprint Board <span className="text-sm font-mono text-slate-500 font-normal">v1.2.0</span>
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Sandbox técnico interactivo con inyección dinámica de estado controlado.</p>
        </header>

        {/* RENDERIZAMOS EL FORMULARIO PASÁNDOLE NUESTRA FUNCIÓN MANEJADORA */}
        <NewTaskForm onAddTask={handleAddTask} />

        <SprintMetrics tasks={tasks} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          <KanbanColumn title="Backlog" status="backlog" tasks={tasks} onMoveTask={handleMoveTask} />
          <KanbanColumn title="To Do" status="todo" tasks={tasks} onMoveTask={handleMoveTask} />
          <KanbanColumn title="In Progress" status="in_progress" tasks={tasks} onMoveTask={handleMoveTask} />
          <KanbanColumn title="Done" status="done" tasks={tasks} onMoveTask={handleMoveTask} />
        </div>

      </div>
    </main>
  );
}