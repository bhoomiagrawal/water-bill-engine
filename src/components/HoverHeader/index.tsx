import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const HoverHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
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
    setMenuOpen(null); // Close the menu after navigation
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileSubmenuToggle = (menu: string) => {
    setSubmenuOpen((prevMenu) => (prevMenu === menu ? null : menu));
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, []);

  const menuItems = [
    { label: "Home", key: "home", path: "/" },
    {
      label: "Master",
      key: "master",
      submenu: [
        { label: "Category", path: "/list/category" },
        { label: "Sub Category", path: "/list/subcategory" },
        { label: "Chowkri", path: "/list/chowkri" },
        { label: "Account", path: "/list/account" },
        { label: "Connection Size (MM)", path: "/list/connectionSize" },
        { label: "Consumption Slab", path: "/list/slab" },
        { label: "Meter Status", path: "/list/meterStatus" },
        { label: "Type of Charges", path: "/list/chargeType" },
        { label: "CIN", path: "/list/cin" },
        { label: "Own/Private Water Supply", path: "/list/ownPrivateSupply" },
        { label: "Type of Connection", path: "/list/connectionType" },
        { label: "Type of Property", path: "/list/typeProperty" },
        { label: "Supply Zone", path: "/list/supplyZone" },
        { label: "Payment head v/s budget head master", path: "/list/paymentBudget" },
      ],
    },
    {
      label: "Tariff Configuration",
      key: "tariffConfiguration",
      submenu: [
        { label: "Configure", path: "/tariffConfigure" },
        { label: "Configured Tariff", path: "/configuredTariff" },
      ],
    },
    {
      label: "Add Consumers",
      key: "addConsumers",
      submenu: [
        { label: "Single", path: "/addSingleConsumer" },
        { label: "Bulk", path: "/addBulkConsumer" },
      ],
    },
    {
      label: "Reading Sheet / Binder Mgt.",
      key: "ReadingSheet",
      submenu: [
        { label: "Reading Sheets", path: "/readingSheetForm" },
        { label: "Binders", path: "/binderMapping" },
      ],
    },
    {
      label: "Billing",
      key: "billing",
      submenu: [
        { label: "Upload Transactional Data", path: "/bill" },
        "Publish bill",
      ],
    },
    {
      label: "Billing Agency",
      key: "billingAgency",
      submenu: [
        { label: "Registration", path: "/list/billAgencyEnrollment" },
      ],
    },
    { label: "Bill Payment Receipt", key: "billPaymentReceipt" },
    { label: "Reports", key: "reports" },
  ];

  return (
    <div>
      {/* Desktop Menu */}
      <div
        onMouseLeave={handleMouseLeave}
        className="relative items-center justify-evenly bg-gray-800 p-4 text-white hidden md:flex"
      >
        {menuItems.map((item) => (
          <div key={item.key} className="relative menu">
            {/* Check if it's the "Home" label */}
            <span
              className="header-item mx-4 cursor-pointer text-xl"
              onMouseEnter={() => handleMouseEnter(item.key)}
              onClick={() => {
                if (item.key === "home") {
                  router.push(item.path);  
                } else {
                  handleClickInside(item.key);
                }
              }}
            >
              {item.label}
            </span>

            {/* Submenu */}
            {menuOpen === item.key && item.submenu && (
              <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-md bg-gray-800 shadow-lg">
                <ul className="list-none p-2">
                  {item.submenu.map((subItem, index) => (
                    typeof subItem === "string" ? (
                      <li
                        key={index}
                        className="cursor-pointer p-2 transition-colors duration-200 hover:bg-gray-600 rounded-md"
                        onClick={() => {
                          const path = `/path/${subItem
                            .toLowerCase()
                            .replace(/ /g, "-")}`;
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

      {/* Mobile Menu */}
      <div className="relative flex items-center justify-between bg-gray-800 p-4 text-white md:hidden">
        <button
          className="text-white text-3xl"
          onClick={handleMobileMenuToggle}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="bg-gray-800 p-4 text-white md:hidden">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key} className="py-2">
                <button
                  onClick={() => handleMobileSubmenuToggle(item.key)}
                  className="w-full text-left"
                >
                  {item.label}
                </button>

                {/* Submenu for Mobile */}
                {submenuOpen === item.key && item.submenu && (
                  <ul className="pl-4">
                    {item.submenu.map((subItem, index) => (
                      typeof subItem === "string" ? (
                        <li
                          key={index}
                          className="cursor-pointer py-2"
                          onClick={() => {
                            const path = `/path/${subItem
                              .toLowerCase()
                              .replace(/ /g, "-")}`;
                            handleSubmenuClick(path);
                          }}
                        >
                          {subItem}
                        </li>
                      ) : (
                        <li
                          key={index}
                          className="cursor-pointer py-2"
                          onClick={() => handleSubmenuClick(subItem.path)}
                        >
                          {subItem.label}
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HoverHeader;
