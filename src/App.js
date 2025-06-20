import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import './App.css';
import { FaMapMarkedAlt, FaPlane, FaUmbrellaBeach, FaSuitcaseRolling, FaCogs, FaMobileAlt, FaGlobe, FaRobot, FaNetworkWired, FaLightbulb, FaBoxOpen } from 'react-icons/fa';
import logo from './logo-2.png';
import FlowingMenu from './FlowingMenu';

const App = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRefs = useRef([]);
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    const node = counterRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCounter(0, 9, 1000);
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (node) observer.observe(node);
    return () => node && observer.unobserve(node);
  }, [hasAnimated]);

  const animateCounter = (start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const animateStat = (setFn, end) => {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start++;
      setFn(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
  };

  useEffect(() => {
    const currentRefs = [...cardRefs.current];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            if (index === 0) animateStat(setCount1, 16);
            if (index === 1) animateStat(setCount2, 25);
            if (index === 2) animateStat(setCount3, 9);
          }
        });
      },
      { threshold: 0.5 }
    );
    currentRefs.forEach((ref) => ref && observer.observe(ref));
    return () => currentRefs.forEach((ref) => ref && observer.unobserve(ref));
  }, []);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 20;
        const rotateY = (x / rect.width) * 20;
        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformOrigin: 'center',
        });
      };
      const resetTilt = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      };
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', resetTilt);
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', resetTilt);
      };
    });
  }, []);
  const portfolioItems = [
  { label: "Travel Domain", icon: <FaPlane /> },
  { label: "Customized Application Development", icon: <FaCogs /> },
  { label: "Mobile Application Development", icon: <FaMobileAlt /> },
  { label: "Web Portal Development", icon: <FaGlobe /> },
  { label: "AI Automations", icon: <FaRobot /> },
  { label: "API Integration", icon: <FaNetworkWired /> },
  { label: "IT Consulting", icon: <FaLightbulb /> },
  { label: "Our Products", icon: <FaBoxOpen /> },
];


  const associateItems = [
    { text: 'NDC', link: '#ndc', images: ['/logos/Emirates.png','/logos/amadeus.png','/logos/Britishair.png','/logos/Verteil.png'] },
    { text: 'LCC Airlines', link: '#lcc', images: ['/logos/Indigo.png','/logos/Spicejet.png','/logos/Airarabia.png','/logos/Flydubai.png','/logos/Aex.png','/logos/AirAsia.png','/logos/Akasa-air.png','/logos/Cebupacific.png','/logos/Jazeera.png'] },
    { text: 'Aggregator', link: '#aggregator', images: ['/logos/tbo.png'] },
    { text: 'Insurance', link: '#insurance', images: ['/logos/Acko.png','/logos/ICICI.png','/logos/BA.png','/logos/HDFC.png','/logos/Niva.png','/logos/Carehealth.png','/logos/Tune.png'] },
    { text: 'Payment Gateway', link: '#payment', images: ['/logos/razorpay.png','/logos/Paytm.png','/logos/Instamojo.png','/logos/Payumoney.png'] },
    { text: 'GDS Consolidator', link: '#gds', images: ['/logos/amadeus.png','/logos/Travelport.png','/logos/Sabre.png'] },
  ];

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Evershine Tech Solutions" />
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#approach">Our Approach</a>
          <a href="#products">Our Products</a>
          <div
            className="dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="dropdown-toggle">Portfolio ▾</span>
            {showDropdown && (
              <div className="dropdown-content">
                <a href="#td">Travel Domain</a>
                <a href="#ca">Customized Application</a>
                <a href="#wpd">Web Portal Development</a>
                <a href="#mad">Mobile App Development</a>
                <a href="#api">API Integration</a>
                <a href="#ai">AI Automation</a>
                <a href="#itc">IT Consulting</a>
              </div>
            )}
          </div>
          <a href="#contact" className="contact-button">📞 Contact Us</a>
        </div>
      </nav>

      <div className="slideshow-container">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
        >
          <SwiperSlide>
            <div className="slide-image-wrapper">
              <img src="/images/ttt.jpg" alt="Slide 1" className="slide-image" />
              <div className="slide-shine"></div>
            </div>
            <div className="slide-content">
              <h1>B2B Travel Solution - Online Business Travel Service</h1>
              <h4>Streamline bookings and client satisfaction</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-wrapper">
              <img src="/images/top-travel-agencies.jpg" alt="Slide 2" className="slide-image" />
              <div className="slide-shine"></div>
            </div>
            <div className="slide-content">
              <h1>Scale your travel projects with us</h1>
              <h4>Digital Transformation Consultancy</h4>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image-wrapper">
              <img src="/images/bb.jpeg" alt="Slide 3" className="slide-image" />
              <div className="slide-shine"></div>
            </div>
            <div className="slide-content">
              <h1>Experience your customer journey</h1>
              <h4>With Our Unique Approach</h4>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="services-section">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}
          loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className="service-card">
              <div className="icon-circle">
                <FaMapMarkedAlt size={30} />
              </div>
              <h3>Travel Tech API Solutions</h3>
              <p>Expand your reach and connect to the world through our vast network of suppliers, encompassing air travel, hotels, cruise lines, payment services.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="service-card">
              <div className="icon-circle">
                <FaPlane size={30} />
              </div>
              <h3>White Labeling B2B Travel Portal</h3>
              <p>Use your own branded name and customized design to fit your requirements.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="service-card">
              <div className="icon-circle">
                <FaUmbrellaBeach size={30} />
              </div>
              <h3>Travel Insurance Solutions</h3>
              <p>Travelers seek peace of mind through insurance solutions as varied as their destinations.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="service-card">
              <div className="icon-circle">
                <FaSuitcaseRolling size={30} />
              </div>
              <h3>Corporate Travel Solutions</h3>
              <p>Complete spend management with one place to book travel supplies for your business.</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="about-us-section" id="about">
        <div className="about-image">
          <div className="about-shine-wrapper">
            <img src="/images/evershine.png" alt="About" />
            <div className="about-shine"></div>
            <div className="experience-badge" ref={counterRef}>
              <span className="years-count">{count}+</span>
              <span className="experience-label">Years<br />Experience</span>
            </div>
          </div>
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            EverShine have a team of dynamic & talented individuals who will solve your requirements.
            Professionals who understand your work ethic will hold your hand through your growth journey.
            Continuous offsite support till you are comfortable with the product is a norm which we follow very smoothly.
          </p>
          <p>
            We offer a cost-effective way to build/develop and update your product, so, you invest with confidence
            in new product development or an update. With us you will not be locked into expensive software or web
            application because we offer maximum flexibility at minimum cost.
          </p>
          <button className="discover-button">Discover More</button>
        </div>
      </div>

      <div className="portfolio-section default-animation">
        <h2 className="portfolio-title">Our Portfolios</h2>
        <div className="default-animation--scene">
          {portfolioItems.map((item, idx) => (
            <div
              key={idx}
              className="cube"
              data-row={Math.floor(idx / 5)}
              data-col={idx % 5}
            >
              <div className="cube-face cube-face--front">
                <div className="portfolio-label">
                  <span className="portfolio-icon">{item.icon}</span>
                  {item.label}
                </div>
              </div>
              <div className="cube-face cube-face--back" />
              <div className="cube-face cube-face--top" />
              <div className="cube-face cube-face--bottom" />
              <div className="cube-face cube-face--left" />
              <div className="cube-face cube-face--right" />
            </div>
          ))}
        </div>
      </div>
      <div className="stats-section">
        <div className="stat-card light" ref={el => cardRefs.current[0] = el}>
          <div className="stat-icon pink">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-text">
            <h2>{count1}+</h2>
            <p>Happy Clients</p>
          </div>
        </div>

        <div className="stat-card dark" ref={el => cardRefs.current[1] = el}>
          <div className="stat-icon navy">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <div className="stat-text">
            <h2>{count2}+</h2>
            <p>Completed Projects</p>
          </div>
        </div>

        <div className="stat-card blue" ref={el => cardRefs.current[2] = el}>
          <div className="stat-icon sky">
            <i className="fas fa-tachometer-alt"></i>
          </div>
          <div className="stat-text">
            <h2>{count3}+</h2>
            <p>Years Experience</p>
          </div>
        </div>
      </div>
<div className="travel-tech-expertise">
  <h2 className="section-title">Our Expertise Travel Tech Presence</h2>
  <p className="section-description">
    With years of experience in travel and tourism, we understand industry-specific needs, regulations, and customer behavior.
    Our solutions are tailored to streamline operations and enhance traveler satisfaction. Partner with us to transform your travel business.
  </p>

  <h2 className="section-subtitle">Our Target Solutions to the Market:</h2>
  <div className="solutions-grid">
    {[
      { label: 'AIRLINE', icon: '/icons/airplane.png' },
      { label: 'HOTEL', icon: '/icons/hotel.png' },
      { label: 'BUS', icon: '/icons/bus.png' },
      { label: 'INSURANCE', icon: '/icons/insurance.png' },
      { label: 'VISA', icon: '/icons/visa.png' },
      { label: 'CBT', icon: '/icons/cbt.png' },
      { label: 'Q TKT(GDS)', icon: '/icons/gds.png' },
      { label: 'THEME PARK', icon: '/icons/theme-park.png' },
      { label: 'HOLIDAYS', icon: '/icons/holidays.png' },
      { label: 'SIGHTSEEING', icon: '/icons/sightseeing.png' },
      { label: 'TRANSFER', icon: '/icons/transfer.png' },
      { label: 'CRUISE', icon: '/icons/cruise.png' },
    ].map((item, idx) => (
      <div key={idx} className="solution-card">
        <div className="solution-header">{item.label}</div>
        <div className="solution-icon">
          <img src={item.icon} alt={item.label} />
        </div>
      </div>
    ))}
  </div>
</div>
<div className="associates-wrapper">
  <h2 className="section-title">Our Major Associates</h2>
  <FlowingMenu items={associateItems} />
</div>
<footer class="footer">
  <div class="footer-container">
    <div class="footer-col company">
      <img src="./images/logo.png" alt="Evershine Logo" class="footer-logo" />
      <p>
        We are a one-stop solution provider for all your software development needs. We specialize in creating cutting-edge software solutions tailored for the travel and tourism industry.
      </p>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="#aau">About Us</a></li>
        <li><a href="#wa">Web Apps</a></li>
        <li><a href="#ma">Mobile Apps</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Useful Links</h4>
      <ul>
        <li><a href="#ca">Customized Application</a></li>
        <li><a href="#aapi">API Integration</a></li>
        <li><a href="#td">Travel Domain</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Communications</h4>
      <ul>
        <li>Email: info@evershinetechsolutions.com</li>
        <li>NO.712, 2ND FLOOR, VGK COMPLEX,</li>
        <li>POONAMALLE TO AVADI MAIN ROAD,</li>
        <li>GOVARTHANAGIRI, AVADI,</li>
        <li>CHENNAI - 600071. INDIA.</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 All Rights Reserved EverShine Tech Solutions</p>
    <a href="#top" class="go-to-top">Go To Top</a>
  </div>
</footer>

</div>
  );
};

export default App;
