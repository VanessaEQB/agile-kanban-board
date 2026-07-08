import { Task } from '@/types/kanban';

export const INITIAL_TASKS: Task[] = [
  {
    id: '101',
    title: 'Migración de API de Socios a Odoo 18',
    description: 'Configurar endpoints de sincronización en caliente en el contenedor Docker. Mapear campos relacionales e identificar logs de error en Postman.',
    status: 'in_progress',
    priority: 'high',
    points: 5,
  },
  {
    id: '102',
    title: 'Consolidación de Archivos Planos SQL',
    description: 'Desarrollar un script para unificar 28 archivos de datos utilizando el número de identificación como campo relacional e indexado.',
    status: 'todo',
    priority: 'medium',
    points: 3,
  },
  {
    id: '103',
    title: 'Reset de Cuenta de WhatsApp Business en CRM',
    description: 'Resolver el estado de bloqueo manual en Kommo CRM provocado por desincronización de tokens de la API de mensajería.',
    status: 'done',
    priority: 'high',
    points: 2,
  },
  {
    id: '104',
    title: 'Pruebas de Carga en Pasarela Place to Pay',
    description: 'Simular transacciones concurrentes en el entorno Sandbox para verificar tiempos de respuesta de respuestas de pasarela.',
    status: 'backlog',
    priority: 'low',
    points: 8,
  },
];