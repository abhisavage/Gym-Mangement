import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../styles/CommonStyles';
import { toast } from 'react-toastify';

const slideInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LandingContainer = styled.div`
  min-height: 100vh;
  scroll-behavior: smooth;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background: white;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Logo = styled.img`
  margin-top: 8px;
  height: 40px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const NavLink = styled.a`
  color: #1A1B4B;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: #4A4B8F;
  }
`;

const RegisterButton = styled.button`
  background: #FFD700;
  color: #1A1B4B;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(26, 27, 75, 0.95) 100%),
              url('/assets/6.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 100px;
  color: white;
`;

const HeroContent = styled.div`
  animation: ${slideInAnimation} 0.6s ease-out;
  align-items: center;
  
  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  p {
    font-size: 24px;
    margin-bottom: 30px;
    color: #FFD700;
  }
`;

const CTAButton = styled.button`
  background: white;
  color: #1A1B4B;
  border: none;
  padding: 15px 35px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const HeroLogo = styled.img`
  width: 400px;
  animation: ${fadeInAnimation} 0.8s ease-out;
  position: relative;
  tarnsform: tarnslateX(-2000px) rotate(10deg);
`;

const AboutSection = styled.section`
  padding: 100px 50px;
  background: #1A1B4B;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(135deg, rgba(74, 75, 143, 0.3) 0%, rgba(26, 27, 75, 0) 100%);
    z-index: 1;
  }
`;

const AboutContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: 36px;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #FFD700;
    margin: 20px auto 0;
    border-radius: 2px;
  }
`;

const AboutDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  color: rgba(255, 255, 255, 0.9);
`;

const OffersTitle = styled(AboutTitle)`
  margin-bottom: 50px;
`;

const OffersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const OfferCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px 30px;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .icon {
    font-size: 48px;
    margin-bottom: 20px;
    color: #FFD700;
  }

  h3 {
    font-size: 24px;
    margin-bottom: 15px;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  color: #1A1B4B;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  }
  
  h3 {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const LearnMoreButton = styled.button`
  background: white;
  color: #1A1B4B;
  border: none;
  padding: 15px 35px;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(26, 27, 75, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    
    &:before {
      width: 300px;
      height: 300px;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }

  span {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const CoachesSection = styled.section`
  padding: 80px 50px;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background-image: url('/assets/stamina-logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.05; // Very light opacity
    z-index: 0;
  }
`;

const CoachesTitle = styled.h2`
  font-size: 42px;
  color: #1A1B4B;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  position: relative;
  z-index: 1; // Ensure title stays above background
`;

const CoachesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1; // Ensure cards stay above background
`;

const CoachCard = styled.div`
  background: #9198C5;
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1; // Ensure cards stay above background
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .coach-image {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin: 0 auto 20px;
    overflow: hidden;
    border: 4px solid white;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  h3 {
    color: white;
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    line-height: 1.5;
  }
`;

const LocationSection = styled.section`
  padding: 80px 50px;
  background: linear-gradient(to bottom, 
    rgba(255, 255, 255, 1) 0%, 
    rgba(26, 27, 75, 0.95) 100%
  ), url('/assets/5.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed; // Optional: creates a parallax effect
`;

const LocationTitle = styled.h2`
  font-size: 42px;
  color: #1A1B4B;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
`;

const LocationContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  height: 400px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const ContactInfo = styled.div`
  background: rgba(26, 27, 75, 0.9);
  padding: 40px;
  border-radius: 15px;
  color: white;

  h3 {
    font-size: 28px;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.6;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
  }
`;

const SocialLinks = styled.div`
  margin-top: 30px;

  h4 {
    font-size: 20px;
    margin-bottom: 15px;
    text-transform: uppercase;
  }

  .social-icons {
    display: flex;
    gap: 15px;

    a {
      color: white;
      font-size: 24px;
      transition: all 0.3s ease;

      &:hover {
        color: #FFD700;
        transform: translateY(-3px);
      }
    }
  }
`;

const Footer = styled.footer`
  background: #1A1B4B;
  color: white;
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  padding: 0 50px;
`;

const FooterColumn = styled.div`
  h3 {
    color: #FFD700;
    font-size: 18px;
    margin-bottom: 20px;
    text-transform: uppercase;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 14px;

    &:hover {
      color: #FFD700;
      padding-left: 5px;
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const WhyJoinSection = styled.section`
  padding: 80px 50px;
  background: #f8f9fa;
`;

const WhyJoinTitle = styled.h2`
  font-size: 42px;
  color: #1A1B4B;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const BenefitCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
  }

  .icon {
    font-size: 40px;
    color: #1A1B4B;
    margin-bottom: 20px;
  }

  h3 {
    color: #1A1B4B;
    font-size: 22px;
    margin-bottom: 15px;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const PlansSection = styled.section`
  padding: 80px 50px;
  background: #1A1B4B;
`;

const PlansTitle = styled.h2`
  font-size: 42px;
  color: white;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 50px;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PlanCard = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    color: #1A1B4B;
    font-size: 24px;
    margin-bottom: 15px;
  }

  .price {
    color: #1A1B4B;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;

    span {
      font-size: 16px;
      font-weight: normal;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;

    li {
      color: #666;
      padding: 10px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const JoinButton = styled.button`
  background: #1A1B4B;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #FFD700;
    color: #1A1B4B;
  }
`;

const CSPLanding = () => {
  const navigate = useNavigate();

  return (
    <LandingContainer>
      <Navbar>
        <Logo src="/assets/logoclient.png" alt="Stamina Fitness" />
        <NavLinks>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#why-join">Why Join Us?</NavLink>
          <NavLink href="#plan">Plan</NavLink>
          <NavLink href="#coaches">Coaches</NavLink>
          <NavLink href="#visit">Visit our Gym</NavLink>
          <RegisterButton onClick={() => navigate('/role-selection')}>
            Login
          </RegisterButton>
        </NavLinks>
      </Navbar>

      <HeroSection>
        <HeroContent>
          <h1>Start a better<br />shape of you!</h1>
          <p>Come Join Us!</p>
          <LearnMoreButton onClick={() => navigate('/member/login')}>
            <span>
              Learn More
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14"/>
                <path d="M12 5l7 7-7 7"/>
              </svg>
            </span>
          </LearnMoreButton>
        </HeroContent>
        <HeroLogo src="/assets/stamina-logo.png" alt="Stamina Fitness" />
      </HeroSection>

      <AboutSection id="about">
        <AboutContent>
          <AboutTitle>STAMINA GYM FOR MAN & WOMAN</AboutTitle>
          <AboutDescription>
            Stamina Gym Fitness Center provides proper training and conditioning for members 
            who want to improve and transform their body with Program depend on the body composition.
          </AboutDescription>
          
          <OffersTitle>What we offer:</OffersTitle>
          <OffersGrid>
            <OfferCard>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock assistance and guidance for all your fitness needs</p>
            </OfferCard>

            <OfferCard>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>1 on 1 Coaching</h3>
              <p>Personalized training sessions with expert coaches for maximum results</p>
            </OfferCard>

            <OfferCard>
              <div className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19h16"/>
                  <path d="M4 15h16"/>
                  <path d="M4 11h16"/>
                  <path d="M4 7h16"/>
                </svg>
              </div>
              <h3>Nutrition Plan</h3>
              <p>Customized nutrition guidance to complement your fitness journey</p>
            </OfferCard>
          </OffersGrid>
        </AboutContent>
      </AboutSection>

      <WhyJoinSection id="why-join">
        <WhyJoinTitle>Why Join Us?</WhyJoinTitle>
        <BenefitsGrid>
          <BenefitCard>
            <div className="icon">💪</div>
            <h3>State-of-the-Art Equipment</h3>
            <p>Access to premium fitness equipment and modern facilities for the best workout experience.</p>
          </BenefitCard>
          
          <BenefitCard>
            <div className="icon">👥</div>
            <h3>Expert Trainers</h3>
            <p>Our certified trainers provide personalized guidance to help you achieve your fitness goals.</p>
          </BenefitCard>
          
          <BenefitCard>
            <div className="icon">🎯</div>
            <h3>Flexible Plans</h3>
            <p>Choose from various membership options that suit your schedule and budget.</p>
          </BenefitCard>
        </BenefitsGrid>
      </WhyJoinSection>

      <PlansSection id="plan">
        <PlansTitle>Our Plans</PlansTitle>
        <PlansGrid>
          <PlanCard>
            <h3>Basic Plan</h3>
            <div className="price">₱1,500<span>/month</span></div>
            <ul>
              <li>Access to Gym Equipment</li>
              <li>Basic Fitness Assessment</li>
              <li>Locker Room Access</li>
              <li>Free Parking</li>
            </ul>
            <JoinButton onClick={() => navigate('/member/login')}>Join Now</JoinButton>
          </PlanCard>

          <PlanCard>
            <h3>Premium Plan</h3>
            <div className="price">₱2,500<span>/month</span></div>
            <ul>
              <li>All Basic Plan Features</li>
              <li>Personal Training Sessions</li>
              <li>Nutrition Consultation</li>
              <li>Access to Group Classes</li>
            </ul>
            <JoinButton onClick={() => navigate('/member/login')}>Join Now</JoinButton>
          </PlanCard>

          <PlanCard>
            <h3>Elite Plan</h3>
            <div className="price">₱3,500<span>/month</span></div>
            <ul>
              <li>All Premium Plan Features</li>
              <li>Unlimited PT Sessions</li>
              <li>Priority Booking</li>
              <li>Exclusive Member Events</li>
            </ul>
            <JoinButton onClick={() => navigate('/member/login')}>Join Now</JoinButton>
          </PlanCard>
        </PlansGrid>
      </PlansSection>

      <CoachesSection id="coaches">
        <CoachesTitle>COACHES</CoachesTitle>
        <CoachesGrid>
          <CoachCard>
            <div className="coach-image">
              <img src="/assets/coach-goku.jpg" alt="Coach Goku" />
            </div>
            <h3>Coach Goku</h3>
            <p>Strength & Conditioning</p>
          </CoachCard>

          <CoachCard>
            <div className="coach-image">
              <img src="/assets/coach-saitama.png" alt="Coach Saitama" />
            </div>
            <h3>Coach Martell</h3>
            <p>Fitness & Nutrition</p>
          </CoachCard>

          <CoachCard>
            <div className="coach-image">
              <img src="/assets/coach-jin.jpg" alt="Coach Jin" />
            </div>
            <h3>Coach Ansel</h3>
            <p>Personal Training</p>
          </CoachCard>
        </CoachesGrid>
      </CoachesSection>

      <LocationSection id="visit">
        <LocationTitle>VISIT OUR GYM</LocationTitle>
        <LocationContent>
          <MapContainer>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.2383692254427!2d120.99612!3d14.52145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMxJzE3LjIiTiAxMjDCsDU5JzQ2LjAiRQ!5e0!3m2!1sen!2sph!4v1629789876543!5m2!1sen!2sph"
              allowFullScreen=""
              loading="lazy"
              title="Gym Location"
            ></iframe>
          </MapContainer>

          <ContactInfo>
            <h3>VISIT OUR GYM</h3>
            
            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p>12TH ST. GENERAL MATHIA VILLAMOR AIR BASE PASAY CITY</p>
            </div>

            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p>Martel2008@yahoo.com</p>
            </div>

            <div className="contact-item">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p>09350417060</p>
            </div>

            <SocialLinks>
              <h4>OUR SOCIALS:</h4>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </SocialLinks>
          </ContactInfo>
        </LocationContent>
      </LocationSection>

      <Footer>
        <FooterContent>
          <FooterColumn>
            <h3>GYM</h3>
            <ul>
              <li><a href="#about">Why Join Us</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#coaches">Coaches</a></li>
              <li><a href="#visit">Inquiry</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>MEMBERS</h3>
            <ul>
              <li><a href="#plan">FAQs</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>CONTACT INFO</h3>
            <ul>
              <li>12TH ST. GENERAL MATHIA</li>
              <li>VILLAMOR AIR BASE</li>
              <li>PASAY CITY</li>
              <li>Phone: 09350417060</li>
              <li>Email: Martel2008@yahoo.com</li>
            </ul>
          </FooterColumn>

          <FooterColumn>
            <h3>FOLLOW US</h3>
            <ul>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </FooterColumn>
        </FooterContent>

        <Copyright>
          © {new Date().getFullYear()} Stamina Fitness. All rights reserved.
        </Copyright>
      </Footer>

      {/* I'll continue with the rest of the sections in the next message */}
    </LandingContainer>
  );
};

export default CSPLanding; 