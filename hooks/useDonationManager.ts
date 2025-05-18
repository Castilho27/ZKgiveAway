"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/lib/web3/abi.json";

const CONTRACT_ADDRESS = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

export function useDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      try {
        if (typeof window.ethereum === "undefined") return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
        const count = await contract.donationCount();
        const arr = [];
        for (let i = 1; i <= Number(count); i++) {
          const d = await contract.donations(i);
          if (d.exists) {
            arr.push({
              id: i,
              title: d.title,
              description: d.description,
              imageUrl: d.imageUrl,
              suggestedAmount: ethers.formatEther(d.suggestedAmount),
              totalReceived: ethers.formatEther(d.totalReceived),
            });
          }
        }
        setDonations(arr);
      } catch (e) {
        setDonations([]);
      }
      setLoading(false);
    }
    fetchDonations();
  }, []);

  return { donations, loading };
}