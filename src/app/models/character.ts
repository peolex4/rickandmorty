
export interface Character {
    /* int	The id of the character. */
    id: number;
    /* The name of the character. */
    name: string;
    /* 	The status of the character ('Alive', 'Dead' or 'unknown'). */
    status: string;
    /* 	The species of the character. */
    species: string;
    /* 	The type or subspecies of the character. */
    type: string;
    /* The gender of the character ('Female', 'Male', 'Genderless' or 'unknown'). */
    gender: string;
    /* Name, link, dimension in which the location is located and amount of residents of the character's origin location. */
    origin: {
        name: string;
        url: string;
        dimension?: string;
        amountOfResidents?: number;
    }
    /*  Name, link, dimension in which the location is located and amount of residents of character's last known location endpoint. */
    location: {
        name: string;
        url: string;
        dimension?: string;
        amountOfResidents?: number;
    }
    /* Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars. */
    image: string;
    /* List of link episodes in which this character appeared. */
    episode: string[];
    /* name of first episode character apperead on */
    firstSeenIn?: string;
    /* Link to the character's own URL endpoint. */
    url: string;
    /* Time at which the character was created in the database. */
    created: string;
}
