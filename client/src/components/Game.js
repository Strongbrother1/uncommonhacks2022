import React from "react"
import "./../css/main.css"
export default function Game() {
    const [name, setName] = React.useState("")
    const handlePlayClicked = () => {
        console.log(name);
    }
    return (
        <div>
            <div id="gameAreaWrapper">
                <div id="status"><span class="title">Leaderboard</span></div>
                <div class="chatbox" id="chatbox">
                    <ul id="chatList" class="chat-list"></ul>
                    <input id="chatInput" type="text" class="chat-input" placeholder="Chat here..." maxlength="35" />
                </div>
                <div id="mobile">
                <input type="image" id="split" class="split" src="img/split.png" alt="splitBtn"></input>
                <input type="image" id="feed" class="feed" src="img/feed.png" alt="feedBtn"></input>
                </div>
                <canvas tabindex="1" id="cvs"></canvas>
            </div>
            <div id="startMenuWrapper">
                <div id="startMenu">
                    <p>Open Agar</p>
                    <input type="text" tabindex="0" autofocus placeholder="Enter your name here" id="playerNameInput" onChange={(event) => setName(event.target.value)} maxlength="25" />
                    <b class="input-error">Nick must be alphanumeric characters only!</b>
                    <br />
                    <a onclick="document.getElementById('spawn_cell').play();"><button id="startButton" onClick={handlePlayClicked}>Play</button></a>
                    <button id="spectateButton">Spectate</button>
                    <button id="settingsButton">Settings</button>
                    <br />
                    <div id="settings">
                        <h3>Settings</h3>
                        <ul>
                            <label><input id="visBord" type="checkbox"/>Show border</label>
                            <label><input id="showMass" type="checkbox"/>Show mass</label>
                            <br />
                            <label><input id="continuity" type="checkbox"/>Continue moving when mouse is off-screen</label>
                            <br />
                            <label><input id="roundFood" type="checkbox" checked/>Rounded food</label>
                            <label><input id="darkMode" type="checkbox"/>Toggle Dark Mode</label>
                        </ul>
                    </div>
                    <div id="instructions">
                        <h3>Gameplay</h3>
                        <ul>
                            <li>Move your mouse on the screen to move your character.</li>
                            <li>Eat food and other players in order to grow your character (food respawns every time a player eats it).</li>
                            <li>A player's mass is the number of food particles eaten.</li>
                            <li>Objective: Try to get fat and eat other players.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}