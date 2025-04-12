import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthService } from "../api";

const onDefaultError = (error) => {
  toast.error(error?.response?.data?.message || error.message);
};

const useLogin = (onSuccess, onError = onDefaultError) => {
  return useMutation({
    mutationFn: AuthService.login,
    onSuccess,
    onError,
  });
};

const useRegister = (onSuccess, onError = onDefaultError) => {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess,
    onError,
  });
};

const useOTPVerify = (onSuccess, onError = onDefaultError) => {
  return useMutation({
    mutationFn: AuthService.otpVerify,
    onSuccess,
    onError,
  });
};
export { useLogin, useRegister, useOTPVerify };
