import { useState } from "react";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateEditCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <span>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>

      {isOpenModal && (
        <Modal onClose={()=>setIsOpenModal(false)}>
          <CreateEditCabinForm  onCloseModal={()=>setIsOpenModal(false)}/>
        </Modal>
      )}
    </span>
  );
}

export default AddCabin;
