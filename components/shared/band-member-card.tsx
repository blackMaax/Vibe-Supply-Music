"use client"
import LuxuryCard from "@/components/ui/luxury-card"

interface BandMemberCardProps {
  name: string
  role: string
  bio: string
  imageSrc: string
  index: number
}

const BandMemberCard = ({ name, role, bio, imageSrc, index }: BandMemberCardProps) => {
  return <LuxuryCard variant="band-member" name={name} role={role} bio={bio} imageSrc={imageSrc} index={index} />
}

export default BandMemberCard
