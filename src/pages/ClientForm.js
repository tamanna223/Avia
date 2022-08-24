//
import { React, useState } from "react";
import Wrapper from "../components/Wrapper";

function Clientform() {
  let [firstname, setfirstname] = useState("");
  let [lastname, setlastname] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [Location, setLocation] = useState("");
  let [DateOfBirth, setDateOfBirth] = useState("");
  let [clientType, setClientType] = useState("Individual");

  const handleClient = (e) => {
    alert("called");
    const { name, value } = e.target;
    alert(value);
    setClientType(value);
  };

  const showDropDownMenuTwo_search = (el) => {
    el.target.parentElement.children[1].classList.toggle("hidden");
  };
  const swaptexttwo_search = (el) => {
    const targetText = el.target.innerText;
    document.getElementById("drop-down-content-setter-two_search").innerText =
      targetText;
    document
      .getElementById("drop-down-div-two_search")
      .classList.toggle("hidden");

    // const collectdata=async()=>{
    //   console.log(firstname,lastname,email,phone,location,DateOfBirth,Radio);

    // }
  };
  const collectdata = async () => {
    console.log(firstname, lastname, email, phone, Location, DateOfBirth);
    let info = await fetch("http://localhost:9000", {
      method: "post",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        phone,
        Location,
        DateOfBirth,
        clientType,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    info = await info.json();
    console.log(info);
  };

  return <Wrapper></Wrapper>;
}

export default Clientform;
