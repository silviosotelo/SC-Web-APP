
import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, HelpCircle, Users, Check, ScanFace, ChevronDown, AlertCircle, X } from 'lucide-react';
import { FAMILY_MEMBERS } from '../../constants';
import Button from '../../components/ui/Button';
import BeneficiaryCard from '../../components/ui/BeneficiaryCard';
import Skeleton from '../../components/ui/Skeleton';
import StatusFeedback from '../../components/ui/StatusFeedback';
import { useLoading } from '../../hooks/useLoading';

const FaceIDScreen: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'camera'>('selection');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const isLoading = useLoading('face-id-list', 1000);
  
  // Camera Simulation State
  const [cameraState, setCameraState] = useState<'ready' | 'processing' | 'success' | 'error'>('ready');

  const handleCapture = () => {
    if (cameraState !== 'ready') return;

    // 1. Lock UI and start scanning animation
    setCameraState('processing');

    // 2. Simulate API Network Request (2 seconds)
    setTimeout(() => {
        const isSuccess = true; // Force success for demo

        if (isSuccess) {
            setCameraState('success');
            // Removed auto-timeout to allow manual finish via StatusFeedback
        } else {
            setCameraState('error');
            // Removed auto-timeout to allow manual retry via StatusFeedback
        }
    }, 2000);
  };

  // SELECTION VIEW
  if (step === 'selection') {
    return (
      <div className="p-4 space-y-6 pb-48 animate-fadeIn">
        {/* Banner Selection Header */}
        <div className="bg-secondary-500 rounded-xl px-4 py-3 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2">
                <Users size={20} />
                <span className="font-bold text-sm">Seleccionar Beneficiario</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {isLoading ? "..." : `${FAMILY_MEMBERS.filter(m => !m.isEnrolled).length} pendientes`}
            </div>
        </div>

        {/* Beneficiary List - Using Unified Component */}
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
                FAMILY_MEMBERS.map(member => {
                    const isEnrolled = member.isEnrolled;
                    const isSelected = selectedMemberId === member.id;

                    return (
                        <BeneficiaryCard
                            key={member.id}
                            member={member}
                            isSelected={isSelected}
                            disabled={isEnrolled}
                            onClick={() => setSelectedMemberId(member.id)}
                            badges={
                                <div className="flex items-center gap-2">
                                    {isEnrolled ? (
                                        <span className="bg-green-100 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
                                            <Check size={10} /> Enrolado
                                        </span>
                                    ) : (
                                        <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-200">
                                            No Enrolado
                                        </span>
                                    )}
                                </div>
                            }
                        />
                    );
                })
            )}
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-3">
             <HelpCircle size={20} className="text-gray-400 shrink-0" />
             <p className="text-xs text-gray-500 leading-relaxed">
                 Solo puedes seleccionar beneficiarios no enrolados para el registro facial.
             </p>
        </div>

        {/* Action Button - Positioned Fixed relative to viewport/app frame */}
        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
             <Button 
               fullWidth 
               disabled={!selectedMemberId || isLoading} 
               onClick={() => {
                   setStep('camera');
                   setCameraState('ready');
               }}
             >
                CONTINUAR AL RECONOCIMIENTO
             </Button>
        </div>
      </div>
    );
  }

  // UNIFIED SUCCESS FEEDBACK
  if (cameraState === 'success') {
      return (
          <div className="fixed inset-0 bg-white z-[110] animate-fadeIn">
            <StatusFeedback 
                type="success"
                title="¡Rostro Detectado!"
                message="El reconocimiento facial se ha completado correctamente. El beneficiario ha sido enrolado."
                primaryActionLabel="Finalizar"
                onPrimaryAction={() => {
                    setStep('selection');
                    setSelectedMemberId(null);
                    setCameraState('ready');
                }}
            />
          </div>
      );
  }

  // UNIFIED ERROR FEEDBACK
  if (cameraState === 'error') {
      return (
          <div className="fixed inset-0 bg-white z-[110] animate-fadeIn">
            <StatusFeedback 
                type="error"
                title="Error de Lectura"
                message="No pudimos identificar el rostro con suficiente claridad. Asegúrese de tener buena iluminación."
                primaryActionLabel="Intentar de nuevo"
                onPrimaryAction={() => setCameraState('ready')}
                secondaryActionLabel="Cancelar"
                onSecondaryAction={() => {
                    setStep('selection');
                    setCameraState('ready');
                }}
            />
          </div>
      );
  }

  // CAMERA SIMULATION VIEW
  const isProcessing = cameraState === 'processing';

  return (
    <div className="fixed inset-0 h-[100dvh] bg-black z-[100] flex flex-col animate-fadeIn">
        {/* Camera Header */}
        <div className="absolute top-0 left-0 right-0 p-4 z-30 flex justify-between items-center pt-safe-top">
             <button 
               onClick={() => !isProcessing && setStep('selection')} 
               disabled={isProcessing}
               className={`text-white bg-black/20 p-2 rounded-full backdrop-blur-md ${isProcessing ? 'opacity-0' : 'opacity-100'}`}
             >
                <ChevronDown size={24} />
             </button>
             <h3 className="text-white font-bold text-sm tracking-wide">ESCANEO FACIAL</h3>
             <div className="w-10"></div>
        </div>

        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
             {/* Top Warning (Only in ready phase) */}
             {cameraState === 'ready' && (
                <div className="absolute top-24 left-0 right-0 flex justify-center z-20 animate-bounce">
                    <div className="bg-black/60 text-white px-5 py-2 rounded-full border border-red-500 flex items-center gap-2 backdrop-blur-sm shadow-lg">
                        <span className="text-red-500 text-xs">🚫</span>
                        <span className="text-xs font-bold">Acércate más a la cámara</span>
                    </div>
                </div>
             )}

             {/* Oval Overlay */}
             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 {/* The Oval */}
                 <div className={`
                    w-64 h-80 rounded-[50%] border-[6px] shadow-[0_0_0_2000px_rgba(0,0,0,0.85)] relative transition-colors duration-500 overflow-hidden
                    ${isProcessing ? 'border-green-500' : 'border-white'}
                 `}>
                      {isProcessing && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
                      )}
                      
                      {!isProcessing && (
                        <>
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-white"></div>
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-1 bg-white"></div>
                          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white"></div>
                          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-white"></div>
                        </>
                      )}
                 </div>
             </div>

             {/* Camera Preview Simulation */}
             <div 
                className="absolute inset-0 bg-gray-800 -z-10 bg-cover"
                style={{ 
                    backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")',
                    backgroundPosition: '50% 35%'
                }}
             ></div>
        </div>
        
        {/* Camera Controls */}
        <div className="bg-black/80 backdrop-blur-md pb-10 pt-6 px-4 flex items-center justify-center gap-10 z-50 relative">
             <button className={`bg-white/10 h-12 w-12 rounded-full text-white hover:bg-white/20 transition-colors flex items-center justify-center ${isProcessing ? 'opacity-30' : ''}`}>
                 <RefreshCw size={20} />
             </button>
             
             <button 
                 onClick={handleCapture}
                 disabled={isProcessing}
                 className={`
                     h-20 w-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 active:scale-95
                     ${isProcessing 
                         ? 'border-green-500 bg-green-500/20 scale-90 cursor-wait' 
                         : 'border-white bg-white/20 hover:bg-white/30 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]'}
                 `}
             >
                 {isProcessing ? (
                      <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full" />
                 ) : (
                      <Camera size={36} className="text-white" />
                 )}
             </button>

             <button className={`bg-white/10 h-12 w-12 rounded-full text-white hover:bg-white/20 transition-colors flex items-center justify-center ${isProcessing ? 'opacity-30' : ''}`}>
                 <HelpCircle size={20} />
             </button>
        </div>

        <style>{`
            @keyframes scan {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
            }
        `}</style>
    </div>
  );
};

export default FaceIDScreen;
