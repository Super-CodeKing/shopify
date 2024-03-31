import { Divider, Icon, Button } from "@shopify/polaris";
import { useNavigate, useNavigationHistory } from "@shopify/app-bridge-react";
import React, { useState } from "react";
import {
    OrderIcon,
    IncomingIcon,
    EnvelopeIcon,
    QuestionCircleIcon,
    HomeIcon,
} from "@shopify/polaris-icons";

const Navbar = ({ title }) => {
    const { push } = useNavigationHistory();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuList = [
        {
            path: "",
            title: "Home",
            header: "Dashboard",
            icon: HomeIcon,
        },
        {
            path: "preorder",
            title: "Pre Order",
            header: "Pre Order: Settings",
            icon: OrderIcon,
        },
        {
            path: "comingsoon",
            title: "Coming Soon",
            header: "Coming Soon: Settings",
            icon: IncomingIcon,
        },
        {
            path: "requeststock",
            title: "Request Stock",
            header: "Request Stock: Settings",
            icon: EnvelopeIcon,
        },
    ];

    const othersMenuList = [
        {
            path: "help",
            title: "Help",
            header: "Help",
            icon: QuestionCircleIcon,
        },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (page) => {
        console.log(page);
        // const isFreeUser = false;
        // const menus = menuList.concat(othersMenuList);
        // const isPremium = menus.find((m) => m.path == page)?.premium;

        // if (isPremium && isFreeUser) {
        //     push({ pathname: "/priceplan" });
        //     navigate("/priceplan");
        // } else {
        push({ pathname: "/" + page });
        navigate("/" + page);
        // }
    };

    console.log(location.pathname);

    return (
        <>
            <nav className="px-4 py-2">
                <div className="mx-auto sm:px-2 md:px-4 lg:px-4 flex justify-between items-center">
                    <div className="flex-shrink-0">
                        <span className="font-bold text-lg">{title}</span>
                    </div>

                    <div className="hidden sm:flex justify-center items-center space-x-4">
                        <ul className="flex space-x-4">
                            {menuList &&
                                menuList.map((item) => {
                                    return <li
                                        key={item.path}
                                        className={`flex items-center cursor-pointer ${
                                            location.pathname === '/' + item.path ? 'shadow px-2 bg-white py-1 rounded' : ''}`}
                                        onClick={() => handleMenuClick(item.path)}
                                    >
                                        <Icon source={item.icon} />
                                        <span className="font-medium">
                                            {item.title}
                                        </span>
                                    </li>;
                                })}
                        </ul>
                    </div>

                    <div className="flex sm:hidden">
                        <button onClick={toggleMobileMenu}>
                            <svg
                                className="block h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden md:block">
                        {othersMenuList.map((item) => {
                            return (
                                <Button variant="primary">
                                    {item.title}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="sm:hidden mt-4">
                        <div className="flex flex-col space-y-2 text-left">
                            {menuList.map((item) => {
                                return (
                                    <button
                                        className={`flex items-start mr-auto ${
                                            location.pathname === item.path ? 'shadow px-2 bg-white py-1 rounded' : ''}`}
                                        onClick={() =>
                                            handleMenuClick(item.path)
                                        }
                                    >
                                        <Icon source={item.icon} />
                                        <span className="font-medium ml-1">
                                            {item.title}
                                        </span>
                                    </button>
                                );
                            })}
                            {othersMenuList.map((item) => {
                                return (
                                    <button className="flex items-start mr-auto">
                                        <Icon source={item.icon} />
                                        <span className="font-medium ml-1">
                                            {item.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>
            <Divider />
        </>
    );
};

export default Navbar;
