document.addEventListener('DOMContentLoaded', function() {
  const teamContainer = document.getElementById('team-container');
  const skillsContainer = document.getElementById('skills-container');
  const projectsContainer = document.getElementById('projects-container');
  const profileModal = new bootstrap.Modal(document.getElementById('profile-modal'));

  // Load team members
  team.forEach(member => {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    col.innerHTML = `
      <div class="profile-card">
        <img src="https://github.com/${member.username}.png" alt="${member.name}" class="mb-3">
        <h5>${member.name}</h5>
        <p class="text-muted">${member.role}</p>
        <button class="btn btn-github view-profile" data-username="${member.username}">
          View Options
        </button>
      </div>
    `;
    teamContainer.appendChild(col);
  });

  // Load projects
  team.forEach(member => {
    member.projects.forEach(project => {
      const col = document.createElement('div');
      col.className = 'col-md-6 mb-4';
      col.innerHTML = `
        <div class="card p-4 projects-card h-100">
          <h4><i class="fas fa-${member.role.includes('Frontend') ? 'laptop-code' : member.role.includes('Backend') ? 'server' : member.role.includes('Full Stack') ? 'code' : 'cloud'} me-2"></i>${project.title}</h4>
          <p>${project.description}</p>
          <a href="${project.link}" target="_blank" class="btn btn-github">
            <i class="fab fa-github"></i> View Projects
          </a>
        </div>
      `;
      projectsContainer.appendChild(col);
    });
  });
  
  skills.forEach(skill => {
  const skillElement = document.createElement('div');
  skillElement.className = 'skill-item';
  skillElement.innerHTML = `
    <i class="${skill.icon} skill-icon ${skill.class}"></i>
    <span class="skill-name">${skill.name}</span>
  `;
  skillsContainer.appendChild(skillElement);
});

  // Handle profile clicks
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('view-profile')) {
      const username = e.target.getAttribute('data-username');
      const member = team.find(m => m.username === username);
      
      if (member) {
        document.getElementById('modal-avatar').src = `https://github.com/${member.username}.png`;
        document.getElementById('modal-name').textContent = member.name;
        document.getElementById('modal-role').textContent = member.role;
        document.getElementById('modal-github').onclick = () => window.open(member.github, '_blank');
        document.getElementById('modal-portfolio').onclick = () => window.open(member.portfolio, '_blank');
        
        profileModal.show();
      }
    }
  });
});