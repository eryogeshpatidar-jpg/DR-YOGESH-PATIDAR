import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, OrbitControls, Sparkles } from '@react-three/drei';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, BookOpen, BrainCircuit, BriefcaseBusiness, ChevronDown, Download, ExternalLink, GraduationCap, Mail, Menu, RadioTower, Scan, Sparkles, X } from 'lucide-react';
import * as THREE from 'three';
import './styles.css';

const publications = [
  { year: '2024', type: 'JOURNAL ARTICLE', title: 'Clustering-Cum-Classification Based Machine Learning Medium Access Control Protocol for Three Tier Heterogeneous Wireless Sensor Network', venue: 'Wireless Personal Communications, 139, 1285–1301', doi: 'https://doi.org/10.1007/s11277-024-11680-5' },
  { year: '2024', type: 'JOURNAL ARTICLE', title: 'Optimal Stable Cluster Head Selection Method for Maximal Throughput and Lifetime of Homogeneous Wireless Sensor Network', venue: 'SN Computer Science, 5, 218', doi: 'https://doi.org/10.1007/s42979-023-02459-9' },
  { year: '2024', type: 'JOURNAL ARTICLE', title: 'Energy-Efficient Clustering and Data Transmission Method for Heterogeneous Wireless Sensor Network', venue: 'Indian Journal of Technical Education, 47(01), 138–144', doi: 'http://www.isteonline.in/Viewtopics.aspx?MenuId=Vol47__No1_1442' },
  { year: '2023', type: 'JOURNAL ARTICLE · CO-AUTHOR', title: 'SIF-DWTRL: solar irradiation forecasting using discrete wavelet transform and regression learning', venue: 'Energy Systems', doi: 'https://doi.org/10.1007/s12667-023-00585-0' },
  { year: '2023', type: 'CONFERENCE PAPER', title: 'Machine Learning based Data Traffic Prediction and Classification of Sensor Nodes in Wireless Sensor Network', venue: 'ICAC3N 2023, pp. 1291–1294', doi: 'https://doi.org/10.1109/ICAC3N60023.2023.10541677' },
  { year: '2022', type: 'CONFERENCE PAPER', title: 'Comparative Analysis of Clustering and Routing Protocols for Energy-Efficient WSN', venue: 'ICAC3N 2022, pp. 1768–1773', doi: 'https://doi.org/10.1109/ICAC3N56670.2022.10074074' },
  { year: '2022', type: 'CONFERENCE PAPER', title: 'Modified Unexpended Energy Based Stable Cluster Head Selection for Homogeneous Wireless Sensor Networks (WSNs)', venue: 'ICAN 2022, pp. 1–5', doi: 'https://doi.org/10.1109/ICAN56228.2022.10007098' },
  { year: '2024', type: 'BOOK CHAPTER', title: 'Routing in Wireless Sensor Networks and Internet of Things: Systematic Analysis and Discussion', venue: 'AIoT and Smart Sensing Technologies for Smart Devices, IGI Global, pp. 181–196', doi: '' },
  { year: '2018', type: 'JOURNAL ARTICLE', title: 'Advances in energy detector and a matched filter-based spectrum sensing: a survey', venue: 'International Journal of Engineering Research and Applications, 8(1), 25–28', doi: '' },
  { year: '2018', type: 'JOURNAL ARTICLE', title: 'Performance Comparison of Energy Detector and a Matched Filter based SS over Rayleigh Fading Channel', venue: 'International Journal of Modern Trends in Engineering and Research, 5(3), 149–155', doi: '' },
];
const books = [
  { title: 'Electric Circuits and Network', note: 'Hindi textbook · Diploma Electronics & Telecommunication Engineering, second year', publisher: 'Sanjay Publication, Jaipur' },
  { title: 'Electric Circuit', note: 'Hindi textbook · Diploma Electrical Engineering, second year · Co-author', publisher: 'Sanjay Publication, Jaipur' },
  { title: 'Fundamental of Electrical and Electronics Engineering', note: 'Hindi textbook · Diploma Engineering, first year · Co-author', publisher: 'Sanjay Publication, Jaipur' },
  { title: 'Microprocessor and Interfacing', note: 'Hindi-language book · Co-author', publisher: 'Satya Prakashan, New Delhi' },
];
const courses = [
  ['2020', 'Applied Optimization for Wireless, Machine Learning & Big Data', 'Elite + Silver'],
  ['2019', 'Introduction to Research', 'Elite + Silver'],
  ['2018', 'Principles of Signal Estimation for MIMO/OFDM Wireless Communication', 'Elite + Gold'],
  ['2017', 'Principles of Communication Systems — Part II', 'Elite'],
  ['2017', 'Estimation for Wireless Communication: MIMO-OFDM Cellular and Sensor', 'Elite'],
  ['2015', 'Principles of Modern CDMA/MIMO/OFDM Wireless Communications', 'Elite'],
];
const career = [
  { date: 'Mar 2010 — Present', role: 'Lecturer (Selection Grade-I)', org: 'Government Polytechnic College, Mandsaur, Madhya Pradesh', desc: 'Department of Electronics and Telecommunication Engineering.' },
  { date: 'Mar 2005 — Sep 2009', role: 'Lecturer (Assistant Professor)', org: 'Shri Vaishnav Institute of Technology and Science, Indore', desc: 'Teaching in engineering education.' },
  { date: 'Jul 2004 — Mar 2005', role: 'Guest Faculty', org: 'Ujjain Engineering College, Ujjain', desc: 'Early-career teaching experience in engineering.' },
];
const training = [
  ['2021', 'Python + R Projects for 5G Wireless Technologies', 'IIT Kanpur NTRS'],
  ['2020', 'Latest MIMO Technologies for 5G Networks and IoT', 'IIT Kanpur'],
  ['2017', 'Spectrum Sensing for MIMO-OFDM Cognitive Radio Systems', 'IIT Kanpur'],
  ['2022', 'UHV in Technical Education', 'AICTE Faculty Development Programme'],
  ['2022', 'Online Orientation Training Programme for Mentors', 'AICTE–NITTT'],
];

function NetworkScene() {
  const group = useRef();
  const core = useRef();
  const nodes = useMemo(() => Array.from({ length: 36 }, (_, i) => {
    const phi = Math.acos(2 * ((i * 0.61803398875) % 1) - 1);
    const theta = i * 2.3999632297;
    const r = 1.15 + ((i * 17) % 11) / 22;
    return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  }), []);
  const links = useMemo(() => {
    const out = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => {
      if (j > i && a.distanceTo(b) < 0.92) out.push([a.toArray(), b.toArray()]);
    }));
    return out;
  }, [nodes]);
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.075;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.12;
    }
    if (core.current) {
      core.current.rotation.x += delta * 0.16;
      core.current.rotation.y += delta * 0.22;
    }
  });
  return <group ref={group}>
    <mesh ref={core}>
      <icosahedronGeometry args={[0.56, 1]} />
      <meshStandardMaterial color="#2859e8" roughness={0.24} metalness={0.35} wireframe />
    </mesh>
    <mesh>
      <icosahedronGeometry args={[0.39, 2]} />
      <meshPhysicalMaterial color="#ff795f" roughness={0.2} metalness={0.1} transmission={0.12} transparent opacity={0.82} />
    </mesh>
    {nodes.map((p, i) => <mesh key={i} position={p.toArray()} scale={i % 7 === 0 ? 0.075 : 0.035}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color={i % 5 === 0 ? '#ff795f' : i % 3 === 0 ? '#9d8af7' : '#2859e8'} emissive={i % 5 === 0 ? '#ff795f' : '#2859e8'} emissiveIntensity={0.22} roughness={0.3} />
    </mesh>)}
    {links.map((pts, i) => <Line key={i} points={pts} color="#6c87dc" transparent opacity={0.3} lineWidth={0.65} />)}
    <mesh rotation={[Math.PI / 2.6, 0.3, 0]}>
      <torusGeometry args={[1.82, 0.008, 8, 160]} />
      <meshBasicMaterial color="#ff795f" transparent opacity={0.8} />
    </mesh>
    <mesh rotation={[0.2, 0, Math.PI / 3]}>
      <torusGeometry args={[2.03, 0.006, 8, 160]} />
      <meshBasicMaterial color="#2859e8" transparent opacity={0.45} />
    </mesh>
  </group>;
}

function Scene() {
  return <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.6} />
    <directionalLight position={[3, 4, 4]} intensity={2.2} color="#fff4dd" />
    <pointLight position={[-3, -2, 2]} intensity={15} color="#9d8af7" />
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.15}>
      <NetworkScene />
    </Float>
    <Sparkles count={55} scale={5.5} size={2} speed={0.18} color="#ff795f" opacity={0.55} />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
  </Canvas>;
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.14 }} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
function Eyebrow({ children, number }) { return <div className="eyebrow"><span>{number || '✳'}</span>{children}</div>; }
function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Research', '#research'], ['Publications', '#publications'], ['Journey', '#journey'], ['Contact', '#contact']];
  return <header className="header">
    <a className="brand" href="#top" aria-label="Dr Yogesh Patidar home"><span className="brand-mark">YP<span>.</span></span><span className="brand-name">DR. YOGESH PATIDAR<small>ACADEMIC PORTFOLIO</small></span></a>
    <nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Get in touch <ArrowUpRight size={15}/></a></nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
  </header>;
}
function Hero() {
  return <section className="hero" id="top">
    <div className="hero-copy">
      <div className="availability"><span className="pulse-dot"/><span>EDUCATOR · RESEARCHER · AUTHOR</span></div>
      <h1>Engineering<br/>ideas into <em>impact.</em></h1>
      <p className="hero-intro">Exploring smarter, more energy-efficient ways for connected systems to communicate — while shaping the next generation of engineers.</p>
      <div className="hero-actions"><a className="button button-primary" href="#research">Explore my work <ArrowDownRight size={17}/></a><a className="text-link" href="#publications">View publications <ArrowUpRight size={16}/></a></div>
      <div className="hero-note"><span className="note-line"/>Based in Mandsaur, Madhya Pradesh, India</div>
    </div>
    <div className="hero-art">
      <div className="art-label label-top"><span className="tiny-square"/> NETWORK TOPOLOGY <span>01 / 03</span></div>
      <div className="scene-wrap"><Scene/><div className="scene-center">WSN<span>●</span></div></div>
      <div className="art-label label-bottom"><span>CONNECTED SYSTEMS</span><span className="signal-bars"><i/><i/><i/><i/></span><span>LIVE MODEL</span></div>
      <div className="floating-tag tag-a"><RadioTower size={15}/><span>Energy-aware<br/><b>communication</b></span></div>
      <div className="floating-tag tag-b"><BrainCircuit size={16}/><span>Machine learning<br/><b>for sensor networks</b></span></div>
    </div>
    <div className="hero-index"><span>SCROLL TO EXPLORE</span><span className="index-rule"/><span>01—06</span></div>
  </section>;
}
function Stats() {
  const stats = [['19+', 'Years teaching & research'], ['9+', 'Listed journal & conference papers*'], ['4', 'Hindi technical books'], ['6', 'NPTEL courses qualified']];
  return <section className="stats-band" aria-label="Career highlights">{stats.map(([num, label], i) => <Reveal key={num} delay={i * 0.07} className="stat"><strong>{num}</strong><span>{label}</span></Reveal>)}<p className="stats-footnote">*Selected items listed in the supplied CV; publication record may include additional work.</p></section>;
}
function About() {
  return <section className="section about-section" id="about">
    <Reveal><Eyebrow number="01 / PROFILE">A little about my work</Eyebrow></Reveal>
    <div className="about-grid">
      <Reveal className="about-heading"><h2>Curiosity is the<br/>first <em>instrument.</em></h2><p className="large-copy">Teaching, research and translation — connected by one idea: making engineering knowledge useful and accessible.</p></Reveal>
      <Reveal className="about-body" delay={0.1}><p>Dr. Yogesh Patidar is a Lecturer (Selection Grade-I) in Electronics and Telecommunication Engineering at Government Polytechnic College, Mandsaur, Madhya Pradesh. His work spans wireless sensor networks, energy-efficient clustering and routing, digital communication, and engineering education.</p><p>Alongside research and teaching, he has contributed to Hindi technical textbooks and translated NPTEL course material into Hindi, helping make specialist engineering content more accessible to learners.</p><div className="credential-row"><span className="credential-icon"><GraduationCap size={20}/></span><div><b>Ph.D. · M.Tech · B.E.</b><small>Wireless sensor networks · Digital communication · ECE</small></div></div></Reveal>
    </div>
  </section>;
}
function Research() {
  const areas = [
    { n: '01', icon: <RadioTower/>, title: 'Wireless sensor networks', desc: 'Designing connected sensor systems that communicate reliably with constrained energy and resources.', tags: ['WSN', 'Network topology'] },
    { n: '02', icon: <BrainCircuit/>, title: 'Energy-efficient clustering & routing', desc: 'Cluster-head selection, routing strategy and data transmission focused on network lifetime and throughput.', tags: ['Energy optimization', 'Routing'] },
    { n: '03', icon: <Scan/>, title: 'Machine learning for communication', desc: 'Traffic prediction, sensor-node classification and learning-informed communication protocols.', tags: ['Prediction', 'Classification'] },
    { n: '04', icon: <Sparkles/>, title: 'Digital & wireless communication', desc: 'Spectrum sensing, MIMO/OFDM systems, signal estimation and communication fundamentals.', tags: ['MIMO / OFDM', 'Spectrum sensing'] },
  ];
  return <section className="section research-section" id="research">
    <Reveal><Eyebrow number="02 / RESEARCH">Questions that drive the work</Eyebrow><div className="section-heading-row"><h2>Research with a<br/><em>practical signal.</em></h2><p>From network architecture to learning-based methods, the focus is on communication that uses resources intelligently.</p></div></Reveal>
    <div className="research-grid">{areas.map((a, i) => <Reveal key={a.n} delay={i * 0.06} className={'research-card card-' + i}><div className="card-top"><span>{a.n} / AREA</span><span className="card-icon">{a.icon}</span></div><h3>{a.title}</h3><p>{a.desc}</p><div className="tag-row">{a.tags.map(t => <span key={t}>{t}</span>)}</div><span className="card-arrow"><ArrowUpRight size={18}/></span></Reveal>)}</div>
  </section>;
}
function Publications() {
  const [all, setAll] = useState(false);
  const list = all ? publications : publications.slice(0, 5);
  return <section className="section publications-section" id="publications">
    <Reveal><Eyebrow number="03 / SELECTED WORK">Research & publications</Eyebrow><div className="section-heading-row"><h2>Ideas, tested<br/>and <em>published.</em></h2><p>A selection of journal articles, conference papers and a book chapter transcribed from the supplied CV. Follow the DOI link where available.</p></div></Reveal>
    <div className="publication-list">{list.map((p, i) => <Reveal key={p.title} delay={i % 4 * 0.04} className="publication-row"><div className="pub-year">{p.year}<span>{p.type}</span></div><div className="pub-info"><h3>{p.title}</h3><p>{p.venue}</p></div><div className="pub-link">{p.doi ? <a href={p.doi} target="_blank" rel="noreferrer" aria-label={'Open publication: ' + p.title}><ArrowUpRight size={20}/></a> : <span className="no-doi">DETAILS</span>}</div></Reveal>)}</div>
    <button className="button button-outline show-more" onClick={() => setAll(!all)}>{all ? 'Show selected publications' : 'View all listed publications'} <ChevronDown size={16} className={all ? 'rotate' : ''}/></button>
    <div className="scholar-note"><span className="scholar-mark">G<span>S</span></span><div><b>Continue exploring the research record</b><p>See the full author profile and citation metrics on Google Scholar.</p></div><a href="https://scholar.google.com/citations?user=c997KPMAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar <ExternalLink size={15}/></a></div>
  </section>;
}
function Journey() {
  return <section className="section journey-section" id="journey">
    <Reveal><Eyebrow number="04 / ACADEMIC JOURNEY">Experience & education</Eyebrow><div className="section-heading-row"><h2>Built through<br/><em>teaching.</em></h2><p>More than 19 years across classroom teaching, technical research and academic knowledge-sharing.</p></div></Reveal>
    <div className="journey-grid"><div className="timeline"><h3 className="mini-heading"><BriefcaseBusiness size={17}/> PROFESSIONAL EXPERIENCE</h3>{career.map((c, i) => <Reveal key={c.date} delay={i * 0.08} className="timeline-item"><div className="timeline-date">{c.date}</div><div className="timeline-content"><span className="timeline-dot"/><h4>{c.role}</h4><b>{c.org}</b><p>{c.desc}</p></div></Reveal>)}</div>
      <div className="education-panel"><h3 className="mini-heading"><GraduationCap size={18}/> EDUCATION</h3><div className="education-card"><span className="degree-label">DOCTORAL DEGREE</span><h3>Ph.D.</h3><p>Research area: Energy Efficient Clustering and Routing in Wireless Sensor Networks</p><b>Mandsaur University, Mandsaur, India</b></div><div className="education-card"><span className="degree-label">2016 — 2018</span><h3>M.Tech</h3><p>Digital Communication · CGPA 8.75</p><b>RKDF University, Bhopal · Bhabha College of Engineering</b></div><div className="education-card"><span className="degree-label">2000 — 2004</span><h3>B.E.</h3><p>Electronics & Communication Engineering · 72.97%</p><b>Ujjain Engineering College · RGPV Bhopal</b></div></div></div>
  </section>;
}
function Books() {
  return <section className="section books-section" id="books"><Reveal><Eyebrow number="05 / KNOWLEDGE SHARED">Books, translation & learning</Eyebrow><div className="section-heading-row"><h2>Engineering knowledge,<br/><em>in more languages.</em></h2><p>Technical authorship and Hindi translation are an important part of making engineering education accessible.</p></div></Reveal>
    <div className="books-layout"><div className="book-stack">{books.map((b, i) => <Reveal key={b.title} delay={i * 0.05} className="book-row"><div className={'book-spine spine-' + i}><BookOpen size={20}/><span>0{i + 1}</span></div><div className="book-detail"><h3>{b.title}</h3><p>{b.note}</p><small>{b.publisher}</small></div><ArrowUpRight size={18} className="book-arrow"/></Reveal>)}</div>
      <Reveal className="translation-panel"><div className="translation-icon">अ</div><span className="panel-kicker">NPTEL · HINDI TRANSLATION</span><h3>Technical learning should travel across languages.</h3><p>Translated course files for four NPTEL courses offered by IISc and IITs, covering photovoltaic systems, electromagnetic theory, network analysis, and linear dynamical systems.</p><div className="translation-foot"><span>4 COURSE FILES</span><span>ENGLISH → HINDI</span></div></Reveal></div>
  </section>;
}
function Learning() {
  return <section className="section learning-section"><Reveal><Eyebrow number="06 / CONTINUOUS LEARNING">Selected professional development</Eyebrow><div className="section-heading-row"><h2>Always in <em>learning mode.</em></h2><p>Selected NPTEL course achievements and faculty development activities from the CV.</p></div></Reveal>
    <div className="course-grid">{courses.map(([year, name, award], i) => <Reveal key={name} delay={i * 0.04} className="course-card"><span className="course-year">{year}</span><h3>{name}</h3><span className={'award-tag ' + (award.includes('Gold') ? 'gold' : '')}>{award}</span></Reveal>)}</div>
    <div className="honours-strip"><div><span className="honour-number">96.8</span><span className="honour-label">GATE 2008 percentile</span></div><div><span className="honour-number">03</span><span className="honour-label">MPPSC lecturer selection position in ETE</span></div><div><span className="honour-number">IEI</span><span className="honour-label">Member · M-162057-0</span></div><div><span className="honour-number">ISTE</span><span className="honour-label">Life member · LM138112</span></div></div>
    <p className="fine-print">Professional achievements and memberships are presented as listed in the CV supplied for this portfolio.</p>
  </section>;
}
function Contact() {
  return <section className="contact-section" id="contact"><div className="contact-orbit orbit-one"/><div className="contact-orbit orbit-two"/><Reveal className="contact-inner"><Eyebrow number="LET'S CONNECT">Academic exchange starts here</Eyebrow><h2>Have a question<br/>or an idea to <em>explore?</em></h2><p>For academic collaboration, research discussion, or teaching-related enquiries, get in touch by email.</p><a className="button button-light" href="mailto:eryogeshpatidar@gmail.com">Write an email <Mail size={17}/></a><div className="contact-links"><a href="https://scholar.google.com/citations?user=c997KPMAAAAJ&hl=en" target="_blank" rel="noreferrer">Google Scholar <ArrowUpRight size={14}/></a><a href="https://www.google.com/search?q=Government+Polytechnic+College+Mandsaur" target="_blank" rel="noreferrer">Institution <ArrowUpRight size={14}/></a></div></Reveal></section>;
}
function Footer() { return <footer className="footer"><a className="brand" href="#top"><span className="brand-mark">YP<span>.</span></span><span className="brand-name">DR. YOGESH PATIDAR<small>ACADEMIC PORTFOLIO</small></span></a><span>Teaching · Research · Engineering education</span><a href="#top" className="back-top">BACK TO TOP ↑</a><small className="copyright">© {new Date().getFullYear()} Dr. Yogesh Patidar · Content based on supplied CV.</small></footer>; }
function App() {
  return <><Header/><main><Hero/><Stats/><About/><Research/><Publications/><Journey/><Books/><Learning/><Contact/></main><Footer/></>;
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
