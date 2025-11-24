import '../../core/entities/request.dart';
import '../../core/repositories/request_repository.dart';
import '../data_sources/mock_data_source.dart';

class RequestRepositoryImpl implements RequestRepository {
  @override
  Future<List<MedicalRequest>> getMyRequests() async {
    await Future.delayed(const Duration(milliseconds: 700));
    return MockDataSource.requests;
  }

  @override
  Future<void> submitRequest(Map<String, dynamic> requestData) async {
    await Future.delayed(const Duration(seconds: 1));
  }
}