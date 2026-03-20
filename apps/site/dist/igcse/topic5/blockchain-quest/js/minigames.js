const MiniGames = (() => {
    const challenges = {
        'currency-split': {
            title: 'Currency Control Blitz',
            subtitle: 'Answer fast. Keep your streak alive.',
            timePerQuestion: 11,
            passRatio: 0.7,
            questions: [
                {
                    question: 'Who can freeze funds in a centralised wallet?',
                    options: ['A single authority', 'No one', 'All miners'],
                    answer: 0,
                    tip: 'Centralised systems rely on one controlling organisation.'
                },
                {
                    question: 'Bitcoin transactions are validated by...',
                    options: ['Distributed nodes', 'One app server', 'A single bank'],
                    answer: 0,
                    tip: 'Decentralised means many participants verify together.'
                },
                {
                    question: 'CBDC is usually...',
                    options: ['Centralised', 'Trustless', 'Permissionless by default'],
                    answer: 0,
                    tip: 'Most CBDCs are managed by a central bank authority.'
                },
                {
                    question: 'Decentralised exchange key trait?',
                    options: ['Peer validation', 'One owner controls all orders', 'No ledger'],
                    answer: 0,
                    tip: 'DEX platforms rely on smart contracts and network consensus.'
                }
            ]
        },
        'block-anatomy': {
            title: 'Genesis Assembly Drill',
            subtitle: 'Pick the field that makes the block valid.',
            timePerQuestion: 12,
            passRatio: 0.7,
            questions: [
                {
                    question: 'Genesis block previous hash should be...',
                    options: ['0', 'Previous block hash', 'Random sentence'],
                    answer: 0,
                    tip: 'Genesis has no parent block, so it points to zero.'
                },
                {
                    question: 'Nonce is mainly used for...',
                    options: ['Proof-of-work attempts', 'Storing wallet names', 'Compressing images'],
                    answer: 0,
                    tip: 'Miners iterate nonce values until hash target is met.'
                },
                {
                    question: 'If transaction data changes, block hash will...',
                    options: ['Change fully', 'Stay the same', 'Only change if timestamp changes'],
                    answer: 0,
                    tip: 'Hash output changes drastically with tiny input edits.'
                },
                {
                    question: 'Timestamp field stores...',
                    options: ['Creation time', 'Miner salary', 'Difficulty target'],
                    answer: 0,
                    tip: 'Timestamp records when the block was produced.'
                }
            ]
        },
        'chain-integrity': {
            title: 'Chain Link Pressure Test',
            subtitle: 'Choose the rule that keeps links unbroken.',
            timePerQuestion: 10,
            passRatio: 0.7,
            questions: [
                {
                    question: 'Block #5 must store what from Block #4?',
                    options: ['Hash of Block #4', 'Its own hash again', 'Random nonce'],
                    answer: 0,
                    tip: 'Each block references the exact hash from the previous block.'
                },
                {
                    question: 'Tamper one old block. What happens next?',
                    options: ['Following links become invalid', 'Nothing changes', 'Only coins reset'],
                    answer: 0,
                    tip: 'Changing one block breaks every dependent hash link after it.'
                },
                {
                    question: 'Hashing helps integrity because it is...',
                    options: ['Deterministic and one-way', 'Fully reversible', 'Independent of data'],
                    answer: 0,
                    tip: 'Deterministic + one-way makes tampering easy to detect.'
                },
                {
                    question: 'Valid chain check includes...',
                    options: ['Hash links + recalculated hashes', 'Only block count', 'Only timestamps'],
                    answer: 0,
                    tip: 'You verify both links and the internal hash integrity.'
                }
            ]
        },
        'consensus-shield': {
            title: 'Consensus Shield',
            subtitle: 'Keep honest majority above the attack threshold.',
            timePerQuestion: 11,
            passRatio: 0.7,
            questions: [
                {
                    question: 'A 51% attack means attacker controls...',
                    options: ['Majority validation power', 'One wallet', 'One block only'],
                    answer: 0,
                    tip: 'Majority control lets attackers rewrite recent chain history.'
                },
                {
                    question: 'Consensus exists to...',
                    options: ['Agree valid state without central boss', 'Speed up typing', 'Hide all transactions'],
                    answer: 0,
                    tip: 'Nodes agree on one valid chain state.'
                },
                {
                    question: 'More independent nodes usually make attacks...',
                    options: ['Harder', 'Easier', 'Irrelevant'],
                    answer: 0,
                    tip: 'Decentralised participation raises attack cost sharply.'
                },
                {
                    question: 'Best defence against majority takeover?',
                    options: ['Distributed honest participation', 'Single super-admin', 'Disable validation'],
                    answer: 0,
                    tip: 'Healthy decentralisation protects consensus.'
                }
            ]
        }
    };

    const clone = (value) => JSON.parse(JSON.stringify(value));

    const getChallenge = (id) => {
        const challenge = challenges[id];
        return challenge ? clone(challenge) : null;
    };

    return {
        getChallenge
    };
})();
