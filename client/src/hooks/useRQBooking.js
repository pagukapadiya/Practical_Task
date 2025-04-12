import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BookingService } from "../api";

const onDefaultError = (error) => {
  toast.error(error?.response?.data?.message || error.message);
};

const useAddBooking = (onSuccess, onError = onDefaultError) => {
  return useMutation({
    mutationFn: BookingService.addBooking,
    onSuccess,
    onError,
  });
};

export { useAddBooking };
