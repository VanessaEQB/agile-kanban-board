// Definimos los únicos estados válidos que puede tener una columna
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'done';

// Definimos los niveles de prioridad permitidos
export type TaskPriority = 'low' | 'medium' | 'high';

// Definimos la estructura exacta que debe cumplir CADA tarea
export interface Task {
  id: string;          // Identificador único del ticket (ej: "TASK-1")
  title: string;       // Título del requerimiento o bug
  description: string; // Explicación técnica o criterios de aceptación
  status: TaskStatus;  // El estado actual en el tablero
  priority: TaskPriority; // Nivel de urgencia
  points: number;      // Puntos de historia (Métrica Scrum, ej: 1, 2, 3, 5, 8)
}