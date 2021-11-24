// INDEX
// SURFACE POINT

import app from './app';

async function main() {
    // Make the express app listen to the PORT
    const PORT = app.get('PORT');
    await app.listen(PORT);
    
    // Message
    console.log('LISTENING @ ', PORT);
}

main();