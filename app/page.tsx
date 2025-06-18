"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, Linkedin, MapPin, ArrowRight, Calendar, Award } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")

  const skills = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Redux Toolkit",
    "Next.js",
    "Vue.js",
    "Material-UI",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "AWS",
    "Docker",
  ]

  const experiences = [
    {
      title: "Senior Software Engineer",
      subtitle: "Frontend Lead",
      company: "QBurst Technologies",
      location: "Kochi, Kerala",
      period: "2022 — Present",
      description:
        "Leading frontend development for enterprise applications, mentoring developers, and architecting scalable React.js solutions.",
      highlights: [
        "Lead development for 5+ enterprise applications",
        "Mentor team of 4 junior developers",
        "Achieved 90% test coverage implementation",
        "Optimized performance by 40%",
      ],
    },
    {
      title: "Software Development Engineer",
      subtitle: "Frontend Developer & SDET",
      company: "Infosys Limited",
      location: "Bangalore, Karnataka",
      period: "2019 — 2023",
      description:
        "Developed internal tools and client applications while creating comprehensive automated test suites.",
      highlights: [
        "Built responsive frontend interfaces",
        "Created automated test suites",
        "Developed RESTful APIs with Flask",
        "Achieved 95% client satisfaction",
      ],
    },
  ]

  const projects = [
    {
      title: "Digital Management System",
      period: "2024",
      description: "Comprehensive client portal for contract management and data processing",
      tech: ["React.js", "TypeScript", "Material-UI", "Vite"],
    },
    {
      title: "AI Resume Parser",
      period: "2024",
      description: "Intelligent UI for AI-driven resume parsing and job matching",
      tech: ["React.js", "Redux Toolkit", "Web Workers"],
    },
    {
      title: "Cryptocurrency Converter",
      period: "Personal",
      description: "Real-time crypto conversion with MetaMask integration",
      tech: ["React.js", "Web3.js", "CoinMarketCap API"],
    },
  ]

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/80 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium tracking-wider">ANAND V BALAGOPALAN</div>
            <div className="hidden md:flex space-x-8 text-sm">
              {["About", "Experience", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveSection(item.toLowerCase())}
                  className={`hover:text-stone-600 transition-colors ${
                    activeSection === item.toLowerCase() ? "text-stone-900" : "text-stone-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 text-stone-900">ANAND</h1>
          <div className="w-24 h-px bg-stone-300 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl font-light text-stone-600 mb-4">Senior Software Engineer & Frontend Lead</p>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Six years crafting digital experiences with React, TypeScript, and modern web technologies. Currently
            leading frontend development at QBurst Technologies.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light mb-8 tracking-tight">About</h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                I specialize in building scalable enterprise applications and leading development teams. My expertise
                spans the full frontend ecosystem, from React and TypeScript to modern build tools and testing
                frameworks.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                With a proven track record in test-driven development and agile methodologies, I focus on delivering
                high-quality solutions that drive business value.
              </p>
              <div className="flex items-center space-x-4 text-sm text-stone-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Kottayam, Kerala
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Available Immediately
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-light mb-6 tracking-tight">Core Technologies</h3>
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={skill} className="flex items-center justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-700">{skill}</span>
                    <span className="text-xs text-stone-400">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-stone-200" />

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-16 tracking-tight">Experience</h2>
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <div key={index} className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="text-sm text-stone-500 mb-2">{exp.period}</div>
                  <div className="text-sm text-stone-500">{exp.location}</div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-2xl font-light mb-2 tracking-tight">{exp.title}</h3>
                  <div className="text-lg text-stone-600 mb-2">{exp.subtitle}</div>
                  <div className="text-stone-500 mb-6">{exp.company}</div>
                  <p className="text-stone-600 leading-relaxed mb-6">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-3 mt-1 text-stone-400 flex-shrink-0" />
                        <span className="text-stone-600 text-sm">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-stone-200" />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light mb-16 tracking-tight">Selected Projects</h2>
          <div className="space-y-12">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-light tracking-tight group-hover:text-stone-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-stone-600 mt-2 leading-relaxed">{project.description}</p>
                  </div>
                  <div className="text-sm text-stone-500 ml-8 flex-shrink-0">{project.period}</div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs text-stone-500 border border-stone-200 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="w-full h-px bg-stone-200 group-hover:bg-stone-300 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-stone-200" />

      {/* Education & Certifications */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light mb-8 tracking-tight">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-light">Bachelor of Computer Applications</h3>
                  <div className="text-stone-600">CMS College, Kottayam</div>
                  <div className="text-sm text-stone-500">2016 — 2019</div>
                </div>
                <div>
                  <h3 className="text-lg font-light">Higher Secondary Education</h3>
                  <div className="text-stone-600">St. Mary's Higher Secondary School</div>
                  <div className="text-sm text-stone-500">2014 — 2016</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-light mb-8 tracking-tight">Certifications</h2>
              <div className="space-y-3">
                {[
                  "React.js Advanced Concepts",
                  "TypeScript for Developers",
                  "Agile Development Methodologies",
                  "Web Performance Optimization",
                  "Test-Driven Development",
                ].map((cert, index) => (
                  <div key={cert} className="flex items-center justify-between py-2 border-b border-stone-200">
                    <span className="text-stone-700 text-sm">{cert}</span>
                    <Award className="w-4 h-4 text-stone-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="bg-stone-200" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8 tracking-tight">Let's Connect</h2>
          <p className="text-stone-600 mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities and innovative projects. Feel free to reach out if
            you'd like to collaborate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              anandvb2013@gmail.com
            </Button>
            <Button variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-100 px-8 py-3">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Profile
            </Button>
          </div>
          <div className="mt-8 text-sm text-stone-500">
            <div className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              +91 7012623112
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-stone-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <div>© 2024 Anand V Balagopalan</div>
            <div className="mt-4 md:mt-0">
              <span>Built with React, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
