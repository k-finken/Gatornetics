import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="p-4 shadow mt-20">
      <div className="flex mb-4 justify-center">
        <Link href="/">
          <h2 className="text-2xl font-bold text-white hover:text-blue-600 cursor-pointer">
            Gatornetics
          </h2>
        </Link>
      </div>
      <div className="flex justify-center">
        <ul className="flex mb-2 text-sm text-gray-400">
          <li className="mx-2 hover:underline md:mx-3">
            <Link href="/signUp">
              Sign In
            </Link>
          </li>
          <li className="mx-2 hover:underline md:mx-3">
            <Link href="/faq">
              FAQs
            </Link>
          </li>
          <li className="mx-2 hover:underline md:mx-3">
            <Link href="/machine-learning">
              ML Analysis
            </Link>
          </li>
        </ul>
      </div>
      <div className="block text-sm text-gray-500 text-center">
        © 2022{" "}
        <Link href="/">
          <span className="hover:underline cursor-pointer">Gatornetics</span>
        </Link>
        . All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
