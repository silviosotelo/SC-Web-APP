import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'core/use_cases/auth/login_use_case.dart';
import 'core/use_cases/appointments/get_appointments_use_case.dart';
import 'core/use_cases/family/get_family_members_use_case.dart';
import 'core/use_cases/invoices/get_invoices_use_case.dart';
import 'core/use_cases/notifications/get_notifications_use_case.dart';

import 'data/repositories/auth_repository_impl.dart';
import 'data/repositories/appointment_repository_impl.dart';
import 'data/repositories/family_repository_impl.dart';
import 'data/repositories/invoice_repository_impl.dart';
import 'data/repositories/notification_repository_impl.dart';

import 'presentation/controllers/auth_controller.dart';
import 'presentation/controllers/appointment_controller.dart';
import 'presentation/controllers/family_controller.dart';
import 'presentation/controllers/invoice_controller.dart';
import 'presentation/controllers/notification_controller.dart';

import 'presentation/screens/login_screen.dart';
import 'presentation/screens/dashboard_screen.dart';
import 'presentation/screens/appointments_screen.dart';
import 'presentation/screens/invoices_screen.dart';
import 'presentation/screens/notifications_screen.dart';
import 'presentation/screens/plan_screen.dart';
import 'presentation/screens/digital_card_screen.dart';
import 'presentation/screens/placeholder_screen.dart';

import 'presentation/widgets/app_layout.dart';
import 'shared/constants/app_colors.dart';

void main() {
  final authRepository = AuthRepositoryImpl();
  final appointmentRepository = AppointmentRepositoryImpl();
  final familyRepository = FamilyRepositoryImpl();
  final invoiceRepository = InvoiceRepositoryImpl();
  final notificationRepository = NotificationRepositoryImpl();

  final loginUseCase = LoginUseCase(authRepository);
  final getAppointmentsUseCase = GetAppointmentsUseCase(appointmentRepository);
  final getFamilyMembersUseCase = GetFamilyMembersUseCase(familyRepository);
  final getInvoicesUseCase = GetInvoicesUseCase(invoiceRepository);
  final getNotificationsUseCase = GetNotificationsUseCase(notificationRepository);

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthController(loginUseCase)),
        ChangeNotifierProvider(create: (_) => AppointmentController(getAppointmentsUseCase)),
        ChangeNotifierProvider(create: (_) => FamilyController(getFamilyMembersUseCase)),
        ChangeNotifierProvider(create: (_) => InvoiceController(getInvoicesUseCase)),
        ChangeNotifierProvider(create: (_) => NotificationController(getNotificationsUseCase)),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Santa Clara Salud',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: AppColors.primary900,
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.teal400,
          primary: AppColors.teal400,
        ),
        scaffoldBackgroundColor: Colors.white,
        useMaterial3: true,
      ),
      initialRoute: '/login',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/dashboard': (context) => AppLayout(
              showBackButton: false,
              body: const DashboardScreen(),
            ),
        '/appointments': (context) => AppLayout(
              title: 'Turnos',
              body: const AppointmentsScreen(),
            ),
        '/invoices': (context) => AppLayout(
              title: 'Facturas',
              body: const InvoicesScreen(),
            ),
        '/notifications': (context) => const NotificationsScreen(),
        '/plan': (context) => const PlanScreen(),
        '/digital-card': (context) => const DigitalCardScreen(),
        '/guide': (context) => const PlaceholderScreen(title: 'Guía Médica'),
        '/centers': (context) => const PlaceholderScreen(title: 'Centros'),
        '/requests': (context) => const PlaceholderScreen(title: 'Solicitudes'),
        '/history': (context) => const PlaceholderScreen(title: 'Historia Clínica'),
        '/benefits': (context) => const PlaceholderScreen(title: 'Beneficios'),
        '/face-id': (context) => const PlaceholderScreen(title: 'Face ID'),
      },
    );
  }
}