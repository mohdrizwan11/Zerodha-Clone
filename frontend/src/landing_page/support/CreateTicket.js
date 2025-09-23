import React, { useState } from "react";

function CreateTicket() {
  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState({});

  // Toggle function for sections
  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Support sections data
  const supportSections = [
    {
      key: 'account-opening',
      title: 'Account Opening',
      icon: 'fa-plus-circle',
      items: [
        'Resident individual',
        'Minor',
        'Non Resident Indian (NRI)',
        'Company, Partnership, HUF and LLP',
        'Glossary'
      ]
    },
    {
      key: 'your-account',
      title: 'Your Zerodha Account',
      icon: 'fa-user',
      items: [
        'Your Profile',
        'Account modification',
        'Client Master Report (CMR) and Depository Participant (DP)',
        'Nomination',
        'Transfer and conversion of securities'
      ]
    },
    {
      key: 'kite',
      title: 'Kite',
      icon: 'fa-bar-chart',
      items: [
        'IPO',
        'Trading FAQs',
        'Margin Trading Facility (MTF) and Margins',
        'Charts and orders',
        'Alerts and Nudges',
        'General'
      ]
    },
    {
      key: 'funds',
      title: 'Funds',
      icon: 'fa-credit-card-alt',
      items: [
        'Add money',
        'Withdraw money',
        'Add bank accounts',
        'eMandates'
      ]
    },
    {
      key: 'console',
      title: 'Console',
      icon: 'fa-circle-o',
      items: [
        'Portfolio',
        'Corporate actions',
        'Funds statement',
        'Reports',
        'Profile',
        'Segments'
      ]
    },
    {
      key: 'coin',
      title: 'Coin',
      icon: 'fa-circle-o-notch',
      items: [
        'Mutual funds',
        'National Pension Scheme (NPS)',
        'Fixed Deposit (FD)',
        'Features on Coin',
        'Payments and Orders',
        'General'
      ]
    }
  ];

  // Quick links data
  const quickLinks = [
    'Track account opening',
    'Track segment activation', 
    'Intraday margins',
    'Kite user manual'
  ];

  return (
    <div className="container">
      <div className="row p-5 mt-5 mb-5">
        
        {/* Main Support Sections - 8/12 width */}
        <div className="col-8">
          {supportSections.map((section) => (
            <div key={section.key} className="mb-3">
              <div 
                className="support-section-header p-3"
                onClick={() => toggleSection(section.key)}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.3s ease'
                }}
              >
                <h4 className="d-flex align-items-center justify-content-between mb-0">
                  <span>
                    <i className={`fa ${section.icon} me-3`} aria-hidden="true"></i> 
                    {section.title}
                  </span>
                  <i 
                    className={`fa ${expandedSections[section.key] ? 'fa-chevron-up' : 'fa-chevron-down'}`}
                    style={{ fontSize: '14px', color: '#666' }}
                    aria-hidden="true"
                  ></i>
                </h4>
              </div>
              
              {/* Collapsible content */}
              <div 
                className={`support-section-content ${expandedSections[section.key] ? 'expanded' : 'collapsed'}`}
                style={{
                  maxHeight: expandedSections[section.key] ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  backgroundColor: '#fff',
                  borderLeft: '1px solid #e9ecef',
                  borderRight: '1px solid #e9ecef',
                  borderBottom: expandedSections[section.key] ? '1px solid #e9ecef' : 'none',
                  borderRadius: expandedSections[section.key] ? '0 0 8px 8px' : '0'
                }}
              >
                <div className="p-3">
                  {section.items.map((item, index) => (
                    <div key={index} className="mb-2">
                      <a 
                        href="#" 
                        style={{ 
                          textDecoration: "none", 
                          color: '#387ed1',
                          display: 'block',
                          padding: '8px 12px',
                          borderRadius: '4px',
                          transition: 'all 0.2s ease',
                          fontSize: '14px'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f1f5f9';
                          e.target.style.color = '#2c5282';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#387ed1';
                        }}
                      >
                        {item}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links Sidebar - 4/12 width */}
        <div className="col-4">
          <div 
            className="quick-links-section p-4"
            style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              position: 'sticky',
              top: '20px'
            }}
          >
            <h4 className="mb-3" style={{ color: '#333', fontSize: '18px' }}>
              Quick Links
            </h4>
            <div className="quick-links-table">
              {quickLinks.map((link, index) => (
                <div key={index} className="mb-2">
                  <span style={{ color: '#666', marginRight: '8px', fontSize: '14px' }}>
                    {index + 1}.
                  </span>
                  <a 
                    href="#" 
                    style={{ 
                      textDecoration: "none", 
                      color: '#387ed1',
                      fontSize: '14px',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#2c5282'}
                    onMouseLeave={(e) => e.target.style.color = '#387ed1'}
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
