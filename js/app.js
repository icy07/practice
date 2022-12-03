(() => {
    "use strict";
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        let iconMenu = document.querySelector(".icon-menu");
        let menuBody = document.querySelector(".menu__body");
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (e.target.closest(".icon-menu")) {
                bodyLockToggle(0);
                document.documentElement.classList.toggle("menu-open");
            }
            if (!iconMenu.contains(e.target) && !menuBody.contains(e.target)) {
                document.documentElement.classList.remove("menu-open");
                bodyUnlock(0);
            }
        }));
    }
    function menuClose() {
        bodyUnlock(0);
        document.documentElement.classList.remove("menu-open");
    }
    let gotoblock_gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
        const targetBlockElement = document.querySelector(targetBlock);
        if (targetBlockElement) {
            let headerItem = "";
            let headerItemHeight = 0;
            if (noHeader) {
                headerItem = "header.header";
                headerItemHeight = document.querySelector(headerItem).offsetHeight;
            }
            document.documentElement.classList.contains("menu-open") ? menuClose() : null;
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
                top: targetBlockElementPosition,
                behavior: "smooth"
            });
        }
    };
    let addWindowScrollEvent = false;
    function pageNavigation() {
        document.addEventListener("click", pageNavigationAction);
        function pageNavigationAction(e) {
            if ("click" === e.type) {
                const targetElement = e.target;
                if (targetElement.closest("[data-goto]")) {
                    const gotoLink = targetElement.closest("[data-goto]");
                    const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
                    const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
                    const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
                    const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
                    gotoblock_gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    e.preventDefault();
                }
            }
        }
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const questions = [ {
        q: "Что такое DOM?",
        a: {
            a: "Дом (House)",
            b: "Язык программирования",
            c: "Это платформо- и языково-нейтральный интерфейс, позволяющий программам и сценариям динамически обращаться и обновлять содержимое, структуру и стиль документа.",
            d: "Тип базы данных"
        }
    }, {
        q: "Как расшифровывается DOM?",
        a: {
            a: "Domestic Oriental Mineral",
            c: "Document Object Model",
            b: "Dutch's Objective Mission",
            d: "Divine Oak's Moral"
        }
    }, {
        q: "Гланвый тэг в HTML?",
        a: {
            c: "html",
            a: "body",
            b: "main",
            d: "head"
        }
    }, {
        q: "Для чего нужен тэг header?",
        a: {
            c: "Для отделения шапки сайта от всего остального",
            a: "В него вписывают мета тэги, а также ссылку на css файлв и title для сайта",
            b: "Нет такого тэга",
            d: "Для выделения текста жирным"
        }
    }, {
        q: "Как в JS получить элемент через id?",
        a: {
            a: "element.contains",
            b: "document.this",
            d: "document.id()",
            c: "document.getElementById()"
        }
    }, {
        q: "Какой тэг нужен для подключения CSS?",
        a: {
            a: "&lt;p&gt;",
            b: "&lt;css&gt;",
            c: "&lt;link&gt;",
            d: "&lt;src&gt;"
        }
    }, {
        q: "Какой тэг нужен для подключения JS?",
        a: {
            c: "&lt;script&gt;",
            a: "&lt;js&gt;",
            b: "&lt;link&gt;",
            d: "&lt;src&gt;"
        }
    }, {
        q: "Для навигации по дереву в ближайших окрестностях текущего узла можно использовать следующие свойства:",
        a: {
            c: "parentNode <br> parentNode <br> lastChild",
            a: "nodeName <br> nodeValue <br> nodeType",
            b: "XML <br> DTD <br> XDR",
            d: "nodeValue  <br> nodeName  <br> innerHTML "
        }
    }, {
        q: "В HTML DOM каждый узел является объектом, который может иметь методы (функции) и свойства. Наиболее важными являются следующие свойства:",
        a: {
            a: "parentNode <br> parentNode <br> lastChild",
            c: "nodeName <br> nodeValue <br> nodeType",
            b: "XML <br> DTD <br> XDR",
            d: "nodeValue  <br> nodeName  <br> innerHTML "
        }
    }, {
        q: "Как поменять цвет текста в css?",
        a: {
            a: "display: flex",
            b: "box-sizing",
            c: "color",
            d: "font-size"
        }
    }, {
        q: "Как увеличить блок на всю высоту экрана пользователя в css?",
        a: {
            a: "height: 100%",
            c: "height: 100vh",
            b: "width: 100%",
            d: "width: 100vw"
        }
    }, {
        q: "Что такое XML?",
        a: {
            a: "Не знаю",
            c: "Рекомендованный W3C язык разметки. XML - текстовый формат, предназначенный для хранения структурированных данных, для обмена информацией между программами, а также для создания на его основе специализированных языков разметки. XML является упрощённым подмножеством языка SGML.",
            b: "Что-то с программированием",
            d: "Не знаю"
        }
    }, {
        q: "Как расшифровывается DTD?",
        a: {
            a: "Doctor Tried to Drive",
            b: "Demolish Tipical Dam",
            d: "Don't Talk Dumb",
            c: "Document Type Definition"
        }
    }, {
        q: "XML Schema или просто XSD - рекомендация консорциума какого года?",
        a: {
            c: "2001",
            a: "2000",
            b: "2002",
            d: "1999"
        }
    }, {
        q: "Как в JS обозначить оператор 'И'?",
        a: {
            a: "AND",
            c: "&",
            b: "&&",
            d: "||"
        }
    } ];
    if (document.querySelector(".quiz")) {
        let result = 0;
        let step = 0;
        let curStep = document.querySelector(".current-step");
        let allSteps = document.querySelector(".all-steps");
        curStep.innerHTML = step + 1;
        allSteps.innerHTML = questions.length;
        function showQuestion(questionNumber) {
            document.querySelector(".quiz__question").innerHTML = questions[step]["q"];
            let answer = "";
            for (let key in questions[step]["a"]) answer += `<li data-a="${key}" class="quiz__li">${questions[step]["a"][key]}</li>`;
            document.querySelector(".quiz__answers").querySelector("ul").innerHTML = answer;
        }
        function showResults(result) {
            let div = document.createElement("div");
            let resultSaying;
            if (result <= 3) resultSaying = "Очень плохо"; else if (result <= 7) resultSaying = "Плоховато, постарайся лучше"; else if (result <= 12) resultSaying = "Хорошо, но можно было и получше"; else resultSaying = "Отличный результат!";
            div.classList.add("quiz__results");
            div.innerHTML = `Вас счёт: ${result} из ${questions.length} <br> <br> ${resultSaying}`;
            document.querySelector(".quiz").appendChild(div);
        }
        document.addEventListener("click", (function(e) {
            if (e.target.classList.contains("quiz__li") && step < questions.length) {
                if ("c" == e.target.dataset.a) result++;
                let lis = document.querySelector(".quiz__answers").querySelectorAll("li");
                let correctLi = document.querySelector("li[data-a='c']");
                lis.forEach((e => {
                    e.classList.add("incorrect");
                }));
                correctLi.classList.remove("incorrect");
                correctLi.classList.add("correct");
                setTimeout((() => {
                    step++;
                    if (step == questions.length) {
                        document.querySelector(".quiz__top").remove();
                        document.querySelector(".quiz__answers").remove();
                        showResults(result);
                    } else showQuestion(step);
                    curStep.innerHTML = step + 1;
                }), 1e3);
            }
        }));
        showQuestion(step);
    }
    menuInit();
    pageNavigation();
})();