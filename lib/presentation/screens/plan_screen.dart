import 'package:flutter/material.dart';
import '../widgets/app_layout.dart';
import '../../shared/constants/app_colors.dart';

class PlanScreen extends StatelessWidget {
  const PlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return AppLayout(
      title: 'MI PLAN',
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'MI PLAN',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.gray800,
              ),
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Plan Santa Clara Superior',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: AppColors.primary900,
                      ),
                    ),
                    const SizedBox(height: 16),
                    _buildPlanDetail('Consultas', 'Ilimitadas. Consultas programadas en consultorio.'),
                    _buildPlanDetail('Domicilio no urgentes', '2/mes/abonado. Asunción y gran Asunción.'),
                    _buildPlanDetail('Urgencias', 'Cobertura 100% en sanatorios habilitados.'),
                    _buildPlanDetail('Internación', '100% Habitación privada.'),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlanDetail(String title, String content) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: AppColors.teal400,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            content,
            style: const TextStyle(
              fontSize: 14,
              color: AppColors.gray700,
            ),
          ),
        ],
      ),
    );
  }
}