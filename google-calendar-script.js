// Replace with your API key and Calendar ID
const API_KEY = 'AIzaSyClBnzW9Cp8xjvswlGSS_P_Yq6iiEPazEs';
const CALENDAR_ID = 'a32c726588b994f14f5fc087d91f7f292e7f33fc83b7a29fb92d1ae127572e1b@group.calendar.google.com';

function handleClientLoad() {
  gapi.load('client', () => {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    }).then(() => {
      listUpcomingEvents();
    }, (error) => {
      console.error("Error initializing Google Client:", error);
      displayError("Failed to initialize Google API. Check the console for details.");
    });
  });
}

function listUpcomingEvents() {
  gapi.client.calendar.events.list({
    'calendarId': CALENDAR_ID,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    displayEvents(events);
  }, function(reason) {
    console.error('Error: ' + reason.result.error.message);
    displayError("Failed to fetch calendar events. Check the console for details.");
  });
}

function displayEvents(events) {
  const eventsList = document.getElementById('events-list');
  eventsList.innerHTML = '';

  if (events.length > 0) {
    events.forEach(event => {




      const eventItem = document.createElement('div');
      const summary = event.summary || "No Title";
      //const image = "https://show-bucket-1.s3.us-east-2.amazonaws.com/band.jpg"
      //console.log(image);
      const description = event.description || '';
      const formattedDate = formatDate(event.start.dateTime);
      eventItem.innerHTML = 
        `<div class="event">
                <div class="event-details">
                    <div style="font-size:25px;font-weight:bold">${summary}</div>
                    <span style="font-size:20px;">${description}</span>
                    <div style="font-size:15px;">${formattedDate.monthDay}</div>
                    <div style="font-size:15px;">Doors: ${formattedDate.time} </div>
                    <div style="font-size:15px;">21+, $10 cash at door</div>
                </div>
            </div>`
      eventsList.appendChild(eventItem);
    });
  } else {
    eventsList.innerHTML = "<li>No upcoming events found.</li>";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const month = date.getMonth();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const monthDay = `${months[month]} ${date.getDate()}`
  console.log(date.getDate())
  const time = date.toLocaleTimeString([], {timeStyle: "short"});
  const dateSeparated = {
    'monthDay': monthDay,
    'time': time
  }
  return dateSeparated; 
}

function displayError(message) {
  const errorDiv = document.getElementById('error-message');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}


// // Load the Google API client library.  This is now inside the HTML.
// script.src = 'https://apis.google.com/js/api.js';
// script.onload = handleClientLoad;
// document.body.appendChild(script);
