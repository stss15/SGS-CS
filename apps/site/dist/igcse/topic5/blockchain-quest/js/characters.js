const Characters = (() => {
    const roster = {
        satoshi: { name: 'Prof. Satoshi', role: 'Lead Scientist', avatar: '🧪', color: '#ffd166' },
        byte: { name: 'Byte', role: 'Guide Drone', avatar: '🤖', color: '#18f2d0' },
        miner: { name: 'Miner Max', role: 'PoW Specialist', avatar: '⛏️', color: '#f6b73c' },
        alice: { name: 'Alice', role: 'Node Operator', avatar: '🛰️', color: '#6ea8ff' },
        eve: { name: 'Eve', role: 'Corruption AI', avatar: '😈', color: '#ff6b6b' },
        system: { name: 'Chain OS', role: 'Network Core', avatar: '🔗', color: '#b4c5ff' }
    };

    const story = {
        1: {
            intro: [
                { speaker: 'satoshi', text: 'Welcome to Neon District. Move around, collect the glowing shards, then report to Byte.' },
                { speaker: 'byte', text: 'This city runs on two systems: centralised control and decentralised trust. You will feel the difference in play.' },
                { speaker: 'satoshi', text: 'Objective: collect 6 shards, clear the blitz challenge, and activate the exit portal.' }
            ],
            outro: [
                { speaker: 'byte', text: 'Good run. You now know who owns control in each money system.' },
                { speaker: 'satoshi', text: 'Next stop: Genesis Lab. Time to build the first block.' }
            ]
        },
        2: {
            intro: [
                { speaker: 'satoshi', text: 'Genesis Lab is unstable. Gather block components and avoid corruption zones.' },
                { speaker: 'byte', text: 'A valid block needs index, timestamp, data, previous hash, nonce, and its own hash.' }
            ],
            outro: [
                { speaker: 'satoshi', text: 'Genesis complete. The chain can finally start.' },
                { speaker: 'eve', text: 'Cute. Let us see how long your chain survives at speed.' }
            ]
        },
        3: {
            intro: [
                { speaker: 'eve', text: 'Welcome to Hash Highway. Jump wrong and your perfect chain cracks.' },
                { speaker: 'satoshi', text: 'Collect hash bits while dashing. Tiny data changes cause huge hash changes.' }
            ],
            outro: [
                { speaker: 'satoshi', text: 'Fast hands. You felt the avalanche effect under pressure.' }
            ]
        },
        4: {
            intro: [
                { speaker: 'alice', text: 'Chain Canyon links are breaking. Grab link nodes and repair integrity.' },
                { speaker: 'satoshi', text: 'If one block changes, every next link is exposed. Rebuild and verify.' }
            ],
            outro: [
                { speaker: 'alice', text: 'Integrity restored. No fake link survived your checks.' }
            ]
        },
        5: {
            intro: [
                { speaker: 'miner', text: 'Mining Rush starts now. Jump clean and collect nonce sparks.' },
                { speaker: 'satoshi', text: 'Proof of Work is expensive to produce, cheap to verify. Race smart.' }
            ],
            outro: [
                { speaker: 'miner', text: 'Block mined! That was serious PoW pace.' }
            ]
        },
        6: {
            intro: [
                { speaker: 'alice', text: 'Node Citadel is under a 51% pressure attack. Repair validator keys.' },
                { speaker: 'byte', text: 'Hold honest majority and the network survives.' }
            ],
            outro: [
                { speaker: 'alice', text: 'Consensus secured. Majority stayed honest.' }
            ]
        },
        7: {
            intro: [
                { speaker: 'satoshi', text: 'Contract Circuit online. This run trains IF-THEN automation.' },
                { speaker: 'eve', text: 'One missed jump and your contract logic dies with it.' }
            ],
            outro: [
                { speaker: 'satoshi', text: 'Logic locked. Smart contract path is stable.' }
            ]
        },
        8: {
            intro: [
                { speaker: 'eve', text: 'Final arena. I am the corruption core. Try to hash me out.' },
                { speaker: 'satoshi', text: 'Move, dodge, fire hash pulses. Protect the ledger heart.' }
            ],
            outro: [
                { speaker: 'system', text: 'Core stabilised. Blockchain integrity is now secure.' },
                { speaker: 'satoshi', text: 'Mission complete. You just learned blockchain through action, not worksheets.' }
            ]
        }
    };

    const getCharacter = (id) => roster[id] || roster.system;

    const getDialogue = (levelId, phase) => {
        const levelStory = story[levelId] || {};
        return Array.isArray(levelStory[phase]) ? levelStory[phase] : [];
    };

    return {
        getCharacter,
        getDialogue
    };
})();
