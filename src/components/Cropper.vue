<template>
    <div id="app">
        <cropper src="https://images.pexels.com/photos/580012/pexels-photo-580012.jpeg" ref="cropper" />
        <button @click="crop">
            Crop
        </button>
    </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
export default {
    name: "ImageCropper",
    components: {
        Cropper,
    },
    data() {
        return {
            coordinates: {
                width: 0,
                height: 0,
                left: 0,
                top: 0,
            },
            image: null,
        };
    },
    methods: {
        crop() {
            const { coordinates, canvas, } = this.$refs.cropper.getResult();
            this.coordinates = coordinates;
            // You able to do different manipulations at a canvas
            // but there we just get a cropped image, that can be used 
            // as src for <img/> to preview result
            this.image = canvas.toDataURL();
        },
    },
};
</script>