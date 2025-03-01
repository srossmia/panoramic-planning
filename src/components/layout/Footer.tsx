// /src/components/layout/Footer.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PopupModal } from 'react-calendly';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      setRootElement(root);
    } else {
      console.error('Root element not found');
    }
  }, []);

  const openCalendlyPopup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsCalendlyOpen(true);
  };

  const closeCalendlyPopup = () => {
    setIsCalendlyOpen(false);
  };

  return (
    <>
      <footer className="bg-white text-black border-t border-gray-200">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Panoramic Planning
              </h3>
              <p className="mb-2">
                Comprehensive financial planning for your future.
              </p>
              <p>© {currentYear} Panoramic Planning. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row md:items-center mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-4">
              <a
                href="#"
                onClick={openCalendlyPopup}
                className="hover:text-gray-600 cursor-pointer"
              >
                Schedule Time
              </a>
              <Link href="/privacy-policy" className="hover:text-gray-600">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-gray-600">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="mt-6 text-sm">
            <p>
              <Link
                href="https://www.lpl.com/content/dam/lpl-www/documents/disclosures/lpl-financial-relationship-summary.pdf"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                LPL Financial Form CRS
              </Link>
            </p>
            <p className="mt-2">
              Check the background of your financial professional on FINRA&apos;s{' '}
              <Link
                href="https://brokercheck.finra.org/"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                BrokerCheck
              </Link>
              .
            </p>
            <p className="mt-4">
              The content is developed from sources believed to be providing
              accurate information. The information in this material is not
              intended as tax or legal advice. Please consult legal or tax
              professionals for specific information regarding your individual
              situation. The opinions expressed and material provided are for
              general information, and should not be considered a solicitation for
              the purchase or sale of any security.
            </p>
            <p className="mt-4">
              We take protecting your data and privacy very seriously. As of
              January 1, 2020, the{' '}
              <Link
                href="https://www.caprivacy.org/"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                California Consumer Privacy Act (CCPA)
              </Link>{' '}
              suggests the following link as an extra measure to safeguard your
              data:{' '}
              <Link
                href="https://www.panoramicfs.com/donotsellmypersonalinformation"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                Do not sell my personal information
              </Link>
              .
            </p>
            <p className="mt-4">
              Securities and advisory services offered through LPL Financial, a
              Registered Investment Advisor, Member{' '}
              <Link
                href="http://www.finra.org/"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                FINRA
              </Link>{' '}
              &{' '}
              <Link
                href="https://www.sipc.org/"
                target="_blank"
                className="underline hover:text-gray-600"
              >
                SIPC
              </Link>
              .
            </p>
            <p className="mt-4">
              The financial professionals associated with LPL Financial may
              discuss and/or transact business only with residents of the states
              in which they are properly registered or licensed. No offers may be
              made or accepted from any resident of any other state.
            </p>
          </div>
        </div>
      </footer>
      {isCalendlyOpen && rootElement && (
        <PopupModal
          url="https://calendly.com/panoramic-planning"
          onModalClose={closeCalendlyPopup}
          open={isCalendlyOpen}
          rootElement={rootElement}
        />
      )}
    </>
  );
};

export default Footer;
