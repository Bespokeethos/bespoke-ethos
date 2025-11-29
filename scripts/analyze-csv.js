const fs = require('fs');

const csv = fs.readFileSync('C:/Vercel/data/plexus_members_final.csv', 'utf8');
const lines = csv.split('\n').slice(1).filter(l => l.trim());

const withEmail = lines.filter(l => l.includes('@')).length;

console.log(`Total Records: ${lines.length}`);
console.log(`With Email: ${withEmail}`);
console.log(`Without Email: ${lines.length - withEmail}`);
console.log(`Email Coverage: ${((withEmail / lines.length) * 100).toFixed(1)}%`);
