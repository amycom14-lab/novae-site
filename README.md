# Site NOVAE — prêt à mettre en ligne

Site vitrine one-page pour **NOVAE**, studio numérique & IA (Mali).
HTML / CSS / JavaScript statiques : aucun serveur, aucune base de données,
aucune installation nécessaire.

## Site en ligne

**<https://amycom14-lab.github.io/novae-site/>**

Hébergement gratuit **GitHub Pages**, dépôt
[`amycom14-lab/novae-site`](https://github.com/amycom14-lab/novae-site).
Le site se met à jour automatiquement à chaque envoi sur la branche `main`
(compter une minute).

## Aperçu en local

Double-clique sur `index.html` : le site s'ouvre dans le navigateur.

Pour un aperçu plus proche du web (et éviter les restrictions `file://`) :

```powershell
cd site-novae
python -m http.server 8000
```

Puis ouvre <http://localhost:8000>.

## Structure

```
site-novae/
├── index.html          Page principale
├── 404.html            Page d'erreur
├── robots.txt          Instructions pour les moteurs de recherche
├── sitemap.xml         Plan du site (à mettre à jour avec le domaine)
├── og-image.png        Image de partage (WhatsApp, Facebook, LinkedIn…)
├── assets/
│   ├── styles.css      Mise en forme
│   ├── app.js          Menu, animations, formulaire WhatsApp
│   ├── favicon.svg     Icône du site
│   ├── logo.svg        Logo carré (réseaux sociaux, favicon…)
│   └── og-source.html  Source de l'image de partage
└── README.md
```

## Mettre à jour le site

Le site est déjà en ligne. Chaque modification envoyée sur la branche `main`
du dépôt est publiée automatiquement en une minute environ.

### A. Depuis GitHub (sans terminal)

1. Ouvre <https://github.com/amycom14-lab/novae-site>.
2. **Add file → Upload files**, puis dépose les fichiers modifiés
   (`index.html`, `assets/styles.css`, etc.).
3. Clique sur **Commit changes**. GitHub Pages republie le site.

### B. En ligne de commande

```powershell
git clone https://github.com/amycom14-lab/novae-site.git
# copie les fichiers modifiés dans le dossier cloné
cd novae-site
git add -A
git commit -m "Mise à jour du site"
git push
```

## Changer d'hébergeur (facultatif)

### Netlify Drop

1. Va sur <https://app.netlify.com/drop>.
2. Glisse le dossier `site-novae` dans la page.
3. Le site est en ligne avec une adresse du type `novae-xxx.netlify.app`.

### Vercel

1. Crée un compte sur <https://vercel.com>.
2. **Add New → Project → Deploy** et importe le dossier (ou le dépôt Git).
3. Framework preset : **Other**. Aucune commande de build.

### Hébergement classique (cPanel, OVH, Hostinger…)

1. Ouvre le gestionnaire de fichiers de l'hébergeur.
2. Envoie **tout le contenu** de `site-novae/` dans `public_html/`.
3. Vérifie que `index.html` est bien à la racine.

## Personnaliser

### 1. Les coordonnées

Elles apparaissent à **trois endroits** :

- `index.html` : liens `tel:`, `mailto:`, `wa.me`, pied de page ;
- `assets/app.js` : constantes `WHATSAPP` et `EMAIL` (formulaire) ;
- `index.html` : bloc JSON-LD (référencement) en haut du fichier.

Numéro WhatsApp au format international **sans** `+` ni espaces :
`22393744951`.

### 2. Les couleurs

Dans `assets/styles.css`, bloc `:root` :

```css
--blue: #4f8cff;
--violet: #a855f7;
--lime: #d8ff5e;
```

### 3. Les textes

Tout est dans `index.html`, section par section, avec des commentaires
(`<!-- ============ SERVICES ============ -->`).

### 4. Le formulaire

Il n'y a **pas de serveur** : au clic sur « Envoyer sur WhatsApp », le site
ouvre WhatsApp avec un message déjà rempli. Le lien « envoyer un email »
ouvre le logiciel de messagerie avec le même contenu.

Pour recevoir les demandes par email sans passer par WhatsApp, il faudra
brancher un service comme Formspree, ou ajouter un petit serveur.

## Compatibilité appareils et formats

Le site a été testé de **280 px à 3440 px** de large, sans débordement
horizontal ni texte tronqué.

- **Téléphones** : 280, 320, 360, 375, 390, 414, 430, 480 px (dont iPhone SE,
  encoches et barres gestuelles iOS/Android).
- **Foldables et petites tablettes** : 540 → 820 px, y compris écran plié.
- **Tablettes** : 768, 820, 900, 1024, 1180 px, portrait et paysage.
- **Ordinateurs** : 1280 → 1920 px, avec conteneur élargi à 1280 px dès
  1600 px, puis 1400 px dès 2200 px.
- **Très grands écrans / 4K** : 2560 et 3440 px.
- **Paysage mobile** (hauteur ≤ 600 px) : en-tête compact, hero resserré et
  visuel masqué sous 430 px de haut pour laisser place au contenu.
- **Impression / PDF** : feuille de style dédiée (fond blanc, cartes
  simplifiées, boutons et visuel masqués).

Détails techniques intégrés :

- zones sûres `env(safe-area-inset-*)` pour les encoches et la barre gestuelle ;
- champs de formulaire à 16 px minimum (pas de zoom automatique sur iOS) ;
- boutons d'au moins 44 px et `touch-action: manipulation` ;
- menu mobile en `100dvh` avec repli `100vh`, verrouillage du défilement
  compatible iOS et fermeture au changement d'orientation ;
- `prefers-reduced-motion`, `prefers-contrast` et `forced-colors` gérés ;
- bouton WhatsApp flottant masqué à l'approche de la section contact ou du
  pied de page sur mobile, pour ne rien recouvrir.

## Après la mise en ligne — checklist

- [x] URL `canonical`, `og:url` et `og:image` configurées pour GitHub Pages.
- [x] `robots.txt` et `sitemap.xml` pointent vers le site en ligne.
- [x] Numéro WhatsApp, email et liens vérifiés.
- [ ] Envoyer le site à quelques proches et tester sur un vrai téléphone
      (portrait et paysage).
- [ ] Tester le formulaire WhatsApp depuis un téléphone.
- [ ] Tester l'impression (Ctrl+P) : le contenu doit rester lisible sur fond blanc.
- [ ] Quand un nom de domaine est acheté : le remplacer dans `index.html`
      (`canonical`, `og:url`, `og:image`), `robots.txt` et `sitemap.xml`,
      puis ajouter le domaine dans **Settings → Pages → Custom domain**.

## Notes techniques

- Polices : Space Grotesk + Inter via Google Fonts (connexion internet requise,
  sinon polices système de secours).
- Aucun cookie, aucun traqueur, aucune dépendance JavaScript.
- Le site est responsive du téléphone 280 px aux écrans 4K, en portrait comme
  en paysage, et respecte `prefers-reduced-motion`.
- L'image `og-image.png` (1200 × 630) est utilisée pour les aperçus de partage.
