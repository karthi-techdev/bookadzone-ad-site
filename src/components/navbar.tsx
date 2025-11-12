'use client'
import { FormEvent, useEffect, useState } from "react";
import { Pivot as Hamburger } from 'hamburger-react'
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../public/media/images/bookadzone-logo.png'
import mobilelogo from '../../public/media/images/ba-png.png'
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function Navbar() {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const [isScrolled, setIsScrolled] = useState(false);
      const [open, setOpen] = useState(false);
      const [activeSection, setActiveSection] = useState("home");
    
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
          
          const sections = ["home", "features", "how-it-works", "faqs"];
          const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
            return false;
          });
          
          if (currentSection) {
            setActiveSection(currentSection);
          }
        };
    
        window.addEventListener("scroll", handleScroll);
        
        const hash = window.location.hash.replace('#', '');
        if (hash && ["home", "features", "how-it-works", "faqs"].includes(hash)) {
          setActiveSection(hash);
        }
    
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
    
      const [showPopup, setShowPopup] = useState(false);
      const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
      const [touched, setTouched] = useState<{[key: string]: boolean}>({});
      const [isLoading, setIsLoading] = useState(false);
      const [formData, setFormData] = useState({
        fullName: '',
        companyName: '',
        position: '',
        email: '',
        profileType: 'Select Advertiser or Agency'
      });
            const handleBlur = (fieldName: string) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
        
        // Re-validate just this field
        const value = formData[fieldName as keyof typeof formData];
        const event = {
          target: { name: fieldName, value }
        } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
        
        handleChange(event);
      };

      const [lastValidation, setLastValidation] = useState<{[key: string]: 'required' | 'length' | 'format'}>({});

      const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;

        // Update form data first
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));

        // Mark field as touched
        setTouched(prev => ({
          ...prev,
          [name]: true
        }));

        // Validate the field using the common validation function
        const { error, validationType } = validateField(value, name);

        // Update validation state
        if (error && validationType) {
          setLastValidation(prev => ({ ...prev, [name]: validationType }));
          setFormErrors(prev => ({ ...prev, [name]: error }));
        } else {
          // Clear validation and errors for this field
          setLastValidation(prev => {
            const newValidation = { ...prev };
            delete newValidation[name];
            return newValidation;
          });
          setFormErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
      };

      const validateAllFields = () => {
        const form = document.querySelector('form') as HTMLFormElement;
        if (!form) return;

        const formData = new FormData(form);
        const validationErrors: {[key: string]: string} = {};
        const newValidation: {[key: string]: 'required' | 'length' | 'format'} = {};
        
        // Mark all fields as touched to show all errors
        const fields = ['fullName', 'companyName', 'position', 'email', 'profileType'];
        const newTouched = fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
        setTouched(newTouched);
        
        // Validate each field
        fields.forEach(field => {
          const value = formData.get(field)?.toString() || '';
          const { error, validationType } = validateField(value, field);
          if (error) {
            validationErrors[field] = error;
            if (validationType) {
              newValidation[field] = validationType;
            }
          }
        });

        setLastValidation(prev => ({ ...prev, ...newValidation }));

        // First pass: check for required errors
        fields.forEach(field => {
          const value = formData.get(field)?.toString().trim() || '';
          if (value === '') {
            switch(field) {
              case 'fullName':
              case 'companyName':
                validationErrors[field] = `${field === 'fullName' ? 'Full name' : 'Company name'} is required`;
                setLastValidation(prev => ({ ...prev, [field]: 'required' }));
                break;
              case 'position':
                validationErrors.position = 'Position is required';
                setLastValidation(prev => ({ ...prev, position: 'required' }));
                break;
              case 'email':
                validationErrors.email = 'Email is required';
                setLastValidation(prev => ({ ...prev, email: 'required' }));
                break;
              case 'profileType':
                if (!value || value === '' || value === 'Select Advertiser or Agency') {
                  validationErrors.profileType = 'Profile type is required';
                  setLastValidation(prev => ({ ...prev, profileType: 'required' }));
                }
                break;
            }
          }
        });

        // Second pass: check for other validation errors only if not already showing required error
        fields.forEach(field => {
          const value = formData.get(field)?.toString().trim() || '';
          if (value !== '' && !validationErrors[field]) {
            switch(field) {
              case 'fullName':
              case 'companyName':
                if (value.length < 2) {
                  validationErrors[field] = `${field === 'fullName' ? 'Full name' : 'Company name'} must be at least 2 characters long`;
                  setLastValidation(prev => ({ ...prev, [field]: 'length' }));
                }
                break;
              case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  validationErrors.email = 'Please enter a valid email';
                  setLastValidation(prev => ({ ...prev, email: 'format' }));
                }
                break;
            }
          }
        });

        setFormErrors(validationErrors);
      };

      const validateField = (value: string, fieldName: string) => {
        const trimmedValue = value.trim();
        let error = '';
        let validationType: Extract<typeof lastValidation[keyof typeof lastValidation], string> | undefined;

        // First check for required errors
        if (trimmedValue === '') {
          switch(fieldName) {
            case 'fullName':
            case 'companyName':
              error = `${fieldName === 'fullName' ? 'Full name' : 'Company name'} is required`;
              validationType = 'required';
              break;
            case 'position':
              error = 'Position is required';
              validationType = 'required';
              break;
            case 'email':
              error = 'Email is required';
              validationType = 'required';
              break;
            case 'profileType':
              if (value === 'Select Advertiser or Agency') {
                error = 'Profile type is required';
                validationType = 'required';
              }
              break;
          }
        }

        // Then check for other validation errors if no required error
        if (!error) {
          switch(fieldName) {
            case 'fullName':
            case 'companyName':
              if (trimmedValue.length < 2) {
                error = `${fieldName === 'fullName' ? 'Full name' : 'Company name'} must be at least 2 characters long`;
                validationType = 'length';
              }
              break;
            case 'email':
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                error = 'Please enter a valid email';
                validationType = 'format';
              }
              break;
            case 'profileType':
              if (value === 'Select Advertiser or Agency') {
                error = 'Profile type is required';
                validationType = 'required';
              }
              break;
          }
        }

        return { error, validationType };
      };
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        // Run validation before submission
        validateAllFields();
        
        // Check if there are any validation errors
        if (Object.keys(formErrors).length > 0) {
          return;
        }
        
        setIsLoading(true);
        
        // Create form values directly from state to avoid FormData processing
        const formValues = {
          fullName: formData.fullName.trim(),
          companyName: formData.companyName.trim(),
          position: formData.position.trim(),
          email: formData.email.trim().toLowerCase(),
          profileType: formData.profileType,
        };

          try {
            // Submit directly without separate validation
            const response = await fetch('/api/notify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formValues),
            });

            const responseData = await response.json().catch(() => ({}));

            if (!response.ok) {
              if (response.status === 409) {
                setFormErrors({ email: 'This email is already registered for notifications' });
                return;
              }
              
              if (responseData.errors) {
                setFormErrors(responseData.errors);
                return;
              }

              if (responseData.error) {
                console.error('Server error:', responseData.error);
                setFormErrors({ submit: responseData.error });
                return;
              }
              
              throw new Error('An unexpected error occurred. Please try again.');
            }
          
            // Check if there's a warning about email sending
            if (responseData.warning) {
              console.warn('Email warning:', responseData.warning);
            }
            
            // Success! Clear form and show success message
            setFormErrors({});
            setShowPopup(true);
            setFormData({
              fullName: '',
              companyName: '',
              position: '',
              email: '',
              profileType: 'Select Advertiser or Agency'
            });
            form.reset();

        } catch (error) {
          console.error('Error submitting form:', error);
          setFormErrors({
            submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
          });
        } finally {
          setIsLoading(false);
        }
      };
    
      const handleLinkClick = (section: string) => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      };
    
      const getLinkClass = (section: string) => {
        const baseClass = "transition-colors";
        const isActive = activeSection === section;
        return `${baseClass} ${isActive ? "text-[var(--purple-color)] font-semibold" : "text-white hover:text-[var(--purple-color)]"}`;
      };
    
      const getMobileLinkClass = (section: string) => {
        const baseClass = "transition-colors font-medium block py-3";
        const isActive = activeSection === section;
        return `${baseClass} ${isActive ? "text-[var(--purple-color)] font-semibold" : "text-white hover:text-[var(--purple-color)]"}`;
      };

    const menuItems = [
        { name: "Home", id: "home" },
        { name: "Features", id: "features" },
        { name: "How it works?", id: "how-it-works" },
        { name: "Faq&apos;s", id: "faqs" }
    ];

    return (
     <>
      <motion.div 
          className="navbar fixed top-0 w-full z-100000"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <nav className={`navbar bg-[var(--light-dark-color)] rounded-full mx-auto my-2 h-[3.75rem] px-4 md:px-8 py-3 md:py-2 flex items-center justify-between max-w-[100%] shadow-lg border border-[1px] border-[var(--light-blur-grey-color)] fixed top-[0.125rem] left-1/2 transform -translate-x-1/2 w-[98%] z-10000000 ${isScrolled ? "backdrop-blur-sm bg-opacity-95" : ""}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link 
                href="#home" 
                className="text-2xl font-bold text-white"
                onClick={() => handleLinkClick("home")}
              >
                <img className="hidden md:block w-[8.4375rem]" src={logo.src} alt="BookAdZone Logo" />
                <img className="block md:hidden w-[3.125rem]" src={mobilelogo.src} alt="BookAdZone" />
              </Link>
            </motion.div>

            <div className="hidden md:flex gap-[3rem] items-center font-medium">
              <div className="menu-wrapper text-[0.800rem] gap-[2rem] flex items-center w-fit flex justify-end ml-[1.875rem]">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link 
                      href={`#${item.id}`}
                      className={getLinkClass(item.id)}
                      onClick={() => handleLinkClick(item.id)}
                    >
                      {item.name === "Faq&apos;s" ? "Faq's" : item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.button 
                onClick={() => setOpen(true)}
                className="text-[0.875rem] text-white w-[8.125rem] p-[0.625rem] cursor-pointer rounded-[1.375rem] bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] transition-colors"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(127, 106, 247, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Get Notified
              </motion.button>
            </div>
            <div className="md:hidden relative">
              <Hamburger
                toggled={isMobileMenuOpen}
                toggle={setIsMobileMenuOpen} 
                color="white"
                size={24}
              />
            </div>
          </nav>

          {/* Mobile Menu with enhanced animations */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="mobile-menu fixed top-0 left-0 w-full backdrop-blur-[0.1875rem] h-screen bg-[#000000b3] relative z-50 flex flex-col p-30 gap-2 px-6"
              >
                {menuItems.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    <Link
                      href={`#${item.id}`}
                      className={getMobileLinkClass(item.id)}
                      onClick={() => handleLinkClick(item.id)}
                    >
                      {item.name === "Faq&apos;s" ? "Faq's" : item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  className="w-full mt-auto font-medium"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    className="w-full text-center text-white bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] py-3 rounded-[30px] text-sm transition-colors"
                    onClick={() => {
                      setOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Get Notified
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Get Notified Modal */}
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center z-50000000000 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-md"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: [0.4, 0, 0.2, 1],
                    scale: { type: "spring", stiffness: 300, damping: 30 }
                  }}
                  className="relative z-10 w-full max-w-md bg-[var(--light-dark-color)] border border-[var(--light-blur-grey-color)] rounded-xl p-6 shadow-2xl"
                >
                  <div className="text-center mb-6">
                    <motion.h2 
                      className="text-xl font-bold text-white"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      We&apos;re <span className="text-[var(--purple-color)]">Launching Soon&#33;</span>
                    </motion.h2>
                    <motion.p 
                      className="text-xs text-[var(--light-grey-color)] mt-1"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      Be the first to know when we go live
                    </motion.p>
                  </div>

                  <form 
                    className="space-y-2" 
                    onSubmit={handleSubmit} 
                    noValidate 
                    autoComplete="off"
                    onFocus={() => validateAllFields()} // Validate all fields when form gets focus
                    >
                    {[
                      { label: "Full Name", type: "text", placeholder: "Enter your full name", name: "fullName" },
                      { label: "Company Name", type: "text", placeholder: "Enter company name", name: "companyName" },
                      { label: "Position", type: "text", placeholder: "Enter your position", name: "position" },
                      { label: "Email Address", type: "email", placeholder: "Enter your email", name: "email" },
                      { label: "Profile Type", type: "select", options: ["Select Advertiser or Agency", "Advertiser", "Agency"], name: "profileType" }
                    ].map((field, index) => (
                      <motion.div
                        key={field.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 + 0.2 }}
                      >
                        <label className="block text-xs font-medium text-white mb-1.5">
                          {field.label}
                        </label>
                        {field.type === "select" ? (
                          <div>
                            <select 
                              name={field.name}
                              className={`w-full px-3 py-[0.688rem] text-xs rounded-lg bg-[var(--dark-color)] border ${formErrors[field.name] ? 'border-red-500' : 'border-[var(--light-blur-grey-color)]'} text-white focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200 ${formData[field.name as keyof typeof formData] === 'Select Advertiser or Agency' ? 'text-[var(--light-grey-color)]' : ''}`}
                              onChange={(e) => {
                                handleChange(e);
                                // Immediately mark as touched on change for select and validate
                                setTouched(prev => ({ ...prev, [field.name]: true }));
                                if (e.target.value === 'Select Advertiser or Agency') {
                                  setFormErrors(prev => ({
                                    ...prev,
                                    [field.name]: 'Profile type is required'
                                  }));
                                  setLastValidation(prev => ({ ...prev, [field.name]: 'required' }));
                                }
                              }}
                              onBlur={() => handleBlur(field.name)}
                              value={formData[field.name as keyof typeof formData]}
                            >
                              {field.options?.map(option => (
                                <option key={option} value={option} className="text-[var(--light-grey-color)]">
                                  {option}
                                </option>
                              ))}
                            </select>
                            <motion.p 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: formErrors[field.name] && touched[field.name] ? 1 : 0,
                                height: formErrors[field.name] && touched[field.name] ? 'auto' : 0
                              }}
                              className="text-red-500 text-[10px] px-1 min-h-[16px] transition-all duration-200"
                            >
                              {formErrors[field.name]}
                            </motion.p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <input
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={formData[field.name as keyof typeof formData]}
                              className={`w-full px-3 py-2.5 text-xs rounded-lg bg-[var(--dark-color)] border ${formErrors[field.name] && touched[field.name] ? 'border-red-500' : 'border-[var(--light-blur-grey-color)]'} text-white placeholder-[var(--light-grey-color)] focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:border-transparent transition-all duration-200`}
                              onChange={handleChange}
                              onBlur={() => handleBlur(field.name)}
                            />
                            <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ 
                                  opacity: formErrors[field.name] ? 1 : 0,
                                  height: formErrors[field.name] ? 'auto' : 0
                                }}
                                className="text-red-500 text-[10px] px-1 min-h-[16px] transition-all duration-200"
                              >
                                {formErrors[field.name] || ''}
                              </motion.p>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    {formErrors.submit && (
                      <p className="text-red-500 text-xs text-center">
                        {formErrors.submit}
                      </p>
                    )}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-3 rounded-lg bg-[var(--purple-color)] text-white text-xs font-semibold transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-[var(--purple-color)] focus:ring-offset-2 focus:ring-offset-[var(--light-dark-color)] shadow-lg mt-4 flex items-center justify-center gap-2 ${isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:bg-[var(--light-purple-color)]'}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        "Notify Me at Launch"
                      )}
                    </motion.button>
                  </form>

                  {/* Success Popup */}
                  <AnimatePresence>
                    {showPopup && (
                      <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <motion.div
                          className="bg-[var(--dark-color)] border border-[var(--light-blur-grey-color)] rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                          <h2 className="text-lg font-semibold text-white mb-2">
                            🎉 You&apos;re on the List!
                          </h2>
                          <p className="text-sm text-[var(--light-grey-color)] mb-4">
                            Thank you for your interest. We&apos;ll notify you as soon as we launch!
                          </p>
                          <button
                            onClick={() => setShowPopup(false)}
                            className="px-5 py-2 text-xs rounded-lg bg-[var(--purple-color)] hover:bg-[var(--light-purple-color)] text-white font-medium transition-all duration-200"
                          >
                            Close
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={() => setOpen(false)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full border border-[var(--light-blur-grey-color)] flex items-center justify-center text-[var(--light-grey-color)] hover:text-white hover:border-white transition-all duration-200 text-lg"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IoClose />
                  </motion.button>

                  <motion.div 
                    className="mt-5 text-center text-[var(--light-grey-color)] text-xs"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <p>Already <span className="text-[var(--purple-color)] font-semibold">356 Advertisers</span> and <span className="text-[var(--purple-color)] font-semibold">127 Agencies</span> have subscribed.</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-[5rem] md:h-[4rem]"></div>
        </motion.div>

        <motion.div 
          className="fixed top-0 inset-0 bg-[url('/media/images/blurry-hero-animated.svg')] h-[100dvh] w-full bg-cover bg-no-repeat bg-center blur-[8rem] z-[-1000] opacity-50"
          animate={{ 
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
     </>
    )
}