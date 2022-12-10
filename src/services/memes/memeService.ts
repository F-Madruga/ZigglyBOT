import fetch from 'node-fetch';

const BASE_URL = "https://api-popcord.vercel.app"
const SFW_MEME_ENDPOINT = "/img/sfw/meme"
const SFW_ANIME_MEME_ENDPOINT = "/img/sfw/anime_meme"

interface MemeResponse {
    success: boolean;
    name: string;
    url: string;
}

export class MemeService {
    getSFWMeme = async (): Promise<string> => { 
        const response = await fetch(BASE_URL + SFW_MEME_ENDPOINT, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
        }); 
        const data: MemeResponse = await response.json();
        return data.url;
    }

    getSFWAnimeMeme = async (): Promise<string> => {
        const response = await fetch(BASE_URL + SFW_ANIME_MEME_ENDPOINT, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
        });
        const data: MemeResponse = await response.json();
    
        return data.url;
    }
}

