import dotenv from 'dotenv';

dotenv.config();

export const SITE_URL = 'https://britti.page';
export const GH_USER_REPO = 'RoboticWater/portfolio-netlify'; // used for pulling github issues and offering comments
export const REPO_URL = 'https://github.com/' + GH_USER_REPO;
export const SITE_TITLE = 'Portfolio | John Britti';
export const SITE_DESCRIPTION = "John Britti's portfolio";
export const DEFAULT_OG_IMAGE =
	'https://user-images.githubusercontent.com/6764957/147861359-3ad9438f-41d1-47c8-aa05-95c7d18497f0.png';
export const MY_TWITTER = '';
export const MY_YOUTUBE = '';

// dont forget process.env.GH_TOKEN
// if supplied, raises rate limit from 60 to 5000
// https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting
