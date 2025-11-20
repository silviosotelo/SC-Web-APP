import React, { useState } from 'react';
import { Camera, RefreshCw, HelpCircle, Users, Check, ScanFace, ChevronDown, AlertCircle } from 'lucide-react';
import { FAMILY_MEMBERS } from '../../constants';
import Button from '../../components/ui/Button';

const FaceIDScreen: React.FC = () => {
  const [step, setStep] = useState<'selection' | 'camera'>('selection');
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  
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
            setTimeout(() => {
                setStep('selection');
                setSelectedMemberId(null);
                setCameraState('ready');
            }, 2000);
        } else {
            setCameraState('error');
            setTimeout(() => {
                setCameraState('ready');
            }, 3000);
        }
    }, 2000);
  };

  // SELECTION VIEW
  if (step === 'selection') {
    return (
      <div className="p-4 space-y-6 pb-48">
        {/* Banner Selection Header */}
        <div className="bg-secondary-500 rounded-xl px-4 py-3 flex items-center justify-between text-white shadow-md">
            <div className="flex items-center gap-2">
                <Users size={20} />
                <span className="font-bold text-sm">Seleccionar Beneficiario</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
                {FAMILY_MEMBERS.filter(m => !m.isEnrolled).length} pendientes
            </div>
        </div>

        {/* Beneficiary List */}
        <div className="space-y-4">
            {FAMILY_MEMBERS.map(member => {
                const isEnrolled = member.isEnrolled;
                const isDisabled = isEnrolled; 
                const isSelected = selectedMemberId === member.id;

                return (
                    <div 
                        key={member.id}
                        onClick={() => !isDisabled && setSelectedMemberId(member.id)}
                        className={`
                           relative rounded-2xl border-2 p-4 transition-all duration-200
                           ${isDisabled ? 'opacity-50 cursor-not-allowed bg-gray-50 border-gray-100 grayscale' : 'cursor-pointer'}
                           ${isSelected ? 'border-primary-900 bg-primary-50 shadow-md' : 'border-gray-100 bg-white shadow-sm'}
                        `}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`
                                h-14 w-14 rounded-xl flex items-center justify-center shrink-0 text-xl font-bold
                                ${isSelected ? 'bg-primary-900 text-white' : 'bg-gray-200 text-gray-500'}
                            `}>
                                {member.name.charAt(0)}
                            </div>

                            <div className="flex-1 min-w-0 pt-1">
                                <h3 className="font-bold text-primary-900 text-sm truncate">{member.name}</h3>
                                <p className="text-xs text-gray-500">{member.relation}</p>
                                
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                        <ScanFace size={12} />
                                        <span>CI: {member.documentId}</span>
                                    </div>
                                    
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
                            </div>

                            <div className="shrink-0 pt-2">
                                {isDisabled ? (
                                   <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                                      <Check size={14} className="text-gray-400" />
                                   </div>
                                ) : (
                                    <div className={`
                                        h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors
                                        ${isSelected ? 'bg-primary-900 border-primary-900' : 'border-gray-300 bg-white'}
                                    `}>
                                        {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
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
               disabled={!selectedMemberId} 
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

  // CAMERA SIMULATION VIEW
  const isProcessing = cameraState === 'processing';
  const isSuccess = cameraState === 'success';
  const isError = cameraState === 'error';

  return (
    <div className="fixed inset-0 h-[100dvh] bg-black z-[100] flex flex-col">
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

        <div className="flex-1 relative overflow-hidden">
             {/* Top Warning (Only in ready phase) */}
             {cameraState === 'ready' && (
                <div className="absolute top-24 left-0 right-0 flex justify-center z-20 animate-bounce">
                    <div className="bg-black/60 text-white px-5 py-2 rounded-full border border-red-500 flex items-center gap-2 backdrop-blur-sm shadow-lg">
                        <span className="text-red-500 text-xs">🚫</span>
                        <span className="text-xs font-bold">Acércate más a la cámara</span>
                    </div>
                </div>
             )}

             {/* Success Message */}
             {isSuccess && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center animate-fadeIn">
                    <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
                        <Check size={40} className="text-white" strokeWidth={4} />
                    </div>
                    <h3 className="text-white font-bold text-xl shadow-black/50 drop-shadow-md">¡Rostro Detectado!</h3>
                    <p className="text-white text-sm mt-2">Procesamiento exitoso</p>
                </div>
             )}

             {/* Error Message */}
             {isError && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center animate-fadeIn">
                    <div className="h-20 w-20 bg-red-500 rounded-full flex items-center justify-center shadow-2xl mb-4">
                        <AlertCircle size={40} className="text-white" strokeWidth={4} />
                    </div>
                    <h3 className="text-white font-bold text-xl shadow-black/50 drop-shadow-md">Error de Lectura</h3>
                    <p className="text-white text-sm mt-2">Intente nuevamente</p>
                </div>
             )}

             {/* Oval Overlay */}
             <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 {/* The Oval */}
                 <div className={`
                    w-64 h-80 rounded-[50%] border-[6px] shadow-[0_0_0_2000px_rgba(0,0,0,0.85)] relative transition-colors duration-500 overflow-hidden
                    ${isProcessing || isSuccess ? 'border-green-500' : isError ? 'border-red-500' : 'border-white'}
                 `}>
                      {isProcessing && (
                          <div className="absolute top-0 left-0 right-0 h-1 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
                      )}
                      
                      {!isSuccess && !isError && (
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
        
        <div className="bg-black/80 backdrop-blur-md pb-10 pt-6 px-4 flex items-center justify-center gap-10 z-50">
             {!isSuccess && !isError && (
                <>
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
                </>
             )}
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