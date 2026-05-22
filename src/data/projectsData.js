import githubUserImg from '../assets/work_logo/github_user.png';
import samikaranImg from '../assets/work_logo/samikarn1.png';
import portfolioImg from '../assets/work_logo/portfolio.png';
import moodImg from '../assets/work_logo/MOOD.png';
import auraImg from '../assets/work_logo/AURA.png';
import nexxtechsProjImg from '../assets/work_logo/nexxtechss.png';
import serverlessImg from '../assets/work_logo/serverless.png';
import cryptoImg from '../assets/work_logo/crypto.jpg';

export const projectsData = [
  {
    id: 'nexxtech-website',
    title: 'Nexxtech Website',
    image: nexxtechsProjImg,
    shortDescription: 'Modern educational platform and landing page for Nexxtechs.',
    fullDescription: 'The official website for Nexxtechs. Built with a focus on modern UI/UX principles, the platform provides seamless navigation, engaging animations, and a professional dark-themed aesthetic to showcase the future of AI and Tech Education. It includes an integrated enquiry system and detailed course roadmaps.',
    techStack: ['React JS', 'Tailwind CSS', 'GSAP', 'Node.js', 'Express JS', 'Supabase', 'Docker'],
    githubLink: 'https://www.nexxtechs.com'
  },
  {
    id: 'crypto-price-alert',
    title: 'AWS Crypto Price Alert',
    image: cryptoImg,
    shortDescription: 'Serverless crypto price tracking and alerting system using AWS.',
    fullDescription: 'A highly scalable, serverless application built on AWS to track cryptocurrency prices. Flow: An Amazon EventBridge rule triggers an AWS Lambda function at regular intervals. The Lambda function securely fetches real-time price data from a public Crypto API. If the price crosses a predefined threshold, Lambda publishes a message to an Amazon SNS topic, which instantly sends an email or SMS alert to the subscribed user. This ensures zero idle server costs and high reliability.',
    techStack: ['AWS Lambda', 'Amazon SNS', 'EventBridge', 'Node.js', 'External APIs'],
    githubLink: 'https://github.com/Piyush232005/Crypto-price-check'
  },
  {
    id: 'aws-serverless-framework',
    title: 'AWS Serverless Architecture',
    image: serverlessImg,
    shortDescription: 'Event-driven serverless framework integrating multiple AWS services.',
    fullDescription: 'A robust serverless backend architecture demonstrating proper AWS service integration. Flow: The user makes an HTTP request via Amazon API Gateway, which securely routes the request to an AWS Lambda function. The Lambda function acts as the core business logic layer, interacting with Amazon DynamoDB for fast NoSQL data storage and Amazon S3 for secure object storage. All application logs and metrics are continuously monitored using Amazon CloudWatch, ensuring deep observability and security via IAM roles.',
    techStack: ['API Gateway', 'AWS Lambda', 'DynamoDB', 'Amazon S3', 'CloudWatch', 'IAM'],
    githubLink: 'https://github.com/Piyush232005/Crypto-price-check'
  },
  {
    id: 'Samikaran-ngo',
    title: 'Samikaran NGO',
    image: samikaranImg,
    shortDescription: 'A full-stack web platform for an NGO with donation support.',
    fullDescription: 'A full-stack web application designed for the Samikaran NGO to showcase their mission, activities, volunteering options, and donation support. Built with a clean UI/UX and integrated with robust backend services for managing contributions.',
    techStack: ['React JS', 'Node.js', 'Express JS', 'MongoDB', 'Supabase', 'Docker'],
    githubLink: 'https://github.com/Piyush232005/Project-samikaran.git'
  },
  {
    id: 'Profile Detective',
    title: 'GitHub Profile Detective',
    image: githubUserImg,
    shortDescription: 'A tool to uncover detailed GitHub profile information and stats.',
    fullDescription: 'A powerful and user-friendly web application designed to uncover and showcase detailed GitHub profile information. Simply enter a GitHub username, and the app fetches comprehensive data, including profile stats, repositories, followers, and more.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'React JS', 'API'],
    githubLink: 'https://github.com/Piyush232005/GithubUserFinder.git'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    image: portfolioImg,
    shortDescription: 'A personal portfolio website built with HTML, CSS, and JS.',
    fullDescription: 'Designed and coded a personal portfolio website from scratch using HTML and CSS, where all projects were showcased alongside skills, major courses, and contact details with engaging animations.',
    techStack: ['JavaScript', 'React JS', 'Tailwind CSS', 'GSAP', 'Framer Motion'],
    githubLink: 'https://github.com/Piyush232005/PERSONAL_PORTIFOLIO.git'
  },
  {
    id: 'Ai-mood',
    title: 'AI Mood Detection',
    image: moodImg,
    shortDescription: 'An emotion recognition web application using Face API.js.',
    fullDescription: 'This project made with help of of MERN stack technology with Face Api.js. The AI Mood Detection web application is designed to analyze facial expressions and accurately determine the user\'s current emotional state, such as happiness, sadness, or surprise.',
    techStack: ['React JS', 'Node.js', 'Express JS', 'Face API.js', 'Supabase', 'Docker'],
    githubLink: 'https://github.com/Piyush232005/Mood-listner.git'
  },
  {
    id: 'Aura realtime Chatbot',
    title: 'Aura Chatbot',
    image: auraImg,
    shortDescription: 'A proper chatbot with scalable architecture and real-time features.',
    fullDescription: 'Aura is an advanced, real-time AI companion designed to understand and anticipate your needs. Utilizing cutting-edge behavioral intelligence, Aura instantly adapts to offer seamless, proactive support—from prioritizing your inbox to optimizing your daily schedule—making every conversation smarter and every task simpler.',
    techStack: ['React JS', 'Node.js', 'MongoDB', 'Express JS', 'Tailwind', 'Supabase', 'Docker'],
    githubLink: 'https://github.com/Piyush232005/Aura-Realtime-Ai-App.git'
  }
];
