import '../../entities/invoice.dart';
import '../../repositories/invoice_repository.dart';

class GetInvoicesUseCase {
  final InvoiceRepository _repository;

  GetInvoicesUseCase(this._repository);

  Future<List<Invoice>> execute() async {
    return await _repository.getInvoices();
  }
}