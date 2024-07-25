"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/card-modal";
import ProModal from "../modals/pro-modal";

export default function ModalProvider() {
  // hydration error prevention
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}
