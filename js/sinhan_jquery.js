document.addEventListener('DOMContentLoaded', () => {
  // PC 버전 (1280px 이상)
  if (window.innerWidth >= 1280) {
    const mainHeader = document.getElementById('main_header');
    const searchBar = document.querySelector('.search-bar');
    const backBtn = document.querySelector('.back-button');

    window.addEventListener('scroll', () => {
      // 스크롤에 따른 box-shadow 적용
      mainHeader.style.boxShadow = window.scrollY > 50 
        ? '0 4px 6px rgba(0, 0, 0, 0.1)' 
        : 'none';
        if (window.scrollY > 40) {
          searchBar.style.opacity = 0;
          backBtn.style.opacity = 0;
      } else {
        searchBar.style.opacity = 1;
        backBtn.style.opacity = 1;
      }
    });

    // 챗봇 팝업창 열기
    document.querySelector('.chatbot').addEventListener('click', (event) => {
      event.preventDefault();
      window.open('https://www.shinhancard.com/eer/EERPROXY/chatWindowNA.shc', 'chatWindow', 'width=600,height=800,scrollbars=yes');
    });

    const searchButton = document.querySelector('.search');

    searchButton.addEventListener('click', () => {
      searchBar.classList.toggle('show'); // 클래스 토글
      backBtn.classList.toggle('show');
    });
    backBtn.addEventListener('click', ()=>{
      searchBar.classList.remove('show');
      backBtn.classList.remove('show');
    })

    const searchRecommend = document.querySelector('.search-recommend');

    // search-bar에 포커스가 생기면 추천 검색어를 표시
    searchBar.addEventListener('focus', () => {
      searchRecommend.classList.add('show');
      document.getElementById('overlay').classList.add('show');
    });

    // search-bar에 포커스가 벗어나면 추천 검색어를 숨김
    searchBar.addEventListener('blur', () => {
        searchRecommend.classList.remove('show');
        document.getElementById('overlay').classList.remove('show');
    });
    
    // 메뉴 항목 마우스 오버/아웃 이벤트 (마지막 li 제외)
    const menuItems = document.querySelectorAll('.gnb > ul > li');
    const lastMenuItem = menuItems[menuItems.length - 1];
    menuItems.forEach((menuItem) => {
      if (menuItem !== lastMenuItem) {
        menuItem.addEventListener('mouseover', () => document.getElementById('overlay').classList.add('show'));
        menuItem.addEventListener('mouseout', () => document.getElementById('overlay').classList.remove('show'));
      }
    });

    // 서브 메뉴 활성화 및 닫기 처리
    menuItems.forEach(item => {
      const subMenu = item.querySelector('.sub');
      item.addEventListener('mouseenter', () => {
        const activeSubMenu = document.querySelector('.sub.open');
        if (activeSubMenu && activeSubMenu !== subMenu) activeSubMenu.classList.remove('open');
        subMenu.classList.add('open');
        subMenu.style.maxHeight = `${subMenu.getAttribute('data-max-height')}px`;
      });
    });

    // 메뉴 버튼 토글
    const menuButton = document.querySelector('.left_tnb button');
    const menu = document.querySelector('.menu');
    menuButton.addEventListener('click', () => menu.classList.toggle('show'));

    document.addEventListener('click', (event) => {
      if (!menuButton.contains(event.target) && !menu.contains(event.target)) menu.classList.remove('show');
    });

    // 인기 및 추천 카드 탭 설정
    const popularTab = document.querySelector('.popular a');
    const recommendedTab = document.querySelector('.recommended a');
    const popularCards = document.querySelector('.popular_cards');
    const recommendedCards = document.querySelector('.recommended_cards');

    recommendedCards.style.display = 'none'; // 추천 카드 섹션 숨김
    popularTab.parentElement.classList.add('on'); // 초기값으로 인기카드 활성화

    popularTab.addEventListener('click', (event) => {
      event.preventDefault();
      popularCards.style.display = 'block';
      recommendedCards.style.display = 'none';
      popularTab.parentElement.classList.add('on');
      recommendedTab.parentElement.classList.remove('on');
    });

    recommendedTab.addEventListener('click', (event) => {
      event.preventDefault();
      recommendedCards.style.display = 'block';
      popularCards.style.display = 'none';
      recommendedTab.parentElement.classList.add('on');
      popularTab.parentElement.classList.remove('on');
    });

    
    const slide = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slider li');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 60;
    const totalSlides = slides.length;

    for (let i = 0; i < totalSlides; i++) {
      const clone = slides[i].cloneNode(true);
      slide.appendChild(clone);
    }

    function updateSliderPosition(index, immediate = false) {
      if (immediate) {
        slide.style.transition = 'none';
      } else {
        slide.style.transition = 'transform 0.5s ease';
      }
      slide.style.transform = `translateX(${-slideWidth*(index+totalSlides-1)+(slideWidth/2)}px)`;
      if (immediate) {
        slide.offsetHeight;
        slide.style.transition = 'transform 0.5s ease';
      }
    }

    function moveToSlide(idx){
      currentIndex = idx;
      updateSliderPosition(currentIndex);

      if(idx<0){
        setTimeout(()=>{
          updateSliderPosition(totalSlides-1, true);
          currentIndex = totalSlides-1;
        },500)
      }else if(idx >= totalSlides){
        setTimeout(()=>{
          updateSliderPosition(0, true);
          currentIndex = 0;
        },500)
      }
    }

    prevBtn.addEventListener('click', () => moveToSlide(currentIndex-1));
    nextBtn.addEventListener('click', () => moveToSlide(currentIndex+1));
    updateSliderPosition(currentIndex, true);



    const buttons = document.querySelectorAll('.family_group button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const familyList = button.nextElementSibling;

        if (familyList.classList.contains('open')) {
          familyList.classList.remove('open');
        } else {
          familyList.classList.add('open');
        }

        button.classList.toggle('active');
      });
    });
  }

  // 모바일 버전 (768px 이하)
  if (window.innerWidth <= 768) {






    const slider = document.querySelector('.slide_container');
    const slides = document.querySelectorAll('.slider li');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let startX = 0;
    let moveX = 0;
    let isDragging = false;
    let slideInterval;

    function goToSlide(index) {
      slider.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      goToSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      goToSlide(currentIndex);
    }

    slider.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      isDragging = true;
      clearInterval(slideInterval);
    });

    slider.addEventListener('touchmove', (event) => {
      if (isDragging) {
        moveX = event.touches[0].clientX - startX;
        const translateValue = -currentIndex * 100 + (moveX / window.innerWidth) * 100;
        slider.style.transform = `translateX(${translateValue}%)`;
      }
    });

    slider.addEventListener('touchend', () => {
      isDragging = false;
      if (moveX > 50) prevSlide();
      else if (moveX < -50) nextSlide();
      else goToSlide(currentIndex);
      autoSlide();
    });

    function autoSlide() {
      slideInterval = setInterval(nextSlide, 3000);
    }

    autoSlide();

    document.querySelector('.next').addEventListener('click', () => {
      nextSlide();
      clearInterval(slideInterval);
      autoSlide();
    });

    document.querySelector('.prev').addEventListener('click', () => {
      prevSlide();
      clearInterval(slideInterval);
      autoSlide();
    });
  }



  // 카드 항목 클릭 이벤트 처리
  const cardItems = document.querySelectorAll('.sub_cards .cards_control li');
  const cardContainers = document.querySelectorAll('.cards_container');

  cardContainers.forEach(container => container.style.display = 'none');
  cardContainers[0].style.display = 'block';
  cardItems[0].classList.add('on');

  cardItems.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const target = item.getAttribute('data-target');

      cardContainers.forEach(container => container.style.display = 'none');
      const selectedContainer = document.querySelector(`.cards_container[data-target="${target}"]`);
      if (selectedContainer) selectedContainer.style.display = 'block';

      cardItems.forEach(i => i.classList.remove('on'));
      item.classList.add('on');
    });
  });
});