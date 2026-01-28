(function() {
  'use strict';

  const WIDGET_VERSION = '1.0.0';

  class OctopusWidget {
    constructor(config) {
      this.boardId = config.boardId;
      this.containerId = config.container || 'octopus-widget';
      this.mode = config.mode || 'iframe'; // 'iframe' or 'inline'
      this.baseUrl = config.baseUrl || window.location.origin;

      this.init();
    }

    init() {
      const container = document.getElementById(this.containerId);

      if (!container) {
        console.error(`Octopus Widget: Container #${this.containerId} not found`);
        return;
      }

      if (this.mode === 'iframe') {
        this.createIframe(container);
      } else {
        this.createInline(container);
      }
    }

    createIframe(container) {
      const iframe = document.createElement('iframe');
      const params = new URLSearchParams({
        embedded: 'true',
      });

      iframe.src = `${this.baseUrl}/embed/${this.boardId}?${params}`;
      iframe.style.width = '100%';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '8px';

      container.appendChild(iframe);

      // Handle resize messages
      window.addEventListener('message', (event) => {
        if (event.origin === this.baseUrl && event.data.type === 'octopus-resize') {
          iframe.style.height = `${event.data.height}px`;
        }
      });
    }

    createInline(container) {
      // For inline mode, just redirect to the board
      window.location.href = `${this.baseUrl}/b/${this.boardId}`;
    }
  }

  // Expose globally
  window.OctopusWidget = OctopusWidget;

  // Auto-initialize from data attributes
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-octopus-board]').forEach(el => {
      new OctopusWidget({
        boardId: el.dataset.octopusBoard,
        container: el.id,
        mode: el.dataset.octopusMode || 'iframe',
      });
    });
  });
})();
