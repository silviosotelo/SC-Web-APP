import '../entities/invoice.dart';

abstract class InvoiceRepository {
  Future<List<Invoice>> getInvoices();
  Future<void> payInvoice(String invoiceId, Map<String, dynamic> paymentData);
}