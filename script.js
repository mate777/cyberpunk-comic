document.addEventListener("DOMContentLoaded", () => {
    // 1. ИНТЕРАКТИВНАЯ ЧИТАЛКА КОМИКСА
    const comicPages = [
        {
            title: "PAGE 01 // AWAKENING",
            img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop"
        },
        {
            title: "PAGE 02 // BREACH",
            img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop"
        },
        {
            title: "PAGE 03 // ESCAPE FROM NEO-ATACAMA",
            img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop"
        }
    ];

    let currentPage = 0;
    const comicImg = document.getElementById("comic-page-img");
    const comicTitle = document.getElementById("comic-page-title");
    const prevBtn = document.getElementById("prev-page-btn");
    const nextBtn = document.getElementById("next-page-btn");

    function updateComicPage() {
        if (comicImg && comicTitle) {
            comicImg.src = comicPages[currentPage].img;
            comicTitle.textContent = comicPages[currentPage].title;
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 0) {
                currentPage--;
                updateComicPage();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentPage < comicPages.length - 1) {
                currentPage++;
                updateComicPage();
            }
        });
    }

    // 2. DAO ГОЛОСОВАНИЕ
    let votesA = parseInt(localStorage.getItem("glitch_vote_a") || "42");
    let votesB = parseInt(localStorage.getItem("glitch_vote_b") || "18");

    const btnVoteA = document.getElementById("vote-btn-a");
    const btnVoteB = document.getElementById("vote-btn-b");
    const countA = document.getElementById("vote-count-a");
    const countB = document.getElementById("vote-count-b");

    function updateVoteUI() {
        if (countA) countA.textContent = votesA;
        if (countB) countB.textContent = votesB;
    }

    if (btnVoteA && btnVoteB) {
        updateVoteUI();

        btnVoteA.addEventListener("click", () => {
            votesA++;
            localStorage.setItem("glitch_vote_a", votesA);
            updateVoteUI();
            alert("Ваш голос за [A] The Underdeck Resistance записан!");
        });

        btnVoteB.addEventListener("click", () => {
            votesB++;
            localStorage.setItem("glitch_vote_b", votesB);
            updateVoteUI();
            alert("Ваш голос за [B] Rogue AI Collective записан!");
        });
    }

    // 3. ПОДКЛЮЧЕНИЕ METAMASK
    const connectBtn = document.getElementById("connect-wallet-btn");
    if (connectBtn) {
        connectBtn.addEventListener("click", async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
                    const account = accounts[0];
                    const shortAddr = account.substring(0, 6) + "..." + account.substring(account.length - 4);
                    connectBtn.textContent = shortAddr;
                    connectBtn.style.borderColor = "#00f3ff";
                    connectBtn.style.color = "#00f3ff";
                } catch (error) {
                    console.error("Ошибка подключения:", error);
                }
            } else {
                alert("MetaMask не обнаружен. Пожалуйста, установите расширение MetaMask.");
            }
        });
    }
});
