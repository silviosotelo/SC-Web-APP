
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './features/auth/LoginScreen';
import Dashboard from './features/home/Dashboard';
import AppointmentWizard from './features/appointments/AppointmentWizard';
import MyAppointmentsScreen from './features/appointments/MyAppointmentsScreen';
import DigitalCardScreen from './features/digital-card/DigitalCardScreen';
import PlanScreen from './features/plan/PlanScreen';
import MedicalGuideScreen from './features/medical-guide/MedicalGuideScreen';
import CentersScreen from './features/centers/CentersScreen';
import RequestsScreen from './features/requests/RequestsScreen';
import MyRequestsListScreen from './features/requests/MyRequestsListScreen';
import ClinicalHistoryScreen from './features/history/ClinicalHistoryScreen';
import UploadStudyScreen from './features/history/UploadStudyScreen';
import AnalysisResultsScreen from './features/history/AnalysisResultsScreen';
import MyStudiesScreen from './features/history/MyStudiesScreen';
import AnalysisDetailScreen from './features/history/AnalysisDetailScreen';
import StudyDetailScreen from './features/history/StudyDetailScreen';
import InvoicesScreen from './features/invoices/InvoicesScreen';
import PaymentScreen from './features/payment/PaymentScreen';
import BenefitsScreen from './features/benefits/BenefitsScreen';
import FaceIDScreen from './features/face-id/FaceIDScreen';
import NotificationsScreen from './features/notifications/NotificationsScreen';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Appointments */}
          <Route path="/appointments" element={<AppointmentWizard />} />
          <Route path="/my-appointments" element={<MyAppointmentsScreen />} />

          {/* Digital Card & Plan */}
          <Route path="/digital-card" element={<DigitalCardScreen />} />
          <Route path="/plan" element={<PlanScreen />} />

          {/* Guide & Centers */}
          <Route path="/guide" element={<MedicalGuideScreen />} />
          <Route path="/centers" element={<CentersScreen />} />

          {/* Requests */}
          <Route path="/requests" element={<RequestsScreen />} />
          <Route path="/my-requests" element={<MyRequestsListScreen />} />
          
          {/* History Section */}
          <Route path="/history" element={<ClinicalHistoryScreen />} />
          <Route path="/history/upload" element={<UploadStudyScreen />} />
          <Route path="/history/results" element={<AnalysisResultsScreen />} />
          <Route path="/history/studies" element={<MyStudiesScreen />} />
          <Route path="/history/detail" element={<AnalysisDetailScreen />} />
          <Route path="/history/study-detail" element={<StudyDetailScreen />} />

          {/* Payments */}
          <Route path="/invoices" element={<InvoicesScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />

          {/* Extras */}
          <Route path="/benefits" element={<BenefitsScreen />} />
          <Route path="/face-id" element={<FaceIDScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
