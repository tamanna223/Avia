import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function SingleRow(props) {
  const [dropdownStatus, setDropdownStatus] = useState(-1);
  const [client, setclient] = useState([]);
  const thisindex = props.indexprop;
  const thisitem = props.itemprop;

  useEffect(() => {
    getproducts();
  }, []);

  const getproducts = async () => {
    let result = await fetch("http://localhost:9000/client");
    result = await result.json();
    setclient(result);
  };

  const deleteclient = async (id) => {
    let result = await fetch(`http://localhost:9000/deleteclient/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getproducts();
    }
  };
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
          deleteclient(thisitem._id);
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };
  return (
    <>
      {/* table row starts */}

      <tr
        className="border-b border-gray-300 dark:border-gray-200"
        key={thisitem._id}
      >
        <td className="pl-3 w-24 py-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="cursor-pointer relative w-5 h-5 border rounded border-gray-400 bg-white dark:bg-gray-800 outline-none"
              onclick="tableInteract(this)"
            />
            <a
              onClick={({}) => {
                if (dropdownStatus == -1) {
                  setDropdownStatus(thisindex);
                } else {
                  setDropdownStatus(-1);
                }
                //alert(thisindex);
              }}
              className=" focus:outline-none cursor-pointer text-gray-800 dark:text-gray-100 ml-2 lg:ml-4 mr-2 sm:mr-0 border border-transparent rounded focus:outline-none"
              href="javascript: void(0)"
            >
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
            </a>
          </div>
        </td>

        <td className="whitespace-no-wrap w-32">
          <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
            {thisitem.firstname}
          </p>
        </td>
        <td className="pl-4 whitespace-no-wrap w-32">
          <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
            {thisitem.email}
          </p>
        </td>
        <td className="pl-4 whitespace-no-wrap w-32">
          <div className="bg-blue-200 h-6 w-20 rounded-md flex items-center justify-center">
            <span className="text-xs text-blue-500 font-normal">
              {thisitem.phone}
            </span>
          </div>
        </td>
        <td className="pl-4 whitespace-no-wrap w-32">
          <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
            {thisitem.Location}
          </p>
        </td>
        <td className="pl-4 whitespace-no-wrap w-32">
          <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
            {thisitem.DateOfBirth}
          </p>
        </td>
        <td className="pl-4 whitespace-no-wrap w-32">
          <p className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4">
            {thisitem.clientType}
          </p>
        </td>

        <td class="pl-4 pr-4 whitespace-no-wrap w-32">
          <div class="relative">
            <td className="pl-4 whitespace-no-wrap w-32">
              <button
                className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4"
                style={{
                  border: "2px solid grey",
                  width: " 80%",
                  borderRadius: " 4px",
                  paddingLeft: "23px",
                  width: "80px",
                }}
              >
                <Link to={"/updateClient/" + thisitem._id}>Edit</Link>
              </button>
            </td>

            <td className="pl-4 whitespace-no-wrap w-32">
              <button
                className="text-gray-800 dark:text-gray-100 font-normal text-left text-xs tracking-normal leading-4"
                style={{
                  border: "2px solid grey",

                  borderRadius: " 4px",
                  paddingLeft: "23px",
                  width: "80px",
                }}
                onClick={onSubmit}
              >
                Delete
              </button>
            </td>
          </div>
        </td>
      </tr>
      {/* table row ends */}
      {/* detail row starts */}
      {dropdownStatus == thisindex && (
        <tr className="detail-row">
          <td colSpan={9}>
            <div className="flex items-stretch w-full border-b border-gray-300 dark:border-gray-200">
              <ul>
                <li className="cursor-pointer text-sm leading-3 tracking-normal flex items-center justify-center">
                  <a
                    className="p-3 border text-gray-800 dark:text-gray-100 border-transparent focus:outline-none hover:text-indigo-700 focus:bg-indigo-700 focus:text-white"
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
                </li>
                <li
                  autoFocus
                  className="cursor-pointer flex items-center justify-center"
                >
                  <a
                    className="p-3 border text-gray-800 dark:text-gray-100 border-transparent focus:outline-none focus:bg-indigo-700 focus:text-white"
                    href="javascript: void(0)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-puzzle"
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
                      <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                    </svg>
                  </a>
                </li>
                <li className="cursor-pointer text-sm leading-3 tracking-normal flex items-center justify-center">
                  <a
                    className="p-3 border text-gray-800 dark:text-gray-100 border-transparent focus:outline-none hover:text-indigo-700 focus:bg-indigo-700 focus:text-white"
                    href="javascript: void(0)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-compass"
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
                      <polyline points="8 16 10 10 16 8 14 14 8 16" />
                      <circle cx={12} cy={12} r={9} />
                    </svg>
                  </a>
                </li>
                <li className="cursor-pointer text-sm leading-3 tracking-normal flex items-center justify-center">
                  <a
                    className="p-3 border text-gray-800 dark:text-gray-100 border-transparent hover:text-indigo-700 focus:bg-indigo-700 focus:text-white"
                    href="javascript: void(0)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-code"
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
                      <polyline points="7 8 3 12 7 16" />
                      <polyline points="17 8 21 12 17 16" />
                      <line x1={14} y1={4} x2={10} y2={20} />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="w-full bg-white dark:bg-gray-800 border-l border-gray-300 dark:border-gray-200">
                <h4 className="pl-10 w-full text-sm text-gray-800 dark:text-gray-100 py-3 bg-gray-100">
                  Software Development Project
                </h4>
                <div className="bg-white dark:bg-gray-800 px-8 py-6">
                  <div className="flex items-start">
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Owner
                      </p>
                      <h5 className="text-gray-800 dark:text-gray-100 font-normal text-xs">
                        Jason Smith
                      </h5>
                    </div>
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Type
                      </p>
                      <h5 className="text-gray-800 dark:text-gray-100 font-normal text-xs">
                        Development
                      </h5>
                    </div>
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Time Spent
                      </p>
                      <h5 className="text-gray-800 dark:text-gray-100 font-normal text-xs">
                        1440 Hours, 45 Mins
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-start mt-6">
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Project
                      </p>
                      <h5 className="text-gray-800 dark:text-gray-100 font-normal text-xs">
                        Create new features for the app
                      </h5>
                    </div>
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Priority
                      </p>
                      <h5 className="text-gray-800 dark:text-gray-100 font-normal text-xs">
                        High
                      </h5>
                    </div>
                    <div className="w-1/3">
                      <p className="text-gray-600 dark:text-gray-400 font-normal text-xs">
                        Incharge officer(s)
                      </p>
                      <h5 className="text-indigo-700 font-normal text-xs">
                        Saul Berenson &amp; Nicholas Brody
                      </h5>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300 dark:border-gray-200 w-full" />
                  <h5 className="text-gray-600 dark:text-gray-400 text-xs mb-2 font-bold">
                    Message
                  </h5>
                  <p className="text-gray-800 dark:text-gray-100 font-normal text-xs w-3/5 leading-6">
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes,
                    or avoids pleasure itself, because it is pleasure, but
                    because those who do not know how to pursue pleasure
                    rationally encounter consequences that are extremely painful
                  </p>
                  <h5 className="text-indigo-700 text-xs mb-2 mt-12 font-bold">
                    Recommended Action
                  </h5>
                  <p className="text-gray-800 dark:text-gray-100 font-normal text-xs w-3/5 leading-6">
                    But I must explain to you how all this mistaken idea of
                    denouncing pleasure and praising pain was born and I will
                    give you a complete account of the system, and expound the
                    actual teachings of the great explorer of the truth, the
                    master-builder of human happiness. No one rejects, dislikes,
                    or avoids pleasure itself, because it is pleasure, but
                    because those who do not know how to pursue pleasure
                    rationally encounter consequences that are extremely painful
                  </p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
      {/* detail row ends */}
    </>
  );
}
