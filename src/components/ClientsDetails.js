import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateClient from "../pages/UpdateClient";
import NavBar from "../common/NavBar";
import NewHeader from "./NewHeader";
import Swal from "sweetalert2";
import SingleRow from "./SingleRow";

import AdvancedTable from "./AdvancedTable";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";

const ClientsDetails = () => {
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
        <div className="mx-auto container bg-white dark:bg-gray-800 shadow rounded">
          <div className="flex w-full pl-3 sm:pl-6 pr-3 py-5 items-center justify-between bg-blue-100 rounded-t">
            <h3 className="text-black dark:text-black font-bold text-base sm:text-xl">
              <b>Client List</b>
            </h3>
            <button className="ml-0 sm:ml-6 bg-indigo-700 transition duration-150 ease-in-out focus:outline-none hover:bg-indigo-600 rounded text-white px-5 h-8 flex items-center text-sm">
              <Link to="/Clientform">Create New</Link>
            </button>
          </div>
          <div className="flex flex-col md:flex-row p-3 justify-between items-start md:items-stretch w-full">
            <div className="w-full md:w-1/3 flex flex-col md:flex-row items-start md:items-center">
              <div className="flex items-center">
                <a
                  className="p-2 border-gray-200 text-gray-600 dark:text-gray-400 border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon cursor-pointer icon-tabler icon-tabler-trash"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={4} y1={7} x2={20} y2={7} />
                    <line x1={10} y1={11} x2={10} y2={17} />
                    <line x1={14} y1={11} x2={14} y2={17} />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 p-2 ml-2 border-gray-200 border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-upload"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                    <polyline points="7 9 12 4 17 9" />
                    <line x1={12} y1={4} x2={12} y2={16} />
                  </svg>
                </a>
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col md:flex-row items-start md:items-center justify-end">
              <div className="flex items-center border-gray-200 border rounded mt-3 md:mt-0">
                <a
                  className="text-gray-600 dark:text-gray-400 p-2 border-transparent border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-table"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={16} height={16} rx={2} />
                    <line x1={4} y1={10} x2={20} y2={10} />
                    <line x1={10} y1={4} x2={10} y2={20} />
                  </svg>
                </a>
                <a
                  className="text-indigo-700 p-2 bg-gray-200 border border-transparent rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-grid"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                </a>
                <a
                  className="text-gray-600 dark:text-gray-400 p-2 border-transparent border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
                  href="javascript: void(0)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-layout-columns"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={16} height={16} rx={2} />
                    <line x1={12} y1={4} x2={12} y2={20} />
                  </svg>
                </a>
              </div>
              <div className="flex flex-col w-full sm:w-1/2 md:ml-4 mt-3 md:mt-0">
                <div className="relative w-full">
                  <div className="absolute cursor-pointer text-gray-600 dark:text-gray-400 flex items-center pr-3 right-0 border-l h-full">
                    <span className="ml-2 mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-filter"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5" />
                      </svg>
                    </span>
                    <span className="text-sm leading-tight tracking-normal">
                      Filter
                    </span>
                  </div>
                  <div className="absolute text-gray-600 dark:text-gray-400 flex items-center pl-3 h-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-search"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <circle cx={10} cy={10} r={7} />
                      <line x1={21} y1={21} x2={15} y2={15} />
                    </svg>
                  </div>
                  <label
                    htmlFor="search"
                    className="hidden text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
                  />
                  <input
                    id="search"
                    className="w-full bg-transparent dark:bg-gray-800 text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 font-normal pl-8 pr-24 h-10 flex items-center text-sm border-gray-300 dark:border-gray-200 rounded border"
                    placeholder="Search by project name or owner"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-scroll xl:overflow-x-hidden">
            <table
              className="min-w-full bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-200"
              id="main-table"
            >
              <thead>
                <tr className="w-full bg-gray-100 border-b border-gray-300 dark:border-gray-200">
                  <th className="pl-3 w-24 py-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none"
                        onclick="checkAll(this)"
                      />
                      <div className="opacity-0 cursor-defaut ml-4 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-up"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 15 12 9 18 15" />
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th
                    className="whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(8)
                        : setDropdownStatus(0);
                    }}
                  >
                    <div className="flex items-center justify-between relative chuss-div">
                      <p className="text-black dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Name
                      </p>
                      <div className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {dropdownStatus == 8 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(9)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  >
                    <div className="flex items-center justify-between relative">
                      <p className="text-gray-800 dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Email
                      </p>
                      <div className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {dropdownStatus == 9 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(10)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  >
                    <div className="flex items-center justify-between relative">
                      <p className="text-gray-800 dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Phone Number
                      </p>
                      <div className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {dropdownStatus == 10 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(11)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  >
                    <div className="flex items-center justify-between relative">
                      <p className="text-gray-800 dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Location
                      </p>
                      <div className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {dropdownStatus == 11 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(12)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  >
                    <div className="flex items-center justify-between relative">
                      <p className="text-gray-800 dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Date Of Birth
                      </p>
                      <div className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-chevron-down"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {dropdownStatus == 12 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(13)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  >
                    <div className="flex items-center justify-between relative ">
                      <p className="text-gray-800 dark:text-black font-normal text-left text-xs tracking-normal leading-4">
                        Client Type
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer mr-3 text-gray-800 dark:text-gray-100 icon icon-tabler icon-tabler-chevron-down"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                      {dropdownStatus == 13 && (
                        <ul className="bg-white dark:bg-gray-800 shadow rounded mt-2 py-1 w-48 absolute top-0 right-0 mt-8 dropdown-content">
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 1
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 2
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 3
                          </li>
                          <li className="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-indigo-700 hover:text-white px-3 font-normal">
                            Option 4
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th
                    onClick={() => {
                      dropdownStatus == 0
                        ? setDropdownStatus(14)
                        : setDropdownStatus(0);
                    }}
                    className="border-l border-gray-300 dark:border-gray-200 pl-4 whitespace-no-wrap w-32 first-dropdown cursor-pointer"
                    onclick="dropdownFunction(this)"
                  ></th>
                  <th className="border-l border-gray-300 dark:border-gray-200 pl-4 pr-12 whitespace-no-wrap w-32">
                    <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {client.map(
                  (item, index) => (
                    //console.log(index)
                    <SingleRow indexprop={index} itemprop={item} />
                  )
                  // <tr className="border-b border-gray-300 dark:border-gray-200">
                  //   <td className="pl-3 w-24 py-3">
                  //     <div className="flex items-center">
                  //       <input
                  //         type="checkbox"
                  //         className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none"
                  //         onclick="tableInteract(this)"
                  //       />
                  //       <a
                  //         onClick={() => {
                  //           dropdownStatus == 0
                  //             ? setDropdownStatus(1)
                  //             : setDropdownStatus(0);
                  //         }}
                  //         className=" focus:outline-none cursor-pointer text-gray-800 dark:text-gray-100 ml-2 lg:ml-4 mr-2 sm:mr-0 border border-transparent rounded focus:outline-none"
                  //         href="javascript: void(0)"
                  //       >
                  //         <svg
                  //           xmlns="http://www.w3.org/2000/svg"
                  //           className="icon icon-tabler icon-tabler-chevron-down"
                  //           width={16}
                  //           height={16}
                  //           viewBox="0 0 24 24"
                  //           strokeWidth="1.5"
                  //           stroke="currentColor"
                  //           fill="none"
                  //           strokeLinecap="round"
                  //           strokeLinejoin="round"
                  //         >
                  //           <path stroke="none" d="M0 0h24v24H0z" />
                  //           <polyline points="6 9 12 15 18 9" />
                  //         </svg>
                  //       </a>
                  //     </div>
                  //   </td>

                  //   <td className="whitespace-no-wrap w-32">
                  //     <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                  //       {item.firstname}
                  //     </p>
                  //   </td>
                  //   <td className="pl-4 whitespace-no-wrap w-32">
                  //     <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                  //       {item.email}
                  //     </p>
                  //   </td>
                  //   <td className="pl-4 whitespace-no-wrap w-32">
                  //     <div className="bg-blue-200 h-6 w-20 rounded-md flex items-center justify-center">
                  //       <span className="text-xs text-blue-500 font-normal">
                  //         {item.phone}
                  //       </span>
                  //     </div>
                  //   </td>
                  //   <td className="pl-4 whitespace-no-wrap w-32">
                  //     <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                  //       {item.Location}
                  //     </p>
                  //   </td>
                  //   <td className="pl-4 whitespace-no-wrap w-32">
                  //     <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                  //       {item.DateOfBirth}
                  //     </p>
                  //   </td>
                  //   <td className="pl-4 whitespace-no-wrap w-32">
                  //     <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
                  //       {item.clientType}
                  //     </p>
                  //   </td>
                  //   <td class="pl-4 pr-4 whitespace-no-wrap w-32">
                  //     <div class="relative">
                  //       <div
                  //         class="relative z-0 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 flex items-center justify-between border rounded border-gray-300 dark:border-gray-200 w-full cursor-pointer text-xs form-select block py-2 px-2 xl:px-3 border border-gray-300 dark:border-gray-200 rounded bg-transparent"
                  //         onClick={() => {
                  //           dropdownStatus == 0
                  //             ? setDropdownStatus(15)
                  //             : setDropdownStatus(0);
                  //         }}
                  //       >
                  //         <p class="leading-3 tracking-normal font-normal">
                  //           Edit Project
                  //         </p>
                  //         <div class="cursor-pointer">
                  //           <svg
                  //             xmlns="http://www.w3.org/2000/svg"
                  //             class="hidden icon icon-tabler icon-tabler-chevron-up"
                  //             width="16"
                  //             height="16"
                  //             viewBox="0 0 24 24"
                  //             stroke-width="1.5"
                  //             stroke="currentColor"
                  //             fill="none"
                  //             stroke-linecap="round"
                  //             stroke-linejoin="round"
                  //           >
                  //             <path stroke="none" d="M0 0h24v24H0z" />
                  //             <polyline points="6 15 12 9 18 15" />
                  //           </svg>
                  //           <svg
                  //             xmlns="http://www.w3.org/2000/svg"
                  //             class="icon icon-tabler icon-tabler-chevron-up"
                  //             width="16"
                  //             height="16"
                  //             viewBox="0 0 24 24"
                  //             stroke-width="1.5"
                  //             stroke="currentColor"
                  //             fill="none"
                  //             stroke-linecap="round"
                  //             stroke-linejoin="round"
                  //           >
                  //             <path stroke="none" d="M0 0h24v24H0z" />
                  //             <polyline points="6 9 12 15 18 9" />
                  //           </svg>
                  //         </div>
                  //       </div>
                  //       {dropdownStatus == 15 && (
                  //         <ul class="z-10 bg-white dark:bg-gray-800 transition duration-300 bg-white dark:bg-gray-800 shadow rounded mt-2 w-48 py-1 absolute">
                  //           <li class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal">
                  //             <Link to="/updateClient"> Edit Project</Link>
                  //           </li>
                  //           <button
                  //             class="cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 hover:bg-gray-100 px-3 font-normal"
                  //             onClick={onSubmit}
                  //           >
                  //             Delete Project
                  //           </button>
                  //         </ul>
                  //       )}
                  //     </div>
                  //   </td>
                  // </tr>
                  // details row starts

                  //details row ends
                )}

                {dropdownStatus == 1 && <span>tst</span>}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-auto container pt-8 flex justify-center sm:justify-end items-center">
          <a
            className="text-gray-600 dark:text-gray-400 mr-5 border-gray-200 border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
            href="javascript: void(0)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-left"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </a>
          <p className="text-gray-800 dark:text-gray-100 fot-normal text-xs">
            Page
          </p>
          <label htmlFor="selectedPage" className="hidden" />
          <input
            id="selectedPage"
            type="text"
            className="bg-white dark:bg-gray-800 w-6 px-2 mx-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:border focus:border-indigo-700 font-normal flex items-center text-xs border-gray-300 dark:border-gray-200 rounded border"
            defaultValue={4}
          />
          <p className="text-gray-800 dark:text-gray-100 fot-normal text-xs">
            of 20
          </p>
          <a
            className="text-gray-600 dark:text-gray-400 mx-5 border-gray-200 border rounded focus:outline-none focus:border-gray-800 focus:shadow-outline-gray"
            href="javascript: void(0)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </a>
          <label htmlFor="selectedPage1" className="hidden" />
          <input
            id="selectedPage1"
            type="text"
            className="bg-white dark:bg-gray-800 w-8 px-2 mx-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:border focus:border-indigo-700 font-normal flex items-center text-xs border-gray-300 dark:border-gray-200 rounded border"
            defaultValue={30}
          />
          <p className="-mt-1 text-gray-800 dark:text-gray-100 fot-normal text-xs">
            per page
          </p>
        </div>
      </div>
    </div>
  );
};
export default ClientsDetails;
