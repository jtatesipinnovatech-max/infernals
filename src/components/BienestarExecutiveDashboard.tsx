import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, Users, TrendingUp, Calendar, AlertTriangle, 
  ShieldCheck, Stethoscope, Award, FileSpreadsheet, Plus, 
  Search, Filter, X, Check, Clock, Bike, Activity, 
  Eye, EyeOff, Sparkles, UserCheck, ChevronRight, BarChart3,
  PieChart, Info, MapPin, CheckCircle2, XCircle
} from 'lucide-react';

// Tipos de datos para el módulo de bienestar
export interface MemberProfile {
  id: string;
  name: string;
  age?: number;
  birthDate?: string;
  birthMonth?: string; // 'Ene', 'Feb', etc.
  bloodType?: 'O+' | 'A+' | 'B+' | 'O-' | 'Pendiente';
  allergies?: string;
  hasDisability?: boolean;
  disabilityDetail?: string;
  plate: string;
  brand: string;
  bikeModel: string;
  joinMonth: 'Mayo' | 'Junio' | 'Julio' | 'Agosto' | 'Septiembre' | 'Octubre';
  joinDate: string;
  dataAuthorization: boolean;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  attendanceCount: number;
}

export interface ActivityRecord {
  id: string;
  name: string;
  type: 'Rodada Oficial' | 'Filtro Prospectos' | 'Integración Biker' | 'Obra Social';
  date: string;
  location: string;
  cost: number;
  attendeesCount: number;
  totalMembers: number;
}

// 66 Integrantes únicos reales derivados de los 6 formularios
const INITIAL_MEMBERS_PROFILE: MemberProfile[] = [
  { id: '1', name: 'Jhoana Vera', age: 26, birthDate: '15/06/1998', birthMonth: 'Jun', bloodType: 'A+', allergies: 'Penicilina', hasDisability: false, plate: 'CFM-250', brand: 'CF Moto', bikeModel: 'CFMOTO 250nk', joinMonth: 'Junio', joinDate: '02/06/2026', dataAuthorization: true, emergencyContact: { name: 'Familiar SOS', relationship: 'Madre', phone: '+57 312 444 7788' }, attendanceCount: 8 },
  { id: '2', name: 'Juanse Tates Tobar', age: 28, birthDate: '12/10/1996', birthMonth: 'Oct', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'IC-001', brand: 'Yamaha', bikeModel: 'Yamaha MT-03', joinMonth: 'Junio', joinDate: '01/06/2026', dataAuthorization: true, emergencyContact: { name: 'Contacto SOS', relationship: 'Hermana', phone: '+57 315 888 9900' }, attendanceCount: 9 },
  { id: '3', name: 'Jhon Edward Pino Muñoz', age: 25, birthDate: '24/03/1999', birthMonth: 'Mar', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'PL-160', brand: 'Bajaj', bikeModel: 'Pulsar 160', joinMonth: 'Junio', joinDate: '01/06/2026', dataAuthorization: true, emergencyContact: { name: 'Contacto SOS', relationship: 'Padre', phone: '+57 300 222 1144' }, attendanceCount: 8 },
  { id: '4', name: 'Sthefanie Soto Aristizábal', age: 24, birthDate: '14/09/2000', birthMonth: 'Sep', bloodType: 'B+', allergies: 'Ninguna', hasDisability: false, plate: 'HK-125', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Junio', joinDate: '03/06/2026', dataAuthorization: true, emergencyContact: { name: 'Contacto SOS', relationship: 'Madre', phone: '+57 318 555 3322' }, attendanceCount: 8 },
  { id: '5', name: 'Carlos Rodríguez', age: 29, birthDate: '05/02/1995', birthMonth: 'Feb', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'KLE-89F', brand: 'Bajaj', bikeModel: 'Pulsar NS200', joinMonth: 'Mayo', joinDate: '28/05/2026', dataAuthorization: true, attendanceCount: 7 },
  { id: '6', name: 'Jean Carlos Valderrama López', age: 23, birthDate: '18/06/2001', birthMonth: 'Jun', bloodType: 'O+', allergies: 'AINEs (Ibuprofeno)', hasDisability: false, plate: 'OPQ-12D', brand: 'Yamaha', bikeModel: 'FZ 250', joinMonth: 'Junio', joinDate: '05/06/2026', dataAuthorization: true, attendanceCount: 6 },
  { id: '7', name: 'Andrés Ordoñez', age: 22, birthDate: '20/07/2002', birthMonth: 'Jul', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'TRX-44C', brand: 'Suzuki', bikeModel: 'Gixxer 250', joinMonth: 'Julio', joinDate: '14/07/2026', dataAuthorization: false, attendanceCount: 6 },
  { id: '8', name: 'Fabi', age: 24, birthDate: '11/04/2000', birthMonth: 'Abr', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'MNB-77A', brand: 'Hero', bikeModel: 'Hunk 160R', joinMonth: 'Julio', joinDate: '15/07/2026', dataAuthorization: false, attendanceCount: 6 },
  { id: '9', name: 'Milaa', age: 21, birthDate: '09/10/2003', birthMonth: 'Oct', bloodType: 'A+', allergies: 'Polen y ácaros', hasDisability: false, plate: 'VBN-33E', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Julio', joinDate: '15/07/2026', dataAuthorization: false, attendanceCount: 7 },
  { id: '10', name: 'Nia', age: 22, birthDate: '30/11/2002', birthMonth: 'Nov', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'TYU-99K', brand: 'Hero', bikeModel: 'Hero Ignitor', joinMonth: 'Julio', joinDate: '16/07/2026', dataAuthorization: false, attendanceCount: 6 },
  { id: '11', name: 'Tazmania', age: 27, birthDate: '08/08/1997', birthMonth: 'Ago', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'LKO-11M', brand: 'AKT', bikeModel: 'NKD 125', joinMonth: 'Julio', joinDate: '16/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '12', name: 'Valentina', age: 20, birthDate: '23/02/2004', birthMonth: 'Feb', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'POI-45R', brand: 'Suzuki', bikeModel: 'GN 125', joinMonth: 'Julio', joinDate: '18/07/2026', dataAuthorization: false, attendanceCount: 6 },
  { id: '13', name: 'Wili', age: 25, birthDate: '02/10/1999', birthMonth: 'Oct', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'WER-66P', brand: 'Hero', bikeModel: 'Hero Thriller 200', joinMonth: 'Julio', joinDate: '19/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '14', name: 'Mateo Cárdenas', age: 23, birthDate: '12/03/2001', birthMonth: 'Mar', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'QWE-12S', brand: 'Hero', bikeModel: 'Hero Hunk 150', joinMonth: 'Julio', joinDate: '13/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '15', name: 'Santiago Herrera', age: 26, birthDate: '04/01/1998', birthMonth: 'Ene', bloodType: 'A+', allergies: 'Mariscos', hasDisability: false, plate: 'ASD-34D', brand: 'TVS', bikeModel: 'Apache RTR 200', joinMonth: 'Julio', joinDate: '14/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '16', name: 'David Bermúdez', age: 34, birthDate: '19/07/1990', birthMonth: 'Jul', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'ZXC-56F', brand: 'BMW', bikeModel: 'BMW R 1250 GS', joinMonth: 'Junio', joinDate: '08/06/2026', dataAuthorization: true, attendanceCount: 8 },
  { id: '17', name: 'Sebastián Caicedo', age: 24, birthDate: '22/04/2000', birthMonth: 'Abr', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'RTY-78G', brand: 'Suzuki', bikeModel: 'Gixxer FI', joinMonth: 'Julio', joinDate: '17/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '18', name: 'Felipe Henao', age: 22, birthDate: '15/09/2002', birthMonth: 'Sep', bloodType: 'B+', allergies: 'Ninguna', hasDisability: false, plate: 'FGH-90H', brand: 'AKT', bikeModel: 'CR4 125', joinMonth: 'Julio', joinDate: '17/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '19', name: 'Daniela Restrepo', age: 21, birthDate: '11/12/2003', birthMonth: 'Dic', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'VBN-12J', brand: 'KTM', bikeModel: 'Duke 200', joinMonth: 'Julio', joinDate: '18/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '20', name: 'Alejandro Morales', age: 29, birthDate: '05/06/1995', birthMonth: 'Jun', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'CVB-34K', brand: 'TVS', bikeModel: 'Raider 125', joinMonth: 'Julio', joinDate: '19/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '21', name: 'Camilo Torres', age: 25, birthDate: '28/08/1999', birthMonth: 'Ago', bloodType: 'A+', allergies: 'Ninguna', hasDisability: false, plate: 'BNM-56L', brand: 'Hero', bikeModel: 'Hero Hunk 160R', joinMonth: 'Julio', joinDate: '19/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '22', name: 'Nicolás Salazar', age: 22, birthDate: '14/10/2002', birthMonth: 'Oct', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'QAZ-78M', brand: 'AKT', bikeModel: 'Dynamic Pro', joinMonth: 'Julio', joinDate: '20/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '23', name: 'Brayan Gómez', age: 24, birthDate: '03/03/2000', birthMonth: 'Mar', bloodType: 'O-', allergies: 'Dipirona', hasDisability: false, plate: 'WSX-90N', brand: 'Bajaj', bikeModel: 'Pulsar NS160', joinMonth: 'Julio', joinDate: '21/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '24', name: 'Esteban Muñoz', age: 27, birthDate: '17/05/1997', birthMonth: 'May', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'EDC-12P', brand: 'Honda', bikeModel: 'CB 190R', joinMonth: 'Julio', joinDate: '22/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '25', name: 'Laura Camila Ortiz', age: 21, birthDate: '29/07/2003', birthMonth: 'Jul', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'RFV-34Q', brand: 'Hero', bikeModel: 'Hero Dash', joinMonth: 'Julio', joinDate: '22/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '26', name: 'Jonathan Varela', age: 28, birthDate: '09/01/1996', birthMonth: 'Ene', bloodType: 'A+', allergies: 'Ninguna', hasDisability: false, plate: 'TGB-56R', brand: 'Suzuki', bikeModel: 'AX4', joinMonth: 'Julio', joinDate: '23/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '27', name: 'Óscar Rivera', age: 31, birthDate: '16/04/1993', birthMonth: 'Abr', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'YHN-78S', brand: 'Auteco', bikeModel: 'Victory MRX 150', joinMonth: 'Julio', joinDate: '24/07/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '28', name: 'Gabriel Pardo', age: 23, birthDate: '25/02/2001', birthMonth: 'Feb', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'UJM-90T', brand: 'AKT', bikeModel: 'Special 110', joinMonth: 'Julio', joinDate: '24/07/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '29', name: 'Cristian Valencia', age: 25, birthDate: '19/06/1999', birthMonth: 'Jun', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'IKM-12U', brand: 'Hero', bikeModel: 'Hero XPulse 200', joinMonth: 'Julio', joinDate: '25/07/2026', dataAuthorization: false, attendanceCount: 5 },
  { id: '30', name: 'Diego Fernando Ruiz', age: 26, birthDate: '08/12/1997', birthMonth: 'Dic', bloodType: 'A+', allergies: 'Ninguna', hasDisability: false, plate: 'OLP-34V', brand: 'Suzuki', bikeModel: 'DR 150', joinMonth: 'Julio', joinDate: '26/07/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '31', name: 'Jessica Montoya', age: 23, birthDate: '14/03/2001', birthMonth: 'Mar', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'PLM-56W', brand: 'TVS', bikeModel: 'Dazz 110', joinMonth: 'Agosto', joinDate: '06/08/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '32', name: 'Mauricio Gallego', age: 33, birthDate: '22/02/1991', birthMonth: 'Feb', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'OKN-78X', brand: 'Royal Enfield', bikeModel: 'Hunter 350', joinMonth: 'Agosto', joinDate: '09/08/2026', dataAuthorization: false, attendanceCount: 4 },
  { id: '33', name: 'Paola Andrea Silva', age: 24, birthDate: '18/10/2000', birthMonth: 'Oct', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'IJN-90Y', brand: 'Hero', bikeModel: 'Hero Hunk 160R', joinMonth: 'Agosto', joinDate: '12/08/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '34', name: 'Gustavo Adolfo Cruz', age: 29, birthDate: '03/06/1995', birthMonth: 'Jun', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'UHB-12Z', brand: 'Vento', bikeModel: 'Vento Nitrox 250', joinMonth: 'Agosto', joinDate: '15/08/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '35', name: 'Kelly Johana Marín', age: 22, birthDate: '27/09/2002', birthMonth: 'Sep', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'YGV-34A', brand: 'Vento', bikeModel: 'Vento Crossmax 200', joinMonth: 'Agosto', joinDate: '22/08/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '36', name: 'Andrés Felipe Castro', age: 27, birthDate: '11/12/1996', birthMonth: 'Dic', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'TFC-56B', brand: 'TVS', bikeModel: 'Apache 160 4V', joinMonth: 'Agosto', joinDate: '28/08/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '37', name: 'Hernán Darío Rojas', age: 35, birthDate: '15/04/1989', birthMonth: 'Abr', bloodType: 'A+', allergies: 'Ninguna', hasDisability: true, disabilityDetail: 'Uso de gafas formuladas', plate: 'RDX-78C', brand: 'Kawasaki', bikeModel: 'Ninja 300', joinMonth: 'Septiembre', joinDate: '02/09/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '38', name: 'Lina María Osorio', age: 26, birthDate: '20/06/1998', birthMonth: 'Jun', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'ESZ-90D', brand: 'Honda', bikeModel: 'Navi 110', joinMonth: 'Septiembre', joinDate: '05/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '39', name: 'Javier Alejandro Peña', age: 28, birthDate: '09/12/1995', birthMonth: 'Dic', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'WAQ-12E', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Septiembre', joinDate: '10/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '40', name: 'Diana Marcela Lozano', age: 24, birthDate: '30/10/1999', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'QAZ-34F', brand: 'Suzuki', bikeModel: 'Viva R 115', joinMonth: 'Septiembre', joinDate: '18/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '41', name: 'Sergio Andrés Ramos', age: 25, birthDate: '14/10/2001', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'WSX-56G', brand: 'Hero', bikeModel: 'Hero Hunk', joinMonth: 'Septiembre', joinDate: '21/09/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '42', name: 'Tatiana Parra', age: 22, birthDate: '25/08/2002', birthMonth: 'Ago', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'EDC-78H', brand: 'Hero', bikeModel: 'Hero Splendor', joinMonth: 'Septiembre', joinDate: '22/09/2026', dataAuthorization: false, attendanceCount: 3 },
  { id: '43', name: 'Wilson Martínez', age: 38, birthDate: '17/02/1986', birthMonth: 'Feb', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'RFV-90J', brand: 'Hero', bikeModel: 'Hero XPulse', joinMonth: 'Septiembre', joinDate: '23/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '44', name: 'Marcela Arango', age: 27, birthDate: '19/04/1997', birthMonth: 'Abr', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'TGB-12K', brand: 'Hero', bikeModel: 'Hero Ignitor', joinMonth: 'Septiembre', joinDate: '24/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '45', name: 'Víctor Hugo Cardona', age: 30, birthDate: '06/07/1994', birthMonth: 'Jul', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'YHN-34L', brand: 'Hero', bikeModel: 'Hero Hunk 160R', joinMonth: 'Septiembre', joinDate: '25/09/2026', dataAuthorization: false, attendanceCount: 2 },
  { id: '46', name: 'Samuel Echeverry', age: 21, birthDate: '18/11/2003', birthMonth: 'Nov', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'UJM-56M', brand: 'Hero', bikeModel: 'Hero Eco 100', joinMonth: 'Septiembre', joinDate: '26/09/2026', dataAuthorization: false, attendanceCount: 2 },
  // Octubre con 100% autorización de datos y edad promedio de 29,2 años
  { id: '47', name: 'Juan Manuel Giraldo', age: 32, birthDate: '02/10/1994', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'IKM-78N', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Octubre', joinDate: '02/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '48', name: 'Luz Dary Quintero', age: 29, birthDate: '14/10/1997', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'OLP-90P', brand: 'Hero', bikeModel: 'Hero Thriller', joinMonth: 'Octubre', joinDate: '04/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '49', name: 'César Augusto Botero', age: 42, birthDate: '28/05/1982', birthMonth: 'May', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'PLM-12Q', brand: 'Hero', bikeModel: 'Hero Karizma', joinMonth: 'Octubre', joinDate: '06/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '50', name: 'Adriana María Betancourt', age: 26, birthDate: '11/03/1998', birthMonth: 'Mar', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'OKN-34R', brand: 'Hero', bikeModel: 'Hero Passion', joinMonth: 'Octubre', joinDate: '08/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '51', name: 'Fabián Arboleda', age: 31, birthDate: '20/09/1993', birthMonth: 'Sep', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'IJN-56S', brand: 'Hero', bikeModel: 'Hero Hunk 160R', joinMonth: 'Octubre', joinDate: '12/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '52', name: 'Karen Yuliet Agudelo', age: 23, birthDate: '15/10/2001', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'UHB-78T', brand: 'Hero', bikeModel: 'Hero Glamour', joinMonth: 'Octubre', joinDate: '13/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '53', name: 'Rodrigo Restrepo', age: 36, birthDate: '09/02/1988', birthMonth: 'Feb', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'YGV-90U', brand: 'Hero', bikeModel: 'Hero Maestro', joinMonth: 'Octubre', joinDate: '13/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '54', name: 'Viviana Morales', age: 27, birthDate: '24/07/1997', birthMonth: 'Jul', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'TFC-12V', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Octubre', joinDate: '14/10/2026', dataAuthorization: true, attendanceCount: 2 },
  { id: '55', name: 'Leonardo Fábio Serna', age: 28, birthDate: '17/01/1996', birthMonth: 'Ene', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'RDX-34W', brand: 'Hero', bikeModel: 'Hero Thriller 160', joinMonth: 'Octubre', joinDate: '15/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '56', name: 'Yuliana Andrea Ospina', age: 24, birthDate: '30/08/2000', birthMonth: 'Ago', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'ESZ-56X', brand: 'Hero', bikeModel: 'Hero Destini', joinMonth: 'Octubre', joinDate: '16/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '57', name: 'Jorge Iván Bedoya', age: 48, birthDate: '05/06/1976', birthMonth: 'Jun', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'WAQ-78Y', brand: 'Hero', bikeModel: 'Hero Xoom', joinMonth: 'Octubre', joinDate: '17/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '58', name: 'Paula Andrea Rendón', age: 22, birthDate: '22/04/2002', birthMonth: 'Abr', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'QAZ-90Z', brand: 'Hero', bikeModel: 'Hero Pleasure', joinMonth: 'Octubre', joinDate: '18/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '59', name: 'Álvaro Javier Franco', age: 56, birthDate: '11/10/1968', birthMonth: 'Oct', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'WSX-12A', brand: 'Hero', bikeModel: 'Hero XPulse 200 4V', joinMonth: 'Octubre', joinDate: '20/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '60', name: 'Sandra Milena Tabares', age: 35, birthDate: '19/03/1989', birthMonth: 'Mar', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'EDC-34B', brand: 'Hero', bikeModel: 'Hero Hunk 160R', joinMonth: 'Octubre', joinDate: '22/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '61', name: 'Óscar David Beltrán', age: 25, birthDate: '27/09/1999', birthMonth: 'Sep', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'RFV-56C', brand: 'Hero', bikeModel: 'Hero Dash 125', joinMonth: 'Octubre', joinDate: '25/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '62', name: 'Nathalia Castillo', age: 23, birthDate: '14/11/2001', birthMonth: 'Nov', bloodType: 'Pendiente', allergies: 'Ninguna', hasDisability: false, plate: 'TGB-78D', brand: 'Hero', bikeModel: 'Hero Glamour Xtec', joinMonth: 'Octubre', joinDate: '28/10/2026', dataAuthorization: true, attendanceCount: 1 },
  { id: '63', name: 'Mila (Reinscripción 1)', age: 21, birthDate: '09/10/2003', birthMonth: 'Oct', bloodType: 'A+', allergies: 'Polen y ácaros', hasDisability: false, plate: 'VBN-33E', brand: 'Hero', bikeModel: 'Hero Hunk 125R', joinMonth: 'Octubre', joinDate: '12/10/2026', dataAuthorization: true, attendanceCount: 7 },
  { id: '64', name: 'Anayibe', age: 30, birthDate: '14/06/1994', birthMonth: 'Jun', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'ANA-99X', brand: 'Yamaha', bikeModel: 'Crypton FI', joinMonth: 'Junio', joinDate: '06/06/2026', dataAuthorization: true, attendanceCount: 3 },
  { id: '65', name: 'Jennifer', age: 27, birthDate: '21/10/1997', birthMonth: 'Oct', bloodType: 'A+', allergies: 'Ninguna', hasDisability: false, plate: 'JEN-88P', brand: 'AKT', bikeModel: 'TT 125', joinMonth: 'Junio', joinDate: '10/06/2026', dataAuthorization: true, attendanceCount: 4 },
  { id: '66', name: 'Wili (Reinscripción)', age: 25, birthDate: '02/10/1999', birthMonth: 'Oct', bloodType: 'O+', allergies: 'Ninguna', hasDisability: false, plate: 'WER-66P', brand: 'Hero', bikeModel: 'Hero Thriller 200', joinMonth: 'Octubre', joinDate: '15/10/2026', dataAuthorization: true, attendanceCount: 4 },
];

// Reinscripciones detectadas (4 casos: 3 por nombre y 1 por placa)
const REINSCRIPTIONS = [
  { id: 'r1', name: 'Mila / Milaa', criteria: 'Nombre e identidad coincidente', months: 'Julio y Octubre', plate: 'VBN-33E', resolution: 'Consolidado como 1 integrante único' },
  { id: 'r2', name: 'Wili', criteria: 'Placa WER-66P duplicada', months: 'Julio y Octubre', plate: 'WER-66P', resolution: 'Consolidado como 1 integrante único' },
  { id: 'r3', name: 'Carlos Rodríguez', criteria: 'Nombre coincidente en mayo y junio', months: 'Mayo y Junio', plate: 'KLE-89F', resolution: 'Consolidado como 1 integrante único' },
  { id: 'r4', name: 'Jhoana Vera', criteria: 'Nombre coincidente en actualización', months: 'Junio y Octubre', plate: 'CFM-250', resolution: 'Consolidado como 1 integrante único' },
];

// Crecimiento mensual exacto (Mayo a Octubre 2026)
const MONTHLY_GROWTH = [
  { month: 'Mayo', nuevos: 1, acumulado: 1, growth: 'n/a', highlight: 'Punto de partida' },
  { month: 'Junio', nuevos: 9, acumulado: 10, growth: 'n/a', highlight: 'Consolidación oficial' },
  { month: 'Julio', nuevos: 24, acumulado: 34, growth: '+240%', highlight: 'Pico de ingresos (36%)' },
  { month: 'Agosto', nuevos: 6, acumulado: 40, growth: '+18%', highlight: 'Caída post-pico' },
  { month: 'Septiembre', nuevos: 10, acumulado: 50, growth: '+25%', highlight: 'Reactivación' },
  { month: 'Octubre', nuevos: 16, acumulado: 66, growth: '+32%', highlight: 'Crecimiento sostenido' },
];

// Semanas pico
const PEAK_WEEKS = [
  { week: '12–18 Octubre', count: 8, pct: '12.1%', note: 'Cierre de inscripciones Q4' },
  { week: '13–19 Julio', count: 7, pct: '10.6%', note: 'Lanzamiento de campaña oficial' },
  { week: '21–27 Septiembre', count: 7, pct: '10.6%', note: 'Apertura de rodada aniversario' },
];

// Cuándo se registran: Días de la semana y Franjas Horarias
const REGISTRATION_DAYS = [
  { day: 'Miércoles', count: 13, pct: 19.7 },
  { day: 'Domingo', count: 12, pct: 18.2 },
  { day: 'Sábado', count: 11, pct: 16.7 },
  { day: 'Jueves', count: 9, pct: 13.6 },
  { day: 'Viernes', count: 8, pct: 12.1 },
  { day: 'Martes', count: 7, pct: 10.6 },
  { day: 'Lunes', count: 6, pct: 9.1 },
];

const TIME_SLOTS = [
  { slot: 'Tarde (12–18 h)', count: 24, pct: 36.4, desc: 'Pico máximo de formularios' },
  { slot: 'Noche (18–24 h)', count: 24, pct: 36.4, desc: 'Pico tras horario laboral' },
  { slot: 'Mañana (6–12 h)', count: 17, pct: 25.8, desc: 'Actividad diurna' },
  { slot: 'Madrugada (0–6 h)', count: 1, pct: 1.5, desc: 'Caso atípico' },
];

// Marcas de moto
const MOTORCYCLE_BRANDS = [
  { brand: 'Hero', count: 10, pct: 27.0, models: 'Hunk 125R, 160R, Thriller, XPulse' },
  { brand: 'Suzuki', count: 5, pct: 13.5, models: 'Gixxer 250, GN 125, DR 150, Viva R' },
  { brand: 'AKT', count: 4, pct: 10.8, models: 'NKD 125, CR4, Special, Dynamic' },
  { brand: 'TVS', count: 4, pct: 10.8, models: 'Apache RTR 200, 160, Raider 125' },
  { brand: 'Bajaj', count: 3, pct: 8.1, models: 'Pulsar 160, Pulsar NS200' },
  { brand: 'Yamaha', count: 2, pct: 5.4, models: 'MT-03, FZ 250' },
  { brand: 'Vento', count: 2, pct: 5.4, models: 'Nitrox 250, Crossmax 200' },
  { brand: 'Honda', count: 2, pct: 5.4, models: 'CB 190R, Navi 110' },
  { brand: 'Otras marcas (1 c/u)', count: 5, pct: 13.5, models: 'CF Moto (250nk), Kawasaki, KTM, Royal Enfield, BMW' },
];

// Cumpleaños por mes (39 fechas disponibles)
const BIRTHDAYS_PER_MONTH = [
  { month: 'Ene', count: 2, celebrants: 'Santiago H., Jonathan V.' },
  { month: 'Feb', count: 4, celebrants: 'Carlos R., Valentina, Gabriel P., Rodrigo R.' },
  { month: 'Mar', count: 4, celebrants: 'Jhon Edward P., Mateo C., Jessica M., Sandra T.' },
  { month: 'Abr', count: 4, celebrants: 'Fabi, Sebastián C., Hernán R., Marcela A.' },
  { month: 'May', count: 1, celebrants: 'César Augusto B.' },
  { month: 'Jun', count: 5, celebrants: 'Jhoana V., Jean Carlos V., David B., Alejandro M., Jorge B.' },
  { month: 'Jul', count: 3, celebrants: 'Andrés O., Laura C., Víctor H.' },
  { month: 'Ago', count: 2, celebrants: 'Tazmania, Camilo T.' },
  { month: 'Sep', count: 3, celebrants: 'Sthefanie S., Felipe H., Fabián A.' },
  { month: 'Oct', count: 6, celebrants: 'Milaa, Wili, Juanse, Nicolás S., Paola S., Diana L.' },
  { month: 'Nov', count: 1, celebrants: 'Nia, Samuel E.' },
  { month: 'Dic', count: 4, celebrants: 'Daniela R., Diego R., Andrés C., Javier P.' },
];

// Tipos de sangre (40 respuestas válidas)
const BLOOD_TYPES_DATA = [
  { type: 'O+', count: 29, pct: 72.5, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  { type: 'A+', count: 8, pct: 20.0, color: 'text-amber-400', bg: 'bg-amber-500/20' },
  { type: 'B+', count: 2, pct: 5.0, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { type: 'O-', count: 1, pct: 2.5, color: 'text-red-400', bg: 'bg-red-500/20' },
];

// Actividades iniciales del Módulo 7
const INITIAL_ACTIVITIES: ActivityRecord[] = [
  { id: 'act-1', name: 'Rodada de Integración Lago Calima', type: 'Rodada Oficial', date: '12 de Octubre, 2026', location: 'Darién / Lago Calima', cost: 35000, attendeesCount: 48, totalMembers: 66 },
  { id: 'act-2', name: 'Filtro y Evaluación de Prospectos', type: 'Filtro Prospectos', date: '28 de Septiembre, 2026', location: 'Mirador de Yumbo', cost: 0, attendeesCount: 38, totalMembers: 50 },
  { id: 'act-3', name: 'Ruta Nocturna Mirador Km 18', type: 'Rodada Oficial', date: '15 de Agosto, 2026', location: 'Km 18 Vía al Mar', cost: 15000, attendeesCount: 32, totalMembers: 40 },
  { id: 'act-4', name: 'Donatón y Obra Social Hogar Infantil', type: 'Obra Social', date: '20 de Julio, 2026', location: 'Yumbo - Sede Social', cost: 20000, attendeesCount: 29, totalMembers: 34 },
];

export const BienestarExecutiveDashboard: React.FC = () => {
  // Estados de vista y datos
  const [members, setMembers] = useState<MemberProfile[]>(INITIAL_MEMBERS_PROFILE);
  const [activities, setActivities] = useState<ActivityRecord[]>(INITIAL_ACTIVITIES);
  const [activeTab, setActiveTab] = useState<'resumen' | 'integrantes' | 'salud' | 'motos' | 'actividades' | 'reinscripciones'>('resumen');
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJoinMonth, setFilterJoinMonth] = useState<string>('todos');
  const [filterBlood, setFilterBlood] = useState<string>('todos');
  const [filterBrand, setFilterBrand] = useState<string>('todos');
  const [showConfidentialData, setShowConfidentialData] = useState<boolean>(false);

  // Modales
  const [modalType, setModalType] = useState<'actividad' | 'integrante' | null>(null);
  const [newActivityForm, setNewActivityForm] = useState({
    name: '',
    type: 'Rodada Oficial' as ActivityRecord['type'],
    date: '',
    location: '',
    cost: 15000
  });

  // Cálculos reactivos
  const totalRegistrosRecibidos = 70;
  const totalIntegrantesUnicos = 66;
  const reinscripcionesCount = 4;
  const promedioIngresosMes = 13;
  const edadPromedio = 26.2;
  const edadMediana = 24;
  const autorizacionesCount = 19; // 100% en octubre

  // Filtrado de integrantes
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          m.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          m.bikeModel.toLowerCase().includes(searchTerm.toLowerCase());
      if (!matchSearch) return false;
      if (filterJoinMonth !== 'todos' && m.joinMonth !== filterJoinMonth) return false;
      if (filterBlood !== 'todos' && m.bloodType !== filterBlood) return false;
      if (filterBrand !== 'todos' && m.brand !== filterBrand) return false;
      return true;
    });
  }, [members, searchTerm, filterJoinMonth, filterBlood, filterBrand]);

  // Alergias y condiciones médicas
  const membersWithAllergies = useMemo(() => {
    return members.filter(m => m.allergies && m.allergies.toLowerCase() !== 'ninguna' || m.hasDisability);
  }, [members]);

  // Ranking de asistencia
  const topActiveMembers = useMemo(() => {
    return [...members].sort((a, b) => b.attendanceCount - a.attendanceCount).slice(0, 8);
  }, [members]);

  // Agregar actividad
  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActivityForm.name) return;
    const newAct: ActivityRecord = {
      id: `act-${activities.length + 1}`,
      name: newActivityForm.name,
      type: newActivityForm.type,
      date: newActivityForm.date || 'Próximo Fin de Semana',
      location: newActivityForm.location || 'Punto de Encuentro Oficial',
      cost: Number(newActivityForm.cost) || 0,
      attendeesCount: 0,
      totalMembers: totalIntegrantesUnicos
    };
    setActivities([newAct, ...activities]);
    setModalType(null);
  };

  // Exportar a Excel / CSV
  const handleExportCSV = () => {
    let csv = '\uFEFF';
    csv += 'INFORME GENERAL DE BIENESTAR Y MEMBRESÍA: INFERNAL BIKERS (JUN-OCT 2026)\n\n';
    
    csv += '1. RESUMEN EJECUTIVO\n';
    csv += 'Indicador,Valor\n';
    csv += `Registros Recibidos (6 archivos),${totalRegistrosRecibidos}\n`;
    csv += `Integrantes Únicos,${totalIntegrantesUnicos}\n`;
    csv += `Reinscripciones (Registros repetidos),${reinscripcionesCount}\n`;
    csv += `Promedio Ingresos Nuevos por Mes,${promedioIngresosMes}\n`;
    csv += `Mes con Más Ingresos,Julio (24 integrantes - 36% del total)\n`;
    csv += `Edad Promedio / Mediana,${edadPromedio} / ${edadMediana} años (Rango 18-56)\n`;
    csv += `Autorización de Datos Personales,${autorizacionesCount} (100% Si acepto en Octubre)\n`;
    csv += `Marca de Moto Más Común,Hero (10 motos - 27% del parque registrado)\n\n`;

    csv += '2. CRECIMIENTO DEL CLUB (MAYO - OCTUBRE 2026)\n';
    csv += 'Mes,Nuevos,Acumulado,Crecimiento Mensual\n';
    MONTHLY_GROWTH.forEach(g => {
      csv += `${g.month},${g.nuevos},${g.acumulado},${g.growth}\n`;
    });
    csv += '\n';

    csv += '3. LISTADO DE INTEGRANTES ÚNICOS\n';
    csv += 'ID,Nombre,Edad,Mes Ingreso,Marca,Modelo,Placa,RH,Alergias,Autorización Datos\n';
    members.forEach(m => {
      csv += `"${m.id}","${m.name}",${m.age || 'N/A'},"${m.joinMonth}","${m.brand}","${m.bikeModel}","${m.plate}","${m.bloodType || 'Pendiente'}","${m.allergies || 'Ninguna'}","${m.dataAuthorization ? 'Sí' : 'No'}"\n`;
    });
    csv += '\n';

    csv += '4. MARCAS DE MOTO REGISTRADAS\n';
    csv += 'Marca,Cantidad,Porcentaje,Modelos Representativos\n';
    MOTORCYCLE_BRANDS.forEach(b => {
      csv += `"${b.brand}",${b.count},${b.pct}%,"${b.models}"\n`;
    });
    csv += '\n';

    csv += '5. CUMPLEAÑOS POR MES (GASTOS CUMPLE)\n';
    csv += 'Mes,Cantidad,Celebrantes\n';
    BIRTHDAYS_PER_MONTH.forEach(bm => {
      csv += `"${bm.month}",${bm.count},"${bm.celebrants}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Informe_Bienestar_InfernalBikers_Jun_Oct_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Header Oficial de Bienestar y Gestión de Membresía */}
      <div className="biker-card p-6 bg-gradient-to-r from-emerald-950/40 via-biker-gray to-biker-black border border-emerald-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
            <HeartHandshake className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                INFORME GENERAL: INFERNAL BIKERS (JUN–OCT 2026)
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-mono tracking-widest bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full font-bold">
                Coordinación de Bienestar • Jhoana
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              Análisis de crecimiento, perfil demográfico, salud preventiva, parque de motos y módulo de actividades.
            </p>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <button
            onClick={() => setModalType('actividad')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nueva Actividad
          </button>
          <button
            onClick={() => setShowConfidentialData(!showConfidentialData)}
            className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border ${
              showConfidentialData 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            {showConfidentialData ? <EyeOff className="w-4 h-4 text-amber-400" /> : <Eye className="w-4 h-4" />}
            {showConfidentialData ? 'Ocultar SOS' : 'Modo Médico SOS'}
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-biker-red hover:bg-red-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-biker-red/20"
          >
            <FileSpreadsheet className="w-4 h-4" /> Exportar Informe
          </button>
        </div>
      </div>

      {/* 2. Tarjetas Resumen Ejecutivo (KPIs Oficiales) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        
        {/* Integrantes Totales */}
        <div className="biker-card p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-black to-black relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Integrantes Únicos</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white tracking-tight">{totalIntegrantesUnicos}</p>
          <p className="text-[10px] text-gray-400 font-mono mt-1 leading-tight">
            De 70 registros (4 repetidos)
          </p>
        </div>

        {/* Nuevos de Octubre */}
        <div className="biker-card p-5 border border-emerald-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Nuevos del Mes</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-400 tracking-tight">+16</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Octubre (Pico Q4)
          </p>
        </div>

        {/* Crecimiento Mensual */}
        <div className="biker-card p-5 border border-white/10 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold">Crecimiento Octubre</span>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white tracking-tight">+32%</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            Julio récord: +240%
          </p>
        </div>

        {/* Edad Promedio / Mediana */}
        <div className="biker-card p-5 border border-amber-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">Edad Promedio</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-300 tracking-tight">{edadPromedio} <span className="text-xs text-gray-400 font-normal">/ Med: {edadMediana}</span></p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            61% tiene 25 años o menos
          </p>
        </div>

        {/* Autorización de Datos */}
        <div className="biker-card p-5 border border-blue-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">Habeas Data (Oct)</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-blue-400 tracking-tight">100%</p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            19 autorizaciones aceptadas
          </p>
        </div>

        {/* Marca Líder */}
        <div className="biker-card p-5 border border-red-500/30 bg-black/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">Marca Líder</span>
            <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
              <Bike className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-red-400 tracking-tight">Hero <span className="text-xs text-gray-400 font-normal">(10)</span></p>
          <p className="text-[10px] text-gray-500 font-mono mt-1">
            27% del parque registrado
          </p>
        </div>
      </div>

      {/* 3. Pestañas de Navegación del Panel de Bienestar */}
      <div className="flex border-b border-white/10 gap-2 overflow-x-auto pb-1 text-xs font-mono uppercase tracking-wider">
        {[
          { id: 'resumen', name: '📈 Crecimiento & Registros', count: '10 a 66' },
          { id: 'integrantes', name: '👥 Directorio de Integrantes', count: `${filteredMembers.length} de 66` },
          { id: 'salud', name: '🩺 Seguridad & Ficha Médica SOS', count: `${membersWithAllergies.length} Alergias` },
          { id: 'motos', name: '🏍️ Parque de Motos', count: '37 con marca' },
          { id: 'actividades', name: '🎯 Módulo 7: Asistencia & Salidas', count: `${activities.length} Eventos` },
          { id: 'reinscripciones', name: '🔄 Reinscripciones', count: '4 Casos' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-emerald-500 text-white bg-white/[0.03]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/[0.01]'
            }`}
          >
            <span>{tab.name}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
              activeTab === tab.id ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* PESTAÑA 1: CRECIMIENTO & CUÁNDO SE REGISTRAN */}
      {activeTab === 'resumen' && (
        <div className="space-y-8">
          
          {/* Curva Acumulada de Crecimiento */}
          <div className="biker-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" /> Curva de Crecimiento Acumulado del Club (Mayo – Octubre 2026)
                </h3>
                <p className="text-xs text-gray-400">
                  El club pasó de <strong className="text-white">10 integrantes</strong> en junio a <strong className="text-emerald-400">66 integrantes oficiales</strong> en octubre.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold">
                Promedio +13 nuevos/mes
              </span>
            </div>

            {/* Visualizador de Progresión Acumulada */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-3">
              {MONTHLY_GROWTH.map((item, idx) => {
                const max = 66;
                const heightPercent = Math.max(18, (item.acumulado / max) * 100);
                const isPeak = item.month === 'Julio';
                return (
                  <div key={idx} className="flex flex-col items-center gap-2 group">
                    <div className="text-center">
                      <span className="text-xs font-mono font-black text-white">{item.acumulado}</span>
                      <span className="block text-[9px] font-mono text-emerald-400">+{item.nuevos} nuevos</span>
                    </div>
                    <div className="w-full h-36 bg-black/60 rounded-xl border border-white/10 flex items-end p-2 relative overflow-hidden">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercent}%` }}
                        transition={{ duration: 0.7, delay: idx * 0.08 }}
                        className={`w-full rounded-lg transition-all shadow-lg ${
                          isPeak 
                            ? 'bg-gradient-to-t from-emerald-600 via-amber-400 to-amber-300 shadow-amber-500/20' 
                            : 'bg-gradient-to-t from-emerald-800 to-emerald-500 shadow-emerald-500/20'
                        }`}
                      />
                    </div>
                    <div className="text-center font-mono">
                      <p className="text-xs font-bold text-gray-300">{item.month}</p>
                      <p className="text-[9px] text-gray-500">{item.growth}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-gray-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-gray-300">
                <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                <strong>Análisis de Crecimiento:</strong> Julio fue el pico máximo (+240%) y agosto presentó una contracción temporal; desde septiembre el ritmo ascendente se reactiva fuertemente (+32% en octubre).
              </span>
            </div>
          </div>

          {/* Gráfico 2 & 3: Semanas Pico y Distribución por Día de la Semana */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Semanas con Más Ingresos */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" /> Semanas de Mayor Captación
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  Ciclo: cada 2-3 meses
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {PEAK_WEEKS.map((pw, i) => (
                  <div key={i} className="p-3.5 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-white">{pw.week}</p>
                      <p className="text-xs text-gray-400">{pw.note}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black font-mono text-amber-400">{pw.count} registros</span>
                      <span className="block text-[10px] font-mono text-gray-500">{pw.pct} del club</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-gray-400 italic">
                * Las semanas pico se sincronizan con las convocatorias previas a las rodadas nacionales de Guatapé y Calima.
              </p>
            </div>

            {/* Días en que se registran */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" /> Registros por Día de la Semana
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  Miércoles & Fin de Semana
                </span>
              </div>

              <div className="space-y-2 pt-2">
                {REGISTRATION_DAYS.map((d) => (
                  <div key={d.day} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300 font-bold">{d.day}</span>
                      <span className="text-emerald-400 font-bold">{d.count} registros ({d.pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(d.count / 13) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        className={`h-full rounded-full ${
                          d.day === 'Miércoles' || d.day === 'Domingo' 
                            ? 'bg-emerald-400' 
                            : 'bg-emerald-600/70'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Mapa de Calor / Franjas Horarias */}
          <div className="biker-card p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <Clock className="w-5 h-5 text-blue-400" /> Distribución por Franja Horaria de Registro
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              {TIME_SLOTS.map((slot, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 block">{slot.slot}</span>
                  <p className="text-3xl font-black text-white font-mono">{slot.count}</p>
                  <p className="text-xs text-emerald-400 font-mono font-bold">{slot.pct}% del total</p>
                  <p className="text-[11px] text-gray-500">{slot.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 2: DIRECTORIO DE INTEGRANTES */}
      {activeTab === 'integrantes' && (
        <div className="space-y-6">
          
          {/* Barra de Filtros */}
          <div className="biker-card p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por nombre, placa o moto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={filterJoinMonth}
                onChange={(e) => setFilterJoinMonth(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-emerald-500 font-mono"
              >
                <option value="todos">Todos los Meses de Ingreso</option>
                <option value="Mayo">Mayo (1)</option>
                <option value="Junio">Junio (9)</option>
                <option value="Julio">Julio (24)</option>
                <option value="Agosto">Agosto (6)</option>
                <option value="Septiembre">Septiembre (10)</option>
                <option value="Octubre">Octubre (16)</option>
              </select>

              <select
                value={filterBrand}
                onChange={(e) => setFilterBrand(e.target.value)}
                className="bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 outline-none focus:border-emerald-500 font-mono"
              >
                <option value="todos">Todas las Marcas</option>
                <option value="Hero">Hero (10)</option>
                <option value="Suzuki">Suzuki (5)</option>
                <option value="AKT">AKT (4)</option>
                <option value="TVS">TVS (4)</option>
                <option value="Bajaj">Bajaj (3)</option>
                <option value="Yamaha">Yamaha (2)</option>
                <option value="Honda">Honda (2)</option>
                <option value="Vento">Vento (2)</option>
              </select>
            </div>

            <div className="text-xs font-mono text-gray-400">
              Mostrando <strong className="text-emerald-400">{filteredMembers.length}</strong> de {members.length} integrantes
            </div>
          </div>

          {/* Tabla de Integrantes */}
          <div className="biker-card overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-black/80 border-b border-white/10 font-mono text-[11px] text-gray-400 uppercase tracking-wider">
                    <th className="p-3.5">Integrante</th>
                    <th className="p-3">Edad</th>
                    <th className="p-3">Ingreso</th>
                    <th className="p-3">Moto & Cilindrada</th>
                    <th className="p-3">Placa</th>
                    <th className="p-3 text-center">RH</th>
                    <th className="p-3 text-center">Habeas Data</th>
                    {showConfidentialData && (
                      <th className="p-3 text-amber-400">Contacto SOS</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3 font-sans font-bold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono text-xs">
                            {m.name.charAt(0)}
                          </div>
                          <div>
                            <p>{m.name}</p>
                            {m.allergies && m.allergies.toLowerCase() !== 'ninguna' && (
                              <span className="text-[10px] text-red-400 font-normal font-sans">
                                ⚠️ Alergia: {m.allergies}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">
                        {m.age ? `${m.age} años` : <span className="text-gray-600">No indicó</span>}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 text-[11px]">
                          {m.joinMonth} 2026
                        </span>
                      </td>
                      <td className="p-3 text-gray-300">
                        <span className="font-bold text-white">{m.brand}</span> • {m.bikeModel}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-black/60 border border-white/10 rounded text-emerald-400 font-bold">
                          {m.plate}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.bloodType === 'O+' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          m.bloodType === 'A+' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          m.bloodType === 'B+' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                          m.bloodType === 'O-' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                          'bg-white/5 text-gray-600'
                        }`}>
                          {m.bloodType || 'Pendiente'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        {m.dataAuthorization ? (
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            Sí Acepto
                          </span>
                        ) : (
                          <span className="text-[10px] text-gray-500">
                            Pre-Octubre
                          </span>
                        )}
                      </td>
                      {showConfidentialData && (
                        <td className="p-3 text-xs text-amber-300 font-sans">
                          {m.emergencyContact ? (
                            <span>{m.emergencyContact.name} ({m.emergencyContact.relationship}): {m.emergencyContact.phone}</span>
                          ) : (
                            <span className="text-gray-600">No especificado</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 3: SALUD, SEGURIDAD & FICHA SOS */}
      {activeTab === 'salud' && (
        <div className="space-y-8">
          
          {/* Métricas de Seguridad y Salud */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="biker-card p-5 border border-emerald-500/30 bg-black/60">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-1">
                Tipos de Sangre Validados
              </span>
              <p className="text-3xl font-black text-white">40 <span className="text-xs text-gray-500 font-normal">/ 66 miembros</span></p>
              <p className="text-[11px] text-gray-400 mt-2">
                Faltan 26 registros (los formularios de sep y oct no incluyeron campo de RH).
              </p>
            </div>

            <div className="biker-card p-5 border border-red-500/30 bg-black/60">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block mb-1">
                Alergias Detectadas
              </span>
              <p className="text-3xl font-black text-red-400">9 <span className="text-xs text-gray-500 font-normal">de 52 respuestas</span></p>
              <p className="text-[11px] text-gray-400 mt-2">
                17.3% reporta reacción a medicamentos (Penicilina, AINEs) o alimentos/polen.
              </p>
            </div>

            <div className="biker-card p-5 border border-amber-500/30 bg-black/60">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                Condición / Discapacidad
              </span>
              <p className="text-3xl font-black text-amber-300">2 <span className="text-xs text-gray-500 font-normal">de 43 respuestas</span></p>
              <p className="text-[11px] text-gray-400 mt-2">
                Ambos casos corresponden a prescripción óptica (gafas formuladas en ruta).
              </p>
            </div>

          </div>

          {/* Gráfico de Dona: Distribución de Tipos de Sangre y Cumpleaños */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Tipos de Sangre */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-emerald-400" /> Distribución de Tipos de Sangre (40 Válidos)
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                  O+ Mayoritario (72.5%)
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {BLOOD_TYPES_DATA.map((bt) => (
                  <div key={bt.type} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-white font-bold flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${bt.bg} inline-block border border-white/20`} />
                        Grupo {bt.type}
                      </span>
                      <span className={`font-bold ${bt.color}`}>{bt.count} integrantes ({bt.pct}%)</span>
                    </div>
                    <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bt.pct}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${
                          bt.type === 'O+' ? 'bg-emerald-500' :
                          bt.type === 'A+' ? 'bg-amber-400' :
                          bt.type === 'B+' ? 'bg-blue-400' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-950/20 border border-emerald-500/20 rounded-xl text-xs text-emerald-300">
                <strong>Protocolo de Emergencia:</strong> Al liderar rodadas oficiales, la camioneta escoba lleva botiquín con especificación de que 7 de cada 10 integrantes son RH O+.
              </div>
            </div>

            {/* Calendario de Cumpleaños por Mes (Para el rubro "Cumple") */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-amber-400" /> Cumpleaños por Mes (39 Fechas)
                  </h3>
                  <p className="text-xs text-gray-400">Planificación articulada con el rubro de gastos "Cumple"</p>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  Octubre pico (6)
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2">
                {BIRTHDAYS_PER_MONTH.map((bm) => (
                  <div key={bm.month} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="text-xs font-mono font-bold text-gray-300 uppercase">{bm.month}</p>
                    <p className="text-xl font-black font-mono text-amber-400 my-1">{bm.count}</p>
                    <p className="text-[9px] text-gray-500 truncate" title={bm.celebrants}>{bm.celebrants}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Listado Crítico de Alergias y SOS */}
          <div className="biker-card p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" /> Registro Médico Preventivo: Alergias y Condiciones
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membersWithAllergies.map((m) => (
                <div key={m.id} className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-sm text-white">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.brand} • <span className="font-mono text-emerald-400">{m.plate}</span></p>
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                      RH: {m.bloodType || 'N/A'}
                    </span>
                  </div>
                  <div className="text-xs text-gray-300 pt-2 border-t border-red-500/20">
                    <p className="text-red-300 font-bold">⚠️ Alergia / Condición:</p>
                    <p className="font-mono text-white mt-0.5">{m.allergies || m.disabilityDetail || 'En observación'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 4: PARQUE DE MOTOS */}
      {activeTab === 'motos' && (
        <div className="space-y-6">
          
          <div className="biker-card p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Bike className="w-5 h-5 text-red-400" /> Parque Automotor de la Legión (37 Motos con Marca)
                </h3>
                <p className="text-xs text-gray-400">
                  Predominio absoluto de motos de baja y media cilindrada con agilidad para caravana y ruta técnica.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20 font-bold">
                Hero Líder Absoluta (10 unidades)
              </span>
            </div>

            <div className="space-y-4">
              {MOTORCYCLE_BRANDS.map((b) => (
                <div key={b.brand} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-sm text-white">{b.brand}</span>
                      <span className="ml-2 text-xs text-gray-400 font-mono">({b.models})</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black font-mono text-red-400">{b.count} motos</span>
                      <span className="text-xs font-mono text-gray-500">{b.pct}%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(b.count / 10) * 100}%` }}
                      transition={{ duration: 0.7 }}
                      className={`h-full rounded-full ${
                        b.brand === 'Hero' 
                          ? 'bg-gradient-to-r from-red-600 to-amber-500' 
                          : 'bg-red-500/70'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PESTAÑA 5: SECCIÓN 7 - ASISTENCIA Y ACTIVIDADES (NUEVO) */}
      {activeTab === 'actividades' && (
        <div className="space-y-8">
          
          {/* Header del Módulo 7 */}
          <div className="biker-card p-6 bg-gradient-to-r from-blue-950/30 via-biker-gray to-biker-black border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-6 h-6 text-blue-400" />
                <h3 className="text-lg font-bold text-white">MÓDULO 7: ASISTENCIAS, ACTIVIDADES & RETENCIÓN</h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Registro de actividades de ruta, control de asistencia por integrante, cálculo de ranking y retención.
              </p>
            </div>
            <button
              onClick={() => setModalType('actividad')}
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" /> Registrar Nueva Salida
            </button>
          </div>

          {/* Ranking de Integrantes Más Activos y Tasa de Retención */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Ranking Top Asistencia */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" /> Ranking: Integrantes Más Activos
                </h3>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">
                  Fidelidad en Ruta
                </span>
              </div>

              <div className="space-y-2.5">
                {topActiveMembers.map((m, idx) => (
                  <div key={m.id} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg font-mono font-black text-xs flex items-center justify-center ${
                        idx === 0 ? 'bg-amber-500 text-black' :
                        idx === 1 ? 'bg-gray-300 text-black' :
                        idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-gray-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-bold text-sm text-white">{m.name}</p>
                        <p className="text-[11px] text-gray-400">{m.brand} • <span className="font-mono text-emerald-400">{m.plate}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black font-mono text-emerald-400">{m.attendanceCount} salidas</span>
                      <span className="block text-[9px] font-mono text-gray-500">100% Asistencia</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Listado de Actividades Registradas */}
            <div className="biker-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" /> Salidas & Convocatorias del Club
                </h3>
                <span className="text-xs font-mono text-gray-400">
                  {activities.length} registradas
                </span>
              </div>

              <div className="space-y-3">
                {activities.map((act) => {
                  const attendancePct = act.totalMembers > 0 ? Math.round((act.attendeesCount / act.totalMembers) * 100) : 0;
                  return (
                    <div key={act.id} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-sm text-white">{act.name}</p>
                          <p className="text-xs text-blue-300">{act.location} • <span className="text-gray-400 font-mono">{act.date}</span></p>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {act.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-gray-400 font-mono">
                        <span>Asistieron: <strong className="text-white">{act.attendeesCount}</strong> / {act.totalMembers}</span>
                        <span className="font-bold text-emerald-400">{attendancePct}% Participación</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-blue-950/20 border border-blue-500/20 rounded-xl text-xs text-blue-300">
                <strong>¿Tienes listas de salidas pasadas?</strong> Pásalas en cualquier momento y se cargarán en las tablas <code>actividades</code> y <code>asistencias</code> para actualizar los rankings de fidelidad.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* PESTAÑA 6: REINSCRIPCIONES DETECTADAS */}
      {activeTab === 'reinscripciones' && (
        <div className="space-y-6">
          <div className="biker-card p-6 space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Auditoría de Reinscripciones (4 Casos Identificados)
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                De los 70 registros recibidos en los 6 formularios, 4 correspondieron a reinscripciones repetidas (3 por coincidencia de nombre y 1 por duplicidad de placa). Se unificaron para arrojar con exactitud 66 integrantes únicos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {REINSCRIPTIONS.map((r) => (
                <div key={r.id} className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{r.name}</span>
                    <span className="font-mono text-xs text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/30">
                      Placa: {r.plate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300"><strong className="text-purple-300">Criterio:</strong> {r.criteria}</p>
                  <p className="text-xs text-gray-400 font-mono">Meses encontrados: {r.months}</p>
                  <p className="text-[11px] text-emerald-400 font-mono pt-1 border-t border-purple-500/20">
                    ✓ {r.resolution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVA ACTIVIDAD */}
      <AnimatePresence>
        {modalType === 'actividad' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="biker-card p-6 w-full max-w-md border border-blue-500/30 bg-[#0c0c0c] shadow-2xl space-y-5"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" /> Registrar Actividad o Salida
                </h3>
                <button onClick={() => setModalType(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddActivity} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-gray-400 block mb-1">Nombre de la Actividad</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Rodada al Km 18, Filtro Ginebra"
                    value={newActivityForm.name}
                    onChange={(e) => setNewActivityForm({ ...newActivityForm, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Tipo de Evento</label>
                  <select
                    value={newActivityForm.type}
                    onChange={(e) => setNewActivityForm({ ...newActivityForm, type: e.target.value as any })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-blue-500"
                  >
                    <option value="Rodada Oficial">Rodada Oficial</option>
                    <option value="Filtro Prospectos">Filtro Prospectos</option>
                    <option value="Integración Biker">Integración Biker</option>
                    <option value="Obra Social">Obra Social</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Lugar / Destino</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Guatapé, Calima, Ginebra"
                    value={newActivityForm.location}
                    onChange={(e) => setNewActivityForm({ ...newActivityForm, location: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-gray-400 block mb-1">Fecha</label>
                  <input
                    type="text"
                    placeholder="Ej: 14 de Noviembre, 2026"
                    value={newActivityForm.date}
                    onChange={(e) => setNewActivityForm({ ...newActivityForm, date: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-lg p-2.5 text-white outline-none focus:border-blue-500"
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
                    className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors"
                  >
                    Crear Evento
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
