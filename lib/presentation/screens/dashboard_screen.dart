import 'package:flutter/material.dart';
import '../../shared/constants/app_colors.dart';
import '../../shared/widgets/menu_card.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 8),
          RichText(
            text: const TextSpan(
              style: TextStyle(
                fontSize: 18,
                color: AppColors.primary900,
                height: 1.3,
              ),
              children: [
                TextSpan(
                  text: 'Hola, Jose Luis Fernando ',
                  style: TextStyle(fontWeight: FontWeight.w400),
                ),
                TextSpan(
                  text: '¿En qué podemos ayudarte?',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          GridView.count(
            crossAxisCount: 2,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisSpacing: 16,
            mainAxisSpacing: 16,
            childAspectRatio: 1.0,
            children: [
              MenuCard(
                icon: Icons.shield_outlined,
                label: 'Mi Plan',
                iconColor: Colors.blue.shade700,
                backgroundColor: Colors.blue.shade50,
                onTap: () => Navigator.pushNamed(context, '/plan'),
              ),
              MenuCard(
                icon: Icons.card_membership_outlined,
                label: 'Mi Carnet',
                iconColor: Colors.purple.shade700,
                backgroundColor: Colors.purple.shade50,
                onTap: () => Navigator.pushNamed(context, '/digital-card'),
              ),
              MenuCard(
                icon: Icons.medical_services_outlined,
                label: 'Guía Médica',
                iconColor: Colors.teal.shade700,
                backgroundColor: Colors.teal.shade50,
                onTap: () => Navigator.pushNamed(context, '/guide'),
              ),
              MenuCard(
                icon: Icons.location_on_outlined,
                label: 'Centros',
                iconColor: Colors.orange.shade700,
                backgroundColor: Colors.orange.shade50,
                onTap: () => Navigator.pushNamed(context, '/centers'),
              ),
              MenuCard(
                icon: Icons.calendar_today_outlined,
                label: 'Turnos',
                iconColor: Colors.pink.shade700,
                backgroundColor: Colors.pink.shade50,
                onTap: () => Navigator.pushNamed(context, '/appointments'),
              ),
              MenuCard(
                icon: Icons.description_outlined,
                label: 'Solicitudes',
                iconColor: Colors.indigo.shade700,
                backgroundColor: Colors.indigo.shade50,
                onTap: () => Navigator.pushNamed(context, '/requests'),
              ),
              MenuCard(
                icon: Icons.favorite_outline,
                label: 'Historia Clínica',
                iconColor: Colors.red.shade700,
                backgroundColor: Colors.red.shade50,
                onTap: () => Navigator.pushNamed(context, '/history'),
              ),
              MenuCard(
                icon: Icons.credit_card_outlined,
                label: 'Facturas',
                iconColor: Colors.green.shade700,
                backgroundColor: Colors.green.shade50,
                onTap: () => Navigator.pushNamed(context, '/invoices'),
              ),
              MenuCard(
                icon: Icons.card_giftcard_outlined,
                label: 'Red de Beneficios',
                iconColor: Colors.amber.shade700,
                backgroundColor: Colors.amber.shade50,
                onTap: () => Navigator.pushNamed(context, '/benefits'),
              ),
              MenuCard(
                icon: Icons.camera_alt_outlined,
                label: 'Reconocimiento Facial',
                iconColor: AppColors.gray700,
                backgroundColor: AppColors.gray50,
                onTap: () => Navigator.pushNamed(context, '/face-id'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}