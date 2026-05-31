  const SERVER_IP = "play.revo-pokemon.fr"; 

document.getElementById('btn-ip').addEventListener('click', function() {
    navigator.clipboard.writeText(SERVER_IP).then(() => {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = "IP copiée avec succès !";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }).catch(err => {
        console.error("Erreur lors de la copie : ", err);
    });
});

const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'); 
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play();
    });
});

function quitterLeSite() {
    const menu = document.querySelector('.menu');
    menu.style.transition = "opacity 0.5s ease";
    menu.style.opacity = "0";
    
    setTimeout(() => {
        menu.innerHTML = `
            <div class="goodbye-screen">
                <img src="revo_poke_Logo_Finale-removebg-preview.png" alt="Logo" class="logo-fade">
                <h2>À bientôt sur Revo-Pokemon !</h2>
                <p>L'onglet peut maintenant être fermé.</p>
            </div>
        `;
        menu.style.opacity = "1";
    }, 500);
}
// --- GESTION DE LA MUSIQUE DE FOND ---

const musique = document.getElementById('bg-music');

// On baisse un peu le volume (0.3 = 30%) pour que ce ne soit pas trop fort pour les joueurs
musique.volume = 0.3; 

// Fonction pour lancer la musique au premier clic
function lancerMusique() {
    musique.play().catch(err => {
        console.log("Lecture automatique bloquée par le navigateur, en attente d'une interaction.");
    });
    // On supprime l'écouteur après le premier clic pour éviter de relancer en boucle
    document.removeEventListener('click', lancerMusique);
}

// On attend que l'utilisateur clique n'importe où sur la page
document.addEventListener('click', lancerMusique);

// --- GESTION DU BOUTON GALERIE ---

const boutonGalerie = document.getElementById('btn-galerie');

// Fonction pour ouvrir la galerie
function ouvrirGalerie() {
    const menu = document.querySelector('.menu');
    const htmlOrigine = menu.innerHTML;
    
    // 1. On efface le menu en douceur
    menu.style.transition = "opacity 0.5s ease";
    menu.style.opacity = "0";
    
    setTimeout(() => {
        // 2. On injecte la structure avec TES trois images (Image1, Image2, Image3)
        menu.innerHTML = `
            <div class="galerie-screen">
                <h2>GALERIE DU SERVEUR</h2>
                <p class="galerie-subtitle">Aperçu de Revo-Pokemon</p>
                
            <div class="galerie-grid">
                <div class="galerie-item"><img src="Image1.jpg" alt="Image 1"></div>
                <div class="galerie-item"><img src="Image2.jpg" alt="Image 2"></div>
                <div class="galerie-item"><img src="Image3.jpg" alt="Image 3"></div>
            </div>
                
                <button class="small-btn" id="btn-retour-galerie" style="max-width: 250px; margin: 25px auto; display: block;">Retour</button>
            </div>
        `;
        
        // On affiche la galerie
        menu.style.opacity = "1";
        
        // --- Gestion du zoom au clic sur les images ---
        const items = menu.querySelectorAll('.galerie-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('zoomed')) {
                    items.forEach(i => i.classList.remove('zoomed'));
                    item.classList.add('zoomed');
                } else {
                    item.classList.remove('zoomed');
                }
                e.stopPropagation();
            });
        });

        menu.querySelector('.galerie-screen').addEventListener('click', () => {
            items.forEach(i => i.classList.remove('zoomed'));
        });
        
        // 3. Gestion du bouton Retour de la galerie
        document.getElementById('btn-retour-galerie').addEventListener('click', () => {
            menu.style.opacity = "0";
            setTimeout(() => {
                menu.innerHTML = htmlOrigine;
                
                if (typeof updatePlayers === "function") { updatePlayers(); }
                relancerEcouteursBoutons();
                
                menu.style.opacity = "1";
            }, 500);
        });
    }, 500);
}

// On applique l'événement au premier chargement
if(boutonGalerie) {
    boutonGalerie.addEventListener('click', ouvrirGalerie);
}
// --- GESTION DU BOUTON CRÉDIT (STYLE GÉNÉRIQUE DE FILM) ---

const boutonCredit = document.getElementById('btn-credit');

boutonCredit.addEventListener('click', () => {
    const menu = document.querySelector('.menu');
    
    // Sauvegarde du contenu d'origine du menu pour pouvoir le remettre après
    const htmlOrigine = menu.innerHTML;
    
    // 1. On fait disparaître le menu principal en douceur
    menu.style.transition = "opacity 0.5s ease";
    menu.style.opacity = "0";
    
    setTimeout(() => {
        // 2. On affiche le générique
        menu.innerHTML = `
            <div class="credits-screen">
                <div class="credits-crawler">
                    <h2>REVO-POKEMON</h2>
                    <p>Merci d'avoir joué !</p>
                    
                    <h3>- FONDATEURS -</h3>
                    <p>Bida Soundouss</p>
                    <p>Azaoui Anis</p>
                    <p>Lacombe Yanis</p>
                    
                    <h3>- DÉVELOPPEURS SITE -</h3>
                    <p>Bida Soundouss</p>
            
                    <h3>- DÉVELOPPEURS SERVEUR -</h3>
                    <p>Azaoui Anis</p>
                    <p>Lacombe Yanis</p>

                    <h3>- BUILDER -</h3>
                    <p>Azaoui Anis</p>
                    <p>Lacombe Yanis</p>

                    <h3>- DESIGNEUSE POKEMON -</h3>
                    <p>Bida Soundouss</p>
                     
                    <h3>- REMERCIEMENTS -</h3>
                    <p>À toute la communauté</p>
                    <p>Discord de Revo-Pokemon</p>
                    
                    <br><br>
                    <button class="small-btn" id="btn-retour-menu" style="max-width: 250px; margin: 20px auto; display: block;">Retour</button>
                </div>
            </div>
        `;
        
        // On réaffiche les crédits en douceur
        menu.style.opacity = "1";
        
        // 3. Gestion du clic sur le bouton Retour (sans recharger la page)
        document.getElementById('btn-retour-menu').addEventListener('click', () => {
            // On fait disparaître les crédits en douceur
            menu.style.opacity = "0";
            
            setTimeout(() => {
                // On remet le HTML d'origine du menu
                menu.innerHTML = htmlOrigine;
                
                // /!\ TRÈS IMPORTANT : On relance la fonction des joueurs en ligne
                // pour que le "(Chargement...)" disparaisse à nouveau !
                if (typeof updatePlayers === "function") {
                    updatePlayers();
                }
                
                // On remet les écouteurs de clics sur les nouveaux boutons recréés
                relancerEcouteursBoutons();
                
                // On réaffiche enfin le menu principal tout en douceur
                menu.style.opacity = "1";
            }, 500); // Temps de la disparition (0.5s)
        });

    }, 500);
});

// Fonction d'aide pour réassigner les scripts aux boutons après un retour au menu
function relancerEcouteursBoutons() {
    // 1. Rebranche le son du clic sur TOUS les boutons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
    
    // 2. Rebranche le bouton IP (copie)
    const btnIp = document.getElementById('btn-ip');
    if(btnIp) {
        btnIp.addEventListener('click', function() {
            navigator.clipboard.writeText(SERVER_IP).then(() => {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerText = "IP copiée avec succès !";
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            });
        });
    }

    // 3. /!\ AJOUT : Rebranche le bouton MUTE qui vient d'être recréé
    const btnMute = document.getElementById('btn-mute');
    if(btnMute) {
        btnMute.addEventListener('click', () => {
            if (musique.muted) {
                musique.muted = false;
                btnMute.innerText = "🔊";
            } else {
                musique.muted = true;
                btnMute.innerText = "🔇";
            }
        });
    }
}
    
    // Rebranche le bouton IP (copie)
    const btnIp = document.getElementById('btn-ip');
    if(btnIp) {
        btnIp.addEventListener('click', function() {
            navigator.clipboard.writeText(SERVER_IP).then(() => {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerText = "IP copiée avec succès !";
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
            });
        });
    }

const btnMute = document.getElementById('btn-mute');

btnMute.addEventListener('click', () => {
    if (musique.muted) {
        musique.muted = false;
        btnMute.innerText = "🔊";
    } else {
        musique.muted = true;
        btnMute.innerText = "🔇";
    }
    function relancerEcouteursBoutons() {
    // 1. Sons des clics
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
    
    // 2. Bouton IP
    const btnIp = document.getElementById('btn-ip');
    if(btnIp) { /* ... ton code de copie de l'IP ... */ }

    // 3. Bouton Mute
    const btnMute = document.getElementById('btn-mute');
    if(btnMute) { /* ... ton code pour couper le son ... */ }

    // 4. /!\ AJOUT : On rebranche le bouton Galerie après le retour !
    const btnGalerie = document.getElementById('btn-galerie');
    if(btnGalerie) {
        btnGalerie.addEventListener('click', ouvrirGalerie);
    }
}
});
