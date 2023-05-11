import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { addAddOns, removeAddOn, updateAddOnAdults } from "./ContactsInfo";
import { useDispatch, useSelector } from "react-redux";
import "./Contact.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DeleteConatct({
  editedData,
  setdeleteContact,
  setallContacts,
  show,
  hide,
}) {
  const dispatch = useDispatch();

  const SaveContact = () => {
    dispatch(removeAddOn(editedData.id));
    setdeleteContact("");
  };

  useSelector((state) => {
    setallContacts(state.contactsInformation.addOnsList);
  });

  return (
    <div>
      <Modal
        open={show}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card className="Contactcard">
            <Typography>R U SURE U WANT TO DELETE!!</Typography>
            <Button
              variant="contained"
              color="error"
              onClick={() => SaveContact()}
            >
              Save
            </Button>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteConatct;
