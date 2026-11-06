import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  DollarSign, TrendingUp, TrendingDown, Users, AlertCircle, 
  CheckCircle2, Clock, Calendar, Download, Plus, Filter, 
  Search, X, Check, ArrowUpRight, ArrowDownRight, PieChart, 
  BarChart3, ShieldCheck, Crown, FileSpreadsheet, Sparkles, 
  RefreshCw, Award, Info
} from 'lucide-react';

// Tipos de datos
type PaymentStatus = 'paid' | 'not_applicable' | 'pending' | 'future' | 'advanced';

interface MemberRecord {
  id: string;
  name: string;
  joinMonth: string; // 'Enero', 'Febrero', 'Junio', 'Julio'
  joinMonthIndex: number; // 0: Ene, 1: Feb, ..., 11: Dic
  payments: Record<string, PaymentStatus>; // 'Ene', 'Feb', etc.
}

interface ExpenseRecord {
  id: string;
  month: string;
  concept: string;
  amount: number;
  percentage: number;
}

interface FineRecord {
  id: string;
  person: string;
  concept: string;
  amount: number;
}

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const MONTH_KEYS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Datos iniciales de acuerdo al informe 2026
const INITIAL_COLLECTIONS: { month: string; key: string; amount: number; cuota: number; status: 'completed' | 'pending'; note?: string }[] = [
  { month: 'Enero', key: 'Ene', amount: 170000, cuota: 10000, status: 'completed' },
  { month: 'Febrero', key: 'Feb', amount: 200000, cuota: 10000, status: 'completed' },
  { month: 'Marzo', key: 'Mar', amount: 150000, cuota: 10000, status: 'completed' },
  { month: 'Abril', key: 'Abr', amount: 110000, cuota: 10000, status: 'completed' },
  { month: 'Mayo', key: 'May', amount: 140000, cuota: 10000, status: 'completed' },
  { month: 'Junio', key: 'Jun', amount: 165000, cuota: 15000, status: 'completed', note: 'Cambio a cuota $15.000' },
  { month: 'Julio', key: 'Jul', amount: 285000, cuota: 15000, status: 'completed', note: 'Mayor recaudo #1' },
  { month: 'Agosto', key: 'Ago', amount: 270000, cuota: 15000, status: 'completed', note: 'Mayor recaudo #2' },
  { month: 'Septiembre', key: 'Sep', amount: 210000, cuota: 15000, status: 'completed' },
  { month: 'Octubre', key: 'Oct', amount: 180000, cuota: 15000, status: 'completed' },
  { month: 'Noviembre', key: 'Nov', amount: 0, cuota: 15000, status: 'pending' },
  { month: 'Diciembre', key: 'Dic', amount: 0, cuota: 15000, status: 'pending' },
];

const INITIAL_EXPENSES: ExpenseRecord[] = [
  { id: '1', month: 'Enero', concept: 'Cumple', amount: 106000, percentage: 13.2 },
  { id: '2', month: 'Febrero', concept: 'Cumple', amount: 100000, percentage: 12.5 },
  { id: '3', month: 'Mayo', concept: 'Cumple', amount: 100000, percentage: 12.5 },
  { id: '4', month: 'Julio', concept: 'Cumple', amount: 50000, percentage: 6.2 },
  { id: '5', month: 'Agosto', concept: 'Cumple', amount: 300000, percentage: 37.5 },
  { id: '6', month: 'Septiembre', concept: 'Cumple', amount: 145000, percentage: 18.1 },
];

const INITIAL_FINES: FineRecord[] = [
  { id: '1', person: 'Mila', concept: 'Multa de convivencia', amount: 100000 },
  { id: '2', person: 'Anayibe', concept: 'Multa por inasistencia', amount: 20000 },
  { id: '3', person: 'Jennifer', concept: 'Multa de convivencia', amount: 100000 },
];

// 13 Miembros con su mes de ingreso y estados de pago exactos
const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: '1',
    name: 'Carlos Rodríguez',
    joinMonth: 'Enero',
    joinMonthIndex: 0,
    payments: {
      Ene: 'paid', Feb: 'paid', Mar: 'paid', Abr: 'paid', May: 'paid', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '2',
    name: 'Jhoana Vera',
    joinMonth: 'Enero',
    joinMonthIndex: 0,
    payments: {
      Ene: 'paid', Feb: 'paid', Mar: 'paid', Abr: 'paid', May: 'paid', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '3',
    name: 'Jhon Edward Pino Muñoz',
    joinMonth: 'Enero',
    joinMonthIndex: 0,
    payments: {
      Ene: 'paid', Feb: 'paid', Mar: 'paid', Abr: 'paid', May: 'paid', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '4',
    name: 'Juanse Tates Tobar',
    joinMonth: 'Enero',
    joinMonthIndex: 0,
    payments: {
      Ene: 'paid', Feb: 'paid', Mar: 'paid', Abr: 'paid', May: 'paid', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'advanced', Dic: 'future'
    }
  },
  {
    id: '5',
    name: 'Sthefanie Soto Aristizábal',
    joinMonth: 'Febrero',
    joinMonthIndex: 1,
    payments: {
      Ene: 'not_applicable', Feb: 'paid', Mar: 'paid', Abr: 'paid', May: 'paid', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '6',
    name: 'Jean Carlos Valderrama López',
    joinMonth: 'Junio',
    joinMonthIndex: 5,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'paid',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '7',
    name: 'Andrés Ordoñez',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '8',
    name: 'Fabi',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '9',
    name: 'Milaa',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'advanced', Nov: 'advanced', Dic: 'advanced'
    }
  },
  {
    id: '10',
    name: 'Nia',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'advanced', Dic: 'future'
    }
  },
  {
    id: '11',
    name: 'Tazmania',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '12',
    name: 'Valentina',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'paid', Nov: 'future', Dic: 'future'
    }
  },
  {
    id: '13',
    name: 'Wili',
    joinMonth: 'Julio',
    joinMonthIndex: 6,
    payments: {
      Ene: 'not_applicable', Feb: 'not_applicable', Mar: 'not_applicable', Abr: 'not_applicable', May: 'not_applicable', Jun: 'not_applicable',
      Jul: 'paid', Ago: 'paid', Sep: 'paid', Oct: 'pending', Nov: 'future', Dic: 'future'
    }
  }
];

export const LiderGeneralExecutiveDashboard: React.FC = () => {
  // Estados reactivos de datos
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(INITIAL_EXPENSES);
  const [fines, setFines] = useState<FineRecord[]>(INITIAL_FINES);
  const [collections] = useState(INITIAL_COLLECTIONS);
  const [saldo2025] = useState(166000);

  // Estados de vista y filtros
  const [activeTab, setActiveTab] = useState<'resumen' | 'matriz' | 'gastos' | 'multas'>('resumen');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');

  // Modales
  const [modalType, setModalType] = useState<'pago' | 'gasto' | 'multa' | null>(null);

  // Form states
  const [pagoForm, setPagoForm] = useState({ memberId: '13', month: 'Oct', status: 'paid' as PaymentStatus });
  const [gastoForm, setGastoForm] = useState({ month: 'Octubre', concept: 'Cumple', amount: 50000 });
  const [multaForm, setMultaForm] = useState({ person: '', concept: 'Multa de convivencia', amount: 50000 });

  // Cálculos de Resumen Ejecutivo
  const totalRecaudo2026 = useMemo(() => {
    return collections.reduce((acc, curr) => acc + curr.amount, 0);
  }, [collections]);

  const totalRecaudos = totalRecaudo2026 + saldo2025; // $2.046.000

  const totalGastos = useMemo(() => {
    return expenses.reduce((acc, curr) => acc + curr.amount, 0);
  }, [expenses]); // $801.000

  const totalReingresos = useMemo(() => {
    return fines.reduce((acc, curr) => acc + curr.amount, 0);
  }, [fines]); // $220.000

  // Fórmula: total real = total recaudos − gastos + reingresos
  const totalRealDisponible = totalRecaudos - totalGastos + totalReingresos; // $1.465.000

  // Conteo de pendientes
  const pendingCount = useMemo(() => {
    let count = 0;
    members.forEach(m => {
      Object.values(m.payments).forEach(status => {
        if (status === 'pending') count++;
      });
    });
    return count;
  }, [members]);

  // Manejo de alternar estado en celda de la matriz
  const handleTogglePayment = (memberId: string, monthKey: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id !== memberId) return m;
      const current = m.payments[monthKey];
      let next: PaymentStatus = current;
      if (current === 'paid') next = 'pending';
      else if (current === 'pending') next = 'paid';
      else if (current === 'future') next = 'advanced';
      else if (current === 'advanced') next = 'future';
      else if (current === 'not_applicable') return m; // No aplica no se cambia accidentalmente
      return {
        ...m,
        payments: {
          ...m.payments,
          [monthKey]: next
        }
      };
    }));
  };

  // Agregar Gasto
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = String(expenses.length + 1);
    const newExpenses = [...expenses, { id: newId, ...gastoForm, percentage: 0 }];
    const total = newExpenses.reduce((a, b) => a + b.amount, 0);
    const withPercentages = newExpenses.map(item => ({
      ...item,
      percentage: Number(((item.amount / total) * 100).toFixed(1))
    }));
    setExpenses(withPercentages);
    setModalType(null);
  };

  // Agregar Multa
  const handleAddFine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!multaForm.person) return;
    const newFine: FineRecord = {
      id: String(fines.length + 1),
      person: multaForm.person,
      concept: multaForm.concept,
      amount: Number(multaForm.amount)
    };
    setFines([...fines, newFine]);
    setModalType(null);
  };

  // Registrar / Actualizar Pago desde Modal
  const handleSavePago = (e: React.FormEvent) => {
    e.preventDefault();
    setMembers(prev => prev.map(m => {
      if (m.id !== pagoForm.memberId) return m;
      return {
        ...m,
        payments: {
          ...m.payments,
          [pagoForm.month]: pagoForm.status
        }
      };
    }));
    setModalType(null);
  };

  // Exportar a Excel (CSV con formato)
  const handleExportCSV = () => {
    let csv = '\uFEFF'; // BOM para soporte de caracteres en Excel
    csv += 'INFORME GENERAL: RECAUDOS Y GASTOS 2026 - INFERNAL\'S BIKERS\n\n';
    
    csv += '1. RESUMEN EJECUTIVO\n';
    csv += 'Concepto,Valor (COP)\n';
    csv += `Recaudo 2026 (Ene-Oct),$${totalRecaudo2026.toLocaleString('es-CO')}\n`;
    csv += `Recaudo 2025 (Saldo Anterior),$${saldo2025.toLocaleString('es-CO')}\n`;
    csv += `Total Recaudos,$${totalRecaudos.toLocaleString('es-CO')}\n`;
    csv += `Gastos,$${totalGastos.toLocaleString('es-CO')}\n`;
    csv += `Reingresos (Multas),$${totalReingresos.toLocaleString('es-CO')}\n`;
    csv += `Total Real Disponible,$${totalRealDisponible.toLocaleString('es-CO')}\n\n`;

    csv += '2. MATRIZ DE ESTADO DE CUOTAS POR MIEMBRO (2026)\n';
    csv += 'Miembro,Mes Ingreso,' + MONTH_KEYS.join(',') + '\n';
    members.forEach(m => {
      const row = [
        `"${m.name}"`,
        m.joinMonth,
        ...MONTH_KEYS.map(k => {
          const st = m.payments[k];
          if (st === 'paid') return 'PAGADO';
          if (st === 'not_applicable') return 'NO APLICA';
          if (st === 'pending') return 'PENDIENTE';
          if (st === 'advanced') return 'ADELANTADO';
          return 'FUTURO';
        })
      ];
      csv += row.join(',') + '\n';
    });
    csv += '\n';

    csv += '3. DETALLE DE GASTOS\n';
    csv += 'Mes,Concepto,Valor (COP)\n';
    expenses.forEach(e => {
      csv += `${e.month},${e.concept},$${e.amount.toLocaleString('es-CO')}\n`;
    });
    csv += `TOTAL GASTOS,,$${totalGastos.toLocaleString('es-CO')}\n\n`;

    csv += '4. REINGRESOS Y MULTAS\n';
    csv += 'Persona,Concepto,Valor (COP)\n';
    fines.forEach(f => {
      csv += `"${f.person}",${f.concept},$${f.amount.toLocaleString('es-CO')}\n`;
    });
    csv += `TOTAL REINGRESOS,,$${totalReingresos.toLocaleString('es-CO')}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Informe_General_Recaudos_Gastos_2026_InfernalsBikers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtrado de miembros
  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filterStatus === 'todos') return true;
    if (filterMonth === 'todos') {
      return Object.values(m.payments).includes(filterStatus as PaymentStatus);
    } else {
      return m.payments[filterMonth] === filterStatus;
    }
  });

  // Saldo acumulado mes a mes
  const acumuladoMeses = useMemo(() => {
    let currentBalance = saldo2025;
    return collections.slice(0, 10).map((col) => {
      const exp = expenses.find(e => e.month.toLowerCase() === col.month.toLowerCase())?.amount || 0;
      currentBalance = currentBalance + col.amount - exp;
      if (col.key === 'Oct') currentBalance += totalReingresos; // suma multas en octubre
      return {
        month: col.key,
        fullName: col.month,
        balance: currentBalance,
        ingreso: col.amount,
        gasto: exp
      };
    });
  }, [collections, expenses, saldo2025, totalReingresos]);

  return (
    <div className="space-y-8">
      
      {/* 1. Header con Badge de Mando y Acciones de Administrador */}
      <div className="biker-card p-6 bg-gradient-to-r from-amber-950/40 via-biker-gray to-biker-black border border-amber-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-400 shrink-0 shadow-lg shadow-amber-500/10">
            <Crown className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                INFORME GENERAL: RECAUDOS Y GASTOS 2026
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-amber-500/15 text-amber-400 border border-amber-500/30 rounded-full font-bold">
                Líder General
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Supervisión financiera integral, tesorería de cuotas, gastos de aniversario y caja de la hermandad.
            </p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setModalType('pago')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" /> Registrar Cuota
          </button>
          <button
            onClick={() => setModalType('gasto')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Agregar Gasto
          </button>
          <button
            onClick={() => setModalType('multa')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Multa
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-biker-red hover:bg-red-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-biker-red/20"
          >
            <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
          </button>
        </div>
      </div>

      {/* 2. Tarjetas Resumen Ejecutivo (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Real Disponible */}
        <div className="biker-card p-5 border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-black to-black relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">Total Real Disponible</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white tracking-tight">${totalRealDisponible.toLocaleString('es-CO')}</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1 leading-tight">
            Recaudos − Gastos + Multas
          </p>
        </div>

        {/* Total Recaudado */}
        <div className="biker-card p-5 border border-emerald-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Total Recaudado</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 tracking-tight">${totalRecaudos.toLocaleString('es-CO')}</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            2026: $1.880.000 + 2025: $166k
          </p>
        </div>

        {/* Total Gastos */}
        <div className="biker-card p-5 border border-red-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">Total Gastos</span>
            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-red-400 tracking-tight">${totalGastos.toLocaleString('es-CO')}</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Concepto: Cumple (Ago: 37%)
          </p>
        </div>

        {/* Reingresos / Multas */}
        <div className="biker-card p-5 border border-purple-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold">Reingresos (Multas)</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-300 tracking-tight">${totalReingresos.toLocaleString('es-CO')}</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            3 sanciones aplicadas
          </p>
        </div>

        {/* Miembros Activos */}
        <div className="biker-card p-5 border border-white/10 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">Miembros Registrados</span>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white tracking-tight">{members.length}</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Cuota: $10k → $15k (Jun)
          </p>
        </div>

        {/* Pagos Pendientes */}
        <div className="biker-card p-5 border border-amber-500/40 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">Pagos Pendientes</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-400 tracking-tight">{pendingCount}</p>
          <p className="text-[10px] text-amber-400/80 font-mono mt-1">
            Wili (Octubre)
          </p>
        </div>
      </div>

      {/* Navegación por Pestañas del Informe */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono uppercase tracking-wider">
        {[
          { id: 'resumen', name: '📊 Gráficos & Balances', count: 'Ene-Oct' },
          { id: 'matriz', name: '📋 Matriz de Cuotas (13 Miembros)', count: `${pendingCount} pendiente` },
          { id: 'gastos', name: '💸 Detalle de Gastos', count: `$${(totalGastos / 1000).toFixed(0)}k` },
          { id: 'multas', name: '⚖️ Reingresos y Multas', count: `$${(totalReingresos / 1000).toFixed(0)}k` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-biker-red text-white bg-white/[0.03]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.01]'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-biker-red/20 text-biker-red' : 'bg-white/5 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* CONTENIDO 1: GRÁFICOS Y ANÁLISIS */}
      {activeTab === 'resumen' && (
        <div className="space-y-8">
          
          {/* Gráfico 1 & 2: Recaudos por Mes y Gastos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Gráfico de Barras: Recaudo Mensual 2026 */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" /> Recaudos por Mes (2026)
                  </h3>
                  <p className="text-xs text-gray-400">Total recaudado 2026: <strong className="text-emerald-400">${totalRecaudo2026.toLocaleString('es-CO')}</strong></p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Julio récord ($285k)
                </span>
              </div>

              {/* Visualizador de Barras */}
              <div className="space-y-2.5 pt-2">
                {collections.slice(0, 10).map((col) => {
                  const maxAmount = 285000;
                  const percentage = (col.amount / maxAmount) * 100;
                  const isRecord = col.key === 'Jul' || col.key === 'Ago';
                  return (
                    <div key={col.key} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-300 font-bold flex items-center gap-1.5">
                          {col.month}
                          {isRecord && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded border border-emerald-500/30">
                              Récord
                            </span>
                          )}
                          <span className="text-[10px] text-gray-500 font-normal">
                            (Cuota ${col.cuota.toLocaleString('es-CO')})
                          </span>
                        </span>
                        <span className="font-bold text-emerald-400">${col.amount.toLocaleString('es-CO')}</span>
                      </div>
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            isRecord 
                              ? 'bg-gradient-to-r from-emerald-500 to-amber-400' 
                              : 'bg-emerald-500/70'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-white/5 rounded-xl text-xs text-gray-400 flex items-center justify-between border border-white/5 font-mono">
                <span>Noviembre & Diciembre:</span>
                <span className="text-amber-400">Pendiente de cierre</span>
              </div>
            </div>

            {/* Gráfico de Barras: Gastos por Mes (Concepto: Cumple) */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-red-400" /> Distribución de Gastos (Cumple)
                  </h3>
                  <p className="text-xs text-gray-400">Total ejecutado: <strong className="text-red-400">${totalGastos.toLocaleString('es-CO')}</strong></p>
                </div>
                <span className="text-[10px] font-mono text-red-400 bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                  Agosto pico (37.5%)
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {expenses.map((exp) => {
                  const maxExpense = 300000;
                  const percentage = (exp.amount / maxExpense) * 100;
                  return (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-300 font-bold flex items-center gap-1.5">
                          {exp.month}
                          <span className="text-[10px] text-gray-500 font-normal">({exp.concept})</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-red-400 font-bold">${exp.amount.toLocaleString('es-CO')}</span>
                          <span className="text-[10px] text-gray-400 bg-white/5 px-1.5 py-0.5 rounded">
                            {exp.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            exp.amount >= 300000 ? 'bg-gradient-to-r from-red-600 to-amber-500' : 'bg-red-500/70'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-xs text-red-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-red-400" /> Nota de Auditoría de Gastos:
                </p>
                <p className="text-[11px] text-gray-400">
                  El 100% de los egresos ($801.000) corresponden al rubro "Cumpleaños" (celebraciones e integraciones oficiales de la hermandad). Agosto acumuló el 37.5% de los gastos.
                </p>
              </div>
            </div>

          </div>

          {/* Gráfico 3: Saldo Acumulado Mes a Mes (Evolución de Caja) */}
          <div className="biker-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-400" /> Evolución del Saldo Acumulado Disponible (2026)
                </h3>
                <p className="text-xs text-gray-400">
                  Saldo anterior 2025: <strong className="text-white">${saldo2025.toLocaleString('es-CO')}</strong> → Saldo final disponible: <strong className="text-amber-400">${totalRealDisponible.toLocaleString('es-CO')}</strong>
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold">
                Balance Positivo +$1.465.000
              </span>
            </div>

            {/* Simulación Gráfica de Línea con Barras de Balance */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-4">
              {acumuladoMeses.map((item, idx) => {
                const maxBalance = 1500000;
                const heightPercent = Math.max(15, Math.min(100, (item.balance / maxBalance) * 100));
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-amber-300 font-bold group-hover:scale-110 transition-transform">
                      ${(item.balance / 1000).toFixed(0)}k
                    </span>
                    <div className="w-full h-32 bg-black/50 rounded-xl border border-white/5 flex items-end p-1.5 relative overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.6, delay: idx * 0.05 }}
                        className="w-full bg-gradient-to-t from-amber-600 via-amber-500 to-amber-300 rounded-lg group-hover:brightness-125 transition-all shadow-md shadow-amber-500/20"
                      />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-gray-400">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* CONTENIDO 2: MATRIZ DE MIEMBROS POR MES (CÓDIGO DE COLORES) */}
      {activeTab === 'matriz' && (
        <div className="space-y-6">
          
          {/* Barra de Filtros y Búsqueda */}
          <div className="biker-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar miembro por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-amber-500 font-mono"
              >
                <option value="todos">Todos los Estados</option>
                <option value="paid">Pagado (Verde)</option>
                <option value="pending">Pendiente (Amarillo)</option>
                <option value="advanced">Adelantado (Azul)</option>
                <option value="not_applicable">No Aplica (Morado)</option>
              </select>
            </div>

            {/* Leyenda de Código de Colores Oficial */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Pagado
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-purple-900/40 text-purple-300 border border-purple-500/30">
                <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" /> No Aplica (No era miembro)
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/30 text-amber-300 border border-amber-500/60 font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Pendiente (Wili, Oct)
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" /> Adelantado
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" /> Mes Futuro
              </span>
            </div>
          </div>

          {/* Tabla Matriz Maestra */}
          <div className="biker-card overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black/80 border-b border-white/10 font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                    <th className="p-3.5 sticky left-0 bg-black/95 z-20 min-w-[200px]">Miembro ({filteredMembers.length})</th>
                    <th className="p-3 text-center min-w-[90px]">Ingreso</th>
                    {MONTH_KEYS.map((k, idx) => (
                      <th key={k} className="p-2.5 text-center min-w-[65px]">
                        <div>{k}</div>
                        <div className="text-[8px] font-normal text-gray-500">
                          {idx < 5 ? '$10k' : '$15k'}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3 font-sans font-bold text-white sticky left-0 bg-[#0c0c0c] z-10 border-r border-white/5">
                        <div className="flex items-center gap-2">
                          <span>{m.name}</span>
                          {m.name.includes('Juanse') && (
                            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          )}
                        </div>
                      </td>
                      <td className="p-2.5 text-center text-gray-400 text-[11px]">
                        {m.joinMonth}
                      </td>
                      {MONTH_KEYS.map((k) => {
                        const status = m.payments[k];
                        return (
                          <td key={k} className="p-1.5 text-center">
                            <button
                              onClick={() => handleTogglePayment(m.id, k)}
                              title={`${m.name} - ${k}: Click para alternar estado`}
                              className={`w-full py-1 px-1 rounded-md text-[10px] font-bold transition-all border ${
                                status === 'paid'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:brightness-125'
                                  : status === 'not_applicable'
                                  ? 'bg-purple-900/30 text-purple-300 border-purple-500/30 opacity-70 cursor-not-allowed'
                                  : status === 'pending'
                                  ? 'bg-amber-500/30 text-amber-300 border-amber-500/60 animate-pulse hover:brightness-125'
                                  : status === 'advanced'
                                  ? 'bg-cyan-500/25 text-cyan-300 border-cyan-500/40 font-bold hover:brightness-125'
                                  : 'bg-white/5 text-gray-600 border-white/5 hover:bg-white/10'
                              }`}
                            >
                              {status === 'paid' && '✓'}
                              {status === 'not_applicable' && '—'}
                              {status === 'pending' && 'PEND'}
                              {status === 'advanced' && 'ADEL'}
                              {status === 'future' && '·'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Informativo de la Matriz */}
            <div className="p-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Tip de Admin:</strong> Haz clic en cualquier celda para alternar el estado de pago del miembro en ese mes.
                </span>
              </div>
              <span className="font-mono text-[11px] text-amber-400">
                Pagos adelantados registrados: Milaa (Oct, Nov, Dic), Nia (Nov), Juanse (Nov)
              </span>
            </div>
          </div>

        </div>
      )}

      {/* CONTENIDO 3: DETALLE DE GASTOS */}
      {activeTab === 'gastos' && (
        <div className="space-y-6">
          <div className="biker-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" /> Registro Detallado de Gastos 2026
                </h3>
                <p className="text-xs text-gray-400">Total de egresos registrados: <strong className="text-red-400">${totalGastos.toLocaleString('es-CO')}</strong></p>
              </div>
              <button
                onClick={() => setModalType('gasto')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar Gasto
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[11px]">
                    <th className="p-3">Mes</th>
                    <th className="p-3">Concepto</th>
                    <th className="p-3">Porcentaje</th>
                    <th className="p-3 text-right">Valor (COP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {expenses.map((e) => (
                    <tr key={e.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 text-white font-bold">{e.month}</td>
                      <td className="p-3 text-gray-300">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                          {e.concept}
                        </span>
                      </td>
                      <td className="p-3 text-gray-400">{e.percentage}% del total</td>
                      <td className="p-3 text-right font-bold text-red-400">${e.amount.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/5 font-bold text-sm">
                    <td colSpan={3} className="p-3 text-white uppercase">Total Gastos Ejecutados</td>
                    <td className="p-3 text-right text-red-400">${totalGastos.toLocaleString('es-CO')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO 4: REINGRESOS Y MULTAS */}
      {activeTab === 'multas' && (
        <div className="space-y-6">
          <div className="biker-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" /> Sanciones, Multas y Reingresos
                </h3>
                <p className="text-xs text-gray-400">Total recaudado por multas y sanciones: <strong className="text-purple-300">${totalReingresos.toLocaleString('es-CO')}</strong></p>
              </div>
              <button
                onClick={() => setModalType('multa')}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 hover:bg-purple-500/25 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Registrar Multa
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-[11px]">
                    <th className="p-3">Persona / Hermano</th>
                    <th className="p-3">Motivo / Concepto</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3 text-right">Monto Recaudado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {fines.map((f) => (
                    <tr key={f.id} className="hover:bg-white/[0.02]">
                      <td className="p-3 text-white font-bold">{f.person}</td>
                      <td className="p-3 text-gray-300">{f.concept}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                          Reingresado a Caja
                        </span>
                      </td>
                      <td className="p-3 text-right font-bold text-purple-300">${f.amount.toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/5 font-bold text-sm">
                    <td colSpan={3} className="p-3 text-white uppercase">Total Reingresos por Multas</td>
                    <td className="p-3 text-right text-purple-300">${totalReingresos.toLocaleString('es-CO')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REGISTRAR CUOTA / PAGO */}
      <AnimatePresence>
        {modalType === 'pago' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="biker-card p-6 w-full max-w-md border border-emerald-500/30 bg-[#0c0c0c] shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Registrar o Modificar Cuota
                </h3>
                <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePago} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Miembro</label>
                  <select
                    value={pagoForm.memberId}
                    onChange={(e) => setPagoForm({ ...pagoForm, memberId: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                  >
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Mes</label>
                  <select
                    value={pagoForm.month}
                    onChange={(e) => setPagoForm({ ...pagoForm, month: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                  >
                    {MONTH_KEYS.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Estado de Pago</label>
                  <select
                    value={pagoForm.status}
                    onChange={(e) => setPagoForm({ ...pagoForm, status: e.target.value as PaymentStatus })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
                  >
                    <option value="paid">Pagado (Verde)</option>
                    <option value="pending">Pendiente (Amarillo)</option>
                    <option value="advanced">Adelantado (Azul)</option>
                    <option value="not_applicable">No Aplica (Morado)</option>
                    <option value="future">Mes Futuro</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                  >
                    Guardar Estado
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL AGREGAR GASTO */}
      <AnimatePresence>
        {modalType === 'gasto' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="biker-card p-6 w-full max-w-md border border-red-500/30 bg-[#0c0c0c] shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-400" /> Registrar Nuevo Gasto
                </h3>
                <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddExpense} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Mes</label>
                  <select
                    value={gastoForm.month}
                    onChange={(e) => setGastoForm({ ...gastoForm, month: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-500"
                  >
                    {MONTHS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Concepto</label>
                  <input
                    type="text"
                    required
                    value={gastoForm.concept}
                    onChange={(e) => setGastoForm({ ...gastoForm, concept: e.target.value })}
                    placeholder="Ej: Cumple, Logística, Obra Social"
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Monto (COP)</label>
                  <input
                    type="number"
                    required
                    min={1000}
                    step={1000}
                    value={gastoForm.amount}
                    onChange={(e) => setGastoForm({ ...gastoForm, amount: Number(e.target.value) })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-red-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
                  >
                    Guardar Gasto
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL REGISTRAR MULTA */}
      <AnimatePresence>
        {modalType === 'multa' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="biker-card p-6 w-full max-w-md border border-purple-500/30 bg-[#0c0c0c] shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" /> Registrar Multa / Sanción
                </h3>
                <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddFine} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Nombre de la Persona / Hermano</label>
                  <input
                    type="text"
                    required
                    value={multaForm.person}
                    onChange={(e) => setMultaForm({ ...multaForm, person: e.target.value })}
                    placeholder="Ej: Mila, Jennifer, etc."
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Motivo / Concepto de Multa</label>
                  <input
                    type="text"
                    required
                    value={multaForm.concept}
                    onChange={(e) => setMultaForm({ ...multaForm, concept: e.target.value })}
                    placeholder="Ej: Multa de convivencia, inasistencia"
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Monto de la Sanción (COP)</label>
                  <input
                    type="number"
                    required
                    min={5000}
                    step={5000}
                    value={multaForm.amount}
                    onChange={(e) => setMultaForm({ ...multaForm, amount: Number(e.target.value) })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-purple-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalType(null)}
                    className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
                  >
                    Guardar Multa
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
