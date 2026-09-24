// Google Analytics 4 + CV download tracking
// Replace the value below with your GA4 Measurement ID (format: G-XXXXXXXXXX).
(function () {
  'use strict';

  const GA_MEASUREMENT_ID = 'G-Q9RC39CYXN';
  const isConfigured =
    /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID) &&
    !GA_MEASUREMENT_ID.includes('REPLACE');

  if (!isConfigured) {
    // Analytics stays safely disabled until a real GA4 Measurement ID is added.
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src =
    'https://www.googletagmanager.com/gtag/js?id=' +
    encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(gaScript);

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true
  });

  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href]');
    if (!link) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch (_) {
      return;
    }

    const pathname = url.pathname.toLowerCase();
    const fileName = decodeURIComponent(pathname.split('/').pop() || '');
    const linkText = (link.textContent || '').trim();
    const isDocument = /\.(pdf|doc|docx)$/i.test(pathname);
    const looksLikeCv =
      /(^|[-_\s])cv($|[-_\s.])/i.test(fileName) ||
      /curriculum[-_\s]?vitae/i.test(fileName) ||
      /\bcv\b|curriculum vitae/i.test(linkText);

    if (isDocument && looksLikeCv) {
      window.gtag('event', 'cv_download', {
        file_name: fileName,
        link_url: url.href,
        link_text: linkText,
        page_path: window.location.pathname,
        transport_type: 'beacon'
      });
    }
  });
})();
