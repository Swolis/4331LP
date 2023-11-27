import mongoose, { Schema, Document } from 'mongoose';

// determines the relationship between units
const inventoryConfigSchema: Schema = new mongoose.Schema ({
    case: {type: Number, default: 1},
    innerPack: {type: Number, required: true},
    each: {type: Number, required: true},
})

export interface InventoryConfig {
   // case: number,
    innerPack: number,
    each: number,
}

export interface Inventory {
    case: number,
    innerPack: number,
    each: number,
}

export default inventoryConfigSchema;