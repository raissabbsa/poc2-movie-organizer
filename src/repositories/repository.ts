import prisma from "../database/database.js";
import { MovieProtocol, UserProtocol } from "../protocols/movieProtocol.js";

async function getUsersId(id: number) {
    return prisma.users.findUnique({
        where: {
            id
        }
    })
}

async function getPlatformsId(id: number) {
    return prisma.platforms.findUnique({
        where: {
            id
        }
    })
}

async function getGenresId(id: number) {
    return prisma.genres.findUnique({
        where: {
            id
        }
    })
}

async function getMoviesId(id: number) {
    return prisma.movies.findUnique({
        where: {
            id
        }
    })
}

async function postMovie(movie: MovieProtocol) {
    return prisma.movies.create({
        data: movie
    })
}

async function updateMovie(id: number, note: string) {
    return prisma.movies.update({
        where: {
            id
        },
        data: {
            status: "watched",
            note
        }
    });
}

async function getUsersCpf(cpf: string) {
    return prisma.users.findUnique({
        where: {
            cpf
        }
    })
}

async function postUser(user: UserProtocol) {
    return prisma.users.create({
        data: user
    })
}

async function deleteMovies(id: number) {
    return prisma.movies.delete({
        where: {
            id
        }
    })
}

async function getPlatformsMovies() {
    return prisma.platforms.findMany({
        include:{
            movies: true
        }
    })
}

async function getGenres(id: number) {
    return prisma.genres.findFirst({
        where: { id },
        include: {
            movies: true
        }
    })
}

const movieRepository = {
    getUsersId,
    getPlatformsId,
    getGenresId,
    getMoviesId,
    postMovie,
    updateMovie,
    getUsersCpf,
    postUser,
    deleteMovies,
    getPlatformsMovies,
    getGenres
}
export default movieRepository;