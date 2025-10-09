export default function ShowcaseApp() {
  const projects = [
    {
      title: "Project Alpha",
      description: "A revolutionary web application built with modern technologies.",
      tech: "React, TypeScript, Next.js",
    },
    {
      title: "Project Beta",
      description: "An innovative solution for real-time collaboration.",
      tech: "WebSockets, Node.js, MongoDB",
    },
    {
      title: "Project Gamma",
      description: "A beautiful portfolio website with stunning animations.",
      tech: "Three.js, GSAP, Tailwind CSS",
    },
  ]

  return (
    <div className="p-4 font-sans">
      <h1 className="text-xl font-bold mb-4 text-[#000080]">My Portfolio</h1>
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="win98-outset p-3 bg-[#c0c0c0]">
            <h2 className="font-bold text-sm mb-2">{project.title}</h2>
            <p className="text-xs mb-2">{project.description}</p>
            <div className="text-xs text-[#808080]">
              <strong>Technologies:</strong> {project.tech}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
