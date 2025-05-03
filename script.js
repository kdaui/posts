            document.addEventListener('DOMContentLoaded', () => {
            const inputLine = document.getElementById('input-line');
            const output = document.getElementById('output');
            const suggestionsContainer = document.getElementById('suggestions');
            const commands = {
            'home': 'index.html',
            'sbw': 'sbw.html',
            'ascii': 'ascii.html',
            '2139': '2139.html',
            'wot': 'https://ourworldoftext.com/kdaui',
            'draco': 'a1q1b.html',
            'blackjack': 'blackjack.html',
            'kdake': 'kdake.html',
            'casino-ish': 'kdasino.html',
            'fmhy': 'https://fmhy.pages.dev',
            'google': 'https://www.google.com',
            'github': 'https://github.com',
            'youtube': 'https://www.youtube.com',
            'twitter': 'https://twitter.com',
            'spotify': 'https://open.spotify.com',
            'reddit': 'https://www.reddit.com',
            'wikipedia': 'https://en.wikipedia.org',
            'stackoverflow': 'https://stackoverflow.com',
            'linkedin': 'https://www.linkedin.com',
            'facebook': 'https://www.facebook.com',
            'instagram': 'https://www.instagram.com',
            'amazon': 'https://www.amazon.com',
            'netflix': 'https://www.netflix.com',
            'apple': 'https://www.apple.com',
            'duckduckgo': 'https://www.duckduckgo.com',
            'quora': 'https://www.quora.com',
            'discord': 'https://discord.com/channels/@me',
            'zoom': 'https://zoom.us',
            'classcharts': 'https://classcharts.com',
            'gemini': 'https://gemini.google.com/app',
            'steam': 'https://store.steampowered.com/',
            'wotaku': 'https://wotaku.moe/',
        };

        let currentFocus = -1;

            function getCurrentTime() {
                const now = new Date();
                return now.toLocaleTimeString();
            }
        
            function getCurrentTemperature() {
                return "22°C";
            }
        
            function displayHelp() {
                output.innerHTML += `
                    <div>Help:</div>
                    <div>- Type a command to visit a website (e.g., 'google' for Google).</div>
                    <div>- Type 'time' to get the current time.</div>
                    <div>- Type 'temp' to get the current temperature.</div>
                    <div>- Type 'help' to see this message.</div>
                `;
            }
        
            function handleInput(event) {
                if (event.key === 'Enter') {
                    const command = inputLine.value.trim().toLowerCase();
                    inputLine.value = '';
                    output.innerHTML += `<div>user@terminal:~$ ${command}</div>`;
                    
                    if (command === 'commands to do things.') {
                        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                        output.innerHTML += `<div>lmao</div>`;
                    } else if (command === 'time') {
                        output.innerHTML += `<div>Current time: ${getCurrentTime()}</div>`;
                    } else if (command === 'temp') {
                        output.innerHTML += `<div>Current temperature: ${getCurrentTemperature()}</div>`;
                    } else if (command === 'help') {
                        displayHelp();
                    } else if (command in commands) {
                        window.open(commands[command], '_blank');
                        output.innerHTML += `<div>Opening ${command}...</div>`;
                    } else {
                        output.innerHTML += `<div>Command not found: ${command}</div>`;
                    }
        
                    output.scrollTop = output.scrollHeight;
                    suggestionsContainer.style.display = 'none';
                    currentFocus = -1;
                } else if (event.key === 'ArrowDown') {
                    currentFocus++;
                    addActive(suggestionsContainer);
                } else if (event.key === 'ArrowUp') {
                    currentFocus--;
                    addActive(suggestionsContainer);
                } else if (event.key === 'Tab') {
                    event.preventDefault();
                    const activeSuggestion = suggestionsContainer.querySelector('.suggestion.active');
                    if (activeSuggestion) {
                        inputLine.value = activeSuggestion.innerText;
                    }
                    suggestionsContainer.style.display = 'none';
                } else {
                    showSuggestions(inputLine.value);
                }
            }
        
            function showSuggestions(value) {
                const matches = Object.keys(commands).filter(command =>
                    command.toLowerCase().startsWith(value.toLowerCase())
                );
                suggestionsContainer.innerHTML = '';
                if (matches.length === 0) {
                    suggestionsContainer.style.display = 'none';
                    return;
                }
                matches.forEach(match => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('suggestion');
                    suggestion.innerText = match;
                    suggestion.addEventListener('click', () => {
                        inputLine.value = match;
                        suggestionsContainer.style.display = 'none';
                        handleInput({ key: 'Enter' });
                    });
                    suggestionsContainer.appendChild(suggestion);
                });
                suggestionsContainer.style.display = 'block';
            }
        
            function addActive(suggestionsContainer) {
                const suggestions = suggestionsContainer.getElementsByClassName('suggestion');
                if (!suggestions || suggestions.length === 0) return;
                removeActive(suggestions);
                if (currentFocus >= suggestions.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = suggestions.length - 1;
                suggestions[currentFocus].classList.add('active');
            }
        
            function removeActive(suggestions) {
                for (let i = 0; i < suggestions.length; i++) {
                    suggestions[i].classList.remove('active');
                }
            }
        
            inputLine.addEventListener('keyup', handleInput);
});
