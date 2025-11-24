import '../../core/entities/invoice.dart';
import '../../core/repositories/invoice_repository.dart';
import '../data_sources/mock_data_source.dart';

class InvoiceRepositoryImpl implements InvoiceRepository {
  @override
  Future<List<Invoice>> getInvoices() async {
    await Future.delayed(const Duration(milliseconds: 700));
    return MockDataSource.invoices;
  }

  @override
  Future<void> payInvoice(String invoiceId, Map<String, dynamic> paymentData) async {
    await Future.delayed(const Duration(seconds: 2));
  }
}