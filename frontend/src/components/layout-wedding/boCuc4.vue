<template>
    <div>
        <template v-if="isAdding">
        <h3>Layout mới</h3>
        <div v-for="(layout, index) in layouts" :key="index" class="image-layout">
            <!-- Button to remove entire layout -->
            <button @click="removeLayout(index)" class="delete-layout-button">Xóa</button>
            <!-- First row for rectangle images -->
            <div class="rectangle-container">
                <div class="image-preview" @click="() => handleImageClick(index, 'rectangle1')">
                    <img :src="layout.rectangle1" alt="Uploaded Image" class="uploaded-image" v-if="layout.rectangle1"/>
                    <div v-else class="image-placeholder rectangle">955x630</div>
                </div>
                <div class="image-preview" @click="() => handleImageClick(index, 'rectangle2')">
                    <img :src="layout.rectangle2" alt="Uploaded Image" class="uploaded-image" v-if="layout.rectangle2"/>
                    <div v-else class="image-placeholder rectangle">955x630</div>
                </div>
            </div>
            <!-- Second row for square images -->
            <div class="square-container">
                <div class="image-preview hinhvuong" @click="() => handleImageClick(index, 'square1')">
                    <img :src="layout.square1" alt="Uploaded Image" class="uploaded-image" v-if="layout.square1"/>
                    <div v-else class="image-placeholder square">630x630</div>
                </div>
                <div class="image-preview hinhvuong" @click="() => handleImageClick(index, 'square2')">
                    <img :src="layout.square2" alt="Uploaded Image" class="uploaded-image" v-if="layout.square2"/>
                    <div v-else class="image-placeholder square">630x630</div>
                </div>
            </div>
        </div>
    </template>
    <template v-if="isUpdate">
        <h3>Layout có dạng 2 dọc x 2 vuông</h3>

        <div v-for="(layout, index) in layouts" :key="index" class="image-layout">
            <!-- Button to remove entire layout -->
            <div class="rectangle-container">
                <div class="image-preview">
                    <img :src="layout.rectangle1" alt="Uploaded Image" class="uploaded-image" v-if="layout.rectangle1"/>
                    <div v-else class="image-placeholder rectangle"><span class="span-index-img">(HÌNH 1) </span> 955x630</div>
                </div>
                <div class="image-preview" >
                    <img :src="layout.rectangle2" alt="Uploaded Image" class="uploaded-image" v-if="layout.rectangle2"/>
                    <div v-else class="image-placeholder rectangle"><span class="span-index-img">(HÌNH 2) </span> 955x630</div>
                </div>
            </div>
            <!-- Second row for square images -->
            <div class="square-container">
                <div class="image-preview hinhvuong" >
                    <img :src="layout.square1" alt="Uploaded Image" class="uploaded-image" v-if="layout.square1"/>
                    <div v-else class="image-placeholder square"><span class="span-index-img">(HÌNH 3) </span> 630x630</div>
                </div>
                <div class="image-preview hinhvuong">
                    <img :src="layout.square2" alt="Uploaded Image" class="uploaded-image" v-if="layout.square2"/>
                    <div v-else class="image-placeholder square"><span class="span-index-img">(HÌNH 4) </span> 630x630</div>
                </div>
            </div>
        </div>
        <h3>Chọn hình ảnh mới</h3>
        <div v-for="(part, index) in part1" :key="index" class="image-layout">
            <!-- Button to remove entire layout -->
            <button @click="removeLayout(index)" class="index-layout-button">HÌNH {{index +1}}</button>
            <!-- First row for rectangle images -->
            <div class="rectangle-container">
                <div class="image-preview" @click="() => handleImageClickUpdate(index, imgIndex)">
                    <img :src="part.duongDan" alt="Uploaded Image" class="uploaded-image" v-if="part.duongDan"/>
                    <div v-else class="image-placeholder rectangle">955x630</div>
                </div>
            </div>
            <!-- Second row for square images -->
        </div>
    </template>
        <button @click="addLayout">Thêm layout mới</button>
    </div>
</template>



<script>
export default {
    props: ['images', 'isAdding', 'isUpdate','part', 'part1'],

    data() {
        return {
            layouts: [], // Khởi tạo mảng trống
            maxLayouts: 100
        };
    },
    mounted() {
    console.log(this.part1); // In ra giá trị của prop 'part' khi component được mounted
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
        },
        handleImageClickUpdate(index, imgIndex) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                this.uploadImageupdate(event, index, imgIndex);
            };
            input.click();
        },
        uploadImageupdate(event, index, imgIndex) {
    const file = event.target.files[0];
    if (file) {
        console.log("Tên file đã chọn:", file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            if (imgIndex !== null && this.part1[index]) {
                // Cập nhật ảnh hiện có
                this.part1[index].duongDan = e.target.result; // Giả sử part1 là mảng chứa ảnh
            } else {
                // Thêm ảnh mới vào cuối danh sách nếu không có imgIndex
                this.part1.push({ duongDan: e.target.result });
            }
            // Gửi sự kiện để cập nhật dữ liệu trên component cha
            this.$emit('image-uploaded', { index, image: e.target.result });
        };
        reader.readAsDataURL(file);
    }
    // Gửi sự kiện part-updated với dữ liệu part hiện tại
    this.$emit('part-updated', this.part);
},

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
.index-layout-button {
    position: absolute;
    top: 0;
    right: center;
    margin: 5px;
    background-color: #267ac8;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-weight: bold;
    z-index: 100;
}
.span-index-img {
    font-weight: bold;
    color: rgb(30, 75, 198);
    margin-right: 10px;
}
.image-layout {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    padding-top: 30px; /* Adds space at the top for the delete button */
    border: 1px solid #ccc; /* Optional: adds a border around each layout */
    padding: 10px;
}

.rectangle-container, .square-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.image-preview {
    flex: 1 1 48%;
    max-width: 48%;
    height: 300px;
    margin: 1%;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #888;
    text-align: center;
    position: relative;
}
.hinhvuong {
    height: 200px;
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

</style>
