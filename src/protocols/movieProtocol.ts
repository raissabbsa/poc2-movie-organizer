export type MovieProtocol = {
    id?: number,
    name: string,
    user_id: number,
    platform_id: number,
    genre_id: number,
    status: string,
    note?: string
}

export type UserProtocol = {
    id?: number,
    name: string,
    cpf: string,
    phone?: string
}