import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const HoverHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: string) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => setMenuOpen(menu), 100);
  };

  const handleMouseLeave = () => {
    setMenuOpen(null); 
  };

  const handleClickInside = (menu: string) => {
    setMenuOpen((prevMenu) => (prevMenu === menu ? null : menu)); 
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".menu") && !target.closest(".header-item")) {
      setMenuOpen(null); 
    }
  };

  const handleSubmenuClick = (path: string) => {
    console.log("Navigating to:", path);
    router.push(path); 
    setMenuOpen(null); 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current); 
    };
  }, []);

  const menuItems = [
    { label: "Home", key: "home" },
    {
      label: "Master",
      key: "master",
      submenu: [
        { label: "Category", path: "/category" },
        { label: "Sub Category", path: "/subCategory" },
        { label: "Chowkri", path: "/chowkri" },
        { label: "Account", path: "/account" },
        { label: "Connection Size (MM)", path: "/connectionSize" },
        { label: "Consumption Slab", path: "/consumptionSlab" },
        { label: "Meter Status", path: "/meterStatus" },
        { label: "Type of Charges", path: "/typeCharges" },
        { label: "CIN", path: "/cin" },
        { label: "Own/Private Water Supply", path: "/ownPrivateSupply" },
        { label: "Type of Connection", path: "/typeConnection" },
        { label: "Type of Property", path: "/typeProperty" },
        { label: "Supply Zone", path: "/supplyZone" },
        { label: "Payment head v/s budget head master", path: "/paymentBudget" },
      ],
    },
    { label: "Tariff Configuration", key: "tariffConfiguration", submenu: [{ label: "Configure", path: "/configure" }, { label: "Configured Tariff", path: "/configuredTariff" }] },
    { label: "Add Consumers", key: "addConsumers", submenu: [{ label: "Single", path: "/addSingleConsumer" }, { label: "Bulk", path: "/addBulkConsumer" }] },
    { label: "Reading Sheet / Binder Mgt.", key: "ReadingSheet", submenu: [{ label: "Reading Sheets", path: "/readingSheetForm" }, { label: "Binders", path: "/binderMapping" }] },
    { label: "Billing", key: "billing", submenu: [{ label: "Upload Transactional Data", path: "/bill" }, "Publish bill"] },
    { label: "Billing Agency", key: "billingAgency", submenu: [{ label: "Registration", path: "/billAgencyEnrollment" }] },
    { label: "Bill Payment Receipt", key: "billPaymentReceipt" },
    { label: "Reports", key: "reports" },
  ];

  return (
    <div   onMouseLeave={handleMouseLeave} className="relative flex items-center justify-evenly bg-gray-800 p-4 text-white">
      {menuItems.map((item) => (
        <div
          key={item.key}
          className="relative menu"
        >
          <span
            className="header-item mx-4 cursor-pointer text-xl"
            onMouseEnter={() => handleMouseEnter(item.key)} 
            onClick={() => handleClickInside(item.key)} 
          >
            {item.label}
          </span>

          {menuOpen === item.key && item.submenu && (
            <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-md bg-gray-800 shadow-lg">
              <ul className="list-none p-2">
                {item.submenu.map((subItem, index) => (
                  typeof subItem === "string" ? (
                    <li
                      key={index}
                      className="cursor-pointer p-2 transition-colors duration-200 hover:bg-gray-600 rounded-md"
                      onClick={() => {
                        const path = `/path/${subItem.toLowerCase().replace(/ /g, "-")}`;
                        handleSubmenuClick(path); 
                      }}
                    >
                      {subItem}
                    </li>
                  ) : (
                    <li
                      key={index}
                      className="cursor-pointer p-2 transition-colors duration-200 hover:bg-gray-600 rounded-md"
                      onClick={() => handleSubmenuClick(subItem.path)} 
                    >
                      {subItem.label}
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoverHeader;
