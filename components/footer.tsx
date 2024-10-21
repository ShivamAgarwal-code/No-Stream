import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="py-14 bg-white border-t border-slate-100">
            <div className="max-w-screen-xl mx-auto px-5">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    <div className="sm:col-span-2 md:col-span-3 lg:col-span-3">
                        <Link href="/" className="text-lg flex items-center">
                            <span className="font-bold text-primary">NOBANANAS</span>
                            <span className="uppercase mt-0.5 leading-none text-[10px] ml-1 font-bold bg-gray-200 text-slate-700 px-2 py-1 rounded-md">
                                PRO
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-700 max-w-xs">
                            No Bananas is a decentralized video streaming platform that allows
                            user to have a fun and safe streaming experience.
                        </p>
                        <div className="flex gap-3 mt-4 items-center">
                            <a
                                href="https://twitter.com/surjithctly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                    astro-icon="bx:bxl-twitter"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
                                    ></path>
                                </svg>
                                <span className="sr-only">Twitter or X</span>
                            </a>

                            <a
                                href="https://linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-200 hover:bg-slate-300 rounded w-6 h-6 inline-flex items-center justify-center text-slate-500"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-4 h-4"
                                    astro-icon="bx:bxl-linkedin-square"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
                                    ></path>
                                </svg>
                                <span className="sr-only">Linkedin</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-slate-800">About</h3>
                        <div className="flex flex-col mt-3">
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                About Us
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Opportunities
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Blog
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Contact
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-medium text-sm text-slate-800">Resources</h3>
                        <div className="flex flex-col mt-3">
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Help Center
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Guides
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Documentation
                            </a>
                            <a
                                href="#"
                                className="py-2 text-sm text-darkGray hover:text-primary"
                            >
                                Application Status
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
