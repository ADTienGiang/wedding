<template>
    <div class="form-container">
        <div class="banner-container">
            <div :class="{ 'banner-item active': index === 0, 'banner-item': index !== 0 }">
                <div class="banner-remove" @click="removeBanner(this.id)">
                    <i class='bx bxs-x-square'></i>
                </div>
                <img class="banner-image" :src="this.banner" />
            </div>
        </div>
    </div>
    <div class="form-group">
        <label for="upload" class="upload-label">
            <input type="file" id="upload" multiple @change="handleFileChangeBanner" accept="image/*">
            Chọn hình ảnh
        </label>
    </div>
    <div class="selected-files">
        <h2>Hình đã chọn</h2>
        <ul>
            <li class="file-item" v-for="(file, index) in filesArr1" :key="index">
                <img class="selected-image" :src="getFileUrl(file)" alt="Selected File" />
                <span class="file-size">{{ getFileSize(file.size) }}</span>
                <i class='bx bx-message-square-x' @click="removeFileBanner(index)"></i>
            </li>
        </ul>
    </div>
    <div class="intro-form">
        <h2>Chỉnh sửa lời giới thiệu</h2>
        <!-- Input cho tiêu đề -->
        <div class="input-group">
            <label for="title">Tiêu đề chính:</label>
            <input id="title" class="form-input" v-model="tieudechinh" type="text">
        </div>
        <template v-for="(part, index) in newLoiMoDau" :key="index">
            <div class="image-layout">
                <div class="content-container">
                    <label>Tiêu đề</label>
                    <input v-model="part.tieude" type="text" class="form-input">
                    <label>Nội dung giới thiệu</label>
                    <textarea v-model="part.noidung" rows="4" cols="50" class="form-input"></textarea>
                </div>

                <div class="image-container">
                    <div class="image-preview" @click="handleImageClick1(index)">
                        <img :src="part.imageUrl" class="uploaded-image" />
                        <div class="image-placeholder" v-if="!part.imageUrl">
                            <span>955x635</span>
                        </div>
                    </div>
                    <!-- Hidden input file -->
                    <input type="file" style="display: none" @change="handleImageUpload1($event, index)"
                        accept="image/*" class="image-upload" />
                    <button @click="removePart1(index, part.id)" class="submit-button1">Xóa</button>
                </div>
            </div>
        </template>
        <template v-for="(part, index) in loiMoDau" :key="index">
            <div class="image-layout">
                <div class="content-container">
                    <label>Tiêu đề</label>
                    <input v-model="part.tieude" type="text" class="form-input">
                    <label>Nội dung giới thiệu</label>
                    <textarea v-model="part.noidung" rows="4" cols="50" class="form-input"></textarea>
                </div>

                <div class="image-container">
                    <div class="image-preview" @click="handleImageClick(index)">
                        <img :src="part.imageUrl" class="uploaded-image" />
                        <div class="image-placeholder" v-if="!part.imageUrl">
                            <span>955x635</span>
                        </div>
                    </div>
                    <!-- Hidden input file -->
                    <input type="file" style="display: none" @change="handleImageUpload($event, index)" accept="image/*"
                        class="image-upload" />
                    <button @click="removePart(index)" class="submit-button1">Xóa</button>
                </div>
            </div>
        </template>

        <button @click="addPart" class="submit-button">Thêm Phần</button>
        <button @click="addAbout" class="submit-button">Lưu Thay Đổi</button>
    </div>
    <toast ref="toast"></toast>
</template>

<script>
import toast from '../../components/toast.vue';

export default {
    data() {
        return {
            loiMoDau: [],
            newLoiMoDau: [],
            id: null,
            tieude: '',
            tieudechinh: '',
            noidung: '',
            fileInputRefs: [],
            images: [],
            filesArr: [],
            filesArrPartIndex: [],
            files: [],
            filesArr1: [],
            banner : ''
        };
    },
    components: {
        toast,
    },
    async mounted() {
        await this.getAbout();
    },
    methods: {
        async getAbout() {
            try {
                const response = await this.$axios.get('getAbout');
                console.log(response.data[0])
                if (response.data && response.data.length > 0) {
                    this.loiMoDau = [];
                    const newParts = response.data[0].partabout.map(part => ({
                        ...part,
                        imageUrl: part.partaboutimg.length > 0 ? part.partaboutimg[0].duongDan : null,
                        tieude: part.tieudephu
                    }));
                    this.tieudechinh = response.data[0].tieudechinh;
                    this.banner =response.data[0].banner;
                    this.newLoiMoDau = [...newParts];
                    const newPart = { tieude: '', noidung: '', imageUrl: '', imageFile: null, size: null, imageId: null };
                    this.newLoiMoDau.push(newPart);
                } else {
                    console.log('Không có dữ liệu về about');
                }

            } catch (error) {
                console.error('Error fetching about details:', error);
                this.$refs.toast.showToast('Error loading introduction');
            }
        },
        async addAbout() {
            console.log(this.loiMoDau)
            try {
                const formData = new FormData();
                formData.append('tieudechinh', this.tieudechinh);
                for (let i = 0; i < this.filesArr.length; i++) {
                    formData.append('avatar[]', this.filesArr[i].file);
                    formData.append('avatar[]', this.filesArr[i].file.size);
                    formData.append(`avatar[${i}][id]`, this.filesArr[i].id);
                }
                for (let i = 0; i < this.loiMoDau.length; i++) {
                    const part = this.loiMoDau[i];
                    formData.append(`loiMoDau[${i}][tieude]`, part.tieude);
                    formData.append(`loiMoDau[${i}][noidung]`, part.noidung);
                    formData.append(`loiMoDau[${i}][imageId]`, part.imageId);
                    if (part.imageFile) {
                        formData.append(`loiMoDau[${i}][size]`, part.imageFile.size);
                    }

                }
                for (let i = 0; i < this.files.length; i++) {
                    const file = this.files[i];
                    formData.append('files', file);
                }
                const response = await this.$axios.post('addAbout', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                this.$refs.toast.showToast(response.data.message);
                this.getAbout();
                this.loiMoDau = [];
                this.newLoiMoDau = [];
                this.filesArr = [];
            } catch (error) {
                console.error('Lỗi khi thêm thông tin lời mở đầu:', error);
                this.$refs.toast.showToast('Lỗi khi lưu lời mở đầu');
            }
        },

        base64ToBlob(base64) {
            const byteString = atob(base64.split(',')[1]);
            const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        },



        handleImageClick(index) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                this.handleImageUpload(event, index);
            };
            input.click();
        },
        handleImageUpload(event, index) {
            console.log(this.loiMoDau)
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const id = this.generateUniqueId();
                    this.loiMoDau[index].imageUrl = reader.result;
                    this.loiMoDau[index].imageFile = file;
                    this.loiMoDau[index].size = file.size;
                    this.loiMoDau[index].imageId = id;
                    if (!this.filesArr) {
                        this.filesArr = [];
                    }
                    this.filesArr.push({ id: id, file: file });
                };
                reader.readAsDataURL(file);
            } else {
                this.loiMoDau[index].size = null;
            }
        },



        handleImageClick1(index) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event) => {
                this.handleImageUpload1(event, index);
            };
            input.click();
        },
        handleImageUpload1(event, index) {
            console.log(this.newLoiMoDau)
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const id = this.generateUniqueId();
                    this.newLoiMoDau[index].imageUrl = reader.result;
                    this.newLoiMoDau[index].imageFile = file;
                    this.newLoiMoDau[index].size = file.size;
                    this.newLoiMoDau[index].imageId = id;
                    if (!this.filesArr1) {
                        this.filesArr1 = [];
                    }
                    this.filesArr1.push({ id: id, file: file });
                };
                reader.readAsDataURL(file);
            } else {
                // Handle the case where no file is selected
                // For example, you can reset the size to null
                this.newLoiMoDau[index].size = null;
            }
        },

        // Hàm tạo ID ngẫu nhiên
        generateUniqueId() {
            return Math.random().toString(36).substr(2, 9);
        },
        addPart() {
            const newPart = { tieude: '', noidung: '', imageUrl: '', imageFile: null, size: null, imageId: null };
            this.loiMoDau.push(newPart);
            console.log(this.loiMoDau)
            this.$nextTick(() => {
                const lastIndex = this.loiMoDau.length - 1;
                this.fileInputRefs.splice(lastIndex, 0, null);
            });
        },

        async removePart1(index, id) {
            console.log(id)
            this.newLoiMoDau.splice(index, 1);
            this.fileInputRefs.splice(index, 1);
            await this.$axios.delete(`deleteAbout/${id}`)
                .then((response) => {
                    this.$refs.toast.showToast(response.data.message);
                })
                .catch((error) => {
                    console.error('Lỗi khi xóa hình ảnh:', error);
                });
        },
        removePart(index) {
            this.loiMoDau.splice(index, 1);
            this.fileInputRefs.splice(index, 1);
        },
        handleFileChangeBanner(event) {
            const files = event.target.files;
            const filesArr = Array.from(files);
            this.files = files;
            this.filesArr1 = filesArr;
        },
        getFileUrl(file) {
            return URL.createObjectURL(file);
        },
        getFileSize(size) {
            let suffix = "bytes";
            if (size >= 1024 && size < 1024000) {
                suffix = "KB";
                size = Math.round((size / 1024) * 100) / 100;
            } else if (size >= 1024000) {
                suffix = "MB";
                size = Math.round((size / 1024000) * 100) / 100;
            }
            return `${size} ${suffix}`;
        },
        removeFileBanner(index) {
            URL.revokeObjectURL(this.getFileUrl(this.filesArr1[index]));
            this.filesArr1.splice(index, 1);
        },
    }
};
</script>
<style scoped>
.intro-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.image-layout {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.image-container {
    flex: 1;
    position: relative;
}

.image-preview {
    position: relative;
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

.uploaded-image {
    max-width: 100%;
    max-height: 100%;
}

.image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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

.delete-button,
.delete-layout-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.delete-layout-button {
    top: 10px;
}

.image-container {
    padding: 10px;
}

.banner-label {
    padding: 10px 0;
    font-size: 18px;
}

.banner-container {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding: 10px;
    background-color: #f4f4f4;
}

.banner-item {
    position: relative;
    width: 300px;
    height: 150px;
}

.active {
    border: 2px solid blue;
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-remove {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background-color: #ff0000a8;
    padding: 5px;
    border-radius: 50%;
}

.bx {
    color: white;
    font-size: 24px;
}

.form-container {
    margin: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 10px;
}

.form-input,
.banner-select {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
}

.upload-label {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
}

.selected-files ul {
    list-style: none;
}

.file-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
}

.selected-image1 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
}

.selected-image {
    width: 100px;
    height: auto;
    border-radius: 5px;
}

.file-size {
    background-color: #e9ecef;
    padding: 5px 10px;
    border-radius: 5px;
}

.bx-message-square-x {
    cursor: pointer;
    color: #ff0000;
}

.submit-button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
}

.submit-button1 {
    margin-left: 10px;
    background-color: #ff0000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.delete-button {
    margin-left: 10px;
    background-color: #d52d0f;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.bxs-x-square {
    color: #ff0000;
}

.bxs-x-square:hover {
    cursor: pointer;
}

@media (max-width: 768px) {
    .banner-item {
        width: 200px;
        height: 100px;
    }

    .form-container,
    .banner-container {
        margin: 10px;
        padding: 10px;
    }

    .upload-label {
        padding: 8px 10px;
    }

    .submit-button {
        padding: 8px 16px;
    }
}

@media (max-width: 480px) {
    .banner-item {
        width: 100%;
        height: auto;
    }

    .form-container {
        margin: 5px;
        padding: 5px;
    }

    .upload-label,
    .submit-button {
        width: 100%;
        text-align: center;
    }

    .selected-image {
        width: 250px;
    }

    .file-item {
        flex-direction: column;
    }

}

@media (max-width: 768px) {
    .hinhanhadminchinhsua {
        margin-bottom: 10px;
        width: 300px;
        overflow-x: auto;
    }

    .large-image {
        width: 250px;
        height: 250px;
    }
}

.image-container {
    flex: 1;
    position: relative;
}

.image-preview {
    position: relative;
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

.image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
