import Button from "../../ui/Button";
import { useCheck } from "./useCheck";

function CheckoutButton({ bookingId }) {
  const { isChecking, check } = useCheck("out");

  return (
    <Button
      $variation="primary"
      size="small"
      onClick={() => check({ bookingId, obj: { status: "checked-out" } })}
      disabled={isChecking}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
