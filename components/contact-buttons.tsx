"use client"

import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Phone, ExternalLink } from "lucide-react"

export function ContactButtons() {
  const handleEmailClick = () => {
    const subject = encodeURIComponent("Portfolio Inquiry")
    const body = encodeURIComponent(
      "Hi Anand,\n\nI came across your portfolio and would like to connect.\n\nBest regards,",
    )
    window.location.href = `mailto:anandvb2013@gmail.com?subject=${subject}&body=${body}`
  }

  const handleLinkedInClick = () => {
    // Replace with actual LinkedIn profile URL
    window.open("https://www.linkedin.com/in/anandvb/", "_blank", "noopener,noreferrer")
  }

  const handlePhoneClick = () => {
    window.location.href = "tel:+917012623112"
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
      <Button
        onClick={handleEmailClick}
        variant="outline"
        className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 px-8 py-3 group transition-all duration-300"
      >
        <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
        <span>anandvb2013@gmail.com</span>
        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      <Button
        onClick={handleLinkedInClick}
        variant="outline"
        className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 px-8 py-3 group transition-all duration-300"
      >
        <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
        <span>LinkedIn Profile</span>
        <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      <Button
        onClick={handlePhoneClick}
        variant="outline"
        className="border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400 px-6 py-3 group transition-all duration-300"
      >
        <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
        <span>Call Me</span>
      </Button>
    </div>
  )
}
