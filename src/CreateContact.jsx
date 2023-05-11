import {
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { addAddOns } from "./ContactsInfo";
import { useDispatch, useSelector } from "react-redux";
import "./Contact.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

//styling for modal
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

function CreateContact({ setallContacts, setcreateContact, show, hide }) {
  //creating useState for all the inputs
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [status, setstatus] = useState("Active");
  useSelector((state) => {
    setallContacts(state.contactsInformation.addOnsList);
  });

  const dispatch = useDispatch();

  //sending data to redux store
  const SaveContact = () => {
    dispatch(
      addAddOns({
        firstName: firstName,
        lastName: lastName,
        status: status,
      })
    );
    setcreateContact("");
  };

  return (
    <div>
      {/* setting modal */}
      <Modal
        open={show}
        onClose={hide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Card for putting input fields for inputs*/}
          <Card className="Contactcard">
            <TextField
              className="firstName"
              id="outlined-basic"
              label="First name"
              variant="outlined"
              onChange={(e) => setfirstName(e.target.value)} //changing the state of first name
            />

            <TextField
              className="lastName"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              onChange={(e) => setlastName(e.target.value)} //changing the state of last name
            />
            <FormControl style={{ marginTop: "10px" }}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Status
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={status}
                onChange={(e) => setstatus(e.target.value)} //changing the state of status from active or inactive or vice versa
              >
                <FormControlLabel
                  value="Active"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="Inactive"
                  control={<Radio />}
                  label="Inactive"
                />
              </RadioGroup>
            </FormControl>
            {/* saving the details on onclick function */}
            <Button variant="contained" onClick={() => SaveContact()}>
              Save
            </Button>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateContact;
