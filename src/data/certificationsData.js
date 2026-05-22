import saa from '../assets/certificate_page/saa.jpg';
import oracle from '../assets/certificate_page/oracle.jpg';
import devops from '../assets/certificate_page/devops.jpg';
import fullstack from '../assets/certificate_page/fullstack.jpg';
import nptel from '../assets/certificate_page/nptel.jpeg';

export const certificationsData = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    category: "Cloud Architecture",
    description:
      "Validates expertise in designing scalable, cost-efficient, fault-tolerant systems on AWS. Covers services like EC2, S3, VPC, IAM, RDS, DynamoDB, and architectural best practices.",
    image: saa,
    year: "2026 to 2029",
  },
  {
    id: 2,
    title: "Oracle Cloud Infrastructure Foundations Associate",
    provider: "Oracle",
    category: "Cloud Infrastructure",
    description:
      "Demonstrates knowledge of Oracle Cloud architecture, core OCI services, security, networking, and governance principles.",
    image: oracle,
    year: "2025 to 2028",
  },
  {
    id: 3,
    title: "DevOps + AWS Training",
    provider: "Professional Training Program",
    category: "DevOps Engineering",
    description:
      "Covers CI/CD pipelines, Docker, Kubernetes basics, AWS deployment, infrastructure automation, and DevOps lifecycle practices.",
    image: devops,
    year: "2026 to 2029",
  },
  {
    id: 4,
    title: "Full Stack Development Training",
    provider: "Sheriyans Coding School",
    category: "Web Development",
    description:
      "Training in MERN stack including MongoDB, Express, React, Node.js with REST APIs, authentication, and production deployment.",
    image: fullstack,
    year: "2025 to 2028",
  },
  {
    id: 5,
    title: "NPTEL Certification",
    provider: "IIT / NPTEL",
    category: "Technical Achievement",
    description:
      "Successfully completed the NPTEL certification course, demonstrating a strong understanding of fundamental engineering concepts and continuous learning methodologies.",
    image: nptel,
    year: "2024 to 2026",
  }
];
