import Image from "next/image";
import React, { useState } from "react";
import { Button, Page, Modal, Nav } from "./index";
import Link from "next/link";
import { TypewriterEffectSmoothDemo } from "./home/TypewriterEffectSmoothDemo";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [onInputChange, setOnInputChange] = useState("");
  return (
    <>
      <section id="home" className="relative pt-32 pb-24 sm:py-16 lg:pt-44 lg:pb-32 bg-white md:max-w-6xl md:mx-auto md:px-0 px-6">
        <div className="w-full mx-auto sm:px-6 lg:px-0 flex">
          <div className="flex flex-col-reverse md:flex-row mx-auto lg:items-center gap-y-12 lg:gap-x-8">
            <div className="">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-sans font-medium leading-tight text-black sm:text-5xl sm:leading-tight lg:leading-tight lg:text-5xl font-sams">
                  Bringing back fun, safe, livestreams with{' '}
                  <span
                    style={{ color: "#FFA800" }}
                  >
                    N
                    <span className="md:hidden">
                      o
                    </span>
                    <span className="hidden md:inline-block md:text-5xl">
                      🚫
                    </span>
                    {' '}Bananas 🍌
                  </span>
                </h1>
                {/* <TypewriterEffectSmoothDemo /> */}
                <p className="hidden md:block mt-2 md:text-lg text-gray-400 sm:mt-4 font-sans">
                  No Bananas is a safe and fun way to enjoy live streams with
                  friends and family. Start your own live stream today!
                </p>
              </div>
              <div className="mt-4 md:mt-8 text-center lg:text-left flex gap-2">
                <Link
                  href="/create"
                  className="bg-primary border-primary text-background md:px-10 py-3 md:py-4 hover:border-primary hover:text-primary hover:bg-background w-full md:w-1/2 text-sm md:text-base rounded-xl text-center transition-all duration-300 hover:scale-95"
                >
                  Start Now
                </Link>
                <Button
                  onClick={() => setShowModal(true)}
                  className="border-primary md:px-10 py-3 md:py-4 text-primary hover:bg-primary hover:text-background w-full text-sm md:text-base ransition-all duration-300 hover:scale-95"
                >
                  Live stream
                </Button>
              </div>
            </div>
            <div className="">
              <Image
                className="object-cover"
                src="/assets/BANANA2.gif"
                width={1500}
                height={1500}
                alt="banana"
              />
            </div>
          </div>
        </div>
      </section>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onInputChange={(e) => setOnInputChange(e.target.value)}
          onSubmit={() => {
            window.location.href = `/watch/${onInputChange}`;
          }}
        />
      )}
    </>
  );
}
