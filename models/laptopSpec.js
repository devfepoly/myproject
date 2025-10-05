import mongoose from 'mongoose';

const laptopSpecSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        unique: true
    },
    // CPU
    processor: {
        type: String,
        trim: true
    },
    processor_generation: String,
    processor_cores: Number,
    processor_speed: String,

    // RAM
    ram_capacity: {
        type: Number,
        comment: 'GB'
    },
    ram_type: {
        type: String,
        comment: 'DDR4, DDR5'
    },
    ram_speed: String,
    ram_slots: Number,
    ram_max_upgrade: Number,

    // Storage
    storage_type: {
        type: String,
        comment: 'SSD, HDD, NVMe'
    },
    storage_capacity: {
        type: Number,
        comment: 'GB'
    },
    storage_slots: Number,
    storage_max_upgrade: Number,

    // GPU
    gpu_model: String,
    gpu_memory: Number,
    gpu_type: {
        type: String,
        enum: ['Integrated', 'Discrete']
    },

    // Display
    screen_size: {
        type: Number,
        comment: 'inch'
    },
    screen_resolution: String,
    screen_type: String,
    screen_refresh_rate: Number,
    screen_brightness: Number,
    screen_color_gamut: String,
    screen_touch: {
        type: Boolean,
        default: false
    },

    // Battery & Weight
    battery_capacity: String,
    battery_life: String,
    weight: {
        type: Number,
        comment: 'kg'
    },
    dimensions: String,

    // System
    operating_system: String,
    warranty_months: {
        type: Number,
        default: 12
    },

    // Connectivity
    wifi: String,
    bluetooth: String,
    ports: String,
    webcam: String,
    audio: String,

    // Other
    keyboard_type: String,
    material: String,
    color: String,
    release_year: Number
}, {
    timestamps: true
});

// Indexes
laptopSpecSchema.index({ product_id: 1 });
laptopSpecSchema.index({ processor: 1 });
laptopSpecSchema.index({ ram_capacity: 1 });
laptopSpecSchema.index({ gpu_model: 1 });
laptopSpecSchema.index({ screen_size: 1 });

const LaptopSpec = mongoose.model('LaptopSpec', laptopSpecSchema);

export default LaptopSpec;
