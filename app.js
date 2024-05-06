// DOM ELEMENTS
// select stuff
const characterSelectEl = document.getElementById("character-list");
const defaultCharacterSelectOptionEl = document.getElementById("default-character-select-option");

// character stuff
const characterItemImageEl = document.getElementById("character-item-image");
const characterItemDescriptionEl = document.getElementById("character-item-description");
const characterItemOriginEl = document.getElementById("character-item-origin");
const characterItemSpeciesEl = document.getElementById("character-item-species");
const characterItemStatusEl = document.getElementById("character-item-status");
const characterItemGenderEl = document.getElementById("character-item-gender");

// location stuff
const locationSection = document.getElementById("section-location-details");
const locationItemName = document.getElementById("location-name");
const locationItemType = document.getElementById("location-type");
const locationItemDimension = document.getElementById("location-dimension");

// GLOBAL VARIABLES
const API_BASE_URL = "https://rickandmortyapi.com/api"; // The base api url
const CHARACTERS_URL = "/character/"; // Append character ids, more with comma separated.

let characterQueryStringPlaceholder = "1,2,3,4,5";

let characters = [];

// EVENT LISTENERS
characterSelectEl.addEventListener("change", (event) => handleCharacterChange(event));
characterItemOriginEl.addEventListener("mouseenter", (event) => handleMouseEnterLocation(event));
characterItemOriginEl.addEventListener("mouseleave", handleMouseLeaveLocation);

// EVENT HANDLERS
function handleCharacterChange(event) {
    defaultCharacterSelectOptionEl.setAttribute("disabled", true);
    // console.log(event.target);
    renderSingleCharacter(event.target.value);
}

async function handleMouseEnterLocation(event) {
    if (!event.target.value) return;

    // TODO: SHOULD WE REALLY FETCH EVERY TIME, fix here :D
    let location = await fetch(event.target.value);
    let locationJson = await location.json();

    renderLocationDetails(locationJson);
    showLocationSection();
    // console.log(locationJson);
}

function handleMouseLeaveLocation() {
    hideLocationSection();
}

// FUNCTIONS
async function getCharacterDataAsync() {
    /* Asynchronously fetch details for characters in the base url + characters */
    const resp = await fetch(API_BASE_URL + CHARACTERS_URL + characterQueryStringPlaceholder);
    const json = await resp.json();

    characters = json;
    renderCharacters(characters);
}

function showLocationSection() {
    locationSection.setAttribute("style", "display: inline-block;");
}

function hideLocationSection() {
    locationSection.setAttribute("style", "display: none;");
}

function renderCharacters(characters) {
    // For each character append an option child to the list
    for (const char of characters) {
        let newCharItem = document.createElement("option");
        newCharItem.innerText = `${char.name} | ${char.origin.name}`;
        newCharItem.value = `${char.id}`;

        characterSelectEl.appendChild(newCharItem);
    }
}

function renderSingleCharacter(characterID) {
    if (!characters) return;

    let selectedCharacter = characters.find((c) => c.id == characterID);

    // Set all info into the html dom
    characterItemImageEl.setAttribute("src", selectedCharacter.image);
    characterItemDescriptionEl.innerText = selectedCharacter.name;
    characterItemOriginEl.innerText = selectedCharacter.origin.name;
    characterItemOriginEl.value = selectedCharacter.origin.url;
    characterItemSpeciesEl.innerText = `Species: ${selectedCharacter.species}`;
    characterItemStatusEl.innerText = `Status: ${selectedCharacter.status}`;
    characterItemGenderEl.innerText = `Gender: ${selectedCharacter.gender}`;
}

function renderLocationDetails(location) {
    if (!location) return;

    locationItemName.innerText = `Name: ${location.name}`;
    locationItemType.innerText = `Type: ${location.type}`;
    locationItemDimension.innerText = `Dimension: ${location.dimension}`;
}

getCharacterDataAsync();
