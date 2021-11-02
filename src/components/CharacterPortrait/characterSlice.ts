import { createSlice } from "@reduxjs/toolkit"
import { RootState } from '../../app/store';

export enum CharacterPortraitType {
    Selector = 0,
    Display = 1
};

export interface Character {
    id: number;
    name: string;
    icon: string;
}

export interface CharacterPortrait {
    character: Character;
    type: CharacterPortraitType;
    selected: boolean;
    banned: boolean;
}

export interface CharacterState {
    characters: CharacterPortrait[];
    canRoll: boolean;
    selectedCharacters: CharacterPortrait[];
    bannedCharacters: CharacterPortrait[];
}

const defaultCharacters: CharacterPortrait[] = [
    {
        character: {
            id: 1,
            name: 'Graverobber',
            icon: 'graverobber.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 2,
            name: 'Hellion',
            icon: 'hellion.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 3,
            name: 'Highwayman',
            icon: 'highwayman.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 4,
            name: 'Jester',
            icon: 'jester.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 5,
            name: 'Leper',
            icon: 'leper.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 6,
            name: 'Man at Arms',
            icon: 'man-at-arms.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 7,
            name: 'Occultist',
            icon: 'occultist.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 8,
            name: 'Plague Doctor',
            icon: 'plague-doctor.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    },
    {
        character: {
            id: 9,
            name: 'Runaway',
            icon: 'runaway.png'
        },
        type: CharacterPortraitType.Selector,
        selected: false,
        banned: false
    }
];

const initialState: CharacterState = {
    characters: defaultCharacters,
    canRoll: true,
    selectedCharacters: [],
    bannedCharacters: []
};

export const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {
        selectCharacters: (state: CharacterState) => {
            const amount: number = (4 - state.selectedCharacters.length);
            for(let i = 0; i < amount; i++){
                const availableCharacters: CharacterPortrait[] = state.characters.filter((character) => (!state.bannedCharacters.includes(character) && !state.selectedCharacters.includes(character)));
                state.selectedCharacters = [...state.selectedCharacters,selectCharacter(availableCharacters)];
            }
        },
        clearCharacters: (state: CharacterState) => {
            state.selectedCharacters = [];
        },
        deselectCharacter: (state: CharacterState, transaction: {payload: CharacterPortrait}) => {
            state.selectedCharacters = state.selectedCharacters.filter((character) => (character !== transaction.payload))
        },
        banCharacter: (state: CharacterState, transaction: {payload: CharacterPortrait}) => {
            if(state.bannedCharacters.includes(transaction.payload)){
                // UNBAN
                state.selectedCharacters = state.selectedCharacters.map((character: CharacterPortrait) => {
                    if(character.character.id === transaction.payload.character.id){
                        character.banned = false;
                    }
                    return character;
                })
                state.bannedCharacters = state.bannedCharacters.filter((character: CharacterPortrait) => character !== transaction.payload);
            } else {
                // BAN
                state.selectedCharacters = state.selectedCharacters.map((character: CharacterPortrait) => {
                    if(character.character.id === transaction.payload.character.id){
                        character.banned = true;
                    }
                    return character;
                })
                state.bannedCharacters = [...state.bannedCharacters, transaction.payload];
            }
        }
    }
});

const selectCharacter = (availableCharacters: CharacterPortrait[]): CharacterPortrait => {
    const selectedCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
    availableCharacters = availableCharacters.filter((character) => character !== selectedCharacter);
    return selectedCharacter;
}

export const { selectCharacters, clearCharacters, deselectCharacter, banCharacter } = characterSlice.actions;

export const selectedCharacters = (state: RootState) => state.characters.selectedCharacters;
export const bannedCharacters = (state: RootState) => state.characters.bannedCharacters;

export default characterSlice.reducer;