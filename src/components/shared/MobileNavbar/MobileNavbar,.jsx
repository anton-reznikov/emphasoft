import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerDescription,
} from "../../ui/drawer";

import Navbar from "../Navbar/Navbar";
const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? null : (
        <Drawer open={open} onOpenChange={setOpen} direction="left">
          <DrawerTrigger className="focus:outline-none">
            <HamburgerMenuIcon className="text-white w-7 h-7" />
          </DrawerTrigger>
          <DrawerContent className="bg-amber-50 w-3/5 h-full">
            <DrawerHeader className="block absolute top-3 right-3 h-5 p-0">
              <Cross1Icon onClick={() => setOpen(false)} />
            </DrawerHeader>
            <DrawerDescription asChild className="paddings">
              <Navbar setOpen={setOpen} />
            </DrawerDescription>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default MobileNavbar;
