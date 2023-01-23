import { Request, Response } from "express";
import { connection } from "../database/database.js";
import { MovieProtocol, UserProtocol } from "../protocols/movieProtocol.js";
import { movieSchema, userSchema } from "../schemas/movie-schema.js";

async function postMovie(req: Request, res: Response){
    const movie = req.body as MovieProtocol;

    const {error} = movieSchema.validate(movie);
    if(error){
        return res.status(400).send(error.message);
    }

    try{
        const userExist = await connection.query(`SELECT * FROM users WHERE id = $1`, [movie.user_id]);
        const platformExist = await connection.query(`SELECT * FROM platforms WHERE id = $1`, [movie.platform_id]);
        const genreExist = await connection.query(`SELECT * FROM genres WHERE id = $1`, [movie.genre_id]);

        if(userExist.rows.length === 0 || genreExist.rows.length === 0 || platformExist.rows.length === 0){
            return res.sendStatus(404);
        }

        await connection.query(`
            INSERT INTO movies (name, platform_id, user_id, genre_id, status) VALUES ($1,$2,$3,$4,$5)`,
            [movie.name, movie.platform_id, movie.user_id, movie.genre_id, movie.status]);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function finishedMovie(req: Request, res: Response){
    const id: number = req.body.id;
    const note: string = req.body.note;
    try{
        const existFilm = await connection.query(`SELECT * FROM users WHERE id = $1`, [id]);
        if(existFilm.rows.length === 0){
            return res.sendStatus(404);
        }
        await connection.query(`UPDATE movies SET status = 'watched', note=$1 WHERE id = $2`, [note, id]);
        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function postUser(req: Request, res: Response){
    const user = req.body as UserProtocol;

    const {error} = userSchema.validate(user);
    if(error){
        return res.status(400).send(error.message);
    }

    try{
        const userExist = await connection.query(`SELECT * FROM users WHERE cpf = $1`, [user.cpf]);
        if(userExist.rows.length){
            return res.sendStatus(409);
        }
        await connection.query(`
            INSERT INTO users (name, cpf, phone) VALUES ($1,$2,$3)`,
            [user.name, user.cpf, user.phone]);
        res.sendStatus(201);


    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function getPlatforms(req: Request, res: Response){
    try{
        const platforms = await connection.query(`
            SELECT platforms.* ,
            COUNT(movies.platform_id) AS number_movies
            FROM platforms 
            JOIN movies ON platforms.id = movies.platform_id
            GROUP BY platforms.id, movies.platform_id`);
            
        res.send(platforms.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function getGenreId(req: Request, res: Response){
    const id : string = req.params.id;
    try{
        const genreExist = await connection.query(`SELECT * FROM genres WHERE id = $1`, [id]);
        if(genreExist.rows.length === 0){
            return res.sendStatus(404);
        }

        const genre = await connection.query(`
            SELECT genres.* ,
            COUNT(movies.genre_id) AS number_movies
            FROM genres 
            JOIN movies ON genres.id = movies.genre_id
            WHERE genres.id = $1
            GROUP BY genres.id, movies.platform_id`, [id]);

        res.send(genre.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function deleteMovie(req: Request, res: Response){
    const id: number = req.body.id;
    try{
        const movieExist = await connection.query(`SELECT * FROM movies WHERE id = $1`, [id]);
        
        if(movieExist.rows.length === 0){
            return res.sendStatus(404);
        }
        await connection.query(`DELETE FROM movies WHERE id=$1`, [id]);

        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export {
    postMovie, finishedMovie, postUser, getPlatforms, getGenreId, deleteMovie
};

