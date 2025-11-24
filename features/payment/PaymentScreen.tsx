
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';
import StatusFeedback from '../../components/ui/StatusFeedback';
import { ToastContext } from '../../components/Layout';

const PaymentScreen: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('card1');

  const handlePayment = () => {
      setLoading(true);
      // Simulation
      setTimeout(() => {
          setLoading(false);
          setSuccess(true);
          showToast('Pago procesado correctamente', 'success');
      }, 2500);
  };

  if (success) {
      return (
          <StatusFeedback 
            type="success"
            title="¡Pago Exitoso!"
            message="Tu transacción ha sido procesada correctamente. Hemos enviado el comprobante a tu correo."
            primaryActionLabel="Volver a Facturas"
            onPrimaryAction={() => navigate('/invoices')}
          />
      )
  }

  return (
    <div className="p-4 space-y-6 pb-32 animate-fadeIn">
        <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
            <Lock size={20} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
                Esta es una pasarela de pago segura. Tus datos están encriptados de extremo a extremo.
            </p>
        </div>

        <div>
            <h3 className="font-bold text-gray-900 mb-4">Método de Pago</h3>
            <div className="space-y-3">
                <div 
                    onClick={() => setSelectedMethod('card1')}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${selectedMethod === 'card1' ? 'border-primary-900 bg-primary-50' : 'border-gray-200'}`}
                >
                    <div className="bg-gray-900 text-white p-2 rounded">
                        <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">Visa Débito **** 4242</p>
                        <p className="text-xs text-gray-500">Vence 12/28</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'card1' ? 'border-primary-900' : 'border-gray-300'}`}>
                        {selectedMethod === 'card1' && <div className="h-2.5 w-2.5 bg-primary-900 rounded-full"></div>}
                    </div>
                </div>

                <div 
                    onClick={() => setSelectedMethod('new')}
                    className={`p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer transition-all ${selectedMethod === 'new' ? 'border-primary-900 bg-primary-50' : 'border-gray-200'}`}
                >
                    <div className="bg-gray-200 text-gray-500 p-2 rounded">
                        <CreditCard size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">Nueva Tarjeta</p>
                        <p className="text-xs text-gray-500">Crédito o Débito</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'new' ? 'border-primary-900' : 'border-gray-300'}`}>
                        {selectedMethod === 'new' && <div className="h-2.5 w-2.5 bg-primary-900 rounded-full"></div>}
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₲ 130.000</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
                <span>Comisión</span>
                <span>₲ 0</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                <span>Total a pagar</span>
                <span>₲ 130.000</span>
            </div>
        </div>

        <div className="fixed bottom-[85px] left-0 right-0 mx-auto max-w-md p-4 bg-white border-t border-gray-100 z-40 shadow-sm">
            <Button fullWidth onClick={handlePayment} isLoading={loading}>
                CONFIRMAR PAGO
            </Button>
        </div>
    </div>
  );
};

export default PaymentScreen;
