import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheck } from "./useCheck";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid || false);
    setAddBreakfast(booking?.has_breakfast || false);
  }, [booking]);

  const moveBack = useMoveBack();
  const { check, isChecking } = useCheck("in");

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guest,
    total_price,
    num_guests,
    has_breakfast,
    num_nights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * num_guests * num_nights;

  function handleCheckin() {
    if (!confirmPaid) return;
    let obj = {
      is_paid: true,
      status: "checked-in",
    };
    if (addBreakfast)
      obj = {
        ...obj,
        has_breakfast: true,
        total_price: total_price + optionalBreakfastPrice,
        extras_price: optionalBreakfastPrice,
      };
    check({ bookingId, obj });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            id="addBreakfast"
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
            disabled={isChecking}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          id="confirm"
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isChecking}
        >
          I confirm that {guest.full_name} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(total_price)
            : `${formatCurrency(
                total_price + optionalBreakfastPrice
              )} (${formatCurrency(total_price)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isChecking}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
