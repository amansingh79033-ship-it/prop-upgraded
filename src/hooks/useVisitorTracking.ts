import { useEffect } from 'react';

const SLACK_WEBHOOK_URL = import.meta.env.VITE_SLACK_WEBHOOK_URL || '';
const APP_NAME = 'Propertyfie AI';

export const useVisitorTracking = (currentPage: string) => {

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // 1. Determine if it's a new or repeated customer
        const isRepeated = localStorage.getItem('p-visited') === 'true';
        if (!isRepeated) {
          localStorage.setItem('p-visited', 'true');
        }

        // 2. Session ID & Timestamp
        let sessionId = sessionStorage.getItem('p-session-id');
        if (!sessionId) {
          sessionId = `sess_${Math.random().toString(36).substring(2, 11)}`;
          sessionStorage.setItem('p-session-id', sessionId);
          sessionStorage.setItem('p-session-start', Date.now().toString());
        }
        
        const timestamp = new Date().toLocaleString();
        const sessionStart = parseInt(sessionStorage.getItem('p-session-start') || Date.now().toString());
        const sessionDuration = Math.round((Date.now() - sessionStart) / 1000) + 's';

        // 3. Device & Navigation
        // const device = navigator.userAgent;

        // 4. IP & Location (coordinates)
        let ip = 'Unknown';
        let coordinates = 'Unknown';
        let location = 'Unknown';

        try {
          // Using ipapi.co with a fallback to ipify + ip-api
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const data = await response.json();
            ip = data.ip || 'Unknown';
            coordinates = `${data.latitude}, ${data.longitude}` || 'Unknown';
            location = `${data.city}, ${data.region}, ${data.country_name}` || 'Unknown';
          } else {
            // Fallback to ipify for IP only
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            ip = ipData.ip;
          }
        } catch (error) {
          console.error('Geolocation failed, attempting fallback...', error);
          try {
             const ipRes = await fetch('https://api.ipify.org?format=json');
             const ipData = await ipRes.json();
             ip = ipData.ip;
          } catch (e) {}
        }

        // 5. Build Slack Payload
        const payload = {
          text: `🚀 *New Visitor on ${APP_NAME}*`,
          blocks: [
            {
              type: "header",
              text: {
                type: "plain_text",
                text: `📍 Visitor Alert: ${APP_NAME}`,
                emoji: true
              }
            },
            {
              type: "section",
              fields: [
                { type: "mrkdwn", text: `*Status:*\n${isRepeated ? 'Repeated 🔄' : 'New ✨'}` },
                { type: "mrkdwn", text: `*Page:*\n${currentPage || 'Home'}` },
                { type: "mrkdwn", text: `*IP:*\n${ip}` },
                { type: "mrkdwn", text: `*Location:*\n${location}` },
                { type: "mrkdwn", text: `*Coords:*\n${coordinates}` },
                { type: "mrkdwn", text: `*Duration:*\n${sessionDuration}` },
                { type: "mrkdwn", text: `*Session:*\n${sessionId}` },
                { type: "mrkdwn", text: `*Time:*\n${timestamp}` }
              ]
            }
          ]
        };

        // 6. Send to Slack
        // Using a more reliable way to send from browser
        const slackData = JSON.stringify(payload);
        
        // Try fetch first
        fetch(SLACK_WEBHOOK_URL, {
          method: 'POST',
          body: slackData,
          mode: 'no-cors'
        }).catch(() => {
          // Final fallback: sendBeacon
          if (navigator.sendBeacon) {
            navigator.sendBeacon(SLACK_WEBHOOK_URL, slackData);
          }
        });

      } catch (error) {
        console.error('Error in visitor tracking:', error);
      }
    };

    // Track on initial load and when currentPage changes
    trackVisitor();
  }, [currentPage]);
};
