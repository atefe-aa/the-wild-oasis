import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheck(inOrOut) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: check, isLoading: isChecking } = useMutation({
    mutationFn: ({ bookingId, obj }) => updateBooking(bookingId, obj),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked ${inOrOut}.`);
      queryClient.invalidateQueries({ active: true });
     if(inOrOut === 'in') navigate("/");
    },

    onError: () => toast.error(`There was an error while checking ${inOrOut}!`),
  });

  return { check, isChecking };
}
