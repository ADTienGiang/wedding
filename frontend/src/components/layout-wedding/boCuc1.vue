<template>
    <div>
        <h3>Layout ảnh</h3>
        <div v-for="(layout, index) in layouts" :key="index" class="image-upload-container">
            <div class="image-preview" @click="handleImageClick(index)">
                <img :src="layout.image" alt="Uploaded Image" class="uploaded-image" v-if="layout.image" />
                <div v-else class="image-placeholder">
                    <span>1280x855</span>
                </div>
                <button @click="removeImage(index)" class="delete-button" v-if="layout.image">Xóa</button>
            </div>
            <button @click="removeLayout(index)" class="delete-button">Xóa</button>
        </div>
        <button @click="addLayout">Thêm layout ảnh</button>
        <!-- Nút thêm layout ảnh mặc định -->
        <button v-if="layouts.length === 0" @click="addDefaultLayout">Thêm layout mặc định</button>
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
        // Thêm một layout mặc định khi component được tạo
        this.addDefaultLayout();
    },
    methods: {
        generateUniqueId() {
            return Math.random().toString(36).substr(2, 9);
        },

        addDefaultLayout() {
            if (this.layouts.length === 0) {
                this.layouts.push({ id: this.generateUniqueId(), image: '' }); // Thêm một layout mặc định
            }
        },

        handleImageClick(index) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                this.uploadImage(event, index);
            };
            input.click();
        },

        uploadImage(event, index) {
            console.log(index)
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.layouts[index].image = e.target.result; // Cập nhật URL ảnh
                    this.$emit('image-uploaded', { index, image: e.target.result });

                };
                reader.readAsDataURL(file);
            }
        },

        removeImage(index) {
            this.layouts[index].image = ''; // Xóa ảnh bằng cách đặt giá trị của image thành ''
        },

        removeLayout(index) {
            this.layouts.splice(index, 1); // Xóa layout bằng index
        },
         addLayout() {
            if (this.layouts.length < this.maxLayouts) {
                this.layouts.push({ id: this.generateUniqueId(), image: '' }); // Thêm một bố cục mới với ID duy nhất
            }
            
        }
    }
};
</script>

<style scoped>
.uploaded-image,
.image-placeholder {
    width: 100%;
    height: 200px;
    /* Thiết lập chiều cao cho khung ảnh */
    border: 2px dashed #ccc;
    /* Khung nét đứt */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    /* Màu nền */
    color: #888;
    /* Màu chữ */
    text-align: center;
}

.image-upload-container {
    position: relative;
    margin-bottom: 20px;
}

.delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.image-preview {
    position: relative;
}
</style>
