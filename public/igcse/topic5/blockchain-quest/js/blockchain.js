/* ═══════════════════════════════════════════════════
   BLOCKCHAIN.js — Crypto / Chain Logic
   SHA-256, Block creation, Chain validation
   ═══════════════════════════════════════════════════ */

const Blockchain = (() => {
    // SHA-256 hash wrapper (uses js-sha256 library loaded via CDN)
    function hash(data) {
        return sha256(String(data));
    }

    // Create a block object
    function createBlock(index, timestamp, transactions, previousHash, nonce = 0) {
        const block = { index, timestamp, transactions, previousHash, nonce, hash: '' };
        block.hash = hashBlock(block);
        return block;
    }

    // Compute hash of a block's contents
    function hashBlock(block) {
        const data = block.index + block.timestamp + JSON.stringify(block.transactions) + block.previousHash + block.nonce;
        return hash(data);
    }

    // Create Genesis Block (Block #0)
    function createGenesisBlock() {
        return createBlock(0, Date.now(), [{ from: 'SYSTEM', to: 'Genesis', amount: 0, note: 'The first block' }], '0', 0);
    }

    // Mine a block: find a nonce that produces a hash with the required leading zeros
    // Returns { nonce, hash, attempts } via a generator for animated mining
    function* mineBlockGenerator(block, difficulty) {
        const target = '0'.repeat(difficulty);
        let nonce = 0;
        let currentHash = '';

        while (true) {
            block.nonce = nonce;
            currentHash = hashBlock(block);

            yield { nonce, hash: currentHash, found: currentHash.startsWith(target) };

            if (currentHash.startsWith(target)) {
                block.hash = currentHash;
                return;
            }

            nonce++;
        }
    }

    // Synchronous mining (for quick operations)
    function mineBlock(block, difficulty, maxAttempts = 100000) {
        const target = '0'.repeat(difficulty);
        let nonce = 0;

        while (nonce < maxAttempts) {
            block.nonce = nonce;
            const h = hashBlock(block);
            if (h.startsWith(target)) {
                block.hash = h;
                return { nonce, hash: h, attempts: nonce + 1 };
            }
            nonce++;
        }

        // Fallback if not found in maxAttempts
        block.nonce = nonce;
        block.hash = hashBlock(block);
        return { nonce, hash: block.hash, attempts: nonce };
    }

    // Validate entire chain integrity
    function validateChain(chain) {
        const errors = [];

        for (let i = 1; i < chain.length; i++) {
            const current = chain[i];
            const previous = chain[i - 1];

            // Check previous hash link
            if (current.previousHash !== previous.hash) {
                errors.push({
                    blockIndex: i,
                    type: 'prevHash',
                    message: `Block #${i}'s Previous Hash doesn't match Block #${i - 1}'s Hash`
                });
            }

            // Check current hash integrity
            const recalculated = hashBlock(current);
            if (current.hash !== recalculated) {
                errors.push({
                    blockIndex: i,
                    type: 'integrity',
                    message: `Block #${i}'s data has been tampered with (hash mismatch)`
                });
            }
        }

        return { valid: errors.length === 0, errors };
    }

    // Check if a hash meets the difficulty target
    function meetsTarget(hash, difficulty) {
        return hash.startsWith('0'.repeat(difficulty));
    }

    // Create a sample chain for demonstrations
    function createSampleChain(numBlocks = 4, difficulty = 1) {
        const chain = [createGenesisBlock()];

        const sampleTxs = [
            [{ from: 'Alice', to: 'Bob', amount: 25 }, { from: 'Charlie', to: 'Diana', amount: 10 }],
            [{ from: 'Bob', to: 'Eve', amount: 5 }, { from: 'Alice', to: 'Charlie', amount: 15 }],
            [{ from: 'Diana', to: 'Alice', amount: 30 }, { from: 'Eve', to: 'Bob', amount: 8 }],
            [{ from: 'Charlie', to: 'Eve', amount: 12 }, { from: 'Bob', to: 'Diana', amount: 20 }],
            [{ from: 'Alice', to: 'Eve', amount: 7 }, { from: 'Diana', to: 'Charlie', amount: 18 }],
        ];

        for (let i = 1; i < numBlocks; i++) {
            const prevBlock = chain[chain.length - 1];
            const newBlock = createBlock(
                i,
                Date.now() + i * 600000,
                sampleTxs[(i - 1) % sampleTxs.length],
                prevBlock.hash
            );
            mineBlock(newBlock, difficulty);
            chain.push(newBlock);
        }

        return chain;
    }

    // Format hash for display (truncated)
    function shortHash(hash, len = 12) {
        if (!hash || hash.length < len) return hash || '';
        return hash.substring(0, len) + '…';
    }

    // Format timestamp
    function formatTimestamp(ts) {
        return new Date(ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }

    return {
        hash,
        createBlock,
        hashBlock,
        createGenesisBlock,
        mineBlockGenerator,
        mineBlock,
        validateChain,
        meetsTarget,
        createSampleChain,
        shortHash,
        formatTimestamp
    };
})();
