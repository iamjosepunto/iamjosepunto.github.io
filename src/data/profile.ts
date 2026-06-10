export type Project = {
  title: string;
  banner: string;
  repo: string;
  description: string;
  tech: string[];
};

export const PROFILE = {
  name: "Jose Punto",

  role:
    "Senior Full Stack Developer · Industrial Engineer · AI & Software Automation",

  about:
    "Industrial Engineer and Senior Full Stack Developer with more than 10 years of experience building web applications, REST APIs, mobile solutions and enterprise software.",

  socials: {
    email: "",
    linkedin: "https://www.linkedin.com/in/iamjosepunto",
    github: "https://github.com/iamjosepunto/iamjosepunto.github.io",
  },
};

export const SKILLS = [
  "C#",
  ".NET",
  "ASP.NET Core",
  "React",
  "TypeScript",
  "JavaScript",
  "SQL",
  "MongoDB",
  "Blazor",
  "Razor",
  "Unity",
  "PowerShell",
  "Git",
  "Tailwind CSS",
  "Vite",
  "ChatGPT",
  "Claude",
];

export const PROJECTS: Project[] = [
  {
    title: "Demo01",
    banner: "/demo01.png",
    repo: "",
    description:
      "Experimental Unity project focused on 2D rendering, layer management and interactive systems.",
    tech: ["Unity", "C#"],
  },

  {
    title: "Demo02",
    banner: "/demo02.png",
    repo: "",
    description:
      "Full Stack web application built with .NET, React and TypeScript.",
    tech: [".NET", "React", "TypeScript"],
  },

  {
    title: "Demo03",
    banner: "/demo03.png",
    repo: "",
    description:
      "REST API and backend services focused on scalability and maintainability.",
    tech: ["C#", ".NET", "SQL"],
  },

  {
    title: "Demo04",
    banner: "/demo04.png",
    repo: "",
    description:
      "Automation and productivity tools developed with PowerShell and .NET.",
    tech: ["PowerShell", ".NET"],
  },

  {
    title: "Demo05",
    banner: "/demo05.png",
    repo: "",
    description:
      "Artificial Intelligence experiments applied to software development workflows.",
    tech: ["AI", "ChatGPT", "Claude"],
  },
];