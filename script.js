// Initialize jsPDF
const { jsPDF } = window.jspdf;

// Global variables
let selectedTemplate = 1;
let resumeData = {};

// DOM elements
const profilePhoto = document.getElementById('profilePhoto');
const profilePreview = document.getElementById('profilePreview');
const resumeForm = document.getElementById('resumeForm');
const generatePreview = document.getElementById('generatePreview');
const editResume = document.getElementById('editResume');
const downloadResume = document.getElementById('downloadResume');
const resumePreview = document.getElementById('resumePreview');
const previewSection = document.getElementById('preview');
const builderSection = document.getElementById('builder');
const templateBtns = document.querySelectorAll('.template-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Profile photo upload
    profilePhoto.addEventListener('change', function (e) {
        if (e.target.files.length > 0) {
            const src = URL.createObjectURL(e.target.files[0]);
            profilePreview.src = src;
        }
    });

    // Add experience field
    document.getElementById('addExperience').addEventListener('click', addExperienceField);

    // Add education field
    document.getElementById('addEducation').addEventListener('click', addEducationField);

    // Add skill field
    document.getElementById('addSkill').addEventListener('click', addSkillField);

    // Add achievement field
    document.getElementById('addAchievement').addEventListener('click', addAchievementField);

    // Generate preview
    generatePreview.addEventListener('click', generateResumePreview);

    // Edit resume
    editResume.addEventListener('click', function () {
        previewSection.classList.add('hidden');
        builderSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Download resume
    downloadResume.addEventListener('click', downloadResumePDF);

    // Template selection in preview
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            templateBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            selectedTemplate = parseInt(this.dataset.template);
            generateResumePreview();
        });
    });

    // Remove field buttons (delegated events)
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-experience')) {
            e.target.closest('.experience-item').remove();
        }
        if (e.target.classList.contains('remove-education')) {
            e.target.closest('.education-item').remove();
        }
        if (e.target.classList.contains('remove-skill')) {
            e.target.closest('.skill-item').remove();
        }
        if (e.target.classList.contains('remove-achievement')) {
            e.target.closest('.achievement-item').remove();
        }
    });
});

// Select template function
function selectTemplate(templateNum) {
    selectedTemplate = templateNum;
    document.querySelector('#builder').scrollIntoView({
        behavior: 'smooth'
    });
}


//  document.addEventListener('DOMContentLoaded', function() {
//     const loadMoreBtn = document.getElementById('loadMoreTemplates');
//     const templatesContainer = document.getElementById('templatesContainer');
//     const hiddenTemplates = templatesContainer.querySelectorAll('.d-none');
//     let templatesToShow = 4; // Number of templates to show each time

//     loadMoreBtn.addEventListener('click', function() {
//         // Get all currently hidden templates
//         const currentlyHidden = Array.from(templatesContainer.querySelectorAll('.d-none'));

//         // Show the next batch of templates
//         currentlyHidden.slice(0, templatesToShow).forEach(template => {
//             template.classList.remove('d-none');
//         });

//         // Hide the button if no more templates to show
//         if (currentlyHidden.length <= templatesToShow) {
//             loadMoreBtn.style.display = 'none';
//         }
//     });

//     // Initially hide the button if there are no hidden templates
//     if (hiddenTemplates.length === 0) {
//         loadMoreBtn.style.display = 'none';
//     }
// });



// document.addEventListener('DOMContentLoaded', function() {
//     const loadMoreBtn = document.getElementById('loadMoreTemplates');
//     const templatesContainer = document.getElementById('templatesContainer');
//     const hiddenTemplates = templatesContainer.querySelectorAll('.hidden-template');
//     const templatesPerLoad = 4; // Number to show each click

//     // Hide all templates beyond first 4 initially
//     hiddenTemplates.forEach(template => {
//         template.style.display = 'none';
//     });

//     loadMoreBtn.addEventListener('click', function() {
//         // Get all hidden templates
//         const currentlyHidden = Array.from(templatesContainer.querySelectorAll('.hidden-template[style="display: none;"]'));

//         // Show next batch
//         const templatesToShow = currentlyHidden.slice(0, templatesPerLoad);
//         templatesToShow.forEach(template => {
//             template.style.display = 'block';
//         });

//         // Hide button if no more templates
//         if (currentlyHidden.length <= templatesPerLoad) {
//             loadMoreBtn.style.display = 'none';
//         }
//     });

//     // Hide button if no hidden templates
//     if (hiddenTemplates.length === 0) {
//         loadMoreBtn.style.display = 'none';
//     }
// });



// document.addEventListener('DOMContentLoaded', function() {
//     const loadMoreBtn = document.getElementById('loadMoreTemplates');
//     const hiddenTemplates = document.querySelectorAll('.initially-hidden');
//     const templatesPerLoad = 4;

//     // Only run if there are hidden templates
//     if (hiddenTemplates.length > 0) {
//         // Show button initially
//         loadMoreBtn.style.display = 'inline-block';

//         loadMoreBtn.addEventListener('click', function() {
//             // Convert NodeList to array and filter only hidden ones
//             const currentlyHidden = Array.from(hiddenTemplates).filter(t => 
//                 window.getComputedStyle(t).display === 'none'
//             );

//             // Show next batch
//             currentlyHidden.slice(0, templatesPerLoad).forEach(template => {
//                 template.style.display = 'block';
//             });

//             // Hide button if no more templates
//             if (currentlyHidden.length <= templatesPerLoad) {
//                 loadMoreBtn.style.display = 'none';
//             }
//         });
//     } else {
//         // Hide button if no hidden templates exist
//         loadMoreBtn.style.display = 'none';
//     }
// });


document.addEventListener('DOMContentLoaded', function () {
    const loadMoreBtn = document.getElementById('loadMoreTemplates');
    const templatesContainer = document.getElementById('templatesContainer');
    const allTemplates = templatesContainer.querySelectorAll('.template-card');
    const templatesPerLoad = 4;
    let visibleCount = 4; // First 4 are visible

    // Initially hide the button if there are no hidden templates
    if (allTemplates.length <= visibleCount) {
        loadMoreBtn.style.display = 'none';
    }

    loadMoreBtn.addEventListener('click', function () {
        // Show next batch of templates
        const nextBatch = Math.min(visibleCount + templatesPerLoad, allTemplates.length);

        for (let i = visibleCount; i < nextBatch; i++) {
            allTemplates[i].style.display = 'block';
        }

        visibleCount = nextBatch;

        // Hide button if all templates are visible
        if (visibleCount >= allTemplates.length) {
            loadMoreBtn.style.display = 'none';
        }

        // Smooth scroll to newly shown templates
        if (visibleCount < allTemplates.length) {
            allTemplates[visibleCount - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    });
});

// Add experience field
function addExperienceField() {
    const experienceFields = document.getElementById('experienceFields');
    const newField = `
         <div class="experience-item mb-3 border p-3 rounded">
             <div class="row">
                 <div class="col-md-6">
                     <div class="mb-3">
                         <label class="form-label">Job Title</label>
                         <input type="text" class="form-control" name="jobTitle[]" required>
                     </div>
                     <div class="mb-3">
                         <label class="form-label">Company</label>
                         <input type="text" class="form-control" name="company[]" required>
                     </div>
                 </div>
                 <div class="col-md-6">
                     <div class="mb-3">
                         <label class="form-label">Dates</label>
                         <input type="text" class="form-control" name="workDates[]" placeholder="e.g. 2018 - Present">
                     </div>
                 </div>
             </div>
             <div class="mb-3">
                 <label class="form-label">Description</label>
                 <textarea class="form-control" name="workDescription[]" rows="3"></textarea>
             </div>
             <button type="button" class="btn btn-sm btn-outline-danger remove-experience">
                 <i class="fas fa-trash me-1"></i>Remove
             </button>
         </div>
     `;
    experienceFields.insertAdjacentHTML('beforeend', newField);
}

// Add education field
function addEducationField() {
    const educationFields = document.getElementById('educationFields');
    const newField = `
         <div class="education-item mb-3 border p-3 rounded">
             <div class="row">
                 <div class="col-md-6">
                     <div class="mb-3">
                         <label class="form-label">Degree</label>
                         <input type="text" class="form-control" name="degree[]" required>
                     </div>
                     <div class="mb-3">
                         <label class="form-label">Institution</label>
                         <input type="text" class="form-control" name="institution[]" required>
                     </div>
                 </div>
                 <div class="col-md-6">
                     <div class="mb-3">
                         <label class="form-label">Dates</label>
                         <input type="text" class="form-control" name="educationDates[]" placeholder="e.g. 2014 - 2018">
                     </div>
                 </div>
             </div>
             <div class="mb-3">
                 <label class="form-label">Description</label>
                 <textarea class="form-control" name="educationDescription[]" rows="2"></textarea>
             </div>
             <button type="button" class="btn btn-sm btn-outline-danger remove-education">
                 <i class="fas fa-trash me-1"></i>Remove
             </button>
         </div>
     `;
    educationFields.insertAdjacentHTML('beforeend', newField);
}

// Add skill field
function addSkillField() {
    const skillFields = document.getElementById('skillFields');
    const newField = `
         <div class="skill-item mb-2 input-group">
             <input type="text" class="form-control" name="skills[]" placeholder="e.g. JavaScript, Photoshop">
             <button class="btn btn-outline-danger remove-skill" type="button">
                 <i class="fas fa-times"></i>
             </button>
         </div>
     `;
    skillFields.insertAdjacentHTML('beforeend', newField);
}

// Add achievement field
function addAchievementField() {
    const achievementFields = document.getElementById('achievementFields');
    const newField = `
         <div class="achievement-item mb-2 input-group">
             <input type="text" class="form-control" name="achievements[]" placeholder="e.g. Employee of the Month">
             <button class="btn btn-outline-danger remove-achievement" type="button">
                 <i class="fas fa-times"></i>
             </button>
         </div>
     `;
    achievementFields.insertAdjacentHTML('beforeend', newField);
}

// Generate resume preview
function generateResumePreview() {
    if (!resumeForm.checkValidity()) {
        resumeForm.reportValidity();
        return;
    }

    // Collect form data
    resumeData = {
        personal: {
            fullName: document.getElementById('fullName').value,
            profession: document.getElementById('profession').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            linkedin: document.getElementById('linkedin').value,
            website: document.getElementById('website').value,
            summary: document.getElementById('summary').value,
            photo: profilePreview.src
        },
        experiences: [],
        education: [],
        skills: [],
        achievements: []
    };

    // Collect experiences
    document.querySelectorAll('.experience-item').forEach(item => {
        resumeData.experiences.push({
            jobTitle: item.querySelector('[name="jobTitle[]"]').value,
            company: item.querySelector('[name="company[]"]').value,
            dates: item.querySelector('[name="workDates[]"]').value,
            description: item.querySelector('[name="workDescription[]"]').value
        });
    });

    // Collect education
    document.querySelectorAll('.education-item').forEach(item => {
        resumeData.education.push({
            degree: item.querySelector('[name="degree[]"]').value,
            institution: item.querySelector('[name="institution[]"]').value,
            dates: item.querySelector('[name="educationDates[]"]').value,
            description: item.querySelector('[name="educationDescription[]"]').value
        });
    });

    // Collect skills
    document.querySelectorAll('[name="skills[]"]').forEach(skill => {
        if (skill.value.trim() !== '') {
            resumeData.skills.push(skill.value);
        }
    });

    // Collect achievements
    document.querySelectorAll('[name="achievements[]"]').forEach(achievement => {
        if (achievement.value.trim() !== '') {
            resumeData.achievements.push(achievement.value);
        }
    });

    // Generate HTML based on template
    generateResumeHTML();

    // Show preview section
    previewSection.classList.remove('hidden');
    previewSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate resume HTML based on selected template
function generateResumeHTML() {
    let resumeHTML = '';

    switch (selectedTemplate) {
        case 1:
            // Template 1 HTML
            resumeHTML = `
                 <div class="template-1">
                     <div class="header text-center">
                         ${resumeData.personal.photo !== 'https://via.placeholder.com/150' ?
                    `<img src="${resumeData.personal.photo}" class="rounded-circle mb-2" width="100" height="100" alt="Profile Photo">` : ''}
                         <h1>${resumeData.personal.fullName}</h1>
                         <h3>${resumeData.personal.profession}</h3>
                         <div class="d-flex justify-content-center flex-wrap mt-2">
                             ${resumeData.personal.email ? `<span class="mx-2"><i class="fas fa-envelope me-1"></i>${resumeData.personal.email}</span>` : ''}
                             ${resumeData.personal.phone ? `<span class="mx-2"><i class="fas fa-phone me-1"></i>${resumeData.personal.phone}</span>` : ''}
                             ${resumeData.personal.linkedin ? `<span class="mx-2"><i class="fab fa-linkedin me-1"></i>${resumeData.personal.linkedin}</span>` : ''}
                         </div>
                     </div>
                     
                     ${resumeData.personal.summary ? `
                     <div class="section">
                         <h3 class="section-title">PROFESSIONAL SUMMARY</h3>
                         <p>${resumeData.personal.summary}</p>
                     </div>` : ''}
                     
                     ${resumeData.experiences.length > 0 ? `
                     <div class="section">
                         <h3 class="section-title">WORK EXPERIENCE</h3>
                         ${resumeData.experiences.map(exp => `
                             <div class="mb-3">
                                 <h4 class="mb-1">${exp.jobTitle}</h4>
                                 <div class="d-flex justify-content-between">
                                     <strong>${exp.company}</strong>
                                     <em>${exp.dates}</em>
                                 </div>
                                 <p class="mt-2">${exp.description}</p>
                             </div>
                         `).join('')}
                     </div>` : ''}
                     
                     ${resumeData.education.length > 0 ? `
                     <div class="section">
                         <h3 class="section-title">EDUCATION</h3>
                         ${resumeData.education.map(edu => `
                             <div class="mb-3">
                                 <h4 class="mb-1">${edu.degree}</h4>
                                 <div class="d-flex justify-content-between">
                                     <strong>${edu.institution}</strong>
                                     <em>${edu.dates}</em>
                                 </div>
                                 ${edu.description ? `<p class="mt-2">${edu.description}</p>` : ''}
                             </div>
                         `).join('')}
                     </div>` : ''}
                     
                     ${resumeData.skills.length > 0 ? `
                     <div class="section">
                         <h3 class="section-title">SKILLS</h3>
                         <div class="d-flex flex-wrap">
                             ${resumeData.skills.map(skill => `
                                 <span class="badge bg-secondary me-2 mb-2">${skill}</span>
                             `).join('')}
                         </div>
                     </div>` : ''}
                     
                     ${resumeData.achievements.length > 0 ? `
                     <div class="section">
                         <h3 class="section-title">ACHIEVEMENTS</h3>
                         <ul>
                             ${resumeData.achievements.map(ach => `
                                 <li>${ach}</li>
                             `).join('')}
                         </ul>
                     </div>` : ''}
                 </div>
             `;
            break;

        case 2:
            // Template 2 HTML (similar structure with different styling)
            // [Implementation similar to template 1 but with different classes]

            resumeHTML = `
             <div class="template-5">
                 <div class="sidebar">
                     ${resumeData.personal.photo !== 'https://via.placeholder.com/150' ?
                    `<img src="${resumeData.personal.photo}" class="profile-img" alt="Profile Photo">` : ''}
                     
                     <div class="sidebar-section">
                         <h3>CONTACT</h3>
                         ${resumeData.personal.email ? `<p><i class="fas fa-envelope"></i> ${resumeData.personal.email}</p>` : ''}
                         ${resumeData.personal.phone ? `<p><i class="fas fa-phone"></i> ${resumeData.personal.phone}</p>` : ''}
                         ${resumeData.personal.address ? `<p><i class="fas fa-map-marker-alt"></i> ${resumeData.personal.address}</p>` : ''}
                         ${resumeData.personal.linkedin ? `<p><i class="fab fa-linkedin"></i> ${resumeData.personal.linkedin}</p>` : ''}
                         ${resumeData.personal.website ? `<p><i class="fas fa-globe"></i> ${resumeData.personal.website}</p>` : ''}
                     </div>
                     
                     ${resumeData.skills.length > 0 ? `
                     <div class="sidebar-section">
                         <h3>SKILLS</h3>
                         <ul class="skills-list">
                             ${resumeData.skills.map(skill => `
                                 <li>${skill}</li>
                             `).join('')}
                         </ul>
                     </div>` : ''}
                 </div>
                 
                 <div class="main-content">
                     <h1>${resumeData.personal.fullName}</h1>
                     <h2>${resumeData.personal.profession}</h2>
                     
                     ${resumeData.personal.summary ? `
                     <div class="section">
                         <h3>PROFILE</h3>
                         <p>${resumeData.personal.summary}</p>
                     </div>` : ''}
                     
                     ${resumeData.experiences.length > 0 ? `
                     <div class="section">
                         <h3>EXPERIENCE</h3>
                         ${resumeData.experiences.map(exp => `
                             <div class="experience-item">
                                 <h4>${exp.jobTitle}</h4>
                                 <div class="experience-header">
                                     <span class="company">${exp.company}</span>
                                     <span class="dates">${exp.dates}</span>
                                 </div>
                                 <p>${exp.description}</p>
                             </div>
                         `).join('')}
                     </div>` : ''}
                     
                     ${resumeData.education.length > 0 ? `
                     <div class="section">
                         <h3>EDUCATION</h3>
                         ${resumeData.education.map(edu => `
                             <div class="education-item">
                                 <h4>${edu.degree}</h4>
                                 <div class="education-header">
                                     <span class="institution">${edu.institution}</span>
                                     <span class="dates">${edu.dates}</span>
                                 </div>
                                 ${edu.description ? `<p>${edu.description}</p>` : ''}
                             </div>
                         `).join('')}
                     </div>` : ''}
                 </div>
             </div>
         `;
            break;

        // break;

        case 3:
            // Template 3 HTML
            // [Implementation similar to template 1 but with different classes]
            // Template 3 - Clean Developer Resume
            // JS string for resume HTML
resumeHTML = `
  <div class="resume-wrapper">
    <header class="resume-header">
      <div class="header-left">
        <h1 class="name-title">${resumeData.personal.fullName}</h1>
        <p class="job-title">${resumeData.personal.profession}</p>
      </div>
      <div class="header-right">
        ${resumeData.personal.photo !== 'https://via.placeholder.com/150' ?
                    `<img src="${resumeData.personal.photo}" alt="Profile Photo" class="profile-photo">` : ''}
      </div>
    </header>

    <section class="contact-info-bar">
      ${resumeData.personal.email ? `<span class="contact-item"><i class="fas fa-envelope"></i> <a href="mailto:${resumeData.personal.email}">${resumeData.personal.email}</a></span>` : ''}
      ${resumeData.personal.phone ? `<span class="contact-item"><i class="fas fa-phone"></i> <a href="tel:${resumeData.personal.phone.replace(/[^0-9]/g, '')}">${resumeData.personal.phone}</a></span>` : ''}
      ${resumeData.personal.linkedin ? `<span class="contact-item"><i class="fab fa-linkedin"></i> <a href="${resumeData.personal.linkedin.startsWith('http') ? resumeData.personal.linkedin : 'https://' + resumeData.personal.linkedin}" target="_blank">${resumeData.personal.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></span>` : ''}
      ${resumeData.personal.website ? `<span class="contact-item"><i class="fas fa-globe"></i> <a href="${resumeData.personal.website.startsWith('http') ? resumeData.personal.website : 'https://' + resumeData.personal.website}" target="_blank">${resumeData.personal.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a></span>` : ''}
      ${resumeData.personal.address ? `<span class="contact-item"><i class="fas fa-map-marker-alt"></i> ${resumeData.personal.address}</span>` : ''}
    </section>

    <main class="resume-main">
      <aside class="sidebar-left">
        ${resumeData.personal.summary ? `
          <section class="sidebar-section profile-summary">
            <h2 class="section-header"><i class="fas fa-user-circle"></i> Profile</h2>
            <p>${resumeData.personal.summary}</p>
          </section>` : ''}

        ${resumeData.skills.length > 0 ? `
          <section class="sidebar-section skills-section">
            <h2 class="section-header"><i class="fas fa-tools"></i> Skills</h2>
            <ul class="skills-list">
              ${resumeData.skills.map(skill => `<li class="skill-item">${skill}</li>`).join('')}
            </ul>
          </section>` : ''}

        ${resumeData.achievements.length > 0 ? `
          <section class="sidebar-section achievements-section">
            <h2 class="section-header"><i class="fas fa-award"></i> Achievements</h2>
            <ul class="achievements-list">
              ${resumeData.achievements.map(ach => `<li>${ach}</li>`).join('')}
            </ul>
          </section>` : ''}
      </aside>

      <section class="content-right">
        ${resumeData.experiences.length > 0 ? `
          <section class="content-section experience-section">
            <h2 class="section-header"><i class="fas fa-briefcase"></i> Experience</h2>
            ${resumeData.experiences.map(exp => `
              <div class="experience-entry">
                <h3 class="job-title-exp">${exp.jobTitle}</h3>
                <div class="company-dates">
                  <span class="company-name">${exp.company}</span> | <span class="job-dates">${exp.dates}</span>
                </div>
                ${exp.description ? `<p class="job-description">${exp.description.replace(/\n/g, '<br>')}</p>` : ''}
              </div>
            `).join('')}
          </section>` : ''}

        ${resumeData.education.length > 0 ? `
          <section class="content-section education-section">
            <h2 class="section-header"><i class="fas fa-graduation-cap"></i> Education</h2>
            ${resumeData.education.map(edu => `
              <div class="education-entry">
                <h3 class="degree-title">${edu.degree}</h3>
                <div class="institution-dates">
                  <span class="institution-name">${edu.institution}</span> | <span class="edu-dates">${edu.dates}</span>
                </div>
                ${edu.description ? `<p class="education-description">${edu.description.replace(/\n/g, '<br>')}</p>` : ''}
              </div>
            `).join('')}
          </section>` : ''}

        ${resumeData.projects && resumeData.projects.length > 0 ? `
          <section class="content-section projects-section">
            <h2 class="section-header"><i class="fas fa-project-diagram"></i> Projects</h2>
            ${resumeData.projects.map(proj => `
              <div class="project-entry">
                <h3 class="project-name">${proj.name} 
                  ${proj.link ? `<a href="${proj.link.startsWith('http') ? proj.link : 'https://' + proj.link}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                </h3>
                ${proj.technologies ? `<p class="project-tech">${proj.technologies.split(',').map(tech => `<span class="tech-badge">${tech.trim()}</span>`).join(' ')}</p>` : ''}
                ${proj.description ? `<p class="project-description">${proj.description.replace(/\n/g, '<br>')}</p>` : ''}
              </div>
            `).join('')}
          </section>` : ''}
      </section>
    </main>
  </div>
`;

            break;

        // Template 4 HTML
        // [Implementation similar to template 1 but with different classes]
        case 4:
            // Template 4 - Playful Color Block Resume
            resumeHTML = `
        <div class="template-4">
            <div class="color-block-header" style="background-color: #FFD166;">
                <div class="header-content">
                    ${resumeData.personal.photo !== 'https://via.placeholder.com/150' ?
                    `<img src="${resumeData.personal.photo}" class="profile-img" alt="Profile Photo">` :
                    `<div class="profile-placeholder" style="background-color: #EF476F;"></div>`}
                    <div class="header-text">
                        <h1>${resumeData.personal.fullName}</h1>
                        <h2>${resumeData.personal.profession}</h2>
                    </div>
                </div>
            </div>

            <div class="resume-body">
                <div class="left-column" style="background-color: #F8F9FA;">
                    <div class="contact-section" style="background-color: #06D6A0;">
                        <h3>CONTACT</h3>
                        <ul>
                            ${resumeData.personal.email ? `<li><i class="fas fa-envelope"></i> <a href="mailto:${resumeData.personal.email}" style="color: white;">${resumeData.personal.email}</a></li>` : ''}
                            ${resumeData.personal.phone ? `<li><i class="fas fa-phone"></i> <a href="tel:${resumeData.personal.phone.replace(/[^0-9]/g, '')}" style="color: white;">${resumeData.personal.phone}</a></li>` : ''}
                            ${resumeData.personal.linkedin ? `<li><i class="fab fa-linkedin"></i> <a href="${resumeData.personal.linkedin.startsWith('http') ? resumeData.personal.linkedin : 'https://' + resumeData.personal.linkedin}" target="_blank" style="color: white;">${resumeData.personal.linkedin.replace(/^https?:\/\//, '')}</a></li>` : ''}
                            ${resumeData.personal.website ? `<li><i class="fas fa-globe"></i> <a href="${resumeData.personal.website.startsWith('http') ? resumeData.personal.website : 'https://' + resumeData.personal.website}" target="_blank" style="color: white;">${resumeData.personal.website.replace(/^https?:\/\//, '')}</a></li>` : ''}
                            ${resumeData.personal.address ? `<li><i class="fas fa-map-marker-alt"></i> <span style="color: white;">${resumeData.personal.address}</span></li>` : ''}
                        </ul>
                    </div>

                    ${resumeData.skills.length > 0 ? `
                    <div class="section skills-section">
                        <h3 style="color: #EF476F;">SKILLS</h3>
                        <div class="skills-container">
                            ${resumeData.skills.map(skill => `
                                <div class="skill-pill" style="background-color: #118AB2; color: white;">${skill}</div>
                            `).join('')}
                        </div>
                    </div>` : ''}

                    ${resumeData.achievements.length > 0 ? `
                    <div class="section">
                        <h3 style="color: #EF476F;">ACHIEVEMENTS</h3>
                        <ul class="achievements-list">
                            ${resumeData.achievements.map(ach => `
                                <li>${ach}</li>
                            `).join('')}
                        </ul>
                    </div>` : ''}
                </div>

                <div class="right-column">
                    ${resumeData.personal.summary ? `
                    <div class="section summary-section" style="background-color: #EF476F; color: white;">
                        <h3>ABOUT ME</h3>
                        <p>${resumeData.personal.summary}</p>
                    </div>` : ''}

                    ${resumeData.experiences.length > 0 ? `
                    <div class="section">
                        <h3 style="color: #118AB2;">EXPERIENCE</h3>
                        ${resumeData.experiences.map(exp => `
                            <div class="experience-item">
                                <div class="experience-header">
                                    <h4>${exp.jobTitle}</h4>
                                    <div class="company-dates">
                                        <span class="company">${exp.company}</span>
                                        <span class="dates">${exp.dates}</span>
                                    </div>
                                </div>
                                ${exp.description ? `<div class="description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}

                    ${resumeData.education.length > 0 ? `
                    <div class="section">
                        <h3 style="color: #118AB2;">EDUCATION</h3>
                        ${resumeData.education.map(edu => `
                            <div class="education-item">
                                <h4>${edu.degree}</h4>
                                <div class="education-details">
                                    <span class="institution">${edu.institution}</span>
                                    <span class="dates">${edu.dates}</span>
                                </div>
                                ${edu.description ? `<div class="description">${edu.description.replace(/\n/g, '<br>')}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}

                    ${resumeData.projects && resumeData.projects.length > 0 ? `
                    <div class="section">
                        <h3 style="color: #118AB2;">PROJECTS</h3>
                        ${resumeData.projects.map(proj => `
                            <div class="project-item">
                                <div class="project-header">
                                    <h4>${proj.name}</h4>
                                    ${proj.link ? `<a href="${proj.link.startsWith('http') ? proj.link : 'https://' + proj.link}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i></a>` : ''}
                                </div>
                                ${proj.technologies ? `<div class="technologies">${proj.technologies.split(',').map(tech => `<span class="tech-tag" style="background-color: #06D6A0;">${tech.trim()}</span>`).join('')}</div>` : ''}
                                ${proj.description ? `<div class="description">${proj.description.replace(/\n/g, '<br>')}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
            break;

        default:
            resumeHTML = '<p>Please select a template</p>';
    }

    resumePreview.className = `resume-paper template-${selectedTemplate}`;
    resumePreview.innerHTML = resumeHTML;
}

// Download resume as PDF
function downloadResumePDF() {
    // Create a new jsPDF instance
    const doc = new jsPDF('p', 'pt', 'a4');

    // Get the resume element
    const element = document.getElementById('resumePreview');
}


// Download resume as PDF - updated working version
function downloadResumePDF() {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
            background: rgba(0,0,0,0.5); z-index: 9999; display: flex; 
            justify-content: center; align-items: center; color: white;">
            <div style="text-align: center;">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <p class="mt-2">Generating PDF...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loadingIndicator);

    // Get the resume element
    const element = document.getElementById('resumePreview');
    const options = {
        scale: 2, // Higher quality
        useCORS: true, // For cross-origin images
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: -window.scrollY
    };

    // Use html2canvas to capture the resume
    html2canvas(element, options).then(canvas => {
        // Create PDF
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        // Remove loading indicator
        document.body.removeChild(loadingIndicator);

        // Download PDF
        pdf.save(`${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
    }).catch(error => {
        console.error('Error generating PDF:', error);
        document.body.removeChild(loadingIndicator);
        alert('Error generating PDF. Please try again.');
    });
}