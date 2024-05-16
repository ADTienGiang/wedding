<template>
    <div>
        <h3>Layout mới</h3>
        <div v-for="(layout, index) in layouts" :key="index" class="image-layout">
            <!-- Button to remove entire layout -->
            <button @click="removeLayout(index)" class="delete-layout-button">Xóa</button>
            <!-- Container for the large image -->
            <div class="large-image-container">
                <div class="image-preview large" @click="() => handleImageClick(index, 'large')">
                    <img :src="layout.large" alt="Uploaded Image" class="uploaded-image" v-if="layout.large"/>
                    <div v-else class="image-placeholder large">955x630</div>
                </div>
            </div>
            <!-- Container for two vertical images -->
            <div class="vertical-images-container">
                <div class="image-preview vertical" @click="() => handleImageClick(index, 'vertical1')">
                    <img :src="layout.vertical1" alt="Uploaded Image" class="uploaded-image" v-if="layout.vertical1"/>
                    <div v-else class="image-placeholder vertical">630x950</div>
                </div>
                <div class="image-preview vertical" @click="() => handleImageClick(index, 'vertical2')">
                    <img :src="layout.vertical2" alt="Uploaded Image" class="uploaded-image" v-if="layout.vertical2"/>
                    <div v-else class="image-placeholder vertical">630x950</div>
                </div>
            </div>
            <div class="vertical-images-container vertical1">
                <div class="image-preview vertical vertical1" @click="() => handleImageClick(index, 'vertical11')">
                    <img :src="layout.vertical11" alt="Uploaded Image" class="uploaded-image" v-if="layout.vertical11"/>
                    <div v-else class="image-placeholder vertical vertical1">630x950</div>
                </div>
                <div class="image-preview vertical vertical1" @click="() => handleImageClick(index, 'vertical22')">
                    <img :src="layout.vertical22" alt="Uploaded Image" class="uploaded-image" v-if="layout.vertical22"/>
                    <div v-else class="image-placeholder vertical vertical1">630x950</div>
                </div>
            </div>
        </div>
        <button @click="addLayout">Thêm layout mới</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            layouts: [], // Khởi tạo mảng trống
            maxLayouts: 100
        };
    },
    created() {
        this.addDefaultLayout();
    },
    methods: {
        generateUniqueId() {
            return Math.random().toString(36).substr(2, 9);
        },
        handleImageClick(index, type) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                this.uploadImage(event, index, type);
            };
            input.click();
        },

    uploadImage(event, index, type) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // Cập nhật URL hình ảnh phù hợp với loại và index của layout
            this.layouts[index][type] = e.target.result;
            // Phát ra sự kiện tùy chỉnh với URL hình ảnh và loại
            this.$emit('image-uploaded', { index, type, image: e.target.result });
        };
        reader.readAsDataURL(file);
    }
},

        addDefaultLayout() {
            if (this.layouts.length === 0) {
                this.layouts.push({
                    id: this.generateUniqueId(), 
                    rectangle1: '', 
                    rectangle2: '', 
                    square1: '', 
                    square2: ''
                });
            }
        },
        removeImage(index, type) {
            this.layouts[index][type] = ''; // Xóa hình ảnh bằng cách đặt lại thuộc tính
        },
        addLayout() {
            if (this.layouts.length < this.maxLayouts) {
                this.layouts.push({
                    id: this.generateUniqueId(),
                    rectangle1: '', 
                    rectangle2: '', 
                    square1: '', 
                    square2: ''
                });
            }
        },
        removeLayout(index) {
            this.layouts.splice(index, 1);
        }
    }
};
</script>

<style scoped>
.delete-layout-button {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    z-index: 100;
}

.image-layout {
    position: relative;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
}

.large-image-container .image-preview.large {
    width: 100%;
    height: 300px;
    margin-bottom: 10px;
}

.vertical-images-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
}

.image-preview.vertical {
    flex: 1 1 48%;
    height: 100px;

    margin: 1%;
}
.image-preview.vertical1 {
    flex: 1 1 48%;
    height: 300px;
    margin: 1%;
}

.uploaded-image, .image-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #888;
    text-align: center;
}

.image-placeholder.large {
    height: 300px; /* Adjust height for the large image */
    width: 100%;
}

.image-placeholder.vertical {
    height: 100px; /* Adjust height for vertical images */
}
.image-placeholder.vertical1 {
    height: 300px; /* Adjust height for vertical images */
}
.image-placeholder.vertical1{
    height: 300px; /* Adjust height for vertical images */

}
.image-preview{
    border: 2px dashed #ccc;
    
}
</style>
