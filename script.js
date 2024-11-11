const factApiUrl = 'https://uselessfacts.jsph.pl/random.json?language=en';
const videoApiUrl = 'https://pixabay.com/api/videos/?key=47019390-6889d1805ab0c476cb894cdc4&q=fun&orientation=vertical&per_page=20';
const maxFactLength = 120; // Limit to fit on screen

const factElement = document.getElementById('fact');
const videoElement = document.getElementById('background-video');

// Function to fetch random fact
async function fetchFact() {
    try {
        const response = await fetch(factApiUrl);
        const data = await response.json();
        const fact = data.text;

        // Check the fact length to ensure it fits on the screen
        if (fact.length <= maxFactLength) {
            factElement.textContent = fact;
        } else {
            fetchFact(); // Fetch another fact if too long
        }
    } catch (error) {
        factElement.textContent = "Oops! Couldn't load fact.";
        console.error('Error fetching fact:', error);
    }
}

// Function to fetch random video
async function fetchVideo() {
    try {
        const response = await fetch(videoApiUrl);
        const data = await response.json();
        const videos = data.hits;

        if (videos.length > 0) {
            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            const videoUrl = randomVideo.videos.small.url;
            videoElement.src = videoUrl;
        } else {
            console.error('No videos found');
        }
    } catch (error) {
        console.error('Error fetching video:', error);
    }
}

// Function to fetch new fact and video on tap
function fetchFactAndVideo() {
    fetchFact();
    fetchVideo();
}

// Initial fetch
fetchFactAndVideo();
