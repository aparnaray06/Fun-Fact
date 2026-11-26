
const generateBtn = document.getElementById("generateBtn");

const factElement = document.getElementById("fact");

const statusElement = document.getElementById("status");


async function generateFact() {

    try {

        // Loading state
        generateBtn.disabled = true;

        generateBtn.innerText = "✨ Discovering...";

        factElement.innerText =
            "Wait a moment! Finding something interesting...";

        statusElement.innerText = "Gemini AI is thinking...";

        // Request to backend
        const response = await fetch("/fun-fact");

        const data = await response.json();

        // Check response
        if (!response.ok) {
            throw new Error(data.error || "Failed to generate fact");
        }

        // Display fact
        factElement.innerText = data.fact;

        statusElement.innerText =
            "✨ Here's something new to learn!";

    }

    catch (error) {

        console.error("Error:", error);

        factElement.innerText =
            "Oops! Something went wrong. Please try again.";

        statusElement.innerText = error.message;

    }

    finally {

        // Restore button
        generateBtn.disabled = false;

        generateBtn.innerText = "✨ Discover a Fun Fact";

    }

}


// Button click event
generateBtn.addEventListener("click", generateFact);
