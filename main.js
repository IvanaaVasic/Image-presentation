const mainContent = document.querySelector(".main-content");

fetch("https://api.unsplash.com/photos/?client_id=2p21d3By0CooQeMKJfzZixV_7C-alKOdI60AQBdR1hQ")
  .then((response) => {
    return response.json();
  })
  .then((images) => {
    document.querySelector(".overlay").style.display = "none";

    for (let i = 0; i < images.length; i++) {
      const sizeClass = i % 2 === 0 ? "card-long" : "card-short";

      if (i < images.length / 2) {
        generateImageView(images[i], `.column-img-1`, sizeClass);
      } else {
        generateImageView(images[i], `.column-img-2`, sizeClass);
      }
    }

    lightboxSetup();
  });

function lightboxSetup() {
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  const allImageElements = document.querySelectorAll(".img-decoration");

  allImageElements.forEach((image) => {
    image.addEventListener("click", (e) => {
      lightbox.classList.add("active");
      const img = document.createElement("img");
      img.src = image.src;
      while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild);
      }
      lightbox.appendChild(img);
    });
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target !== e.currentTarget) return;
    lightbox.classList.remove("active");
  });
}

function generateImageView(imageData, columnClass, sizeClass) {
  const newImageCard = `<div class="card ${sizeClass}"></div>`;

  const columnElement = document.querySelector(columnClass);
  columnElement.insertAdjacentHTML("beforeend", newImageCard);

  const cardEl = columnElement.querySelector(".card:nth-last-of-type(1)");

  generateImage(imageData, cardEl);
  generateImgInfo(imageData, cardEl);
}

function generateImage(imageData, cardEl) {
  let alt;
  if (imageData.alt_description === null) {
    alt = "default";
  } else {
    alt = imageData.alt_description;
  }
  const img = ` <img src="${imageData.urls.regular}" alt="${alt}" class="img-decoration" loading="lazy"/>`;
  cardEl.insertAdjacentHTML("beforeend", img);
}

function generateImgInfo(imageData, cardEl) {
  const imgInfoContainer = `<div class="img-info">`;
  cardEl.insertAdjacentHTML("beforeend", imgInfoContainer);

  const infoContainer = cardEl.querySelector(".img-info:nth-last-of-type(1)");
  generateInfoContent(imageData, infoContainer);
}

function generateInfoContent(imageData, infoContainer) {
  let portfolio;
  let portfolioClass;
  if (imageData.user.portfolio_url === null) {
    portfolio = "Not available";
    portfolioClass = "unavailable";
  } else {
    portfolio = "Portfolio";
    portfolioClass = "portfolio";
  }

  let instaClass;
  let instagram;
  let instaName;
  if (imageData.user.social.instagram_username === null) {
    instagram = "";
    instaName = "Not available";
    instaClass = "unavailable";
  } else {
    instagram = "https://www.instagram.com/" + imageData.user.social.instagram_username;
    instaName = "Instagram profile";
    instaClass = "instagram";
  }

  let twitterClass;
  let twitter;
  let twitterName;
  if (imageData.user.social.twitter_username === null) {
    twitter = "";
    twitterName = "Not available";
    twitterClass = "unavailable";
  } else {
    twitter = "https://twitter.com/" + imageData.user.social.twitter_username;
    twitterName = "Twitter profile";
    twitterClass = "twitter";
  }

  const infoContent = `<div class="left-part">
    <div class="num-container">
      <div class="likes-wrapper">
        <p class="likes">Likes:</p>
        <p class="num-likes">${imageData.likes}</p>
      </div>
      <div class="downloads-wrapper">
        <p class="downloads">Downloads:</p>
        <p class="num-downloads">${imageData.user.total_collections}</p>
      </div>
    </div>
    <div class="avatar-user">
      <div class="avatar-container"><img src="${imageData.user.profile_image.large}" loading="lazy" alt="avatar" class="avatar" /></div>
      <p class="username">${imageData.user.username}</p>
    </div>
  </div>
  <div class="right-part">
  <div class="photo-wrapper">
    <img src="img/photo-camera.png" alt="photograph logo" class="photo-logo" />
      <a href="${imageData.urls.full}" class="photo">Full photo</a>
    </div>
    <div class="portfolio-wrapper">
    <img src="img/photo.png" alt="portfolio logo" class="portfolio-logo" />
      <a href="${imageData.user.portfolio_url}" class="${portfolioClass}">${portfolio}</a>
    </div>
    <div class="insta-wrapper">
      <img src="img/instagram.png" alt="instagram logo" class="insta-logo" />
      <a href="${instagram}" class="${instaClass}">${instaName}</a>
    </div>
    <div class="twitter-wrapper">
      <img src="img/icon-twitter.svg" alt="twitter logo" class="twitter-logo" />
      <a href="${twitter}" class="${twitterClass}">${twitterName}</a>
    </div>
  </div>`;

  infoContainer.insertAdjacentHTML("beforeend", infoContent);
}
