export type TaskRef = {
  code: string;
  key: string;
  dates: string;
  url?: string;
};

export type ProjectGroup = {
  empresa: string;
  empresaName: string;
  proyecto: string;
  proyectoKey: string;
  dates: string;
  tasks: TaskRef[];
};


export type ExperienceRef = {
  code: string;
  key: string;
  company: string;
  dates: string;
};

export const PROFILE = {
  name: "Jose Punto",

  role:
    "Senior Full Stack Developer · Industrial Engineer · AI & Software Automation",

  about:
    "Industrial Engineer and Senior Full Stack Developer with more than 10 years of experience building web applications, REST APIs, mobile solutions and enterprise software.",

  socials: {
    email: "iamjosepunto@gmail.com",
    linkedin: "https://linkedin.com/in/iamjosepunto",
    github: "https://github.com/iamjosepunto",
    web: "https://iamjosepunto.github.io/",
    wellfound: "https://wellfound.com/u/iamjosepunto",
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

export const PROJECT_GROUPS: ProjectGroup[] = [
  {
    "empresa": "E100",
    "empresaName": "Proyecto Personal",
    "proyecto": "P100",
    "proyectoKey": "e100_p100",
    "tasks": [
      {
        "code": "E100 - P100 - T001",
        "key": "e100_p100_t001",
        "dates": "may. 2026 - actualidad",
        "url": "https://iamjosepunto.github.io"
      }
    ],
    "dates": "may. 2026 - actualidad"
  },
  {
    "empresa": "E011",
    "empresaName": "Grupo de Empresas Tecnológicas",
    "proyecto": "P006",
    "proyectoKey": "e011_p006",
    "tasks": [
      {
        "code": "E011 - P006 - T010",
        "key": "e011_p006_t010",
        "dates": "mar. 2026 - actualidad"
      },
      {
        "code": "E011 - P006 - T009",
        "key": "e011_p006_t009",
        "dates": "nov. 2025 - feb. 2026"
      },
      {
        "code": "E011 - P006 - T008",
        "key": "e011_p006_t008",
        "dates": "jun. 2025 - oct. 2025"
      },
      {
        "code": "E011 - P006 - T007",
        "key": "e011_p006_t007",
        "dates": "dic. 2024 - may. 2025"
      },
      {
        "code": "E011 - P006 - T006",
        "key": "e011_p006_t006",
        "dates": "jun. 2024 - nov. 2024"
      },
      {
        "code": "E011 - P006 - T005",
        "key": "e011_p006_t005",
        "dates": "ene. 2024 - may. 2024"
      },
      {
        "code": "E011 - P006 - T004",
        "key": "e011_p006_t004",
        "dates": "sept. 2023 - dic. 2023"
      },
      {
        "code": "E011 - P006 - T003",
        "key": "e011_p006_t003",
        "dates": "abr. 2023 - ago. 2023"
      },
      {
        "code": "E011 - P006 - T002",
        "key": "e011_p006_t002",
        "dates": "oct. 2022 - mar. 2023"
      },
      {
        "code": "E011 - P006 - T001",
        "key": "e011_p006_t001",
        "dates": "abr. 2022 - sept. 2022"
      }
    ],
    "dates": "abr. 2022 - actualidad"
  },
  {
    "empresa": "E011",
    "empresaName": "Grupo de Empresas Tecnológicas",
    "proyecto": "P005",
    "proyectoKey": "e011_p005",
    "tasks": [
      {
        "code": "E011 - P005 - T005",
        "key": "e011_p005_t005",
        "dates": "nov. 2021 - mar. 2022"
      },
      {
        "code": "E011 - P005 - T004",
        "key": "e011_p005_t004",
        "dates": "jul. 2021 - oct. 2021"
      },
      {
        "code": "E011 - P005 - T003",
        "key": "e011_p005_t003",
        "dates": "mar. 2021 - jun. 2021"
      },
      {
        "code": "E011 - P005 - T002",
        "key": "e011_p005_t002",
        "dates": "nov. 2020 - feb. 2021"
      },
      {
        "code": "E011 - P005 - T001",
        "key": "e011_p005_t001",
        "dates": "sept. 2020 - oct. 2020"
      }
    ],
    "dates": "sept. 2020 - mar. 2022"
  },
  {
    "empresa": "E010",
    "empresaName": "Unisys",
    "proyecto": "P004",
    "proyectoKey": "e010_p004",
    "tasks": [
      {
        "code": "E010 - P004 - T004",
        "key": "e010_p004_t004",
        "dates": "may. 2020 - ago. 2020"
      },
      {
        "code": "E010 - P004 - T003",
        "key": "e010_p004_t003",
        "dates": "dic. 2019 - abr. 2020"
      },
      {
        "code": "E010 - P004 - T002",
        "key": "e010_p004_t002",
        "dates": "sept. 2019 - nov. 2019"
      },
      {
        "code": "E010 - P004 - T001",
        "key": "e010_p004_t001",
        "dates": "jun. 2019 - ago. 2019"
      }
    ],
    "dates": "jun. 2019 - ago. 2020"
  },
  {
    "empresa": "E009",
    "empresaName": "IO Digital X",
    "proyecto": "P003",
    "proyectoKey": "e009_p003",
    "tasks": [
      {
        "code": "E009 - P003 - T003",
        "key": "e009_p003_t003",
        "dates": "abr. 2019 - jun. 2019"
      },
      {
        "code": "E009 - P003 - T002",
        "key": "e009_p003_t002",
        "dates": "ene. 2019 - mar. 2019"
      },
      {
        "code": "E009 - P003 - T001",
        "key": "e009_p003_t001",
        "dates": "sept. 2018 - dic. 2018"
      }
    ],
    "dates": "sept. 2018 - jun. 2019"
  },
  {
    "empresa": "E008",
    "empresaName": "INECO",
    "proyecto": "P002",
    "proyectoKey": "e008_p002",
    "tasks": [
      {
        "code": "E008 - P002 - T003",
        "key": "e008_p002_t003",
        "dates": "jul. 2018 - sept. 2018"
      },
      {
        "code": "E008 - P002 - T002",
        "key": "e008_p002_t002",
        "dates": "may. 2018 - jun. 2018"
      },
      {
        "code": "E008 - P002 - T001",
        "key": "e008_p002_t001",
        "dates": "feb. 2018 - abr. 2018"
      }
    ],
    "dates": "feb. 2018 - sept. 2018"
  },
  {
    "empresa": "E007",
    "empresaName": "GRUPO J2INGENIEROS",
    "proyecto": "P001",
    "proyectoKey": "e007_p001",
    "tasks": [
      {
        "code": "E007 - P001 - T012",
        "key": "e007_p001_t012",
        "dates": "sept. 2017 - ene. 2018"
      },
      {
        "code": "E007 - P001 - T011",
        "key": "e007_p001_t011",
        "dates": "feb. 2017 - ago. 2017"
      },
      {
        "code": "E007 - P001 - T010",
        "key": "e007_p001_t010",
        "dates": "sept. 2016 - ene. 2017"
      },
      {
        "code": "E007 - P001 - T009",
        "key": "e007_p001_t009",
        "dates": "mar. 2016 - ago. 2016"
      },
      {
        "code": "E007 - P001 - T008",
        "key": "e007_p001_t008",
        "dates": "ago. 2015 - feb. 2016"
      },
      {
        "code": "E007 - P001 - T007",
        "key": "e007_p001_t007",
        "dates": "mar. 2015 - jul. 2015"
      },
      {
        "code": "E007 - P001 - T006",
        "key": "e007_p001_t006",
        "dates": "sept. 2014 - feb. 2015"
      },
      {
        "code": "E007 - P001 - T005",
        "key": "e007_p001_t005",
        "dates": "feb. 2014 - ago. 2014"
      },
      {
        "code": "E007 - P001 - T004",
        "key": "e007_p001_t004",
        "dates": "sept. 2013 - ene. 2014"
      },
      {
        "code": "E007 - P001 - T003",
        "key": "e007_p001_t003",
        "dates": "mar. 2013 - ago. 2013"
      },
      {
        "code": "E007 - P001 - T002",
        "key": "e007_p001_t002",
        "dates": "ago. 2012 - feb. 2013"
      },
      {
        "code": "E007 - P001 - T001",
        "key": "e007_p001_t001",
        "dates": "mar. 2012 - jul. 2012"
      }
    ],
    "dates": "mar. 2012 - ene. 2018"
  }
];


export const EXPERIENCE_GROUPS: ExperienceRef[] = [
  {
    "code": "E011",
    "key": "e011",
    "company": "Grupo de Empresas Tecnológicas",
    "dates": "sept. 2020 - actualidad"
  },
  {
    "code": "E010",
    "key": "e010",
    "company": "Unisys",
    "dates": "jun. 2019 - sept. 2020"
  },
  {
    "code": "E009",
    "key": "e009",
    "company": "IO Digital X",
    "dates": "sept. 2018 - jun. 2019"
  },
  {
    "code": "E008",
    "key": "e008",
    "company": "INECO",
    "dates": "feb. 2018 - sept. 2018"
  },
  {
    "code": "E007",
    "key": "e007",
    "company": "GRUPO J2INGENIEROS",
    "dates": "mar. 2012 - ene. 2018"
  },
  {
    "code": "E006",
    "key": "e006",
    "company": "Apave Spain (antes Eurocontrol)",
    "dates": "ago. 2009 - mar. 2012"
  },
  {
    "code": "E005",
    "key": "e005",
    "company": "PROIMA",
    "dates": "sept. 2008 - ago. 2009"
  },
  {
    "code": "E004",
    "key": "e004",
    "company": "JG Ingenieros S.A.",
    "dates": "oct. 2007 - sept. 2008"
  },
  {
    "code": "E003",
    "key": "e003",
    "company": "Grupo Tragsa",
    "dates": "may. 2006 - oct. 2007"
  },
  {
    "code": "E002",
    "key": "e002",
    "company": "3g office",
    "dates": "nov. 2005 - may. 2006"
  },
  {
    "code": "E001",
    "key": "e001",
    "company": "Iberdrola",
    "dates": "jun. 2005 - nov. 2005"
  }
];
