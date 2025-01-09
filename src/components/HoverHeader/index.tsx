import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HoverHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [submenuHovered, setSubmenuHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false); // To track client-side rendering

  const router = useRouter(); // useRouter hook for navigation
  const pathname = usePathname(); // usePathname hook to get the current path
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Ensuring that useRouter is only called on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmenuClick = async (path: string) => {
    if (pathname === path) { // Using `pathname` for the current path
      return;
    }
    setIsLoading(true);
    router.push(path);
  };

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
        {
          label: "Payment head v/s budget head master",
          path: "/list/paymentBudget",
        },
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
      submenu: [{ label: "Upload Transactional Data", path: "/bill" }],
    },
    {
      label: "Billing Agency",
      key: "billingAgency",
      submenu: [{ label: "Registration", path: "/billAgencyList" }],
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
            <span
              className="header-item mx-4 cursor-pointer text-xl"
              onMouseEnter={() => handleMouseEnter(item.key)}
              onClick={() => {
                if (item.key === "home" && item.path) { // Check if item.path is defined
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
                <ul className="list-none p-2 space-y-2">
                  {item.submenu.map((subItem, index) => (
                    <Link
                      href={subItem.path}
                      key={index}
                      onMouseEnter={() => setSubmenuHovered(subItem.label)}
                      onMouseLeave={() => setSubmenuHovered(null)}
                      onClick={() => handleSubmenuClick(subItem.path)}
                    >
                      <div className={`flex p-2 ${submenuHovered === subItem.label ? "bg-gray-700" : ""}`}>
                        {subItem.label}
                      </div>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
        </div>
      )}

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
                      <li
                        key={index}
                        className="cursor-pointer py-2"
                        onClick={() => handleSubmenuClick(subItem.path)}
                      >
                        {subItem.label}
                      </li>
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
