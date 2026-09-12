const Item = require('../models/Item');

const ITEMS = [
  { name: 'Cyberpunk Theme', description: 'Unlock a futuristic theme', price: 500, type: 'theme', icon: '🌌' },
  { name: 'Hero Avatar', description: 'Unlock a new character avatar', price: 300, type: 'avatar', icon: '🧙' },
  { name: 'XP Shield', description: 'Cosmetic badge of dedication', price: 400, type: 'badge', icon: '🛡' },
  { name: 'Golden Avatar', description: 'A shining hero avatar', price: 600, type: 'avatar', icon: '👑' },
  { name: 'Special Badge', description: 'A rare collector badge', price: 250, type: 'badge', icon: '🏆' },
];

const seedItems = async () => {
  for (const i of ITEMS) {
    await Item.updateOne({ name: i.name }, { $setOnInsert: i }, { upsert: true });
  }
  console.log('Items seeded');
};

module.exports = { seedItems, ITEMS };