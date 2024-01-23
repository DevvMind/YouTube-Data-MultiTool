const API_KEY = 'INSERT API KEY HERE';
let CHANNEL_ID = '';
const REFRESH_RATE_MS = 5000; // Refresh rate in milliseconds (5 seconds in this example)

function getSubscriberCount() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const subscriberCount = data.items[0].statistics.subscriberCount;
      document.getElementById('subscriber-count').textContent = subscriberCount;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

function getChannelName() {
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${CHANNEL_ID}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const channelName = data.items[0].snippet.title;
      document.getElementById('channel-name').textContent = channelName;
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

// Initial call to get the channel name and subscriber count
getChannelName();
getSubscriberCount();

// Periodically update the subscriber count every REFRESH_RATE_MS
setInterval(getSubscriberCount, REFRESH_RATE_MS);

const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');
console.log('Referral source:', ref);
