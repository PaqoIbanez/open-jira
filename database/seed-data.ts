
interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    createdAt: number;
    status: string;
}


export const seedData:SeedData = {
    entries: [
        {
            description: 'Pending Consectetur culpa aute tempor commodo occaecat ut elit voluptate.',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'In-Progress Ex minim dolor cupidatat labore.',
            createdAt: Date.now() - 1000000,
            status: 'in-progress'
        },
        {
            description: 'Finished Aliquip fugiat duis voluptate ut anim tempor duis eiusmod cupidatat excepteur quis culpa sunt esse.',
            createdAt: Date.now() - 10000,
            status: 'finished'
        },
    ]
}