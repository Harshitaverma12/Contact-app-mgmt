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
import React, { useEffect, useState } from "react";
import { addAddOns, updateAddOnAdults } from "./ContactsInfo";
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

//function to hold edited data
function EditContact({
  editedData,
  seteditContact,
  setallContacts,
  show,
  hide,
}) {
  //setting useState to store data
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [status, setstatus] = useState("");

  //using useEffect to show the saved data before editing
  useEffect(() => {
    setfirstName(editedData.firstName);
    setlastName(editedData.lastName);
    setstatus(editedData.status);
  }, [editedData]);

  const dispatch = useDispatch();

  //sending edited data to redux store
  const SaveContact = () => {
    dispatch(
      updateAddOnAdults({
        firstName: firstName,
        lastName: lastName,
        status: status,
        id: editedData.id,
      })
    );

    //initally setting edit state as empty
    seteditContact("");
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
          {" "}
          <Card className="Contactcard">
            <TextField
              className="firstName"
              id="outlined-basic"
              label="First name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)} //setting the edited data
            />

            <TextField
              className="lastName"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)} //setting the edited last name
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
                onChange={(e) => setstatus(e.target.value)} //setting the edited status
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
            {/*calling onclick fun to save the data in redux*/}
            <Button variant="contained" onClick={() => SaveContact()}>
              Save
            </Button>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default EditContact;
