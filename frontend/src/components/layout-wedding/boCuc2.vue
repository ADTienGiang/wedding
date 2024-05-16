<template>
    <div>
        <h3>Layout ảnh</h3>

        <template v-if="isUpdate && partId === selectedPartId">
            <div v-for="(part, index) in part1" :key="index" class="image-layout">
                <div class="image-container">
                    <div class="image-preview" @click="handleImageClickUpdate(index, imgIndex)">
                        <img :src="part.duongDan" alt="Uploaded Image" class="uploaded-image" v-if="part.duongDan" />
                        <div v-else class="image-placeholder">
                            <span>955x635</span>
                        </div>
                    </div>
                </div>
                <div class="content-container">
                    <h4>Tiêu đề {{ this.part.bocuc }}</h4>
                    <p>Nội dung</p>
                </div>
                <button @click="removeLayout(index)" class="delete-button">Xóa</button>
            </div>
            <button @click="addLayout">Thêm layout ảnh</button>
        </template>
        <template v-else>
                <div v-for="(layout, index) in layouts" :key="index" class="image-layout">
                    <div class="image-container">
                        <div class="image-preview" @click="handleImageClick(index)">
                            <img :src="layout.image" alt="Uploaded Image" class="uploaded-image" v-if="layout.image" />
                            <div v-else class="image-placeholder">
                                <span>955x635</span>
                            </div>
                        </div>
                    </div>
                    <div class="content-container">
                        <h4>Tiêu đề 1</h4>
                        <p>Nội dung</p>
                    </div>
                    <button @click="removeLayout(index)" class="delete-button">Xóa</button>
                </div>
                <button @click="addLayout">Thêm layout ảnh</button>
        </template>
    </div>
</template>
    <script>
    export default {
        props: ['images', 'isAdding', 'isUpdate', 'part', 'part1', 'idpart', 'wedding','selectedPart'],
        data() {
            return {
            layouts: [],
            maxLayouts: 100,
            updatedImages: [],
            // partId: this.part.id,
            selectedPartId: null,
            };
        },
        created() {
        // console.log('part được chọn là :', this.selectedPart);
        // const selectedPart = this.wedding.part.find(part => part.id === this.part.id);
        // console.log('selectedPart :', selectedPart.id);

        // if (selectedPart) {
        //     this.selectedPartId = selectedPart.id;
        // }
        // if(parseInt(this.partId)  === parseInt(this.selectedPartId) ){
        //     console.log('bang nhau')
        // }else{
        //     console.log('ko bang')
        // }
        // console.log('selectedPartId:', this.selectedPartId);
        this.addDefaultLayout();
    },
        methods: {
        generateUniqueId() {
            return Math.random().toString(36).substr(2, 9);
        },
        addDefaultLayout() {
            if (this.layouts.length === 0) {
                this.layouts.push({ id: this.generateUniqueId(), image: '' });
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
            const file = event.target.files[0];
            if (file) {
                console.log("Tên file đã chọn:", file.name);
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Giả sử bạn cập nhật URL hình ảnh trong data của component con
                    this.layouts[index].image = e.target.result;

                    // Phát ra sự kiện tùy chỉnh với URL hình ảnh
                    this.$emit('image-uploaded', { index, image: e.target.result });
                };
                reader.readAsDataURL(file);
            }
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

        removeLayout(index) {
            this.layouts.splice(index, 1);
        },
        addLayout() {
            if (this.layouts.length < this.maxLayouts) {
                this.layouts.push({ id: this.generateUniqueId(), image: '' });
            }
        }
    }
};
</script>
<style scoped>
.image-layout {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.image-container {
    flex: 1;
}

.image-preview {
    width: 100%;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #888;
    text-align: center;
    position: relative;
}

.uploaded-image {
    max-width: 100%;
    height: auto;
}

.image-placeholder {
    width: 100%;
    height: 200px;
    border: 2px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    color: #888;
    text-align: center;
}

.content-container {
    flex: 1;
    padding: 0 20px;
}

h4 {
    font-size: 18px;
    font-weight: bold;
}

p {
    font-size: 16px;
    margin-bottom: 10px;
}

.delete-button {
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
}
</style>
