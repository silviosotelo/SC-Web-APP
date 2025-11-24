import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/appointment_controller.dart';
import '../../shared/constants/app_colors.dart';
import '../../shared/widgets/loading_indicator.dart';

class AppointmentsScreen extends StatefulWidget {
  const AppointmentsScreen({super.key});

  @override
  State<AppointmentsScreen> createState() => _AppointmentsScreenState();
}

class _AppointmentsScreenState extends State<AppointmentsScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<AppointmentController>().loadAppointments();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<AppointmentController>(
        builder: (context, controller, child) {
          if (controller.isLoading) {
            return const LoadingIndicator(message: 'Cargando turnos...');
          }

          if (controller.errorMessage != null) {
            return Center(
              child: Text(
                controller.errorMessage!,
                style: const TextStyle(color: AppColors.error),
              ),
            );
          }

          if (controller.appointments.isEmpty) {
            return const Center(
              child: Text('No tienes turnos agendados'),
            );
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: controller.appointments.length,
            itemBuilder: (context, index) {
              final appointment = controller.appointments[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      color: AppColors.teal400.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(
                      Icons.calendar_today,
                      color: AppColors.teal400,
                    ),
                  ),
                  title: Text(
                    appointment.doctorName,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  subtitle: Text(
                    '${appointment.specialty}\n${appointment.date} - ${appointment.time}',
                  ),
                  isThreeLine: true,
                ),
              );
            },
          );
        },
      ),
    );
  }
}