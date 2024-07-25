"use client";

import {  useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// to eliminate the not updating of link pasting of different organization url
export default function OrgControl() {
  const { organizationId } = useParams();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (!setActive) return;
    setActive({
      organization: organizationId as string,
    });
  }, [setActive, organizationId]);
  return null;
}
