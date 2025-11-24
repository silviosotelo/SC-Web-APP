import 'package:flutter/foundation.dart';
import '../../core/entities/invoice.dart';
import '../../core/use_cases/invoices/get_invoices_use_case.dart';

class InvoiceController extends ChangeNotifier {
  final GetInvoicesUseCase _getInvoicesUseCase;

  InvoiceController(this._getInvoicesUseCase);

  List<Invoice> _invoices = [];
  bool _isLoading = false;
  String? _errorMessage;

  List<Invoice> get invoices => _invoices;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;

  Future<void> loadInvoices() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _invoices = await _getInvoicesUseCase.execute();
    } catch (e) {
      _errorMessage = 'Error al cargar facturas';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}