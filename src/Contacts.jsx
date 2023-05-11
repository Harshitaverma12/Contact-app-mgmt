import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import CreateContact from "./CreateContact";
import EditContact from "./EditContact";
import DeleteConatct from "./DeleteConatct";

function Contacts() {
  //creating states for functionality
  const [createContact, setcreateContact] = useState("");
  const [allContacts, setallContacts] = useState([]);
  const [editContact, seteditContact] = useState("");
  const [editedData, seteditedData] = useState([]);
  const [deleteContact, setdeleteContact] = useState("");
  const [deletedData, setdeletedData] = useState([]);
  const [openModal, setopenModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [createModal, setcreateModal] = useState(false);

  //creating function to open modal
  const openCreateModal = () => {
    setopenModal(true);
  };
  const opendeleteModal = () => {
    setdeleteModal(true);
  };
  const InitalcreateModal = () => {
    setcreateModal(true);
  };

  //creating function to close modal
  const hideCreateModal = () => {
    setopenModal(false);
  };

  const hidedeleteModal = () => {
    setdeleteModal(false);
  };

  const InitialhideModal = () => {
    setcreateModal(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          //calling useState to create contact
          setcreateContact("create");
          //opening modal to create contact
          InitalcreateModal();
        }}
      >
        Create Contact
      </Button>
      {/*function to create contact intially*/}
      {createContact === "create" &&
        editContact !== "yes" &&
        deleteContact !== "yes" && (
          <CreateContact
            setallContacts={setallContacts}
            setcreateContact={setcreateContact}
            show={createModal}
            hide={InitialhideModal}
          />
        )}
      {/* functionality to show no contacts intially when there is no contact in redux */}
      {allContacts.length === 0 &&
        createContact !== "create" &&
        deleteContact !== "yes" &&
        editContact !== "yes" && <h2>No Contacts</h2>}
      {/* functionality to put contact information initially */}
      {allContacts.length > 0 && (
        <div className="cardDiv">
          {allContacts.map((item) => (
            <Card className="contactCard">
              <div className="insideDiv">
                <h3>First Name:</h3>
                <p className="divContent">{item.firstName}</p>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Last Name:</h3>
                <p className="divContent">{item.lastName}</p>
              </div>
              <div style={{ display: "flex" }}>
                <h3>Status:</h3>
                <p className="divContent">{item.status}</p>
              </div>
              <div>
                {" "}
                {/* functionality to edit contact */}
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => {
                    // calling editContact useState to change data
                    seteditContact("yes");
                    //putting the filter on the id to delete that specific contact
                    const data = allContacts?.filter(
                      (items) => items.id === item.id
                    );
                    seteditedData(data[0]);
                    openCreateModal();
                  }}
                  style={{ marginRight: "2rem", width: "6rem" }}
                >
                  Edit
                </Button>
                {/* functionality to delete contact */}
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    //putting the filter on the id to delete that specific contact
                    setdeleteContact("yes");
                    const data = allContacts?.filter(
                      (items) => items.id === item.id
                    );
                    setdeletedData(data[0]);
                    opendeleteModal();
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}

          {/* setting edited data and hididng the modal */}
          {editContact === "yes" && deleteContact !== "yes" && (
            <EditContact
              editedData={editedData}
              seteditContact={seteditContact}
              setallContacts={setallContacts}
              show={openModal}
              hide={hideCreateModal}
            />
          )}

          {/* deleteing the selected data and hiding the modal */}
          {deleteContact === "yes" && (
            <DeleteConatct
              editedData={editedData}
              setdeleteContact={setdeleteContact}
              setallContacts={setallContacts}
              show={deleteModal}
              hide={hidedeleteModal}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Contacts;
