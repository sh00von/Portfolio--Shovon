export const filters = [
  "all",
  "Engineering",
  "GIS",
  "Full Stack",
  "AI",
  "Cybersecurity",
  "WordPress",
] as const;

export type ProjectCategory = Exclude<(typeof filters)[number], "all">;

export type Project = {
  id: string;
  num: string;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  tags: string[];
  link: string;
};

export const projects: Project[] = [
  {
    id: "authryai",
    num: "01",
    title: "AuthryAI",
    description:
      "Premium AI-driven platform for enterprise-grade deepfake detection in text, images, and video using BERT and custom computer vision models.",
    image: "",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Node.js", "Flask", "PostgreSQL", "BERT"],
    link: "https://authryai.com/",
  },
  {
    id: "lst-high-res",
    num: "02",
    title: "1 km resolution LST to 10 m using Sentinel and MODIS",
    description:
      "Downscaling Land Surface Temperature from 1 km (MODIS) to 10 m resolution using Sentinel-2 imagery and GIS processing pipelines.",
    image: "/images/lst_high_res.png",
    categories: ["GIS", "Engineering"] satisfies ProjectCategory[],
    tags: ["GIS", "Remote Sensing", "MODIS", "Sentinel"],
    link: "https://www.linkedin.com/posts/minarsvn9090_from-big-1km-lst-blocks-to-finer-10m-detail-activity-7442260240588443648-xppb",
  },
  {
    id: "truss-solver",
    num: "03",
    title: "Truss Solver",
    description:
      "Structural analysis tool that solves 2D truss problems using the method of joints, with an interactive visual force diagram.",
    image: "/images/truss_solver.png",
    categories: ["Engineering"] satisfies ProjectCategory[],
    tags: ["Structural", "JavaScript", "Engineering"],
    link: "https://www.linkedin.com/posts/minarsvn9090_structuralanalysis-python-fea-activity-7350527946845016065-7MZf",
  },
  {
    id: "exabytebd",
    num: "04",
    title: "ExabyteBD",
    description:
      "Tech platform for Bangladeshi developers providing resources, tools, and community-driven content with a modern full-stack architecture.",
    image: "/images/exabytebd.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Full Stack", "MongoDB"],
    link: "https://exabytebd.com/",
  },
  {
    id: "math-solver",
    num: "05",
    title: "Math Solver",
    description:
      "AI-powered solver that parses handwritten math equations and returns step-by-step solutions using a React + Node.js stack.",
    image: "/images/math_solver.png",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["AI", "React", "Node.js"],
    link: "http://logiq.shovon.site/",
  },
  {
    id: "nogorful",
    num: "06",
    title: "Nogorful",
    description: "A fully custom WordPress theme built from scratch for a local news & community portal in Bangladesh.",
    image: "",
    categories: ["WordPress", "Full Stack"] satisfies ProjectCategory[],
    tags: ["WordPress", "PHP", "Custom Theme"],
    link: "https://nogorful.org/",
  },
  {
    id: "barakasbr",
    num: "07",
    title: "BarakasBR",
    description:
      "Full-stack business website built with Next.js, featuring a modern UI, content management, and dynamic pages.",
    image: "",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Full Stack", "Tailwind CSS"],
    link: "https://www.barakasbr.com/",
  },
  {
    id: "wrro-cuet",
    num: "08",
    title: "WRRO CUET",
    description:
      "Official website for the Water Resources Research Organization at CUET, built with Next.js and MongoDB.",
    image: "",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "MongoDB", "Organization"],
    link: "https://www.wrrocuet.org/",
  },
  {
    id: "freelance-grain-crm",
    num: "09",
    title: "Freelance Grain CRM",
    description:
      "Solo CRM tool for freelancers - manage clients, generate invoices, and track payments from one clean dashboard.",
    image: "",
    categories: ["Full Stack", "AI"] satisfies ProjectCategory[],
    tags: ["Next.js", "CRM", "Invoice"],
    link: "https://freelance-grain-crm.vercel.app/",
  },
  {
    id: "nextjs-wordpress-starter",
    num: "10",
    title: "Next.js WordPress Starter",
    description:
      "An open-source starter template that connects Next.js with WordPress as a headless CMS for blazing-fast sites.",
    image: "",
    categories: ["WordPress", "Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "WordPress", "Headless CMS"],
    link: "https://next-wordpress-starter-kappa.vercel.app/",
  },
] as const;
