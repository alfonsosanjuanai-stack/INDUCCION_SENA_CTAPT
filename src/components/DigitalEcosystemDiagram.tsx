import React, { useState } from 'react';
import { 
  Server, 
  Laptop, 
  Smartphone, 
  Cloud, 
  Database, 
  ShieldCheck, 
  Mail, 
  BookOpen, 
  Briefcase, 
  Cpu, 
  Wifi, 
  Globe, 
  ChevronRight, 
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface EcosystemNode {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Plataforma' | 'Infraestructura' | 'Conocimiento' | 'Empleabilidad';
  icon: React.ReactNode;
  coords: { x: number; y: number }; // percentage coords in SVG viewBox
  description: string;
  roleForApprentice: string;
  dataTransmitted: string;
  accessUrl: string;
  flowGroup: ('formacion' | 'comunicacion' | 'empleabilidad')[];
}

const NODES: EcosystemNode[] = [
  {
    id: 'zajuna',
    title: 'Zajuna LMS (Ambiente Virtual)',
    shortTitle: 'Zajuna LMS',
    category: 'Plataforma',
    icon: <Laptop className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 50, y: 46 }, // Center desktop / workstation
    description: 'El corazón pedagógico digital del SENA. Aula virtual donde el aprendiz consulta guías, asiste a foros e interactúa con instructores.',
    roleForApprentice: 'Descargar material formativo, enviar evidencias y recibir retroalimentación evaluativa en tiempo real.',
    dataTransmitted: 'Evidencias de aprendizaje, rúbricas de evaluación, foros de debate y calificaciones cualitativas (A / D).',
    accessUrl: 'https://zajuna.sena.edu.co',
    flowGroup: ['formacion', 'comunicacion']
  },
  {
    id: 'sofiaplus',
    title: 'Sofia Plus (Servidor Académico)',
    shortTitle: 'Sofia Plus',
    category: 'Infraestructura',
    icon: <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 26, y: 22 }, // Top left server stack
    description: 'Sistema centralizado de administración de la formación. Administra matrículas, fichas, juicios evaluativos y certificaciones.',
    roleForApprentice: 'Consultar su estado de matrícula, descargar certificados de estudio y registrar novedades académicas.',
    dataTransmitted: 'Resultados de Aprendizaje (RAP) alcanzados, actas de comité y números de ficha de caracterización.',
    accessUrl: 'https://oferta.senasofiaplus.edu.co',
    flowGroup: ['formacion', 'empleabilidad']
  },
  {
    id: 'nube_correo',
    title: 'Cloud & Correo SoySENA',
    shortTitle: 'Correo Institucional',
    category: 'Plataforma',
    icon: <Cloud className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 50, y: 16 }, // Top center cloud
    description: 'Ecosistema de almacenamiento en la nube, correo electrónico @soy.sena.edu.co y herramientas colaborativas integradas.',
    roleForApprentice: 'Canal oficial de notificaciones, acceso a suites de ofimática en la nube y espacio para proyectos colaborativos.',
    dataTransmitted: 'Comunicaciones oficiales, citaciones a comités, almacenamiento de archivos de proyecto.',
    accessUrl: 'https://outlook.office.com',
    flowGroup: ['comunicacion']
  },
  {
    id: 'dispositivos_moviles',
    title: 'Acceso Móvil & Aprendiz Conectado',
    shortTitle: 'Acceso Móvil',
    category: 'Plataforma',
    icon: <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 74, y: 22 }, // Top right mobile device
    description: 'Conectividad ubicua desde teléfonos inteligentes y tabletas para consultar clases y avisos desde cualquier lugar de Colombia.',
    roleForApprentice: 'Flexibilidad de aprendizaje en desplazamiento, notificaciones push de actividades y alertas tempranas.',
    dataTransmitted: 'Tokens de autenticación móvil, lectura de foros y recordatorios de entregas.',
    accessUrl: 'https://zajuna.sena.edu.co',
    flowGroup: ['formacion', 'comunicacion']
  },
  {
    id: 'biblioteca_digital',
    title: 'Sistema Nacional de Bibliotecas',
    shortTitle: 'Biblioteca Digital',
    category: 'Conocimiento',
    icon: <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 18, y: 55 }, // Middle-left knowledge node
    description: 'Portal de acceso a más de 3 millones de libros digitales, bases de datos científicas internacionales y catálogos en línea.',
    roleForApprentice: 'Investigación académica profunda, citas bibliográficas rigurosas y consulta de normas técnicas.',
    dataTransmitted: 'Acceso a artículos científicos, normas ICONTEC e ISO, repositorios de tesis institucionales.',
    accessUrl: 'https://biblioteca.sena.edu.co',
    flowGroup: ['formacion']
  },
  {
    id: 'servidores_infra',
    title: 'Infraestructura de Datos & Redes',
    shortTitle: 'Rack de Datos',
    category: 'Infraestructura',
    icon: <Server className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 50, y: 78 }, // Bottom center server rack with wireless signal
    description: 'Arquitectura de servidores de alta disponibilidad, conectividad de fibra óptica en los 117 centros y telemetría nacional.',
    roleForApprentice: 'Garantizar que las plataformas estén disponibles 24/7 de forma segura y veloz en todo el país.',
    dataTransmitted: 'Túneles VPN seguros, ancho de banda para sesiones sincrónicas y réplicas de datos.',
    accessUrl: 'https://www.sena.edu.co',
    flowGroup: ['formacion', 'comunicacion', 'empleabilidad']
  },
  {
    id: 'seguridad_carne',
    title: 'Ciberseguridad & Carné Digital',
    shortTitle: 'Seguridad & Acceso',
    category: 'Infraestructura',
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 82, y: 55 }, // Middle-right security shield
    description: 'Mecanismos de autenticación única, protección de datos personales de los aprendices y control de acceso biométrico/QR.',
    roleForApprentice: 'Seguridad de su identidad institucional, porte de carné digital y resguardo de su información formativa.',
    dataTransmitted: 'Códigos QR de validación, certificados SSL, protocolos HTTPS y cifrado de credenciales.',
    accessUrl: '#',
    flowGroup: ['formacion', 'empleabilidad']
  },
  {
    id: 'sennova_tecnoparques',
    title: 'TecnoParques & SENNOVA',
    shortTitle: 'I+D & TecnoParques',
    category: 'Conocimiento',
    icon: <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 25, y: 82 }, // Bottom-left innovation node
    description: 'Red de aceleración tecnológica y semilleros de investigación aplicada en robótica, biotecnología, software y nanotecnología.',
    roleForApprentice: 'Desarrollar proyectos de investigación aplicada y prototipos funcionales con maquinaria de última generación.',
    dataTransmitted: 'Patentes, registros de software, prototipos de hardware y proyectos de grado.',
    accessUrl: 'https://sennova.sena.edu.co',
    flowGroup: ['empleabilidad']
  },
  {
    id: 'ape_empleo',
    title: 'Agencia Pública de Empleo (APE)',
    shortTitle: 'APE Empleo',
    category: 'Empleabilidad',
    icon: <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    coords: { x: 75, y: 82 }, // Bottom-right employment node
    description: 'Plataforma oficial del Estado colombiano que articula el perfil del aprendiz con ofertas laborales y contratos de aprendizaje.',
    roleForApprentice: 'Postularse a contratos de aprendizaje con empresas patrocinadoras y a vacantes laborales formales.',
    dataTransmitted: 'Hoja de vida estandarizada, competencias certificadas y postulaciones laborales.',
    accessUrl: 'https://ape.sena.edu.co',
    flowGroup: ['empleabilidad']
  }
];

// Connection lines inspired by the schematic arrows and paths in the uploaded image
const CONNECTIONS = [
  { from: 'sofiaplus', to: 'zajuna' },
  { from: 'nube_correo', to: 'sofiaplus' },
  { from: 'nube_correo', to: 'dispositivos_moviles' },
  { from: 'dispositivos_moviles', to: 'zajuna' },
  { from: 'biblioteca_digital', to: 'zajuna' },
  { from: 'zajuna', to: 'servidores_infra' },
  { from: 'zajuna', to: 'seguridad_carne' },
  { from: 'servidores_infra', to: 'sennova_tecnoparques' },
  { from: 'servidores_infra', to: 'ape_empleo' },
  { from: 'seguridad_carne', to: 'ape_empleo' },
  { from: 'sennova_tecnoparques', to: 'biblioteca_digital' }
];

interface DigitalEcosystemDiagramProps {
  onCompleteModule?: (moduleId: string) => void;
  isCompleted?: boolean;
  onNext?: () => void;
}

export const DigitalEcosystemDiagram: React.FC<DigitalEcosystemDiagramProps> = ({
  onCompleteModule,
  isCompleted,
  onNext
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('zajuna');
  const [activeFlow, setActiveFlow] = useState<'all' | 'formacion' | 'comunicacion' | 'empleabilidad'>('all');

  const selectedNode = NODES.find((n) => n.id === selectedNodeId) || NODES[0];

  const isConnectionActive = (fromId: string, toId: string) => {
    if (activeFlow === 'all') return true;
    const fromNode = NODES.find((n) => n.id === fromId);
    const toNode = NODES.find((n) => n.id === toId);
    return Boolean(
      fromNode?.flowGroup.includes(activeFlow) && toNode?.flowGroup.includes(activeFlow)
    );
  };

  const isNodeInFlow = (node: EcosystemNode) => {
    if (activeFlow === 'all') return true;
    return node.flowGroup.includes(activeFlow);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Etapa 03 · Arquitectura & Conectividad Digital</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Ecosistema Tecnológico del Aprendiz SENA
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 max-w-2xl">
              Explora cómo interactúan las plataformas institucionales, el flujo de evidencias, los servidores académicos de Sofia Plus, Zajuna LMS y los servicios de innovación que impulsan tu formación.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isCompleted && (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Módulo Aprobado</span>
              </span>
            )}
          </div>
        </div>

        {/* Interactive Flow Filter Tabs */}
        <div className="pt-6 flex items-center justify-between flex-wrap gap-3">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Filtrar Capa de Información:
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveFlow('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFlow === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos los Nodos
            </button>
            <button
              onClick={() => setActiveFlow('formacion')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFlow === 'formacion'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ruta Formativa
            </button>
            <button
              onClick={() => setActiveFlow('comunicacion')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFlow === 'comunicacion'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Comunicación
            </button>
            <button
              onClick={() => setActiveFlow('empleabilidad')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeFlow === 'empleabilidad'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Empleabilidad & I+D
            </button>
          </div>
        </div>

        {/* 2-Zone Layout: Interactive Schematic Canvas + Node Inspector Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          {/* Left Canvas: Schematic Node Link Diagram (Inspired directly by the reference image) */}
          <div className="lg:col-span-8 relative bg-slate-950 text-white rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-hidden shadow-xl min-h-[460px] flex flex-col justify-between">
            {/* Ambient Background Grid and Halo */}
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Bar inside diagram */}
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-mono text-[11px] text-emerald-300">
                  RED DIGITAL SENA EN VIVO · 117 CENTROS INTERCONECTADOS
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Haz clic en cualquier nodo
              </span>
            </div>

            {/* The SVG Interconnection Layer */}
            <div className="relative w-full h-[380px] my-auto">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                  </linearGradient>
                  <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
                  </marker>
                </defs>

                {/* Render Schematic Connection Lines */}
                {CONNECTIONS.map((conn, idx) => {
                  const fromNode = NODES.find((n) => n.id === conn.from);
                  const toNode = NODES.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const active = isConnectionActive(conn.from, conn.to);
                  const isRelatedToSelected = selectedNodeId === conn.from || selectedNodeId === conn.to;

                  return (
                    <g key={idx}>
                      <line
                        x1={fromNode.coords.x}
                        y1={fromNode.coords.y}
                        x2={toNode.coords.x}
                        y2={toNode.coords.y}
                        stroke={isRelatedToSelected ? '#34d399' : active ? 'url(#lineGrad)' : '#334155'}
                        strokeWidth={isRelatedToSelected ? '0.8' : active ? '0.45' : '0.2'}
                        strokeDasharray={active ? '2 2' : 'none'}
                        className={active ? 'transition-all duration-300' : 'opacity-25'}
                      />
                      {/* Midpoint data packet pulse */}
                      {active && (
                        <circle
                          cx={(fromNode.coords.x + toNode.coords.x) / 2}
                          cy={(fromNode.coords.y + toNode.coords.y) / 2}
                          r={isRelatedToSelected ? '0.8' : '0.5'}
                          fill="#34d399"
                          className="animate-ping opacity-75"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Render Interactive Nodes (Buttons placed in 2D coordinate space) */}
              {NODES.map((node) => {
                const isSelected = selectedNodeId === node.id;
                const inCurrentFlow = isNodeInFlow(node);

                return (
                  <div
                    key={node.id}
                    style={{
                      left: `${node.coords.x}%`,
                      top: `${node.coords.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className="absolute z-20"
                  >
                    <button
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`group relative flex flex-col items-center p-2 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white border-emerald-300 ring-4 ring-emerald-500/30 scale-110 shadow-lg'
                          : inCurrentFlow
                          ? 'bg-slate-900/90 text-slate-200 border-slate-700 hover:border-emerald-500 hover:scale-105 shadow-md'
                          : 'bg-slate-900/40 text-slate-500 border-slate-800 opacity-40 hover:opacity-80'
                      }`}
                    >
                      {/* Icon container */}
                      <div className="p-1 rounded-lg">
                        {node.icon}
                      </div>

                      {/* Micro-label */}
                      <span className="text-[10px] font-semibold whitespace-nowrap mt-1 max-w-[80px] truncate text-center">
                        {node.shortTitle}
                      </span>

                      {/* Halo indicator if selected */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom diagram status indicator */}
            <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Interconexión Segura SSL · Protocolo SENA-Cloud-2026</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Nodo Activo: {selectedNode.shortTitle}</span>
              </div>
            </div>
          </div>

          {/* Right Deck: Selected Node Detailed Inspector */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                    {selectedNode.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                      {selectedNode.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-950 dark:text-white">
                      {selectedNode.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedNode.description}
              </p>

              <div className="space-y-3 pt-2 border-t border-slate-200/80 dark:border-slate-700/80">
                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 mb-1">
                    ¿Qué hace el Aprendiz aquí?
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    {selectedNode.roleForApprentice}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Flujo de Información & Datos
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                    {selectedNode.dataTransmitted}
                  </p>
                </div>
              </div>

              {/* Direct Access Action */}
              <div className="pt-2">
                <a
                  href={selectedNode.accessUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Abrir Portal Oficial {selectedNode.shortTitle}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Helper Tip */}
            <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl space-y-1 text-xs">
              <div className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>¿Cómo ingresar a las plataformas?</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                Tu usuario habitual es tu <strong>Documento de Identidad</strong> y la contraseña es la misma registrada en Sofia Plus,
                la cual sincroniza tu acceso a Zajuna y a la Biblioteca Digital.
              </p>
            </div>
          </div>
        </div>

        {/* Completion & Next Module Action Banner */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Apropiación del Ecosistema Digital
            </span>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              ¿Listo para avanzar en la ruta de inducción?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Registra este módulo como completado y continúa al estudio del Reglamento del Aprendiz (Acuerdo 009 de 2024).
            </p>
          </div>

          <button
            onClick={() => {
              onCompleteModule?.('ecosistema');
              onNext?.();
            }}
            className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Aprobar Módulo y Continuar a Reglamento</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
