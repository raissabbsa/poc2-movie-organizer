import { Request, Response } from "express";
import { MovieProtocol, UserProtocol } from "../protocols/movieProtocol.js";
import { movieSchema, userSchema } from "../schemas/movie-schema.js";
import movieRepository from "../repositories/repository.js";

async function postMovie(req: Request, res: Response){
    const movie = req.body as MovieProtocol;

    const {error} = movieSchema.validate(movie);
    if(error){
        return res.status(400).send(error.message);
    }

    try{
        const userExist = await movieRepository.getUsersId(movie.user_id);
        const platformExist = await movieRepository.getPlatformsId(movie.platform_id);
        const genreExist = await movieRepository.getGenresId(movie.genre_id);

        if(!userExist || !genreExist || !platformExist){
            return res.sendStatus(404);
        }

        await movieRepository.postMovie(movie);
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
        const existFilm = await movieRepository.getUsersId(id);
        console.log(existFilm)
        if(!existFilm){
            return res.sendStatus(404);
        }
        await movieRepository.updateMovie(id, note);
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
        const userExist = await movieRepository.getUsersCpf(user.cpf);
        console.log(userExist)
        if(userExist){
            return res.sendStatus(409);
        }
        await movieRepository.postUser(user);
        res.sendStatus(201);


    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function getPlatforms(req: Request, res: Response){
    try{
        const data = await movieRepository.getPlatformsMovies();
        res.send(data);
        
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function getGenreId(req: Request, res: Response){
    const id : string = req.params.id;
    try{
        const genreExist = await movieRepository.getGenresId(Number(id));
        if(!genreExist){
            return res.sendStatus(404);
        }

        const genre = await movieRepository.getGenres(Number(id));

        res.send(genre);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

async function deleteMovie(req: Request, res: Response){
    const id: number = req.body.id;
    try{
        const movieExist = await movieRepository.getMoviesId(id);
        
        if(movieExist){
            return res.sendStatus(404);
        }
        await movieRepository.deleteMovies(id);

        res.sendStatus(200);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export {
    postMovie, finishedMovie, postUser, getPlatforms, getGenreId, deleteMovie
};

