import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateClient from "./UpdateClient";
import NavBar from "../common/NavBar";
import NewHeader from "../components/NewHeader";
import Swal from "sweetalert2";

import AdvancedTable from "../components/AdvancedTable";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";

const ClientPage = () => {
  const [dropdownStatus, setDropdownStatus] = useState(0);

  const [dropDownIndex, setDropDownIndex] = useState(-1);
  const [client, setclient] = useState([]);

  useEffect(() => {
    getClientData();
  }, []);

  const onSubmit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your Data has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your data is safe :)",
            "error"
          );
        }
      });
  };

  const getClientData = async () => {
    let result = await fetch("http://localhost:9000/client");
    result = await result.json();
    setclient(result);
  };
  console.log("client", client);

  return (
    <div>
      <NavBar />
      <NewHeader />

      <div
        className="py-12"
        style={{ width: "82%", position: "absolute", left: "17%", top: "10%" }}
      >
        <AdvancedTable />
      </div>
    </div>
  );
};
export default ClientPage;
