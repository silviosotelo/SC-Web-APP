import React from 'react';
import { FAMILY_MEMBERS } from '../../constants';
import BeneficiaryCard from '../../components/ui/BeneficiaryCard';

const DigitalCardScreen: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-bold text-gray-800">Grupo Familiar</h2>
        <p className="text-sm text-gray-500">Seleccione un miembro para ver su carnet digital.</p>
      </div>

      <div className="space-y-3">
        {FAMILY_MEMBERS.map((member) => (
          <BeneficiaryCard 
            key={member.id} 
            member={member}
            showStatus={true}
            variant="display"
            onClick={() => {}} // Action to view card details could go here
          />
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-6">
        <p className="text-xs text-blue-800 text-center font-medium leading-relaxed">
          Presente este carnet digital junto con su Cédula de Identidad al momento de la atención.
        </p>
      </div>
    </div>
  );
};

export default DigitalCardScreen;