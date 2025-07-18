"use client";

import { useUser } from "@clerk/clerk-react";
import { SignOutButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./common/Logo";
import { UserNav } from "./common/UserNav";

type NavigationItem = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: "Map", href: "/", current: true },
  { name: "My Account", href: "#", current: false },
];

interface HeaderProps {
  onStatsClick?: () => void;
}

export default function Header({ onStatsClick }: HeaderProps) {
  const { user } = useUser();
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className=" ">
      {({ open }) => (
        <>
          <div className="flex items-center bg-[#f5f7fa] border-b border-[#dbe4ea] h-16 sm:h-20">
            <div className="container px-2 sm:px-0">
              <div className="relative flex h-16 items-center justify-between w-full px-6">
                <div className="flex sm:hidden shrink-0 items-center">
                  <Logo isMobile={true} />
                </div>
                <div className="sm:flex hidden shrink-0 items-center">
                  <Logo />
                </div>
                <div className="flex flex-1 items-center justify-center ">
                  <div className="hidden sm:ml-6 sm:block">
                    <ul className="flex space-x-8">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          {item.name === "My Account" ? (
                            user ? (
                              <Link
                                href="/stats"
                                className="text-[#3a4a5d] text-center text-xl not-italic font-normal leading-[normal] hover:text-[#4a90e2] transition-colors"
                              >
                                {item.name}
                              </Link>
                            ) : (
                              onStatsClick ? (
                                <button
                                  onClick={onStatsClick}
                                  className="text-[#3a4a5d] text-center text-xl not-italic font-normal leading-[normal] hover:text-[#4a90e2] transition-colors"
                                >
                                  {item.name}
                                </button>
                              ) : (
                                <span className="text-[#3a4a5d] text-center text-xl not-italic font-normal leading-[normal]">{item.name}</span>
                              )
                            )
                          ) : (
                            <Link
                              href={item.href}
                              className="text-[#3a4a5d] text-center text-xl not-italic font-normal leading-[normal]"
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {user ? (
                  <div className="hidden sm:flex absolute inset-y-0 right-0 gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <SignOutButton>
                      <button
                        type="button"
                        className="px-6 py-2 bg-[#4a90e2] text-white rounded font-semibold hover:bg-[#357ab8] transition text-xl not-italic font-montserrat"
                      >
                        Log Out
                      </button>
                    </SignOutButton>
                    <div className="flex items-center gap-2">
                      <UserNav
                        image={user?.imageUrl}
                        name={user?.fullName || "User"}
                        email={user?.primaryEmailAddress?.emailAddress || ""}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:flex absolute inset-y-0 right-0 gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <SignInButton mode="modal">
                      <button className="px-6 py-2 bg-[#4a90e2] text-white rounded font-semibold hover:bg-[#357ab8] transition text-xl not-italic font-montserrat">
                        Sign in
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-6 py-2 bg-[#f5a623] text-white rounded font-semibold hover:bg-[#e94e77] transition text-xl not-italic font-montserrat">
                        Get Started
                      </button>
                    </SignUpButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col gap-3 items-start">
              {navigation.map((item) => (
                item.name === "My Account" ? (
                  user ? (
                    <DisclosureButton
                      key={item.name}
                      as={Link}
                      href="/stats"
                      className="text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal] hover:text-[#4a90e2] transition-colors"
                    >
                      {item.name}
                    </DisclosureButton>
                  ) : (
                    onStatsClick ? (
                      <DisclosureButton
                        key={item.name}
                        as="button"
                        onClick={onStatsClick}
                        className="text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal] hover:text-[#4a90e2] transition-colors"
                      >
                        {item.name}
                      </DisclosureButton>
                    ) : (
                      <DisclosureButton
                        key={item.name}
                        as="span"
                        className="text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal]"
                      >
                        {item.name}
                      </DisclosureButton>
                    )
                  )
                ) : (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className="text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal]"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </DisclosureButton>
                )
              ))}
              <div className="flex gap-6 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ml-8">
                <SignInButton mode="modal">
                  <button className="border rounded-lg border-solid border-[#2D2D2D] text-[#2D2D2D] text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-5 py-[5px]">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="text-white text-center text-xl not-italic font-normal leading-[normal] font-montserrat px-5 py-1.5 button">
                    Get Started
                  </button>
                </SignUpButton>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
