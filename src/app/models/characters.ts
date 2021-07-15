import { Character } from "./character";

export interface Characters {
    info: {
        /* The length of the response */
        count: number;
        /* The amount of pages */
        pages: number;
        /* Link to the next page (if it exists) */
        next: string;
        /* Link to the previous page (if it exists) */
        prev: string;
    },
    results: Character[]
}