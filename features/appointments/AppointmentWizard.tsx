
import React, { useState, useMemo, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAMILY_MEMBERS, DOCTORS, AVAILABLE_SLOTS } from '../../constants';
import { AppointmentMode, Doctor } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import BeneficiaryCard from '../../components/ui/BeneficiaryCard';
import Skeleton from '../../components/ui/Skeleton';
import StatusFeedback from '../../components/ui/StatusFeedback';
import { User, MapPin, Calendar, Clock, Search, Video, UserCheck, Building2 } from 'lucide-react';
import { useLoading } from '../../hooks/useLoading';
import { ToastContext } from '../../components/Layout';

// Step definitions
enum Step {
  Mode = 0,
  Beneficiary = 1,
  Specialty = 2,
  DateTime = 3,
  Confirm = 4,
  Success = 5
}

const AppointmentWizard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [currentStep, setCurrentStep] = useState<Step>(Step.Mode);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    mode: null as AppointmentMode | null,
    memberId: null as string | null,
    specialty: '',
    doctorId: null as string | null,
    date: '2025-08-20',
    timeSlotId: null as string | null,
    email: 'joseluiscino@gmail.com',
    phone: '0981140114'
  });

  // Helper to get actual objects from IDs
  const selectedMember = FAMILY_MEMBERS.find(m => m.id === bookingData.memberId);
  const selectedDoctor = DOCTORS.find(d => d.id === bookingData.doctorId);
  const selectedTime = AVAILABLE_SLOTS.find(t => t.id === bookingData.timeSlotId);

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulating API Call
    setTimeout(() => {
        setIsProcessing(false);
        showToast('Turno confirmado exitosamente', 'success');
        setCurrentStep(Step.Success);
    }, 2000);
  };

  // --- STEP COMPONENTS ---

  // Step 0: Mode
  const StepMode = () => (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-900">Seleccionar Modalidad</h2>
      
      <Card 
        selected={bookingData.mode === AppointmentMode.InPerson}
        onClick={() => setBookingData({...bookingData, mode: AppointmentMode.InPerson})}
        className="flex flex-col items-center justify-center p-8 gap-3"
      >
        <div className="bg-primary-50 p-4 rounded-full text-primary-900">
          <UserCheck size={32} />
        </div>
        <span className="font-semibold text-gray-700">Turno Presencial</span>
      </Card>

      <Card 
        selected={bookingData.mode === AppointmentMode.Telemedicine}
        onClick={() => setBookingData({...bookingData, mode: AppointmentMode.Telemedicine})}
        className="flex flex-col items-center justify-center p-8 gap-3"
      >
        <div className="bg-secondary-50 p-4 rounded-full text-secondary-600">
          <Video size={32} />
        </div>
        <span className="font-semibold text-gray-700">Telemedicina</span>
      </Card>

      <Button fullWidth disabled={!bookingData.mode} onClick={handleNext} className="mt-8">
        Continuar
      </Button>
    </div>
  );

  // Step 1: Beneficiary
  const StepBeneficiary = () => {
    const isLoading = useLoading('appointment-beneficiary', 800);

    return (
        <div className="space-y-4 animate-fadeIn">
        <h2 className="text-lg font-bold text-gray-900">¿Para quién es el turno?</h2>
        <div className="space-y-3">
            {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl">
                        <Skeleton variant="circular" width={48} height={48} />
                        <div className="flex-1 space-y-2">
                            <Skeleton variant="text" width="60%" height={16} />
                            <Skeleton variant="text" width="40%" height={12} />
                        </div>
                        <Skeleton variant="circular" width={24} height={24} />
                    </div>
                ))
            ) : (
                FAMILY_MEMBERS.map(member => (
                    <BeneficiaryCard 
                        key={member.id}
                        member={member}
                        isSelected={bookingData.memberId === member.id}
                        onClick={() => setBookingData({...bookingData, memberId: member.id})}
                    />
                ))
            )}
        </div>
        <Button fullWidth disabled={!bookingData.memberId || isLoading} onClick={handleNext} className="mt-6">
            Continuar
        </Button>
        </div>
    );
  };

  // Step 2: Professional (Filtered and Grouped)
  const StepSpecialty = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSpecialty, setActiveSpecialty] = useState<string>('Todas');
    const isLoading = useLoading('appointment-doctors', 1000);

    // 1. Extract unique specialties
    const specialties = useMemo(() => {
      const specs = new Set(DOCTORS.map(d => d.specialty));
      return ['Todas', ...Array.from(specs)];
    }, []);

    // 2. Filter and Group Doctors
    const groupedDoctors = useMemo(() => {
      const filtered = DOCTORS.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = activeSpecialty === 'Todas' || doc.specialty === activeSpecialty;
        return matchesSearch && matchesSpecialty;
      });

      return filtered.reduce((groups, doc) => {
        const loc = doc.location;
        if (!groups[loc]) {
          groups[loc] = [];
        }
        groups[loc].push(doc);
        return groups;
      }, {} as Record<string, Doctor[]>);

    }, [searchTerm, activeSpecialty]);

    const hasResults = Object.keys(groupedDoctors).length > 0;

    return (
      <div className="space-y-4 animate-fadeIn pb-8">
        <h2 className="text-lg font-bold text-gray-900">Especialidad / Profesional</h2>
        
        {/* Search */}
        <div className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar especialidad o médico..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none shadow-sm"
          />
          <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
        </div>

        {/* Specialty Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width={100} height={36} />
              ))
          ) : (
            specialties.map(spec => (
                <button 
                key={spec} 
                onClick={() => setActiveSpecialty(spec)}
                className={`
                    whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border
                    ${activeSpecialty === spec 
                    ? 'bg-primary-900 text-white border-primary-900' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-primary-50'}
                `}
                >
                {spec}
                </button>
            ))
          )}
        </div>

        {/* Grouped Doctor List */}
        <div className="space-y-6">
          {isLoading ? (
              <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                           <Skeleton variant="text" width={150} height={20} />
                           <div className="p-4 border border-gray-100 rounded-xl flex gap-4">
                               <Skeleton variant="rounded" width={56} height={56} />
                               <div className="flex-1 space-y-2">
                                   <Skeleton variant="text" width="70%" height={16} />
                                   <Skeleton variant="text" width="40%" height={14} />
                                   <Skeleton variant="text" width="60%" height={12} />
                               </div>
                           </div>
                      </div>
                  ))}
              </div>
          ) : (
            <>
                {!hasResults && (
                    <div className="text-center py-8 text-gray-500">
                    <p>No se encontraron profesionales con esos criterios.</p>
                    </div>
                )}

                {Object.entries(groupedDoctors).map(([location, doctors]) => (
                    <div key={location} className="space-y-3">
                    {/* Group Header */}
                    <div className="flex items-center gap-2 px-1">
                        <Building2 size={16} className="text-gray-400" />
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{location}</h3>
                    </div>
                    
                    {/* Doctor Cards */}
                    <div className="space-y-3">
                        {doctors.map(doc => (
                        <Card 
                            key={doc.id}
                            selected={bookingData.doctorId === doc.id}
                            onClick={() => setBookingData({...bookingData, doctorId: doc.id, specialty: doc.specialty})}
                            className="flex items-start gap-3 shadow-sm border-gray-100"
                        >
                            <img src={doc.imageUrl} alt="" className="w-14 h-14 rounded-xl object-cover bg-gray-200 shadow-sm" />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm text-primary-900 truncate">{doc.name}</p>
                                <span className="inline-block bg-secondary-50 text-secondary-700 border border-secondary-100 text-[10px] px-2 py-0.5 rounded mt-1 font-bold uppercase tracking-wide">
                                {doc.specialty}
                                </span>
                                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1 truncate">
                                <MapPin size={12} /> {doc.location}
                                </p>
                            </div>
                            
                            {/* Selection Radio Indicator */}
                            <div className={`
                                h-6 w-6 rounded-full border-2 flex items-center justify-center mt-1 transition-colors
                                ${bookingData.doctorId === doc.id ? 'border-primary-900 bg-primary-900' : 'border-gray-200'}
                            `}>
                                {bookingData.doctorId === doc.id && <div className="h-2.5 w-2.5 bg-white rounded-full" />}
                            </div>
                        </Card>
                        ))}
                    </div>
                    </div>
                ))}
            </>
          )}
        </div>

        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
           <Button fullWidth disabled={!bookingData.doctorId || isLoading} onClick={handleNext}>
             Continuar
           </Button>
        </div>
      </div>
    );
  };

  // Step 3: Date & Time
  const StepDateTime = () => (
    <div className="space-y-6 animate-fadeIn">
       <div className="flex items-center gap-3 bg-primary-50 p-3 rounded-xl border border-primary-100">
          <img src={selectedDoctor?.imageUrl} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-bold text-primary-900">{selectedDoctor?.name}</p>
            <p className="text-xs text-primary-700 font-medium">{selectedDoctor?.specialty}</p>
          </div>
       </div>

       {/* Date Picker Simulator */}
       <div>
          <label className="block text-sm font-medium mb-3 text-gray-800">Seleccionar Fecha</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
             {[0,1,2,3,4].map(offset => {
               const d = new Date('2025-08-20');
               d.setDate(d.getDate() + offset);
               const isSelected = offset === 0; 
               return (
                 <button 
                  key={offset}
                  className={`
                    flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center border transition-all duration-200 active:scale-95
                    ${isSelected ? 'bg-primary-900 border-primary-900 text-white shadow-lg shadow-primary-900/30' : 'bg-white border-gray-200 text-gray-500 hover:border-primary-200'}
                  `}
                 >
                   <span className="text-[10px] font-bold tracking-widest">{d.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}</span>
                   <span className="text-2xl font-bold">{d.getDate()}</span>
                 </button>
               )
             })}
          </div>
       </div>

       {/* Time Slots */}
       <div>
        <label className="block text-sm font-medium mb-3 text-gray-800">Horarios Disponibles</label>
        <div className="grid grid-cols-3 gap-3">
          {AVAILABLE_SLOTS.map(slot => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => setBookingData({...bookingData, timeSlotId: slot.id})}
              className={`
                py-3 px-2 rounded-xl text-sm font-medium border transition-all duration-200
                ${bookingData.timeSlotId === slot.id 
                  ? 'bg-secondary-500 border-secondary-500 text-white shadow-md scale-[1.02]' 
                  : slot.available 
                    ? 'bg-white border-gray-200 text-gray-700 hover:border-secondary-400 hover:bg-secondary-50' 
                    : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'}
              `}
            >
              {slot.time}
            </button>
          ))}
        </div>
       </div>

       <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
         <Button fullWidth disabled={!bookingData.timeSlotId} onClick={handleNext}>
           Continuar
         </Button>
       </div>
    </div>
  );

  // Step 4: Confirmation
  const StepConfirm = () => (
    <div className="space-y-6 animate-fadeIn pb-24">
      <h2 className="text-lg font-bold text-gray-900">Confirmación</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-primary-50 p-4 border-b border-primary-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary-900 font-bold border border-primary-100 text-xl overflow-hidden">
               <img src={selectedDoctor?.imageUrl} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-primary-900">{selectedDoctor?.name}</p>
              <p className="text-sm text-primary-700">{selectedDoctor?.specialty}</p>
            </div>
          </div>
        </div>
        
        <div className="p-5 space-y-5">
          <div className="flex items-start gap-3">
             <Calendar className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Fecha</p>
               <p className="font-medium text-gray-900">Miércoles, 20 de Agosto 2025</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <Clock className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Hora</p>
               <p className="font-medium text-gray-900">{selectedTime?.time}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <User className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Paciente</p>
               <p className="font-medium text-gray-900">{selectedMember?.name}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <MapPin className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Lugar</p>
               <p className="font-medium text-gray-900">{selectedDoctor?.location}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3">
        <div className="text-orange-500 font-bold">!</div>
        <p className="text-xs text-orange-800 leading-relaxed">
          Al confirmar, recibirás una notificación por email y mensaje de texto con los detalles de tu turno.
        </p>
      </div>

       <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
         <Button fullWidth onClick={handleConfirm} isLoading={isProcessing}>
            CONFIRMAR TURNO
         </Button>
       </div>
    </div>
  );

  // Render
  return (
    <div className="p-4 pb-20">
      {/* Progress Indicator (Only steps 0-4) */}
      {currentStep < Step.Success && (
        <div className="flex items-center justify-between mb-8 px-2 relative">
           {[0,1,2,3,4].map(step => (
             <div key={step} className="flex flex-col items-center z-10 bg-white">
               <div 
                 className={`
                   h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border-2
                   ${currentStep >= step 
                        ? 'bg-primary-900 text-white border-primary-900' 
                        : 'bg-white text-gray-400 border-gray-200'}
                 `}
               >
                 {step + 1}
               </div>
             </div>
           ))}
           {/* Connecting Line */}
           <div className="absolute left-4 right-4 h-0.5 bg-gray-200 top-1/2 -translate-y-1/2 -z-10">
               <div 
                className="h-full bg-primary-900 transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
               />
           </div>
        </div>
      )}

      {currentStep === Step.Mode && <StepMode />}
      {currentStep === Step.Beneficiary && <StepBeneficiary />}
      {currentStep === Step.Specialty && <StepSpecialty />}
      {currentStep === Step.DateTime && <StepDateTime />}
      {currentStep === Step.Confirm && <StepConfirm />}
      
      {/* Unified Success Screen */}
      {currentStep === Step.Success && (
        <StatusFeedback 
            type="success"
            title="¡Turno Agendado!"
            message={`Tu cita con el ${selectedDoctor?.name} ha sido confirmada con éxito.`}
            primaryActionLabel="Volver al Inicio"
            onPrimaryAction={() => navigate('/dashboard')}
            secondaryActionLabel="Agregar al Calendario"
            onSecondaryAction={() => showToast('Agregado al calendario', 'info')}
        />
      )}

    </div>
  );
};

export default AppointmentWizard;
