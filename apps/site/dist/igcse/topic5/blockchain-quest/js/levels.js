const Levels = (() => {
    const definitions = [
        {
            id: 1,
            icon: '🌆',
            mode: 'explore',
            title: 'Neon District',
            desc: 'Find currency shards and prove who controls the money.',
            concept: 'Centralised vs Decentralised',
            challengeId: 'currency-split',
            requiredCollectibles: 4,
            map: [
                '##############################',
                '#P....C..............C..E....#',
                '#..#####..#####..#####..###..#',
                '#....L........#.......L......#',
                '#..###..###...#...###..###...#',
                '#..C......#...#...#......C...#',
                '#..####...#..###..#...####...#',
                '#..............#.............#',
                '#..####..###########..####...#',
                '#....L........N.......L......#',
                '#......#.....X.....#.....#...#',
                '#..C...#..#######..#.....#...#',
                '#..###.#..........##..###....#',
                '#......####..##..####........#',
                '#..#####....##....#####......#',
                '#........C...................#',
                '##############################'
            ]
        },
        {
            id: 2,
            icon: '🧱',
            mode: 'explore',
            title: 'Genesis Lab',
            desc: 'Collect block parts and assemble Block #0.',
            concept: 'Block Structure & Genesis Block',
            challengeId: 'block-anatomy',
            requiredCollectibles: 5,
            map: [
                '##############################',
                '#P....C.....X.......C....E...#',
                '#..####...######...####......#',
                '#....L.......#.......L.......#',
                '#..###..##...#...##..####....#',
                '#..C......#..#..#......C.....#',
                '#..####...#..###.#...####....#',
                '#...........#.............#..#',
                '#..######..###..######....#..#',
                '#....L..#....N....L..#....#..#',
                '#..###..#..#####..#..#..####.#',
                '#..C....#.........#..#.......#',
                '#..#######..###..##.#####....#',
                '#...........#...........#....#',
                '#..#####....#..#####....#....#',
                '#............................#',
                '##############################'
            ]
        },
        {
            id: 3,
            icon: '🔐',
            mode: 'runner',
            title: 'Hash Highway',
            desc: 'Auto-run through corrupted blocks and grab hash bits.',
            concept: 'Hashing & Avalanche Effect',
            distanceGoal: 2400,
            requiredTokens: 14,
            speed: 285,
            jumpForce: 620,
            gravity: 1750,
            tokenLabel: 'Hash Bits'
        },
        {
            id: 4,
            icon: '🔗',
            mode: 'explore',
            title: 'Chain Canyon',
            desc: 'Restore broken links and reopen the portal.',
            concept: 'Linked Blocks & Integrity',
            challengeId: 'chain-integrity',
            requiredCollectibles: 6,
            map: [
                '##############################',
                '#P..C......X.......C.....E...#',
                '#..#####..#####..#####..###..#',
                '#....L........#.......L......#',
                '#..###..###...#...###..###...#',
                '#..C......#...#...#......C...#',
                '#..####...#..###..#...####...#',
                '#..............N.............#',
                '#..####..###########..####...#',
                '#......#.....X.....#.....#...#',
                '#..C...#..#######..#.....#...#',
                '#..###.#..........##..###....#',
                '#......####..##..####........#',
                '#..###......##......###......#',
                '#..#####....##....#####......#',
                '#........C...................#',
                '##############################'
            ]
        },
        {
            id: 5,
            icon: '⛏️',
            mode: 'runner',
            title: 'Mining Rush',
            desc: 'Jump spikes, mine nonces, and keep the chain alive.',
            concept: 'Proof of Work',
            distanceGoal: 2800,
            requiredTokens: 16,
            speed: 305,
            jumpForce: 650,
            gravity: 1820,
            tokenLabel: 'Nonce Sparks'
        },
        {
            id: 6,
            icon: '🛡️',
            mode: 'explore',
            title: 'Node Citadel',
            desc: 'Repair validators before Eve reaches majority control.',
            concept: 'Consensus & 51% Attack',
            challengeId: 'consensus-shield',
            requiredCollectibles: 5,
            map: [
                '##############################',
                '#P..M...C......M.....C..E....#',
                '#..#####..######..#####..###.#',
                '#....L........#.......L......#',
                '#..###..###...#...###..###...#',
                '#..C......#...#...#......M...#',
                '#..####...#..###..#...####...#',
                '#..............N.............#',
                '#..####..###########..####...#',
                '#......#.....X.....#.....#...#',
                '#..C...#..#######..#.....#...#',
                '#..###.#..........##..###....#',
                '#......####..##..####........#',
                '#..###......##......###......#',
                '#..#####....##....#####..M...#',
                '#........C...................#',
                '##############################'
            ]
        },
        {
            id: 7,
            icon: '📜',
            mode: 'runner',
            title: 'Contract Circuit',
            desc: 'Dash through logic gates and gather IF-THEN tokens.',
            concept: 'Smart Contracts',
            distanceGoal: 3000,
            requiredTokens: 18,
            speed: 328,
            jumpForce: 650,
            gravity: 1820,
            doubleJump: true,
            tokenLabel: 'Logic Tokens'
        },
        {
            id: 8,
            icon: '⚔️',
            mode: 'boss',
            title: 'Eve Core Showdown',
            desc: 'Final battle: shoot hash pulses and shut down corruption.',
            concept: 'Full Blockchain Mastery',
            bossHp: 28
        }
    ];

    const byId = new Map(definitions.map((def) => [def.id, def]));

    const clone = (value) => JSON.parse(JSON.stringify(value));

    const getLevel = (id) => {
        const def = byId.get(id);
        return def ? clone(def) : null;
    };

    const getAllLevels = () => definitions.map((def) => clone(def));

    return {
        getLevel,
        getAllLevels,
        totalLevels: definitions.length
    };
})();
