import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controllers/invoice_controller.dart';
import '../../shared/constants/app_colors.dart';
import '../../shared/widgets/loading_indicator.dart';

class InvoicesScreen extends StatefulWidget {
  const InvoicesScreen({super.key});

  @override
  State<InvoicesScreen> createState() => _InvoicesScreenState();
}

class _InvoicesScreenState extends State<InvoicesScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<InvoiceController>().loadInvoices();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Consumer<InvoiceController>(
        builder: (context, controller, child) {
          if (controller.isLoading) {
            return const LoadingIndicator(message: 'Cargando facturas...');
          }

          if (controller.invoices.isEmpty) {
            return const Center(child: Text('No hay facturas'));
          }

          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: controller.invoices.length,
            itemBuilder: (context, index) {
              final invoice = controller.invoices[index];
              return Card(
                margin: const EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: Icon(
                    invoice.isPending
                        ? Icons.warning_amber
                        : Icons.check_circle,
                    color: invoice.isPending
                        ? AppColors.warning
                        : AppColors.success,
                  ),
                  title: Text('Factura ${invoice.id}'),
                  subtitle: Text(invoice.date),
                  trailing: Text(
                    '${invoice.amount} Gs.',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: invoice.isPending
                          ? AppColors.error
                          : AppColors.success,
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}