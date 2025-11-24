import '../entities/request.dart';

abstract class RequestRepository {
  Future<List<MedicalRequest>> getMyRequests();
  Future<void> submitRequest(Map<String, dynamic> requestData);
}