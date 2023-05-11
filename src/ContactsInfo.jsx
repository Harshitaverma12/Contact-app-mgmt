import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addOnsList: [],
};

export const ContactsInfo = createSlice({
  name: "contactsInformation",
  initialState,
  reducers: {
    //from the state pushing the data to redux
    addAddOns: (state, action) => {
      state.addOnsList.push(action.payload);
      let index = 0;
      for (let room of state.addOnsList) {
        room.id = index;
        index += 1;
      }
    },
    //removing the data from the redux using filter on id
    removeAddOn: (state, action) => {
      const updatedAddOnsList = state.addOnsList.filter(
        (item) => item?.id !== action.payload
      );
      let index = 0;
      for (let room of updatedAddOnsList) {
        room.id = index;
        index += 1;
      }
      state.addOnsList = updatedAddOnsList;
    },
    //updating the data in redux
    updateAddOnAdults: (state, action) => {
      let arr = [];
      //putting the map on the data in redux
      state.addOnsList.map((item) => {
        let obj = {};
        obj["firstName"] = item.firstName;
        obj["lastName"] = item.lastName;
        obj["status"] = item.status;
        obj["id"] = item.id;
        //checking if selected updating data id is to payload is then updating the data
        if (item.id === action.payload.id) {
          obj["firstName"] = action.payload.firstName;
          obj["lastName"] = action.payload.lastName;
          obj["status"] = action.payload.status;
        }
        //pushing the object of inputs to redux after updating
        arr.push(obj);
      });
      state.addOnsList = arr;
    },
  },
});

export const {
  addAddOns,
  removeAddOn,
  updateAddOnAdults,
  updateAddOnChildren,
} = ContactsInfo.actions;

export default ContactsInfo.reducer;
