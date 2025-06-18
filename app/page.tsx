"use client"

import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { MapPin, ArrowRight, Calendar, Award } from "lucide-react"
import { ScrollProgress } from "@/components/scroll-progress"
import { ParallaxSection } from "@/components/parallax-section"
import { AnimatedSection } from "@/components/animated-section"
import { SmoothNavigation } from "@/components/smooth-navigation"
import { StaggeredList } from "@/components/staggered-list"
import { ScrollResponsive3D } from "@/components/scroll-responsive-3d"
import { AdaptiveBackdrop } from "@/components/adaptive-backdrop"
import { HireMeButton } from "@/components/hire-me-button"
import { ContactButtons } from "@/components/contact-buttons"
import { ThemeToggle } from "@/components/theme-toggle"
import { AudioController } from "@/components/audio-controller"

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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <ScrollProgress />
      <ScrollResponsive3D />
      <AdaptiveBackdrop />
      <ThemeToggle />
      <AudioController />
      <HireMeButton />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <AnimatedSection animation="slide" className="text-sm font-medium tracking-wider">
              ANAND V BALAGOPALAN
            </AnimatedSection>
            <SmoothNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <ParallaxSection speed={0.3}>
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="scale" delay={200}>
              <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-8 text-foreground">ANAND</h1>
            </AnimatedSection>
            <AnimatedSection animation="fade" delay={400}>
              <div className="w-24 h-px bg-border mx-auto mb-8"></div>
            </AnimatedSection>
            <AnimatedSection animation="slide" delay={600}>
              <p className="text-xl md:text-2xl font-light text-muted-foreground mb-4">
                Senior Software Engineer & Frontend Lead
              </p>
            </AnimatedSection>
            <AnimatedSection animation="fade" delay={800}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Six years crafting digital experiences with React, TypeScript, and modern web technologies. Currently
                leading frontend development at QBurst Technologies.
              </p>
            </AnimatedSection>
          </div>
        </ParallaxSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection animation="slide">
              <div>
                <h2 className="text-3xl font-light mb-8 tracking-tight">About</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I specialize in building scalable enterprise applications and leading development teams. My expertise
                  spans the full frontend ecosystem, from React and TypeScript to modern build tools and testing
                  frameworks.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  With a proven track record in test-driven development and agile methodologies, I focus on delivering
                  high-quality solutions that drive business value.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
            </AnimatedSection>
            <AnimatedSection animation="slide" delay={200}>
              <div>
                <h3 className="text-xl font-light mb-6 tracking-tight">Core Technologies</h3>
                <StaggeredList staggerDelay={50}>
                  {skills.map((skill, index) => (
                    <div key={skill} className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-foreground">{skill}</span>
                      <span className="text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  ))}
                </StaggeredList>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Experience Section */}
      <section id="experience" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade">
            <h2 className="text-3xl font-light mb-16 tracking-tight">Experience</h2>
          </AnimatedSection>
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <AnimatedSection key={index} animation="slide" delay={index * 200}>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="text-sm text-muted-foreground mb-2">{exp.period}</div>
                    <div className="text-sm text-muted-foreground">{exp.location}</div>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-light mb-2 tracking-tight">{exp.title}</h3>
                    <div className="text-lg text-muted-foreground mb-2">{exp.subtitle}</div>
                    <div className="text-muted-foreground mb-6">{exp.company}</div>
                    <p className="text-muted-foreground leading-relaxed mb-6">{exp.description}</p>
                    <StaggeredList staggerDelay={100}>
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start">
                          <ArrowRight className="w-4 h-4 mr-3 mt-1 text-muted-foreground flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{highlight}</span>
                        </div>
                      ))}
                    </StaggeredList>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Projects Section */}
      <section id="projects" className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade">
            <h2 className="text-3xl font-light mb-16 tracking-tight">Selected Projects</h2>
          </AnimatedSection>
          <div className="space-y-12">
            {projects.map((project, index) => (
              <AnimatedSection key={index} animation="slide" delay={index * 150}>
                <div className="group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-light tracking-tight group-hover:text-muted-foreground transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 leading-relaxed">{project.description}</p>
                    </div>
                    <div className="text-sm text-muted-foreground ml-8 flex-shrink-0">{project.period}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="text-xs text-muted-foreground border border-border px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="w-full h-px bg-border group-hover:bg-muted-foreground transition-colors"></div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Education & Certifications */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            <AnimatedSection animation="slide">
              <div>
                <h2 className="text-3xl font-light mb-8 tracking-tight">Education</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-light">Bachelor of Computer Applications</h3>
                    <div className="text-muted-foreground">CMS College, Kottayam</div>
                    <div className="text-sm text-muted-foreground">2016 — 2019</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-light">Higher Secondary Education</h3>
                    <div className="text-muted-foreground">St. Mary's Higher Secondary School</div>
                    <div className="text-sm text-muted-foreground">2014 — 2016</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide" delay={200}>
              <div>
                <h2 className="text-3xl font-light mb-8 tracking-tight">Certifications</h2>
                <StaggeredList staggerDelay={75}>
                  {[
                    "React.js Advanced Concepts",
                    "TypeScript for Developers",
                    "Agile Development Methodologies",
                    "Web Performance Optimization",
                    "Test-Driven Development",
                  ].map((cert) => (
                    <div key={cert} className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-foreground text-sm">{cert}</span>
                      <Award className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </StaggeredList>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Separator className="bg-border" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fade">
            <h2 className="text-3xl font-light mb-8 tracking-tight">Let's Connect</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              I'm always interested in discussing new opportunities and innovative projects. Feel free to reach out if
              you'd like to collaborate.
            </p>
          </AnimatedSection>
          <AnimatedSection animation="scale" delay={300}>
            <ContactButtons />
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
              <div>© 2024 Anand V Balagopalan</div>
              <div className="mt-4 md:mt-0">
                <span>Built with React, TypeScript & Tailwind CSS</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  )
}
