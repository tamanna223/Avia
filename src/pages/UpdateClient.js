import React, { useState, useEffect } from "react";
import NavBar from "../common/NavBar";
import NewHeader from "../components/NewHeader";

import { useForm } from "react-hook-form";
import PopUp from "../pages/PopUp";
import Swal from "sweetalert2";

import { useParams } from "react-router-dom";

let UpdateClient = () => {
  let [firstname, setfirstname] = useState("");
  let [lastname, setlastname] = useState("");
  let [email, setemail] = useState("");
  let [phone, setphone] = useState("");
  let [Location, setLocation] = useState("");
  let [DateOfBirth, setDateOfBirth] = useState("");
  let [clientType, setClientType] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const params = useParams();

  useEffect(() => {
    getClientDetails();
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    setIsOpen(!isOpen);
    Swal.fire("Thank You!", "Your Submission Has Been Received!", "success");
    e.preventDefault();
    console.log("refresh prevented");
  };

  let getClientDetails = async () => {
    let result = await fetch(`http://localhost:9000/deleteclient/${params.id}`);
    result = await result.json();
    setLocation(result.Location);
    setfirstname(result.firstname);
  };

  let UpdateClientData = async () => {
    let result = await fetch(
      `http://localhost:9000/deleteclient/${params.id}`,
      {
        method: "Put",
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
      }
    );
    result = await result.json();
    console.log(result);
  };
  // const collectdata = async () => {
  //   console.log(firstname, lastname, email, phone, Location, DateOfBirth);
  //   let info = await fetch("http://localhost:9000/newclient", {
  //     method: "post",
  //     body: JSON.stringify({
  //       firstname,
  //       lastname,
  //       email,
  //       phone,
  //       Location,
  //       DateOfBirth,
  //       clientType,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   info = await info.json();
  //   console.log(info);
  // };

  const handleClient = (e) => {
    const { name, value } = e.target;
    alert("okk");

    setClientType({ ...value });
  };
  return (
    <div>
      <div>
        <div style={{}}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
              <div
                className="container "
                style={{ display: "flex", width: "100%" }}
              >
                <div style={{ width: "100%" }}>
                  <div
                    className="rounded border-gray-300  dark:border-gray-700"
                    style={{ width: "100%" }}
                  >
                    <NewHeader />
                    <NavBar />
                  </div>

                  <div
                    style={{
                      top: "26%",
                      position: "absolute",
                      top: "20%",
                      right: "20%",
                      width: "55%",
                    }}
                  >
                    <div className="w-full bg-white p-10">
                      <div className="md:flex items-center border-b border-gray-200">
                        <div className="flex items-center md:mt-0 mt-4"></div>
                      </div>
                      {/* <form onSubmit={onSubmit}> */}
                      <div className="mt-8 md:flex items-center">
                        <div className="flex w-full flex-col">
                          <label
                            for="fname"
                            className="mb-3 text-sm leading-none text-gray-800"
                          >
                            First name
                          </label>
                          <input
                            type="name"
                            tabIndex={0}
                            aria-label="Enter first name"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            {...register("fname", {
                              required: "FirstName is required",
                            })}
                            onChange={(e) => {
                              setfirstname(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex w-full flex-col md:ml-12 md:mt-0 mt-8">
                          <label
                            for="lname"
                            className="mb-4 text-sm leading-none text-gray-800"
                          >
                            Last name
                          </label>
                          <input
                            name="lname"
                            id="lname"
                            required
                            type="name"
                            tabIndex={0}
                            aria-label="Enter last name"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            {...register("lname", {
                              required: "LastName is required",
                            })}
                            onChange={(e) => {
                              setlastname(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-12 md:flex items-center">
                        <div className="flex w-full flex-col">
                          <label
                            for="email"
                            className="mb-3 text-sm leading-none text-gray-800"
                          >
                            Email Address
                          </label>
                          <input
                            name="email"
                            id="email"
                            required
                            type="email"
                            tabIndex={0}
                            aria-label="Enter email Address"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            {...register("email", {
                              required: "Email is required",
                            })}
                            onChange={(e) => {
                              setemail(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex w-full flex-col md:ml-12 md:mt-0 mt-8">
                          <label
                            for="phone"
                            className="mb-3 text-sm leading-none text-gray-800"
                          >
                            Phone number
                          </label>
                          <input
                            name="phone"
                            id="phone"
                            required
                            type="number"
                            tabIndex={0}
                            aria-label="Enter phone number"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            defaultValue="+81 839274"
                            {...register("phone", {
                              required: "phone is required",
                            })}
                            onChange={(e) => {
                              setphone(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="mt-12 md:flex items-center">
                        <div className="flex w-full flex-col">
                          <label
                            for="dateofbirth"
                            className="mb-3 text-sm leading-none text-gray-800"
                          >
                            Date of Joining
                          </label>
                          <input
                            name="dateofbirth"
                            id="dateofbirth"
                            required
                            type="date"
                            tabIndex={0}
                            aria-label="Enter date of birth"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            defaultValue="28.03.1997"
                            {...register("dateofbirth", {
                              required: "Date-Of-birth is required",
                            })}
                            onChange={(e) => {
                              setDateOfBirth(e.target.value);
                            }}
                          />
                        </div>
                        <div className="flex w-full flex-col md:ml-12 md:mt-0 mt-8">
                          <label
                            for="location"
                            className="mb-3 text-sm leading-none text-gray-800"
                          >
                            Location
                          </label>
                          <input
                            name="location"
                            id="location"
                            required
                            type="name"
                            tabIndex={0}
                            aria-label="Enter place of birth"
                            className="w-full bg-gray-100 text-sm font-medium leading-none text-gray-800 p-3 border rounded border-gray-200"
                            {...register("location", {
                              required: "location is required",
                            })}
                            onChange={(e) => {
                              setLocation(e.target.value);
                            }}
                          />
                        </div>
                      </div>

                      <div className="mt-12 md:flex items-center">
                        <div className="flex w-1/2 flex-col">
                          <form>
                            <p>
                              <b>Client Type</b>
                            </p>
                            <div>
                              <input
                                type="radio"
                                name="client-type"
                                value="individual"
                              />

                              <label
                                for="html"
                                className="mb-3 text-sm leading-none text-gray-800"
                              >
                                Individual
                              </label>
                            </div>
                            <div>
                              <input
                                type="radio"
                                name="client-type"
                                value="buisness"
                              />
                                <label for="css"> Business</label>
                            </div>
                          </form>
                        </div>
                        <div className="flex w-64 flex-col md:ml-12 md:mt-0 mt-8">
                          <button
                            type="submit"
                            value="Submit"
                            role="button"
                            aria-label="Next step"
                            className="flex items-center justify-center py-4 px-7 focus:outline-none bg-white border rounded border-gray-400 mt-7 md:mt-14  hover:bg-indigo-600 bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-700
                          text-white"
                            // onClick={collectdata}
                            // onClick={handleSubmit(onSubmit)}

                            onClick={UpdateClientData}
                          >
                            <span className="text-white font-medium text-center text-white capitalize text-white">
                              Submit
                            </span>
                            <svg
                              className="mt-1 ml-3"
                              width={12}
                              height={8}
                              viewBox="0 0 12 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.01 3H0V5H8.01V8L12 4L8.01 0V3Z"
                                fill="#242731"
                              />
                            </svg>
                          </button>
                          {isOpen && (
                            <PopUp
                              handleClose={onSubmit}
                              content={<div></div>}
                            />
                          )}
                        </div>
                      </div>
                      {/* </form> */}

                      {/* radio button */}
                      {/* <div className="mt-8" style={{ width: "25%" }}>
          <label className="text-sm text-left font-medium leading-none text-gray-800">
            Group Type
          </label>
          <div className="dropdown-one border  border-gray-300 w-full rounded outline-none   relative mt-2">
            <button
              onClick={showDropDownMenuTwo_search}
              className="dropbtn-one relative px-5 py-[12px] flex items-center justify-between w-full"
            >
              <span
                className="pr-4 font-medium text-gray-600 text-sm"
                id="drop-down-content-setter-two_search"
              >
                Individual
              </span>
              <svg
                className="absolute right-5 z-10 cursor-pointer"
                width={10}
                height={6}
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5 0.75L5 5.25L9.5 0.75"
                  stroke="#4B5563"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              className="hidden rounded w-full shadow border-t border-gray-200 px-1 py-2 absolute top-12 right-0 bg-white z-10"
              id="drop-down-div-two_search"
              value={Radio}
            >
              <a href="javascript:void(0)" className="hover">
                <p
                  className="text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer"
                  onClick={swaptexttwo_search}
                >
                  Individual
                </p>
              </a>
              <a href="javascript:void(0)">
                <p
                  className="text-sm leading-none text-gray-600 p-3 hover:bg-indigo-100 hover:font-medium hover:text-indigo-700 hover:rounded cursor-pointer"
                  onClick={swaptexttwo_search}
                >
                  Business
                </p>
              </a>
            </div>
          </div>
        </div> */}
                    </div>
                    <style
                      dangerouslySetInnerHTML={{
                        __html:
                          "\n          .checkbox:checked + .check-icon {\n              display: flex;\n          }\n      ",
                      }}
                    />
                  </div>
                  {/* page heading ends */}
                  {/* form start */}

                  {/* form ends */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateClient;
