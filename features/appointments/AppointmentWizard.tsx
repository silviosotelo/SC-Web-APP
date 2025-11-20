import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FAMILY_MEMBERS, DOCTORS, AVAILABLE_SLOTS } from '../../constants';
import { AppointmentMode } from '../../types';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import BeneficiaryCard from '../../components/ui/BeneficiaryCard';
import { User, MapPin, Calendar, Clock, Search, Check, Video, UserCheck } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState<Step>(Step.Mode);
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
  const StepBeneficiary = () => (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-900">¿Para quién es el turno?</h2>
      <div className="space-y-3">
        {FAMILY_MEMBERS.map(member => (
          <BeneficiaryCard 
            key={member.id}
            member={member}
            variant="selection"
            isSelected={bookingData.memberId === member.id}
            onClick={() => setBookingData({...bookingData, memberId: member.id})}
          />
        ))}
      </div>
      <Button fullWidth disabled={!bookingData.memberId} onClick={handleNext} className="mt-6">
        Continuar
      </Button>
    </div>
  );

  // Step 2: Professional (Simplified for Demo)
  const StepSpecialty = () => (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-900">Especialidad / Profesional</h2>
      
      {/* Search */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Buscar especialidad o médico..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>

      {/* Mock Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {['Cardiología', 'Clínica Médica', 'Pediatría', 'Dermatología'].map(spec => (
          <button key={spec} className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-primary-50 hover:border-primary-200">
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor List */}
      <div className="space-y-3">
        {DOCTORS.map(doc => (
           <Card 
             key={doc.id}
             selected={bookingData.doctorId === doc.id}
             onClick={() => setBookingData({...bookingData, doctorId: doc.id, specialty: doc.specialty})}
             className="flex items-start gap-3"
           >
              <img src={doc.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-200" />
              <div className="flex-1">
                <p className="font-semibold text-sm text-primary-900">{doc.name}</p>
                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded mt-1 font-medium">
                  {doc.specialty.toUpperCase()}
                </span>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} /> {doc.location}
                </p>
              </div>
           </Card>
        ))}
      </div>

      <Button fullWidth disabled={!bookingData.doctorId} onClick={handleNext} className="mt-4">
        Continuar
      </Button>
    </div>
  );

  // Step 3: Date & Time
  const StepDateTime = () => (
    <div className="space-y-6 animate-fadeIn">
       <div className="flex items-center gap-3 bg-primary-50 p-3 rounded-xl">
          <img src={selectedDoctor?.imageUrl} className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <p className="text-sm font-bold text-primary-900">{selectedDoctor?.name}</p>
            <p className="text-xs text-primary-700">{selectedDoctor?.specialty}</p>
          </div>
       </div>

       {/* Date Picker Simulator */}
       <div>
          <label className="block text-sm font-medium mb-2">Fecha</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
             {[0,1,2,3,4].map(offset => {
               const d = new Date('2025-08-20');
               d.setDate(d.getDate() + offset);
               const isSelected = offset === 0; 
               return (
                 <div 
                  key={offset}
                  className={`
                    flex-shrink-0 w-16 h-20 rounded-xl flex flex-col items-center justify-center border transition-all
                    ${isSelected ? 'bg-primary-900 border-primary-900 text-white shadow-lg shadow-primary-900/30' : 'bg-white border-gray-200 text-gray-500'}
                  `}
                 >
                   <span className="text-xs font-medium">{d.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase()}</span>
                   <span className="text-xl font-bold">{d.getDate()}</span>
                 </div>
               )
             })}
          </div>
       </div>

       {/* Time Slots */}
       <div>
        <label className="block text-sm font-medium mb-2">Horarios Disponibles</label>
        <div className="grid grid-cols-3 gap-3">
          {AVAILABLE_SLOTS.map(slot => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => setBookingData({...bookingData, timeSlotId: slot.id})}
              className={`
                py-2 px-2 rounded-lg text-sm font-medium border transition-all
                ${bookingData.timeSlotId === slot.id 
                  ? 'bg-secondary-500 border-secondary-500 text-white shadow-md' 
                  : slot.available 
                    ? 'bg-white border-gray-200 text-gray-700 hover:border-secondary-400' 
                    : 'bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed'}
              `}
            >
              {slot.time}
            </button>
          ))}
        </div>
       </div>

       <Button fullWidth disabled={!bookingData.timeSlotId} onClick={handleNext}>
        Continuar
      </Button>
    </div>
  );

  // Step 4: Confirmation
  const StepConfirm = () => (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-lg font-bold text-gray-900">Confirmación</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-primary-50 p-4 border-b border-primary-100">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary-900 font-bold border border-primary-100 text-xl">
              {selectedDoctor?.name.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-primary-900">{selectedDoctor?.name}</p>
              <p className="text-sm text-primary-700">{selectedDoctor?.specialty}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-start gap-3">
             <Calendar className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500">Fecha</p>
               <p className="font-medium text-gray-900">Miércoles, 20 de Agosto 2025</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <Clock className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500">Hora</p>
               <p className="font-medium text-gray-900">{selectedTime?.time}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <User className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500">Paciente</p>
               <p className="font-medium text-gray-900">{selectedMember?.name}</p>
             </div>
          </div>
          <div className="flex items-start gap-3">
             <MapPin className="text-gray-400 mt-0.5" size={18} />
             <div>
               <p className="text-xs text-gray-500">Lugar</p>
               <p className="font-medium text-gray-900">{selectedDoctor?.location}</p>
             </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Datos de contacto</h3>
        <input 
          value={bookingData.email} 
          readOnly 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600" 
        />
         <input 
          value={bookingData.phone} 
          readOnly 
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600" 
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex gap-3">
        <div className="text-yellow-600 font-bold">!</div>
        <p className="text-xs text-yellow-800">
          Al confirmar, recibirás una notificación por email y mensaje de texto.
        </p>
      </div>

      <Button fullWidth onClick={() => setCurrentStep(Step.Success)}>
        CONFIRMAR TURNO
      </Button>
    </div>
  );

  const StepSuccess = () => (
    <div className="flex flex-col items-center justify-center text-center space-y-6 py-10 animate-fadeIn">
      <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
        <Check size={48} strokeWidth={3} />
      </div>
      <h2 className="text-2xl font-bold text-gray-900">¡Turno Agendado!</h2>
      <p className="text-gray-600 max-w-xs mx-auto">
        Tu cita con el <strong>{selectedDoctor?.name}</strong> ha sido confirmada con éxito.
      </p>
      
      <div className="w-full space-y-3 pt-6">
        <Button fullWidth onClick={() => navigate('/dashboard')}>
          Volver al Inicio
        </Button>
        <Button fullWidth variant="outline" onClick={() => {}}>
          Agregar al Calendario
        </Button>
      </div>
    </div>
  );

  // Render
  return (
    <div className="p-4 pb-20">
      {/* Progress Indicator (Only steps 0-4) */}
      {currentStep < Step.Success && (
        <div className="flex items-center justify-between mb-8 px-2">
           {[0,1,2,3,4].map(step => (
             <div key={step} className="flex flex-col items-center">
               <div 
                 className={`
                   h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300
                   ${currentStep >= step ? 'bg-primary-900 text-white' : 'bg-gray-200 text-gray-500'}
                 `}
               >
                 {step + 1}
               </div>
             </div>
           ))}
           {/* Connecting Line */}
           <div className="absolute left-8 right-8 h-0.5 bg-gray-200 -z-10 top-[6.5rem]" />
        </div>
      )}

      {currentStep === Step.Mode && <StepMode />}
      {currentStep === Step.Beneficiary && <StepBeneficiary />}
      {currentStep === Step.Specialty && <StepSpecialty />}
      {currentStep === Step.DateTime && <StepDateTime />}
      {currentStep === Step.Confirm && <StepConfirm />}
      {currentStep === Step.Success && <StepSuccess />}

    </div>
  );
};

export default AppointmentWizard;