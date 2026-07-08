import React from 'react';
import { Task } from '@/types/kanban';
import { BarChart3, CheckCircle2, Target } from 'lucide-react';

// Definimos qué "Props" (propiedades) necesita recibir este componente para funcionar
interface SprintMetricsProps {
  tasks: Task[]; // Recibe el arreglo global de tareas
}

export default function SprintMetrics({ tasks }: SprintMetricsProps) {
  
  // 1. Calcular el total de puntos de historia planificados en el Sprint
  const totalPoints = tasks.reduce((accumulator, task) => accumulator + task.points, 0);

  // 2. Filtrar las tareas completadas y sumar sus puntos (Métrica de Entrega / Velocity)
  const completedPoints = tasks
    .filter(task => task.status === 'done')
    .reduce((accumulator, task) => accumulator + task.points, 0);

  // 3. Calcular el porcentaje de progreso de forma segura (evitando división por cero)
  const progressPercentage = totalPoints > 0 
    ? Math.round((completedPoints / totalPoints) * 180) // Escalado para diseño u optimizado a 100%
    : 0;
  
  // Nota: Para un porcentaje estándar de barra de carga usaremos base 100% en el estilo visual
  const barWidth = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="text-blue-400 w-5 h-5" />
        Métricas del Sprint (Agile Velocity)
      </h2>

      {/* Contenedor de Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Métrica 1: Puntos Planificados */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Puntos Comprometidos</p>
            <p className="text-2xl font-black text-white">{totalPoints} <span className="text-xs font-normal text-slate-500">SP</span></p>
          </div>
        </div>

        {/* Métrica 2: Puntos Completados */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Puntos Entregados (Done)</p>
            <p className="text-2xl font-black text-white">{completedPoints} <span className="text-xs font-normal text-slate-500">SP</span></p>
          </div>
        </div>

        {/* Métrica 3: Porcentaje de Avance */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Progreso del Sprint</p>
            <p className="text-sm font-bold text-emerald-400">{barWidth}%</p>
          </div>
          {/* Barra de progreso con Tailwind */}
          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${barWidth}%` }}
            ></div>
          </div>
        </div>

      </div>
    </div>
  );
}