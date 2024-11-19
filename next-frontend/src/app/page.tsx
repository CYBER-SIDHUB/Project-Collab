'use client';

// import { useEffect, useState } from "react";
// import API from "../utils/api";

// export default function Home() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     API.get("/")
//       .then((response) => {
//         setMessage(response.data.message);
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return <h1>{message}</h1>;
// }

import { redirect } from "next/navigation";

export default function Home() {
  // Automatically redirect to the login page
  redirect("/login");
}

