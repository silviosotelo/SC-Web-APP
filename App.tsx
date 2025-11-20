import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './features/auth/LoginScreen';
import Dashboard from './features/home/Dashboard';
import AppointmentWizard from './features/appointments/AppointmentWizard';
import DigitalCardScreen from './features/digital-card/DigitalCardScreen';
import PlanScreen from './features/plan/PlanScreen';
import MedicalGuideScreen from './features/medical-guide/MedicalGuideScreen';
import CentersScreen from './features/centers/CentersScreen';
import RequestsScreen from './features/requests/RequestsScreen';
import ClinicalHistoryScreen from './features/history/ClinicalHistoryScreen';
import InvoicesScreen from './features/invoices/InvoicesScreen';
import BenefitsScreen from './features/benefits/BenefitsScreen';
import FaceIDScreen from './features/face-id/FaceIDScreen';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AppointmentWizard />} />
          <Route path="/digital-card" element={<DigitalCardScreen />} />
          <Route path="/plan" element={<PlanScreen />} />
          <Route path="/guide" element={<MedicalGuideScreen />} />
          <Route path="/centers" element={<CentersScreen />} />
          <Route path="/requests" element={<RequestsScreen />} />
          <Route path="/history" element={<ClinicalHistoryScreen />} />
          <Route path="/invoices" element={<InvoicesScreen />} />
          <Route path="/benefits" element={<BenefitsScreen />} />
          <Route path="/face-id" element={<FaceIDScreen />} />
          {/* Fallback for unimplemented routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;