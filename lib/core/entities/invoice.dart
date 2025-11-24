enum InvoiceStatus { pending, paid, cancelled }

class Invoice {
  final String id;
  final String date;
  final String amount;
  final double rawValue;
  final InvoiceStatus status;

  const Invoice({
    required this.id,
    required this.date,
    required this.amount,
    required this.rawValue,
    required this.status,
  });

  bool get isPending => status == InvoiceStatus.pending;
}