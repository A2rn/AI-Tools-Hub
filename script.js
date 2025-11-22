
document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cards');
  const categoriesContainer = document.getElementById('categories');
  const searchInput = document.getElementById('searchInput');
  const yearSpan = document.getElementById('year');
  yearSpan.textContent = new Date().getFullYear();

  // Embed data directly to avoid fetch restrictions on file:// protocol
  const tools = [
    {
      "id": "chatgpt",
      "name": "ChatGPT",
      "categories": ["ChatBot", "Writing", "Education"],
      "description": "ChatGPT is an AI language model that can answer questions, write essays and stories, and converse on a wide range of topics. It is popular with students and professionals for tutoring, brainstorming and content creation.",
      "affiliate": "https://openai.com",
      "image": "images/chatgpt.png"
    },
    {
      "id": "jasper",
      "name": "Jasper AI",
      "categories": ["Writing", "Marketing", "Content"],
      "description": "Jasper is an AI writing assistant that helps marketers, bloggers and businesses generate articles, emails and advertising copy. It leverages large language models to produce marketing copy quickly, with templates for blogs, product descriptions and social media posts.",
      "affiliate": "https://www.jasper.ai",
      "image": "images/jasper.png"
    },
    {
      "id": "synthesia",
      "name": "Synthesia",
      "categories": ["Video", "Marketing", "Avatar"],
      "description": "Synthesia is a platform that uses AI to turn written scripts into videos with talking digital avatars. Users can create training, marketing or explainer videos without cameras or actors.",
      "affiliate": "https://www.synthesia.io",
      "image": "images/synthesia.png"
    },
    {
      "id": "murf",
      "name": "Murf AI",
      "categories": ["Voice", "Audio", "Narration"],
      "description": "Murf is an AI voice generator that transforms text into natural‑sounding speech. It offers a library of voices in multiple languages and tones, making it useful for creating voiceovers for videos, presentations and podcasts.",
      "affiliate": "https://murf.ai",
      "image": "images/murf.png"
    },
    {
      "id": "canva",
      "name": "Canva",
      "categories": ["Design", "Image Editing", "Presentation"],
      "description": "Canva is an online design tool that offers drag‑and‑drop templates for presentations, posters, social media posts and more. It integrates AI‑powered features like Magic Design and background removal to help users create professional graphics without design experience.",
      "affiliate": "https://www.canva.com",
      "image": "images/canva.png"
    }
  ];
  let activeCategory = 'All';
  renderCategories();
  renderCards();

  // Render category chips
  function renderCategories() {
    // Get unique categories
    const categorySet = new Set();
    tools.forEach(tool => {
      tool.categories.forEach(cat => categorySet.add(cat));
    });
    const categories = ['All', ...Array.from(categorySet).sort()];
    categoriesContainer.innerHTML = '';
    categories.forEach(cat => {
      const chip = document.createElement('div');
      chip.className = 'category';
      chip.textContent = cat;
      if (cat === activeCategory) {
        chip.classList.add('active');
      }
      chip.addEventListener('click', () => {
        activeCategory = cat;
        document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderCards();
      });
      categoriesContainer.appendChild(chip);
    });
  }

  // Render tool cards based on search and category filter
  function renderCards() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = tools.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.categories.includes(activeCategory);
      const matchesQuery = tool.name.toLowerCase().includes(query) || tool.description.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
    cardsContainer.innerHTML = '';
    if (filtered.length === 0) {
      const msg = document.createElement('p');
      msg.textContent = 'No tools found.';
      msg.style.textAlign = 'center';
      msg.style.padding = '20px';
      cardsContainer.appendChild(msg);
      return;
    }
    filtered.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'card';
      const img = document.createElement('img');
      img.src = tool.image;
      img.alt = tool.name;
      card.appendChild(img);
      const content = document.createElement('div');
      content.className = 'card-content';
      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = tool.name;
      content.appendChild(title);
      const desc = document.createElement('p');
      desc.className = 'card-desc';
      desc.textContent = tool.description;
      content.appendChild(desc);
      const catContainer = document.createElement('div');
      catContainer.className = 'card-categories';
      tool.categories.forEach(cat => {
        const span = document.createElement('span');
        span.textContent = cat;
        catContainer.appendChild(span);
      });
      content.appendChild(catContainer);
      const link = document.createElement('a');
      link.href = `tool.html?id=${tool.id}`;
      link.textContent = 'Learn More';
      content.appendChild(link);
      card.appendChild(content);
      cardsContainer.appendChild(card);
    });
  }

  // Search input event
  searchInput.addEventListener('input', () => {
    renderCards();
  });
});