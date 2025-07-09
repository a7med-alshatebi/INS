document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/instagram');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        displayPosts(data.data);
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('gallery').classList.add('hidden');
    }
});

function displayPosts(posts) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear loading state
    
    if (!posts || posts.length === 0) {
        gallery.innerHTML = '<p class="text-center col-span-3 py-12 text-gray-500">No posts found.</p>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'gallery-item bg-white rounded-lg shadow-md overflow-hidden';
        postElement.innerHTML = `
            <a href="${post.permalink}" target="_blank" rel="noopener noreferrer">
                <img 
                    src="${post.media_url}" 
                    alt="${post.caption || 'Instagram post'}"
                    class="instagram-post w-full h-64 object-cover"
                    loading="lazy"
                >
                <div class="p-4">
                    <p class="text-gray-700 truncate">${post.caption || ''}</p>
                    <div class="mt-3 flex justify-between items-center">
                        <span class="text-xs text-gray-500">View on Instagram</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </div>
                </div>
            </a>
        `;
        gallery.appendChild(postElement);
    });
}
