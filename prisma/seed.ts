import prisma from "../src/database/database";

async function main() {
    await prisma.platforms.createMany({
        data: [
            {"name": "Netflix"},
            {"name": "Prime Video"},
            {"name": "Youtube"}
        ]
})
}

main()
    .then(() => console.log("REGISTRO FEITO COM SUCESSO!"))
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })