(() => {
  let products = [];
  if (window.location.pathname !== "/") {
    console.log("wrong page");
    return;
  }

  const handleFetch = async () => {
    try {
      const response = await fetch(
        "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json"
      );
      products = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  let favorites = JSON.parse(
    localStorage.getItem("carousel_favorites") || "[]"
  );

  const buildProductCard = (product) => {
    const discount =
      product.original_price > product.price
        ? Math.round(
            ((product.original_price - product.price) /
              product.original_price) *
              100
          )
        : 0;
    const isFavorite = favorites.includes(product.id.toString());

    return `
    <div class="product-card eb-product-card">
      <div class="product-item">
        <a class="product-item-anchor " href="${product.url}">
          <div class="poduct-item-info-group ">
            <figure class="product-item__img list-view">
              <div class="product-item__multiple-badge">
                <span class="d-flex flex-column">
                  <i class="toys-icon toys-icon-most-seller-product "></i>
                  <i class="toys-icon toys-icon-star-product "></i>
                </span>
              </div>
              <div class="product-item__line-badge"></div>
              <cx-media format="product" class="is-initialized">
                <img class=" ls-is-cached lazyloaded" alt="${
                  product.name
                }" data-src="${product.img}" src="${product.img}">
              </cx-media>
            </figure>
            <div class="product-item-content">
              <h2 class="product-item__brand">
                <b>${product.brand} - </b>
                <span class="description plist-desc">${product.name}</span>
              </h2>
              <div class="stars">
                <cx-icon class="star cx-icon fas fa-star "></cx-icon>
                <cx-icon class="star cx-icon fas fa-star "></cx-icon>
                <cx-icon class="star cx-icon fas fa-star "></cx-icon>
                <cx-icon class="star cx-icon fas fa-star "></cx-icon>
                <cx-icon class="star cx-icon fas fa-star "></cx-icon>
              </div>
              <div class="promotions"></div>
            </div>
          </div>
          <div class="product-item__price list-view ">
            <eb-price-show class="">
              <div _ngcontent-serverapp-c112="" class="price-box price-box--list">
                <div _ngcontent-serverapp-c112="" class="price-group-container">
                  <div _ngcontent-serverapp-c112="" class="price-group-1">
                    ${
                      discount > 0
                        ? `
                      <div _ngcontent-serverapp-c112="" class="original-price">
                        <span _ngcontent-serverapp-c112="" class="old-price">${product.original_price}<span _ngcontent-serverapp-c112="" class=""> TL</span>
                        </span>
                        <span _ngcontent-serverapp-c112="" class="discount ">%${discount}</span>
                      </div>
                      <div _ngcontent-serverapp-c112="" class="discounted-price ">
                        <strong _ngcontent-serverapp-c112="">${product.price}<span _ngcontent-serverapp-c112="" class=""> TL</span></strong>
                      </div>
                    `
                        : `
                      <div _ngcontent-serverapp-c112="" class="discounted-price ">
                        <strong _ngcontent-serverapp-c112="">${product.price}<span _ngcontent-serverapp-c112="" class=""> TL</span></strong>
                      </div>
                    `
                    }
                  </div>
                </div>
              </div>
            </eb-price-show>
          </div>
        </a>
        <div class="heart">
          <div  class="icon-wrapper favorite-btn ${
            isFavorite ? "active" : ""
          }" data="${product.id}">
            <i class="toys-icon toys-icon-heart-outline"></i>
            <i class="toys-icon toys-icon-heart-orange-outline hovered"></i>
          </div>
        </div>
        <div class="button-container">
            <button class="btn add-to-cart-btn btn-add disable btn-add-circle ">
              <div class="inner-btn ">
                <i class="toys-icon toys-icon-plus-blue add-icon"></i>
                <i class="toys-icon toys-icon-plus-white add-icon hovered"></i>
              </div>
            </button>
        </div>
      </div>
    </div>
      `;
  };

  const buildHTML = () => {
    const productsHTML = products.map(buildProductCard).join("");
    const html = `
      <div class="banner">
        <div class="container">
          <eb-carousel-header>
            <div class="banner__titles">
              <h2>Beğenebileceğinizi düşündüklerimiz</h2>
            </div>
          </eb-carousel-header>
          <div class="banner__wrapper">
              <div class="carousel-container">
                        ${productsHTML}
                  </div>
              <button aria-label="back" id="prev" class="swiper-prev">
                <i class="toys-icon toys-icon-arrow-left"></i>
              </button>
              <button aria-label="next" id="next" class="swiper-next">
                <i class="toys-icon toys-icon-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    const productCarousel = document.querySelector(".hero");
    if (productCarousel) {
      productCarousel.insertAdjacentHTML("afterend", html);
    }
  };
  const buildCSS = () => {
    const css = `
     .carousel-container {
        display: grid;
        grid-auto-flow: column;   
        gap: 16px;
        align-items: stretch;      
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        padding: 20px 0px;
      }

      .carousel-container {
        -ms-overflow-style: none; 
        scrollbar-width: none;    
      }

      .carousel-container::-webkit-scrollbar {
        display: none;             
      }
  
      .carousel-container > .eb-product-card {
        flex: 0 0 245.2px;
        width: 245.2px;
        min-width: 0;
        box-sizing: border-box;
        scroll-snap-align: start;
        height: 100%;
      }

      @media (max-width: 1580px) {
      .carousel-container > .eb-product-card {
        flex: 0 0 240.4px;
        width: 240.4px;
      }
    }

      @media (max-width: 1480px) {
      .carousel-container > .eb-product-card {
        flex: 0 0 275.5px;
        width: 275.5px;
      }
     }


     @media (max-width: 1280px) {
      .carousel-container > .eb-product-card {
        flex: 0 0 299.333px;
        width: 299.333px;
      }
     }

      @media (max-width: 768px) {
      .carousel-container > .eb-product-card {
        flex: 0 0 247;
        width: 247;
      }
     }

      .stars {
        display: flex;
        gap: 1px;
      }

      #prev, #next {
        z-index: !important 9999;
      }
  
      .button-container {
        position: absolute;
        bottom: 4px;
        right: 4px;
      }

      .favorite-btn.active .toys-icon-heart-outline {
        display: none;
      }

      .favorite-btn.active .toys-icon-heart-orange-outline {
        display: inline-block;
      }

      .favorite-btn .toys-icon-heart-orange-outline {
        display: none;
      }

    `;
    const style = document.createElement("style");
    style.className = "carousel-style";
    style.textContent = css;
    document.head.appendChild(style);
  };

  const setEvents = () => {
    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");
    const carousel = document.querySelector(".carousel-container");
    const favButtons = document.querySelectorAll(".favorite-btn");

    const getItemWidth = () => {
      const item = carousel.querySelector(".eb-product-card");
      if (!item) return 245;
      const rect = item.getBoundingClientRect();
      return Math.round(rect.width);
    };

    const maxScrollLeft = () =>
      Math.max(0, carousel.scrollWidth - carousel.clientWidth);

    nextButton.addEventListener("click", () => {
      const iw = getItemWidth();
      const newScroll = Math.min(carousel.scrollLeft + iw, maxScrollLeft());
      carousel.scrollTo({ left: newScroll, behavior: "smooth" });
    });

    prevButton.addEventListener("click", () => {
      const iw = getItemWidth();
      const newScroll = Math.max(carousel.scrollLeft - iw, 0);
      carousel.scrollTo({ left: newScroll, behavior: "smooth" });
    });

    favButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.getAttribute("data");
        if (!favorites.includes(productId)) {
          favorites.push(productId);
          btn.classList.add("active");
        } else {
          favorites = favorites.filter((id) => id !== productId.toString());
          btn.classList.remove("active");
        }
        localStorage.setItem("carousel_favorites", JSON.stringify(favorites));
      });
    });
  };

  const init = async () => {
    try {
      await handleFetch();
      buildHTML();
      buildCSS();
      setEvents();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  };

  init();
})();
