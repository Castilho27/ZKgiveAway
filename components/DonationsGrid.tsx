"use client";
import { ProjectCard } from "@/components/project-card";
import { useDonations } from "@/hooks/useDonationManager";

export default function DonationsGrid() {
  const { donations, loading } = useDonations();

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {loading && <div>Carregando doações...</div>}
      {!loading && donations.length === 0 && <div>Nenhuma doação encontrada.</div>}
      {donations.map((donation) => (
        <ProjectCard
          key={donation.id}
          title={donation.title}
          description={donation.description}
          image={donation.imageUrl}
          category="Doação Blockchain"
          goal={Number(donation.suggestedAmount)}
          raised={Number(donation.totalReceived)}
        />
      ))}
    </div>
  );
}