document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const rssUrl = 'https://tabyjudo.se/Home/NewsRss'; //Behövs för att hämta RSS-flödet om vi vill använda laget fortsatt
    const maxNewsItems = 3; // Maximala antal nyheter att visa
    
    // Fetch the RSS feed
    fetch(rssUrl)
        .then(response => response.text())
        .then(data => {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'text/xml');
            
            newsContainer.innerHTML = '';
            
            // Hämta alla nyheter
            const items = xmlDoc.querySelectorAll('item');
            
            if (items.length === 0) {
                newsContainer.innerHTML = '<p>Inga nyheter hittades</p>';
                return;
            }
            
            //Ta de n senaste nyheterna
            const recentItems = Array.from(items).slice(0, maxNewsItems);
            
            recentItems.forEach(item => {
                const title = item.querySelector('title')?.textContent || 'Ingen titel tillgänglig.';
                const link = item.querySelector('link')?.textContent || '#';
                const description = item.querySelector('description')?.textContent || 'Ingen beskrivning tillgänglig.';
                const pubDate = item.querySelector('pubDate')?.textContent || 'Inget datum tillgängligt.';

                const formattedDate = pubDate !== 'Inget datum tillgängligt.' ? new Date(pubDate).toLocaleDateString() : pubDate;
                
                // HTML ELEMENT
                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <div class="news-title">
                        ${title}
                    </div>
                    <div class="news-source">
                        <a href="${link}" target="_blank">Läs mer <i class="fas fa-external-link-alt"></i></a>
                    </div>
                    <div class="news-date">${formattedDate}</div>
                    <div class="news-description">${description}</div>
                `;
                
                newsContainer.appendChild(newsItem);
            });
        })
        .catch(error => {
            newsContainer.innerHTML = `<p>Kunde inte hämta nyheter. Testa att ladda om sidan eller använd Laget-Appen. Information publiceras ofta också på Täby Judoklubbs Facebook- och Instagramsidor</p>`;
            console.error('Error fetching RSS feed:', error);
        });
});
