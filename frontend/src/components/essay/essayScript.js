document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("theme-generate-button");
    const themeTitle = document.getElementById("theme-text-title");
    const themeContent = document.getElementById("theme-text-content");
    const essayContent = document.getElementById("essay-text-content");
    const motivatingContent = document.getElementById("motivating-text-content");
});

export async function generateTheme() {
    return response = await fetch("/api/essay/generate", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
