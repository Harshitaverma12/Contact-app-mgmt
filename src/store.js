import { configureStore } from "@reduxjs/toolkit";
import ContactsInfoReducer from "./ContactsInfo";

//making redux store for storing data
export const store = configureStore({
  reducer: {
    contactsInformation: ContactsInfoReducer,
  },
});
