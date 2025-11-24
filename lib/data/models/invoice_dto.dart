import '../../core/entities/invoice.dart';

class InvoiceDto {
  final String id;
  final String date;
  final String amount;
  final double rawValue;
  final String status;

  InvoiceDto({
    required this.id,
    required this.date,
    required this.amount,
    required this.rawValue,
    required this.status,
  });

  factory InvoiceDto.fromJson(Map<String, dynamic> json) => InvoiceDto(
        id: json['id'] as String,
        date: json['date'] as String,
        amount: json['amount'] as String,
        rawValue: (json['rawValue'] as num).toDouble(),
        status: json['status'] as String,
      );

  Invoice toEntity() => Invoice(
        id: id,
        date: date,
        amount: amount,
        rawValue: rawValue,
        status: _parseStatus(status),
      );

  InvoiceStatus _parseStatus(String status) {
    switch (status.toUpperCase()) {
      case 'PENDIENTE':
        return InvoiceStatus.pending;
      case 'PAGADO':
        return InvoiceStatus.paid;
      case 'CANCELADO':
        return InvoiceStatus.cancelled;
      default:
        return InvoiceStatus.pending;
    }
  }
}