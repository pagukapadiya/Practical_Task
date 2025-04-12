import client from "../libs/HttpClient";

class BookingService {
  static addBooking(request) {
    return client.post("booking/add", request);
  }
}

export { BookingService };
