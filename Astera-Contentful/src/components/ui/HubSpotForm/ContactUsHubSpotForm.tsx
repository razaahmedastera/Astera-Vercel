'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface ContactUsHubSpotFormProps {
  formId: string;
  portalId?: string;
  containerId: string;
  scriptId?: string;
  eventName?: string;
  showLabels?: boolean;
  submitButtonAlign?: 'left' | 'center' | 'right';
  submitButtonFullWidth?: boolean;
  className?: string;
  onFormSubmit?: () => void;
  onFormReady?: ($form: any) => void;
}

export default function ContactUsHubSpotForm({
  formId,
  portalId = '6926702',
  containerId,
  scriptId,
  eventName,
  showLabels = true,
  submitButtonAlign = 'right',
  submitButtonFullWidth = false,
  className = '',
  onFormSubmit,
  onFormReady,
}: ContactUsHubSpotFormProps) {
  const uniqueScriptId = scriptId || `hubspot-forms-script-${containerId}`;
  const uniqueEventName = eventName || `hubspot-${containerId}-loaded`;

  useEffect(() => {
    // Inject HubSpot form styles
    const styleId = `hubspot-${containerId}-styles`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Contact Us Form - Scoped to parent class */
        .contact-us-hubspot-form {
          width: 100% !important;
        }
        /* Base container - override HubSpot default max-width */
        .contact-us-hubspot-form .hubspot-form-wrapper {
          width: 100% !important;
        }
        .contact-us-hubspot-form .hubspot-form-wrapper * {
          max-width: 100% !important;
        }
        .contact-us-hubspot-form #${containerId} {
          padding: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        .contact-us-hubspot-form #${containerId} *:not(input[type="submit"]):not(.hs-button):not(button) {
          max-width: 100% !important;
        }
        .contact-us-hubspot-form #${containerId} form,
        .contact-us-hubspot-form #${containerId} .hs-form,
        .contact-us-hubspot-form #${containerId} .hs-form-private {
          font-family: 'Poppins', sans-serif !important;
          width: 100% !important;
          max-width: 100% !important;
        }
        #${containerId} .hs-form fieldset,
        #${containerId} fieldset,
        #${containerId} .hs-form fieldset.form-columns-1,
        #${containerId} .hs-form fieldset.form-columns-2,
        [class*="hs-form-"] fieldset {
          width: 100% !important;
          max-width: 100% !important;
          border: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        #${containerId} .hs-form fieldset.form-columns-1 .hs-form-field,
        #${containerId} .hs-form fieldset.form-columns-1 .input {
          width: 100% !important;
          max-width: 100% !important;
        }
        
        /* Labels - ${showLabels ? 'Show' : 'Hide'} */
        #${containerId} .hs-form-field > label {
          ${showLabels 
            ? `display: block !important;
          font-family: 'Poppins', sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #374151 !important;
          margin-bottom: 8px !important;`
            : `display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;`}
        }
        #${containerId} .hs-form-field > label .hs-form-required {
          color: #005CCC !important;
          margin-left: 2px !important;
        }
        
        /* Field containers */
        #${containerId} .hs-form-field {
          margin-bottom: ${showLabels ? '20px' : '12px'} !important;
        }
        #${containerId} .hs_submit {
          margin-top: 24px !important;
          clear: both !important;
        }
        #${containerId} .hs_submit .actions {
          text-align: ${submitButtonAlign} !important;
        }
        
        /* All input types - Exclude phone field inputs */
        #${containerId} input[type="text"],
        #${containerId} input[type="email"],
        #${containerId} input[type="number"],
        #${containerId} input[type="password"],
        #${containerId} textarea,
        #${containerId} .hs-input:not(.hs-fieldtype-phonenumber .hs-input):not(.hs_phone .hs-input) {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          padding: 12px 16px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 6px !important;
          font-size: 15px !important;
          font-family: 'Poppins', sans-serif !important;
          transition: all 0.15s ease !important;
          background-color: #fff !important;
          color: #1f2937 !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        /* Select dropdowns - Exclude phone field selects */
        #${containerId} select:not(.hs-fieldtype-phonenumber select):not(.hs_phone select):not([class*="hs_phone"] select) {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
          padding: 12px 16px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 6px !important;
          font-size: 15px !important;
          font-family: 'Poppins', sans-serif !important;
          transition: all 0.15s ease !important;
          background-color: #fff !important;
          color: #1f2937 !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
        }
        
        /* Hover state - Exclude phone field inputs */
        #${containerId} input[type="text"]:hover,
        #${containerId} input[type="email"]:hover,
        #${containerId} input[type="number"]:hover,
        #${containerId} input[type="password"]:hover,
        #${containerId} textarea:hover,
        #${containerId} .hs-input:hover:not(.hs-fieldtype-phonenumber .hs-input):not(.hs_phone .hs-input) {
          border-color: #d1d5db !important;
        }
        #${containerId} select:hover:not(.hs-fieldtype-phonenumber select):not(.hs_phone select):not([class*="hs_phone"] select) {
          border-color: #d1d5db !important;
        }
        
        /* Focus state - Exclude phone field inputs */
        #${containerId} input[type="text"]:focus,
        #${containerId} input[type="email"]:focus,
        #${containerId} input[type="number"]:focus,
        #${containerId} input[type="password"]:focus,
        #${containerId} textarea:focus,
        #${containerId} .hs-input:focus:not(.hs-fieldtype-phonenumber .hs-input):not(.hs_phone .hs-input) {
          outline: none !important;
          border-color: #005CCC !important;
          box-shadow: 0 0 0 3px rgba(0, 92, 204, 0.08) !important;
        }
        #${containerId} select:focus:not(.hs-fieldtype-phonenumber select):not(.hs_phone select):not([class*="hs_phone"] select) {
          outline: none !important;
          border-color: #005CCC !important;
          box-shadow: 0 0 0 3px rgba(0, 92, 204, 0.08) !important;
        }
        
        /* Placeholder */
        #${containerId} input::placeholder,
        #${containerId} textarea::placeholder,
        #${containerId} .hs-input::placeholder {
          color: #9ca3af !important;
          opacity: 1 !important;
        }
        
        /* Textarea */
        #${containerId} textarea,
        #${containerId} textarea.hs-input {
          min-height: 100px !important;
          resize: vertical !important;
          line-height: 1.5 !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        
        /* Select dropdown */
        #${containerId} select,
        #${containerId} select.hs-input {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          background-size: 16px !important;
          padding-right: 40px !important;
          cursor: pointer !important;
        }
        
        /* Submit button - Brand Guidelines: 51px height */
        #${containerId} input[type="submit"],
        #${containerId} .hs-button,
        #${containerId} button[type="submit"] {
          width: ${submitButtonFullWidth ? '100%' : 'auto'} !important;
          min-width: ${submitButtonFullWidth ? '100%' : '140px'} !important;
          height: 51px !important;
          padding: 0 32px !important;
          background: #005ccc !important;
          color: #fff !important;
          border: none !important;
          border-radius: 10px !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          float: ${submitButtonAlign === 'right' ? 'right' : submitButtonAlign === 'left' ? 'left' : 'none'} !important;
        }
        
        #${containerId} input[type="submit"]:hover,
        #${containerId} .hs-button:hover,
        #${containerId} button[type="submit"]:hover {
          background: #004ba3 !important;
          transform: translateY(-1px) !important;
        }
        
        /* Mobile - Full width submit button */
        @media (max-width: 639px) {
          #${containerId} input[type="submit"],
          #${containerId} .hs-button,
          #${containerId} button[type="submit"] {
            width: 100% !important;
            float: none !important;
          }
          #${containerId} .hs_submit .actions {
            text-align: center !important;
          }
        }
        
        /* Error messages */
        #${containerId} .hs-error-msgs,
        #${containerId} .hs-error-msg {
          color: #dc2626 !important;
          font-size: 13px !important;
          margin-top: 6px !important;
          font-family: 'Poppins', sans-serif !important;
        }
        #${containerId} .hs-error-msgs label {
          position: static !important;
          width: auto !important;
          height: auto !important;
          clip: auto !important;
          overflow: visible !important;
          color: #dc2626 !important;
          font-size: 13px !important;
          ${showLabels ? '' : 'display: block !important; visibility: visible !important;'}
        }
        
        /* Two column for names - Desktop */
        @media (min-width: 640px) {
          #${containerId} .hs_firstname,
          #${containerId} .hs_lastname {
            display: inline-block !important;
            width: calc(50% - 8px) !important;
            vertical-align: top !important;
          }
          #${containerId} .hs_firstname {
            margin-right: 16px !important;
          }
        }
        
        /* Phone field layout - Country code and phone in one unified field */
        #${containerId} .hs-fieldtype-phonenumber,
        #${containerId} .hs_phone,
        #${containerId} [class*="hs_phone"] {
          width: 100% !important;
          display: block !important;
        }
        /* Fieldset containing phone field - make it flex */
        #${containerId} fieldset.form-columns-3,
        #${containerId} fieldset.form-columns-3:has(.hs-fieldtype-phonenumber),
        #${containerId} fieldset.form-columns-3:has(.hs_phone),
        #${containerId} fieldset.form-columns-3:has([class*="hs_phone"]),
        #${containerId} fieldset:has(.hs-fieldtype-phonenumber),
        #${containerId} fieldset:has(.hs_phone),
        #${containerId} fieldset:has([class*="hs_phone"]) {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          gap: 0 !important;
          align-items: stretch !important;
          width: 100% !important;
        }
        /* Phone field form field wrapper - ensure horizontal layout */
        #${containerId} .hs-fieldtype-phonenumber.hs-form-field,
        #${containerId} .hs_phone.hs-form-field,
        #${containerId} [class*="hs_phone"].hs-form-field {
          display: block !important;
          width: 100% !important;
        }
        /* Phone field container - single unified border with flex display */
        #${containerId} .hs-fieldtype-phonenumber .input,
        #${containerId} .hs_phone .input,
        #${containerId} [class*="hs_phone"] .input {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          gap: 0 !important;
          align-items: stretch !important;
          width: 100% !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 6px !important;
          overflow: hidden !important;
          background-color: #fff !important;
          box-sizing: border-box !important;
        }
        /* Ensure all direct children use flex display */
        #${containerId} .hs-fieldtype-phonenumber .input > *,
        #${containerId} .hs_phone .input > *,
        #${containerId} [class*="hs_phone"] .input > * {
          display: flex !important;
          flex-shrink: 0 !important;
        }
        /* Country dropdown - first part of unified field */
        #${containerId} .hs-fieldtype-phonenumber select,
        #${containerId} .hs_phone select,
        #${containerId} [class*="hs_phone"] select {
          width: 140px !important;
          min-width: 140px !important;
          max-width: 140px !important;
          flex-shrink: 0 !important;
          border: none !important;
          border-right: none !important;
          border-radius: 0 !important;
          padding: 12px 16px !important;
          background-color: #fff !important;
          font-size: 15px !important;
          font-family: 'Poppins', sans-serif !important;
          color: #1f2937 !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          appearance: none !important;
          box-shadow: none !important;
          display: block !important;
        }
        /* Country code input - second part of unified field with margin */
        .contact-us-hubspot-form #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:first-of-type,
        .contact-us-hubspot-form #${containerId} .hs_phone input[type="tel"]:first-of-type,
        .contact-us-hubspot-form #${containerId} [class*="hs_phone"] input[type="tel"]:first-of-type {
          width: 80px !important;
          min-width: 80px !important;
          max-width: 80px !important;
          flex-shrink: 0 !important;
          border: none !important;
          border-right: none !important;
          border-radius: 0 !important;
          padding: 12px 16px !important;
          margin: 0 10px !important;
          background-color: #f9fafb !important;
          font-size: 15px !important;
          font-family: 'Poppins', sans-serif !important;
          color: #1f2937 !important;
          box-shadow: none !important;
          display: block !important;
        }
        /* Middle field (country code) form field wrapper - add margin */
        .contact-us-hubspot-form #${containerId} .hs-fieldtype-phonenumber.hs-form-field.field,
        .contact-us-hubspot-form #${containerId} .hs_phone.hs-form-field.field,
        .contact-us-hubspot-form #${containerId} [class*="hs_phone"].hs-form-field.field {
          margin: 0px !important;
        }
        /* Phone number input - third part of unified field */
        .contact-us-hubspot-form #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:last-of-type,
        .contact-us-hubspot-form #${containerId} .hs_phone input[type="tel"]:last-of-type,
        .contact-us-hubspot-form #${containerId} [class*="hs_phone"] input[type="tel"]:last-of-type {
          flex: 1 !important;
          min-width: 100% !important;
          border: none !important;
          border-radius: 0 !important;
          padding: 12px 16px !important;
          margin: 0 !important;
          background-color: #fff !important;
          font-size: 15px !important;
          font-family: 'Poppins', sans-serif !important;
          color: #1f2937 !important;
          box-shadow: none !important;
          display: block !important;
        }
        /* Remove hover/focus effects from individual phone inputs */
        #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:hover,
        #${containerId} .hs_phone input[type="tel"]:hover,
        #${containerId} [class*="hs_phone"] input[type="tel"]:hover,
        #${containerId} .hs-fieldtype-phonenumber select:hover,
        #${containerId} .hs_phone select:hover,
        #${containerId} [class*="hs_phone"] select:hover {
          border-color: transparent !important;
          box-shadow: none !important;
        }
        #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:focus,
        #${containerId} .hs_phone input[type="tel"]:focus,
        #${containerId} [class*="hs_phone"] input[type="tel"]:focus,
        #${containerId} .hs-fieldtype-phonenumber select:focus,
        #${containerId} .hs_phone select:focus,
        #${containerId} [class*="hs_phone"] select:focus {
          border-color: transparent !important;
          box-shadow: none !important;
          outline: none !important;
        }
        /* Focus state for the combined field */
        #${containerId} .hs-fieldtype-phonenumber .input:focus-within,
        #${containerId} .hs_phone .input:focus-within,
        #${containerId} [class*="hs_phone"] .input:focus-within {
          border-color: #005CCC !important;
          box-shadow: 0 0 0 3px rgba(0, 92, 204, 0.08) !important;
        }
        
        /* Mobile - Stack all fields */
        @media (max-width: 639px) {
          #${containerId} .hs_firstname,
          #${containerId} .hs_lastname {
            display: block !important;
            width: 100% !important;
            margin-right: 0 !important;
          }
          #${containerId} .hs-fieldtype-phonenumber .input,
          #${containerId} .hs_phone .input,
          #${containerId} [class*="hs_phone"] .input {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 0 !important;
          }
          #${containerId} .hs-fieldtype-phonenumber .input > *,
          #${containerId} .hs_phone .input > *,
          #${containerId} [class*="hs_phone"] .input > * {
            display: inline-block !important;
          }
          #${containerId} .hs-fieldtype-phonenumber select,
          #${containerId} .hs_phone select,
          #${containerId} [class*="hs_phone"] select {
            width: 120px !important;
            min-width: 120px !important;
            max-width: 120px !important;
            border-right: 1px solid #e5e7eb !important;
            border-radius: 0 !important;
          }
          #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:first-of-type,
          #${containerId} .hs_phone input[type="tel"]:first-of-type,
          #${containerId} [class*="hs_phone"] input[type="tel"]:first-of-type {
            width: 70px !important;
            min-width: 70px !important;
            max-width: 70px !important;
            border-right: 1px solid #e5e7eb !important;
            border-radius: 0 !important;
          }
          #${containerId} .hs-fieldtype-phonenumber input[type="tel"]:last-of-type,
          #${containerId} .hs_phone input[type="tel"]:last-of-type,
          #${containerId} [class*="hs_phone"] input[type="tel"]:last-of-type {
            flex: 1 !important;
            border-radius: 0 !important;
          }
        }
        
        /* Privacy text */
        #${containerId} .hs-richtext {
          font-size: 13px !important;
          color: #6b7280 !important;
          line-height: 1.5 !important;
          margin-bottom: 16px !important;
        }
        #${containerId} .hs-richtext p {
          margin: 0 !important;
        }
        
        /* reCAPTCHA */
        #${containerId} .hs_recaptcha {
          margin: 20px 0 !important;
        }
        
        /* Remove default HubSpot margins */
        #${containerId} .input {
          margin-right: 0 !important;
          width: 100% !important;
        }
        #${containerId} .hs-form-field > .input {
          margin-right: 0 !important;
          width: 100% !important;
        }
        #${containerId} .hs-form-field {
          width: 100% !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Function to create HubSpot form
    const createHubSpotForm = () => {
      const container = document.getElementById(containerId);
      if (container && (window as any).hbspt) {
        // Clear any existing form
        container.innerHTML = '';
        (window as any).hbspt.forms.create({
          portalId,
          formId,
          target: `#${containerId}`,
          onFormSubmit: onFormSubmit || undefined,
          onFormReady: onFormReady || undefined,
        });
      }
    };

    // Listen for script load event
    const handleScriptLoad = () => {
      setTimeout(createHubSpotForm, 100);
    };

    window.addEventListener(uniqueEventName, handleScriptLoad);

    // Check immediately if already loaded
    if ((window as any).hbspt?.forms?.create) {
      setTimeout(createHubSpotForm, 100);
    }

    // Cleanup
    return () => {
      window.removeEventListener(uniqueEventName, handleScriptLoad);
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [formId, portalId, containerId, uniqueEventName, onFormSubmit, onFormReady]);

  return (
    <>
      {/* HubSpot Script - Optimized with next/script */}
      <Script
        src="https://js.hsforms.net/forms/v2.js"
        strategy="lazyOnload"
        id={uniqueScriptId}
        onLoad={() => {
          const event = new Event(uniqueEventName);
          window.dispatchEvent(event);
        }}
      />
      <div className="contact-us-hubspot-form">
        <div
          id={containerId}
          className={`hubspot-form-wrapper w-full ${className}`}
        >
          {/* HubSpot form will be injected here */}
        </div>
      </div>
    </>
  );
}
