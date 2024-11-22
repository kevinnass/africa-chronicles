console.log("Script chargé avec succès");

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;

            faqItem.classList.toggle('active');

            const icon = question.querySelector('.toggle-icon');
            if (faqItem.classList.contains('active')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    const form = document.getElementById('add-question-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const userQuestion = document.getElementById('user-question').value.trim();
            if (!userQuestion) {
                alert("Veuillez entrer une question.");
                return;
            }

            const faqList = document.getElementById('faq-list');
            const newFaqItem = document.createElement('div');
            newFaqItem.classList.add('faq-item');
            newFaqItem.innerHTML = `
                <div class="faq-question">${userQuestion} <span class="toggle-icon">+</span></div>
                <div class="faq-answer">La réponse à cette question sera publiée dans un délai de 2 à 3 jours. Nous vous remercions pour votre patience.</div>
            `;
            faqList.appendChild(newFaqItem);
            document.getElementById('user-question').value = '';
            newFaqItem.querySelector('.faq-question').addEventListener('click', () => {
                newFaqItem.classList.toggle('active');
                const icon = newFaqItem.querySelector('.toggle-icon');
                icon.textContent = newFaqItem.classList.contains('active') ? '-' : '+';
            });

            const email = document.getElementById('hidden-email').value;
            const subject = encodeURIComponent('Nouvelle Question FAQ');
            const body = encodeURIComponent(`Une nouvelle question a été posée : \n\n${userQuestion}`);
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
            alert('Votre question a été ajoutée à la FAQ.');
        });
    } else {
        console.error('Le formulaire avec l\'ID "add-question-form" est introuvable.');
    }
});
